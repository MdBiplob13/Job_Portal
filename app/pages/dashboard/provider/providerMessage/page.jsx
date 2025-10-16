"use client";
import React, { useState, useRef, useEffect } from "react";
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
  FiTrash2
} from "react-icons/fi";

const messagesData = [
  {
    id: 1,
    name: "Christina Delord",
    avatar: "/user1.jpeg",
    job: "Potable Water and Sewage Disposal",
    message: "Hi! I have some questions about the project timeline. Can we discuss the milestones?",
    time: "10 min ago",
    unread: 2,
    status: "online",
    lastSeen: "2 min ago",
    rating: 4.8,
    projectValue: "$15,000"
  },
  {
    id: 2,
    name: "Oliver Jones",
    avatar: "/user1.jpeg",
    job: "Dock Reconstruction",
    message: "The materials have been delivered. Ready to start work tomorrow.",
    time: "1 hour ago",
    unread: 0,
    status: "offline",
    lastSeen: "30 min ago",
    rating: 4.9,
    projectValue: "$45,000"
  },
  {
    id: 3,
    name: "Samuel Morgan",
    avatar: "/user1.jpeg",
    job: "E-Waste Recycling Partnership",
    message: "Thanks for the quick response. Looking forward to working with you.",
    time: "2 hours ago",
    unread: 1,
    status: "away",
    lastSeen: "1 hour ago",
    rating: 4.7,
    projectValue: "$22,300"
  },
  {
    id: 4,
    name: "Emma Richards",
    avatar: "/user1.jpeg",
    job: "Office Building Renovation",
    message: "Can you send me the updated project proposal?",
    time: "3 hours ago",
    unread: 0,
    status: "online",
    lastSeen: "5 min ago",
    rating: 4.6,
    projectValue: "$35,000"
  },
  {
    id: 5,
    name: "Michael Chen",
    avatar: "/user1.jpeg",
    job: "Park Landscaping Project",
    message: "The weather looks good for the next few days. Should we proceed?",
    time: "1 day ago",
    unread: 0,
    status: "offline",
    lastSeen: "2 hours ago",
    rating: 4.5,
    projectValue: "$12,000"
  }
];

const sampleChat = [
  {
    id: 1,
    text: "Hi! I have some questions about the project timeline. Can we discuss the milestones?",
    sender: "other",
    time: "10:30 AM",
    status: "read"
  },
  {
    id: 2,
    text: "Of course! I'd be happy to discuss the project timeline with you. The project is divided into 4 main milestones:",
    sender: "me",
    time: "10:32 AM",
    status: "sent"
  },
  {
    id: 3,
    text: "1. Site preparation and material delivery (Week 1-2)\n2. Foundation work and initial construction (Week 3-5)\n3. Main construction phase (Week 6-8)\n4. Final inspection and handover (Week 9-10)",
    sender: "me",
    time: "10:33 AM",
    status: "sent"
  },
  {
    id: 4,
    text: "That sounds perfect! What about the budget allocation for each milestone?",
    sender: "other",
    time: "10:35 AM",
    status: "read"
  },
  {
    id: 5,
    text: "Great question! Here's the budget breakdown:\n• Site prep: $3,000\n• Foundation: $5,000\n• Construction: $6,000\n• Final phase: $1,000\n\nTotal: $15,000 as agreed",
    sender: "me",
    time: "10:37 AM",
    status: "sent"
  }
];

export default function ProviderMessage() {
  const [selectedChat, setSelectedChat] = useState(messagesData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const filteredMessages = messagesData.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sampleChat]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "online":
        return <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>;
      case "away":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>;
      case "offline":
        return <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>;
      default:
        return null;
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <FiCheck className="text-gray-400 text-xs" />;
      case "delivered":
        return <FiCheckCircle className="text-gray-400 text-xs" />;
      case "read":
        return <FiCheckCircle className="text-blue-500 text-xs" />;
      default:
        return <FiClock className="text-gray-400 text-xs" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiArchive className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
              />
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedChat(item)}
                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-100 ${
                  selectedChat.id === item.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{item.time}</span>
                      {item.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 truncate mb-1">{item.job}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {item.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400 text-xs" />
                      <span className="text-xs text-gray-500">{item.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-green-600">
                      {item.projectValue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1">
                  {getStatusIcon(selectedChat.status)}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {selectedChat.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">{selectedChat.job}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-400">
                    {selectedChat.status === "online" ? "Online" : `Last seen ${selectedChat.lastSeen}`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                View Project
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiMoreVertical className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-4">
              {sampleChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-md ${msg.sender === "me" ? "ml-12" : "mr-12"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <span className="text-xs text-gray-500">{msg.time}</span>
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
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex items-end gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiPaperclip className="text-gray-600" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <FiSmile className="text-gray-600" />
                </button>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-3 rounded-xl transition-colors ${
                  newMessage.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
