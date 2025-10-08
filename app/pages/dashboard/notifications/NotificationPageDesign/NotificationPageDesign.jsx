// app/pages/dashboard/notifications/NotificationPageDesign/NotificationPageDesign.jsx
"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiCheck, FiCheckCircle, FiMail, FiFilter, FiX, FiEye, FiEyeOff } from "react-icons/fi";

const NotificationsPageDesign = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: "New Bid Received",
        message: "John Smith placed a bid of $15,000 on your 'Office Renovation' project",
        time: "5 min ago",
        timestamp: new Date(),
        isRead: false,
        type: "bid"
      },
      {
        id: 2,
        title: "Project Awarded",
        message: "You've been selected for the 'Warehouse Construction' project. Contract details are available.",
        time: "1 hour ago",
        timestamp: new Date(Date.now() - 3600000),
        isRead: false,
        type: "award"
      },
      {
        id: 3,
        title: "Message Received",
        message: "New message from Sarah Johnson: 'Can we discuss the project timeline tomorrow?'",
        time: "2 hours ago",
        timestamp: new Date(Date.now() - 7200000),
        isRead: true,
        type: "message"
      },
      {
        id: 4,
        title: "Payment Received",
        message: "Payment of $2,500 has been processed for 'Retail Store Fitout'. Funds will be available in 2-3 business days.",
        time: "1 day ago",
        timestamp: new Date(Date.now() - 86400000),
        isRead: true,
        type: "payment"
      },
      {
        id: 5,
        title: "Project Completed",
        message: "Client has marked 'Office Renovation' as completed and left a 5-star review.",
        time: "2 days ago",
        timestamp: new Date(Date.now() - 172800000),
        isRead: true,
        type: "completion"
      },
      {
        id: 6,
        title: "Bid Expired",
        message: "Your bid on 'Hotel Renovation Project' has expired. Consider updating your bid.",
        time: "3 days ago",
        timestamp: new Date(Date.now() - 259200000),
        isRead: false,
        type: "bid"
      },
      {
        id: 7,
        title: "New Project Match",
        message: "New project 'Shopping Mall Construction' matches your skills and experience.",
        time: "1 week ago",
        timestamp: new Date(Date.now() - 604800000),
        isRead: true,
        type: "match"
      },
      {
        id: 8,
        title: "Document Approved",
        message: "Your submitted safety plan for 'Bridge Construction' has been approved.",
        time: "2 weeks ago",
        timestamp: new Date(Date.now() - 1209600000),
        isRead: true,
        type: "document"
      }
    ];
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  // Filter notifications
  useEffect(() => {
    let filtered = notifications;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(notif =>
        statusFilter === "read" ? notif.isRead : !notif.isRead
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(notif => notif.type === typeFilter);
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      let startDate;
      switch (dateFilter) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = null;
      }
      if (startDate) {
        filtered = filtered.filter(notif => notif.timestamp >= startDate);
      }
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchQuery, statusFilter, typeFilter, dateFilter]);

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(notif => notif.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  const markAsRead = (ids) => {
    setNotifications(notifications.map(notif =>
      ids.includes(notif.id) ? { ...notif, isRead: true } : notif
    ));
    setSelectedNotifications(prev => prev.filter(id => !ids.includes(id)));
  };

  const markAsUnread = (ids) => {
    setNotifications(notifications.map(notif =>
      ids.includes(notif.id) ? { ...notif, isRead: false } : notif
    ));
    setSelectedNotifications(prev => prev.filter(id => !ids.includes(id)));
  };

  const removeNotifications = (ids) => {
    setNotifications(notifications.filter(notif => !ids.includes(notif.id)));
    setSelectedNotifications(prev => prev.filter(id => !ids.includes(id)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    setSelectedNotifications([]);
  };

  const markAllAsUnread = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: false })));
    setSelectedNotifications([]);
  };

  const removeAll = () => {
    setNotifications([]);
    setSelectedNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'bid': return '💰';
      case 'award': return '🏆';
      case 'message': return '💬';
      case 'payment': return '💳';
      case 'completion': return '✅';
      case 'match': return '🎯';
      case 'document': return '📄';
      default: return '🔔';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'bid': return 'Bid';
      case 'award': return 'Award';
      case 'message': return 'Message';
      case 'payment': return 'Payment';
      case 'completion': return 'Completion';
      case 'match': return 'Project Match';
      case 'document': return 'Document';
      default: return 'Notification';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage and review all your notifications</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-3">
              {selectedNotifications.length > 0 ? (
                <>
                  <button
                    onClick={() => markAsRead(selectedNotifications)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <FiCheck size={16} />
                    Mark as Read
                  </button>
                  <button
                    onClick={() => markAsUnread(selectedNotifications)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                  >
                    <FiEyeOff size={16} />
                    Mark as Unread
                  </button>
                  <button
                    onClick={() => removeNotifications(selectedNotifications)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <FiTrash2 size={16} />
                    Remove
                  </button>
                  <button
                    onClick={clearSelection}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    <FiX size={16} />
                    Clear Selection
                  </button>
                  <span className="text-sm text-gray-600 flex items-center">
                    {selectedNotifications.length} selected
                  </span>
                </>
              ) : (
                <>
                  <button
                    onClick={selectAll}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <FiCheckCircle size={16} />
                    Read All
                  </button>
                  <button
                    onClick={markAllAsUnread}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                  >
                    <FiEyeOff size={16} />
                    Unread All
                  </button>
                  <button
                    onClick={removeAll}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <FiTrash2 size={16} />
                    Remove All
                  </button>
                </>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                Filters
              </h3>

              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="bid">Bids</option>
                  <option value="award">Awards</option>
                  <option value="message">Messages</option>
                  <option value="payment">Payments</option>
                  <option value="completion">Completions</option>
                  <option value="match">Project Matches</option>
                  <option value="document">Documents</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* List Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {filteredNotifications.length} notifications found
                  </span>
                  <span className="text-sm text-gray-600">
                    {notifications.filter(n => !n.isRead).length} unread
                  </span>
                </div>
              </div>

              {/* Notifications */}
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">🔔</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelectNotification(notification.id)}
                          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />

                        {/* Icon */}
                        <div className="text-3xl">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className={`font-semibold ${
                                !notification.isRead ? 'text-gray-800' : 'text-gray-600'
                              }`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {getTypeLabel(notification.type)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                {notification.time}
                              </span>
                              <div className="flex gap-1">
                                {!notification.isRead ? (
                                  <button
                                    onClick={() => markAsRead([notification.id])}
                                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                    title="Mark as read"
                                  >
                                    <FiEye size={16} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => markAsUnread([notification.id])}
                                    className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                                    title="Mark as unread"
                                  >
                                    <FiEyeOff size={16} />
                                  </button>
                                )}
                                <button
                                  onClick={() => removeNotifications([notification.id])}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                  title="Remove notification"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-2">
                            {notification.message}
                          </p>
                          {!notification.isRead && (
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPageDesign;