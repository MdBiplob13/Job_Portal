"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiSend } from "react-icons/fi";

const messagesData = [
  {
    id: 1,
    name: "Christina Delord",
    avatar: "/user1.jpeg",
    job: "Potable Water and Sewage Disposal",
    message:
      "Lorem Ipsum is simply dummy text of the printing type industry...",
    time: "10 min ago",
  },
  {
    id: 2,
    name: "Oliver Jones",
    avatar: "/user2.jpeg",
    job: "Dock Reconstruction",
    message:
      "Lorem Ipsum is simply dummy text of the printing type industry...",
    time: "10 min ago",
  },
  {
    id: 3,
    name: "Samuel Morgan",
    avatar: "/user3.jpeg",
    job: "E-Waste Recycling Partnership",
    message:
      "Lorem Ipsum is simply dummy text of the printing type industry...",
    time: "10 min ago",
  },
];

export default function ProviderMessage() {
  const [selectedChat, setSelectedChat] = useState(messagesData[0]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sampleChat = [
    {
      id: 1,
      text: "Lorem Ipsum is simply dummy text of the printing type industry...",
      sender: "other",
    },
    {
      id: 2,
      text: "Lorem Ipsum is simply dummy text of the printing type industry...",
      sender: "me",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sampleChat]);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-2">MESSAGES</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {messagesData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedChat(item)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-blue-50 transition-all ${
                selectedChat.id === item.id ? "bg-blue-50" : "bg-white"
              }`}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{item.job}</p>
                <p className="text-xs text-gray-400 truncate mt-1">
                  {item.message}
                </p>
              </div>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {selectedChat.name}
              </h3>
              <p className="text-xs text-gray-500">{selectedChat.job}</p>
            </div>
          </div>
          <button className="text-sm text-blue-600 font-medium">
            View Project Details
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {sampleChat.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 text-sm ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-700 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            />
            <button
              className={`p-3 rounded-full ${
                newMessage.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
