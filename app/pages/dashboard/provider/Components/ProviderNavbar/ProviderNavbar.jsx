"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiPlus,
  FiBell,
  FiCheck,
  FiTrash2,
  FiMail,
  FiMailOpen,
} from "react-icons/fi";

const ProviderNavbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Mock notifications data
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "New Bid Received",
        message: "John Smith placed a bid on your 'Office Renovation' project",
        time: "5 min ago",
        isRead: false,
        type: "bid",
      },
      {
        id: 2,
        title: "Project Awarded",
        message:
          "You've been selected for the 'Warehouse Construction' project",
        time: "1 hour ago",
        isRead: false,
        type: "award",
      },
      {
        id: 3,
        title: "Message Received",
        message: "New message from Sarah Johnson regarding project timeline",
        time: "2 hours ago",
        isRead: true,
        type: "message",
      },
      {
        id: 4,
        title: "Payment Received",
        message:
          "Payment of $2,500 has been processed for 'Retail Store Fitout'",
        time: "1 day ago",
        isRead: true,
        type: "payment",
      },
      {
        id: 5,
        title: "Project Completed",
        message: "Client has marked 'Office Renovation' as completed",
        time: "2 days ago",
        isRead: true,
        type: "completion",
      },
    ]);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "bid":
        return "💰";
      case "award":
        return "🏆";
      case "message":
        return "💬";
      case "payment":
        return "💳";
      case "completion":
        return "✅";
      default:
        return "🔔";
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-xl font-bold text-blue-600">BidPole</div>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Post a Job & Credit Points */}
            <div className="flex items-center gap-3">
              <div className="text-green-600 font-bold mr-5">
                5 CREDIT POINTS
              </div>
            </div>

            <Link
              href="/pages/dashboard/customer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-blue-600 bg-white text-blue-600 font-medium hover:bg-blue-50 transition"
            >
              <span className="text-sm">Switch to Freelancer</span>
            </Link>

            {/* Notification Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <FiBell size={25} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {unreadCount} unread
                        </span>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                        >
                          Mark all read
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="text-2xl">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <h4
                                className={`font-medium ${
                                  !notification.isRead
                                    ? "text-gray-800"
                                    : "text-gray-600"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              <button
                                onClick={() =>
                                  removeNotification(notification.id)
                                }
                                className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 leading-snug">
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex cursor-pointer items-center gap-1"
                                >
                                  <FiCheck size={12} />
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      href="/pages/dashboard/provider/providerNotification"
                      onClick={() => setIsNotificationOpen(false)}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="/user2.jpg"
                  alt="User avatar"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProviderNavbar;
