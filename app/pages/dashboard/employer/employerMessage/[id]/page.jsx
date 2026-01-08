"use client";
import useGetUserWithId from "@/app/hooks/user/GetUserWithId";
import useUser from "@/app/hooks/user/userHook";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiSend,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiPaperclip,
  FiSmile,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiArchive,
  FiUser,
  FiWifi,
  FiWifiOff,
  FiLoader,
  FiMessageSquare,
} from "react-icons/fi";

export default function ProfessionalMessageSinglePage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [isLoadingUserFromUrl, setIsLoadingUserFromUrl] = useState(false);

  const { user } = useUser();

  // data for message
  const params = useParams();
  const id = params.id;
  const {singleUser, singleUserLoading} = useGetUserWithId(id);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);
  const hasFetchedContactsRef = useRef(false);

  // Load contacts from API - RUNS ONCE when user is available
  useEffect(() => {
    const fetchContacts = async () => {
      // Prevent multiple fetches
      if (!user?._id || hasFetchedContactsRef.current) return;

      try {
        setIsLoadingContacts(true);
        hasFetchedContactsRef.current = true;

        // Get token from cookies
        const getToken = () => {
          if (typeof window !== "undefined") {
            return (
              localStorage.getItem("token") ||
              localStorage.getItem("authToken") ||
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1]
            );
          }
          return null;
        };

        const token = getToken();

        if (!token) {
          console.warn("No authentication token found");
          setContacts([]);
          return;
        }

        // Fetch contacts from API with authentication
        const response = await fetch("/api/chat/contacts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          console.warn("Authentication failed, redirecting to login");
          setContacts([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success" && data.data) {
          // Transform API response with proper type checking
          const formattedContacts = data.data.map((contact) => {
            // Handle job field - ensure it's a string
            let jobValue = "No job specified";
            if (contact.job) {
              if (typeof contact.job === 'string') {
                jobValue = contact.job;
              } else if (typeof contact.job === 'object') {
                jobValue = contact.job.title || contact.job.name || contact.job.position || 
                          (contact.job.jobTitle ? contact.job.jobTitle : "Professional");
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
              } else if (typeof contact.rating === 'object') {
                ratingValue = contact.rating.rating || contact.rating.value || 0;
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
              unread: contact.unreadMessages || 0,
              lastSeen: contact.lastSeen || "Recently",
              rating: ratingValue,
              projectValue: contact.projectValue || "$0",
              role: contact.role || "user",
              status: "offline",
              lastMessageTime: contact.lastMessageTime,
            };
          });

          setContacts(formattedContacts);

          // Only set first contact if no specific user is selected via URL
          if (formattedContacts.length > 0 && !selectedChat && !id) {
            setSelectedChat(formattedContacts[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setIsLoadingContacts(false);
      }
    };

    fetchContacts();

    // Reset the ref when component unmounts
    return () => {
      hasFetchedContactsRef.current = false;
    };
  }, [user?._id]); // Only depend on user._id, not the entire user object

  // Handle URL-based user selection - RUNS when URL id or contacts change
  useEffect(() => {
    const handleUrlUserSelection = () => {
      // If no user ID in URL, do nothing
      if (!id || !user?._id || isLoadingContacts) {
        setIsLoadingUserFromUrl(false);
        return;
      }
      
      // If user data from URL is still loading, wait
      if (singleUserLoading) {
        setIsLoadingUserFromUrl(true);
        return;
      }
      
      setIsLoadingUserFromUrl(false);
      
      // Check if this user already exists in contacts
      const existingContact = contacts.find(contact => contact.id === id);
      
      if (existingContact) {
        console.log("Contact exists, selecting:", existingContact.name);
        setSelectedChat(existingContact);
      } else if (singleUser) {
        console.log("Creating new contact for:", singleUser.name || singleUser.userName);
        
        // Handle job field for singleUser
        let jobValue = "No job specified";
        if (singleUser.job) {
          if (typeof singleUser.job === 'string') {
            jobValue = singleUser.job;
          } else if (typeof singleUser.job === 'object') {
            jobValue = singleUser.job.title || singleUser.job.name || singleUser.job.position || 
                      (singleUser.job.jobTitle ? singleUser.job.jobTitle : "Professional");
          }
        } else if (singleUser.headline) {
          jobValue = singleUser.headline;
        } else if (singleUser.currentPosition) {
          jobValue = singleUser.currentPosition;
        }

        // Handle rating for singleUser
        let ratingValue = 0;
        if (singleUser.rating) {
          if (typeof singleUser.rating === 'number') {
            ratingValue = singleUser.rating;
          } else if (typeof singleUser.rating === 'object') {
            ratingValue = singleUser.rating.rating || singleUser.rating.value || 0;
          }
        } else if (singleUser.review && singleUser.review.rating) {
          ratingValue = singleUser.review.rating;
        }

        // Create a new contact from the singleUser data
        const newContact = {
          id: singleUser._id,
          name: singleUser.name || singleUser.userName || "User",
          avatar: singleUser.photo || singleUser.avatar || "/user1.jpeg",
          job: jobValue,
          message: "Start a conversation",
          time: "Just now",
          unread: 0,
          lastSeen: "Recently",
          rating: ratingValue,
          projectValue: singleUser.projectValue || "$0",
          role: singleUser.role || "user",
          status: "offline"
        };
        
        // Check if this contact already exists to avoid duplicates
        const isDuplicate = contacts.some(contact => contact.id === newContact.id);
        
        if (!isDuplicate) {
          console.log("Adding new contact to contacts list");
          setContacts(prev => [newContact, ...prev]);
        }
        
        // Select this contact
        setSelectedChat(newContact);
      }
    };
    
    // Run when dependencies change
    handleUrlUserSelection();
  }, [id, contacts, singleUser, singleUserLoading, user?._id, isLoadingContacts]);

  // Initialize socket connection - RUNS ONCE when user is available
  useEffect(() => {
    if (typeof window === "undefined" || !user?._id) return;

    let isMounted = true;
    let socketCleanup = null;

    const initializeSocket = async () => {
      try {
        // Dynamically import socket.io-client to avoid SSR issues
        const socketIOClient = (await import("socket.io-client")).default;
        
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
        
        const socket = socketIOClient(socketUrl, {
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 1000,
          auth: {
            userId: user._id,
            userName: user.name || user.userName,
          },
        });

        if (!isMounted) {
          socket.disconnect();
          return;
        }

        socketRef.current = socket;
        socketCleanup = socket;

        // Connection events
        socket.on("connect", () => {
          if (!isMounted) return;
          console.log("✅ Connected to socket server:", socket.id);
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
          if (!isMounted) return;
          console.error("❌ Connection error:", error.message);
          setIsConnected(false);
          setConnectionStatus("Connection failed");

          setTimeout(() => {
            if (socket && !socket.connected && isMounted) {
              socket.connect();
            }
          }, 2000);
        });

        socket.on("disconnect", (reason) => {
          if (!isMounted) return;
          console.log("⚠️ Disconnected:", reason);
          setIsConnected(false);
          setConnectionStatus("Disconnected");
        });

        // Message events
        socket.on("new-message", (message) => {
          if (!isMounted) return;
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

          // Add message to chat if it's the selected chat
          if (
            selectedChat &&
            (message.senderId === selectedChat.id ||
              message.receiverId === selectedChat.id)
          ) {
            setMessages((prev) => [
              ...prev,
              {
                ...message,
                sender: message.senderId === user._id ? "me" : "other",
                status: "delivered",
              },
            ]);

            // Mark as read
            socket.emit("mark-as-read", {
              messageIds: [message.id],
              userId: user._id,
            });
          }
        });

        socket.on("message-sent", (message) => {
          if (!isMounted) return;
          console.log("✅ Message sent confirmation");
          setMessages((prev) =>
            prev.map((msg) =>
              msg.tempId === message.tempId
                ? { ...msg, id: message.id, status: message.status }
                : msg
            )
          );
        });

        socket.on("chat-history", (history) => {
          if (!isMounted) return;
          console.log("📜 Chat history loaded:", history?.length || 0, "messages");
          setMessages(history || []);
          setIsLoading(false);
        });

        socket.on("user-status-changed", ({ userId, status }) => {
          if (!isMounted) return;
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
          if (!isMounted) return;
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
          if (!isMounted) return;
          setTypingUsers((prev) => ({ ...prev, [userId]: isTyping }));
        });

        socket.on("message-error", (error) => {
          if (!isMounted) return;
          console.error("❌ Message error:", error);
          // Update message status to failed
          setMessages((prev) =>
            prev.map((msg) =>
              msg.status === "sending" ? { ...msg, status: "failed" } : msg
            )
          );
        });

      } catch (error) {
        console.error("Socket initialization error:", error);
      }
    };

    initializeSocket();

    // Cleanup
    return () => {
      isMounted = false;
      if (socketCleanup) {
        socketCleanup.emit("user-offline", user._id);
        socketCleanup.disconnect();
      }
    };
  }, [user?._id, selectedChat?.id]); // Only depend on user._id and selectedChat.id

  // Load chat history when a chat is selected
  useEffect(() => {
    if (selectedChat && socketRef.current?.connected && user?._id) {
      setMessages([]);
      setIsLoading(true);
      socketRef.current.emit("get-chat-history", {
        userId1: user._id,
        userId2: selectedChat.id,
        limit: 50,
      });
    }
  }, [selectedChat?.id, user?._id]); // Only depend on selectedChat.id and user._id

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter contacts based on search query - Memoized to prevent unnecessary re-renders
  const filteredContacts = React.useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.job && contact.job.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [contacts, searchQuery]);

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

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case "sending":
        return <FiClock className="text-gray-400 text-xs animate-pulse" />;
      case "sent":
        return <FiCheck className="text-gray-400 text-xs" />;
      case "delivered":
        return <FiCheckCircle className="text-gray-400 text-xs" />;
      case "read":
        return <FiCheckCircle className="text-blue-500 text-xs" />;
      case "failed":
        return <FiClock className="text-red-500 text-xs" />;
      default:
        return <FiClock className="text-gray-400 text-xs" />;
    }
  };

  const handleSendMessage = useCallback(() => {
    if (
      !newMessage.trim() ||
      !selectedChat ||
      !socketRef.current?.connected ||
      !user
    )
      return;

    const tempId = Date.now().toString();
    const messageData = {
      senderId: user._id,
      receiverId: selectedChat.id,
      senderName: user.name || user.userName,
      receiverName: selectedChat.name,
      message: newMessage.trim(),
      tempId,
    };

    // Add message to local state immediately
    const newMsg = {
      id: tempId,
      tempId,
      text: newMessage.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: new Date(),
      status: "sending",
      senderName: user.name || user.userName,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    // Update contact's last message
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === selectedChat.id
          ? {
              ...contact,
              message: newMessage.trim(),
              time: "Just now",
              unread: 0,
            }
          : contact
      )
    );

    // Send via socket
    socketRef.current.emit("send-message", messageData);

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [newMessage, selectedChat, user]);

  const handleTyping = useCallback(() => {
    if (!selectedChat || !socketRef.current?.connected || !user) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing started
    socketRef.current.emit("typing", {
      userId: user._id,
      receiverId: selectedChat.id,
      isTyping: true,
    });

    // Set timeout to stop typing indicator after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", {
        userId: user._id,
        receiverId: selectedChat.id,
        isTyping: false,
      });
    }, 2000);
  }, [selectedChat, user]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleReconnect = useCallback(() => {
    if (socketRef.current && socketRef.current.disconnected) {
      socketRef.current.connect();
    }
  }, []);

  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return "Just now";
    try {
      const date = new Date(timestamp);
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
  }, []);

  // JSX remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                  key={contact.id}
                  onClick={() => setSelectedChat(contact)}
                  className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-100 ${
                    selectedChat?.id === contact.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
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
                        {contact.role === "employer" && (
                          <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                            Employer
                          </span>
                        )}
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

                    {/* FIXED: Ensure job is always a string */}
                    <p className="text-xs text-gray-500 truncate mb-1">
                      {typeof contact.job === 'string' ? contact.job : "No job specified"}
                    </p>
                    
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

        {/* Chat Area */}
        {isLoadingUserFromUrl ? (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FiLoader className="text-gray-400 text-2xl animate-spin mb-2" />
              <p className="text-sm text-gray-500">Loading chat...</p>
            </div>
          </div>
        ) : selectedChat ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/user1.jpeg";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIcon(selectedChat.id)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {selectedChat.name}
                    {selectedChat.role === "employer" && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Employer
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      {typeof selectedChat.job === 'string' ? selectedChat.job : "No job specified"}
                    </p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-400">
                      {onlineUsers.has(selectedChat.id)
                        ? "Online"
                        : `Last seen ${selectedChat.lastSeen}`}
                    </p>
                    {typingUsers[selectedChat.id] && (
                      <span className="text-xs text-blue-500 italic animate-pulse">
                        Typing...
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Voice call"
                >
                  <FiPhone className="text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Video call"
                >
                  <FiVideo className="text-gray-600" />
                </button>
                {selectedChat.role === "employer" && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                    View Project
                  </button>
                )}
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="More options"
                >
                  <FiMoreVertical className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <FiMessageSquare className="text-gray-300 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No messages yet
                    </h3>
                    <p className="text-gray-500">
                      Start a conversation with {selectedChat.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id || msg.tempId}
                      className={`flex ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          msg.sender === "me" ? "ml-12" : "mr-12"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.sender === "me"
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">
                            {msg.text}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            msg.sender === "me"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <span className="text-xs text-gray-500">
                            {msg.time || formatTime(msg.timestamp)}
                          </span>
                          {msg.sender === "me" && (
                            <div className="flex items-center">
                              {getMessageStatusIcon(msg.status)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex items-end gap-3">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Attach file"
                >
                  <FiPaperclip className="text-gray-600" />
                </button>

                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isConnected
                        ? `Message ${selectedChat.name}...`
                        : "Connecting to chat server..."
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                    rows="1"
                    disabled={!isConnected || !user}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Emoji"
                  >
                    <FiSmile className="text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || !isConnected || !user}
                  className={`p-3 rounded-xl transition-colors ${
                    newMessage.trim() && isConnected && user
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  title="Send message"
                >
                  <FiSend size={18} />
                </button>
              </div>
              {!isConnected && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                  <p className="text-xs text-red-500">
                    Connecting to chat server...
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FiMessageSquare className="text-gray-300 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                {contacts.length > 0
                  ? "Choose a contact from the list"
                  : "No contacts available. Start networking!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}