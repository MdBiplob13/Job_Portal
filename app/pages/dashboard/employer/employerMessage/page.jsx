"use client";
import useUser from "@/app/hooks/user/userHook";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiStar,
  FiArchive,
  FiWifi,
  FiWifiOff,
  FiLoader,
  FiMessageSquare,
  FiPlus,
} from "react-icons/fi";

export default function EmployerMessage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  const { user } = useUser();
  const router = useRouter();
  const socketRef = useRef(null);

  // Load contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      if (!user?._id) return;

      try {
        setIsLoadingContacts(true);
        console.log(`Fetching contacts for user: ${user._id}`);

        // Simple API call with user ID
        const response = await fetch(`/api/chat/contacts?userId=${user._id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.status === "success" && data.data) {
          // Clean and format the contact data
          const formattedContacts = data.data.map((contact) => {
            // Handle the job field - if it's an object, convert it to a string
            let jobValue = "No job specified";
            if (contact.job) {
              if (typeof contact.job === 'object') {
                // If job is an object, try to extract a meaningful string
                if (contact.job.title) {
                  jobValue = contact.job.title;
                } else if (contact.job.name) {
                  jobValue = contact.job.name;
                } else if (contact.job.position) {
                  jobValue = contact.job.position;
                } else {
                  // If we can't extract a string, stringify the object (for debugging)
                  jobValue = JSON.stringify(contact.job).substring(0, 50) + '...';
                }
              } else if (typeof contact.job === 'string') {
                jobValue = contact.job;
              }
            } else if (contact.headline) {
              jobValue = contact.headline;
            } else if (contact.currentPosition) {
              jobValue = contact.currentPosition;
            }

            // Handle rating - ensure it's a number
            let ratingValue = 0;
            if (contact.rating) {
              if (typeof contact.rating === 'number') {
                ratingValue = contact.rating;
              } else if (typeof contact.rating === 'object' && contact.rating.rating) {
                ratingValue = contact.rating.rating;
              }
            } else if (contact.review && contact.review.rating) {
              ratingValue = contact.review.rating;
            }

            return {
              id: contact._id || contact.id || "",
              name: contact.name || contact.userName || "Unknown User",
              avatar: contact.avatar || contact.photo || "/user1.jpeg",
              job: jobValue,
              message: contact.lastMessage || "Start a conversation",
              time: contact.lastMessageTime || new Date().toISOString(),
              unread: contact.unreadMessages || contact.unread || 0,
              lastSeen: contact.lastSeen || "Recently",
              rating: ratingValue,
              projectValue: contact.projectValue || "$0",
              role: contact.role || "user",
              status: "offline",
            };
          });
          
          console.log("Formatted contacts:", formattedContacts);
          setContacts(formattedContacts);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setIsLoadingContacts(false);
      }
    };

    if (user?._id) {
      fetchContacts();
    }
  }, [user]);

  // Initialize socket connection - Only on client side
  useEffect(() => {
    // Don't run on server or if no user
    if (typeof window === "undefined" || !user?._id) return;

    const initializeSocket = async () => {
      try {
        // Dynamically import socket.io-client to avoid SSR issues
        const socketIOClient = (await import("socket.io-client")).default;
        
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
        
        const socket = socketIOClient(socketUrl, {
          transports: ["websocket", "polling"],
          auth: {
            userId: user._id,
            userName: user.name || user.userName,
          },
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("✅ Connected to socket server");
          setIsConnected(true);
          setConnectionStatus("Connected");

          // Set user online
          socket.emit("user-online", {
            userId: user._id,
            userName: user.name || user.userName,
            avatar: user.photo || user.avatar || "/user1.jpeg",
          });
        });

        socket.on("connect_error", (error) => {
          console.error("❌ Connection error:", error.message);
          setIsConnected(false);
          setConnectionStatus("Connection failed");

          setTimeout(() => {
            if (socket && !socket.connected) {
              socket.connect();
            }
          }, 2000);
        });

        socket.on("disconnect", (reason) => {
          console.log("⚠️ Disconnected:", reason);
          setIsConnected(false);
          setConnectionStatus("Disconnected");
        });

        socket.on("new-message", (message) => {
          console.log("📨 New message received:", message);

          // Update contacts with new message
          setContacts((prev) =>
            prev.map((contact) => {
              if (contact.id === message.senderId) {
                return {
                  ...contact,
                  message: message.text || message.message || "",
                  time: "Just now",
                  unread: (contact.unread || 0) + 1,
                };
              }
              return contact;
            })
          );
        });

        socket.on("user-status-changed", ({ userId, status }) => {
          console.log("🔄 User status changed:", userId, status);

          // Update contacts status
          setContacts((prev) =>
            prev.map((contact) =>
              contact.id === userId ? { ...contact, status } : contact
            )
          );

          // Update online users set
          if (status === "online") {
            setOnlineUsers((prev) => new Set([...prev, userId]));
          } else {
            const newSet = new Set(onlineUsers);
            newSet.delete(userId);
            setOnlineUsers(newSet);
          }
        });

        socket.on("online-users", (usersList) => {
          console.log("👥 Online users received:", usersList?.length || 0);
          const onlineIds = usersList?.map((user) => user.userId) || [];
          setOnlineUsers(new Set(onlineIds));

          // Update contacts status
          setContacts((prev) =>
            prev.map((contact) => ({
              ...contact,
              status: onlineIds.includes(contact.id) ? "online" : "offline",
            }))
          );
        });

        socket.on("user-typing", ({ userId, isTyping }) => {
          setTypingUsers((prev) => ({ ...prev, [userId]: isTyping }));
        });

      } catch (error) {
        console.error("Socket initialization error:", error);
      }
    };

    initializeSocket();

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("user-offline", user._id);
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  const handleContactClick = (contactId) => {
    // Navigate to single message page with the contact's ID
    router.push(`/pages/dashboard/employer/employerMessage/${contactId}`);
  };

  const handleStartNewChat = () => {
    // Navigate to a page where users can start a new chat
    router.push("/messages/new");
  };

  const handleReconnect = () => {
    if (socketRef.current && socketRef.current.disconnected) {
      socketRef.current.connect();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";
    
    try {
      const date = new Date(timestamp);
      // Check if date is valid
      if (isNaN(date.getTime())) return "Just now";
      
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
      return `${Math.floor(diffMins / 1440)}d ago`;
    } catch {
      return "Just now";
    }
  };

  const getStatusIcon = (userId) => {
    if (onlineUsers.has(userId)) {
      return (
        <div
          className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"
          title="Online"
        />
      );
    }
    return (
      <div
        className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white"
        title="Offline"
      />
    );
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    if (!contact || !contact.name) return false;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        (contact.name && contact.name.toLowerCase().includes(query)) ||
        (contact.job && typeof contact.job === 'string' && contact.job.toLowerCase().includes(query)) ||
        (contact.message && contact.message.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Stats calculation
  const stats = {
    total: contacts.length,
    online: contacts.filter(c => onlineUsers.has(c.id)).length,
    unread: contacts.reduce((sum, contact) => sum + (contact.unread || 0), 0),
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                <button
                  onClick={handleReconnect}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    isConnected
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  title={
                    isConnected ? "Click to reconnect" : "Click to reconnect"
                  }
                >
                  {isConnected ? <FiWifi /> : <FiWifiOff />}
                  <span className="hidden sm:inline">{connectionStatus}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Archive"
                >
                  <FiArchive className="text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="More options"
                >
                  <FiMoreVertical className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={isLoadingContacts}
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingContacts ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <FiLoader className="text-gray-400 text-2xl animate-spin mb-2" />
                <p className="text-sm text-gray-500">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <FiMessageSquare className="text-gray-300 text-4xl mb-2" />
                <p className="text-gray-500 text-sm text-center">
                  No conversations yet
                </p>
                <p className="text-gray-400 text-xs mt-1 text-center">
                  Start a new conversation
                </p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id || Math.random()}
                  onClick={() => handleContactClick(contact.id)}
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={contact.avatar || "/user1.jpeg"}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/user1.jpeg";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(contact.id)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {contact.name}
                        
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(contact.time)}
                        </span>
                        {(contact.unread || 0) > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>

                    
                    
                    <p className="text-xs text-gray-400 truncate">
                      {typingUsers[contact.id] ? (
                        <span className="text-blue-500 italic">Typing...</span>
                      ) : (
                        contact.message || "Start a conversation"
                      )}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 text-xs" />
                        <span className="text-xs text-gray-500">
                          {typeof contact.rating === 'number' ? contact.rating.toFixed(1) : "0.0"}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-blue-600">
                        {contact.projectValue || "$0"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          
        </div>

        {/* Right Area - Select a conversation */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Empty Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiMessageSquare className="text-gray-400 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a chat to start messaging</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                title="Voice call"
                disabled
              >
                <FiPhone className="text-gray-400" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                title="Video call"
                disabled
              >
                <FiVideo className="text-gray-400" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                title="More options"
                disabled
              >
                <FiMoreVertical className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Empty Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <FiMessageSquare className="text-gray-300 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                {contacts.length > 0
                  ? "Choose a contact from the list to start chatting"
                  : "No contacts available. Start networking!"}
              </p>
              {contacts.length === 0 && !isLoadingContacts && (
                <button
                  onClick={handleStartNewChat}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Your First Chat
                </button>
              )}
            </div>
          </div>

          {/* Disabled Message Input */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex items-end gap-3 opacity-50">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-not-allowed"
                title="Attach file"
                disabled
              >
                <FiPlus className="text-gray-400" />
              </button>

              <div className="flex-1 relative">
                <textarea
                  placeholder="Select a conversation to start messaging..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl text-sm bg-gray-50 resize-none cursor-not-allowed"
                  rows="1"
                  disabled
                  readOnly
                  value=""
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors cursor-not-allowed"
                  title="Emoji"
                  disabled
                >
                  <FiPlus className="text-gray-400" />
                </button>
              </div>

              <button
                className="p-3 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed"
                title="Send message"
                disabled
              >
                <FiPlus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}