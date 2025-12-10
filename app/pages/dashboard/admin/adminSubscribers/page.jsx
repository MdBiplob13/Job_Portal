// app/pages/dashboard/admin/subscribers/page.jsx (or your admin route)
"use client";

import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiCreditCard,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiRefreshCw,
  FiEye,
  FiDownload,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiTrendingDown
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// Mock data - Replace with real API data
const MOCK_SUBSCRIBERS = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    company: "TechCorp Inc.",
    subscriptionPlan: "Premium",
    creditsRemaining: 1500,
    totalCredits: 2000,
    subscriptionStart: "2024-01-15",
    subscriptionEnd: "2024-12-15",
    status: "active",
    paymentMethod: "Credit Card",
    lastActive: "2024-10-28",
    totalSpent: 1200,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "DesignStudio",
    subscriptionPlan: "Enterprise",
    creditsRemaining: 5000,
    totalCredits: 10000,
    subscriptionStart: "2024-02-01",
    subscriptionEnd: "2025-02-01",
    status: "active",
    paymentMethod: "Bank Transfer",
    lastActive: "2024-10-29",
    totalSpent: 5000,
  },
  {
    id: 3,
    name: "Robert Chen",
    email: "robert.chen@example.com",
    company: "Marketing Pro",
    subscriptionPlan: "Basic",
    creditsRemaining: 200,
    totalCredits: 500,
    subscriptionStart: "2024-03-10",
    subscriptionEnd: "2024-12-10",
    status: "expired",
    paymentMethod: "PayPal",
    lastActive: "2024-10-25",
    totalSpent: 300,
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.g@example.com",
    company: "Freelance",
    subscriptionPlan: "Premium",
    creditsRemaining: 3000,
    totalCredits: 5000,
    subscriptionStart: "2024-04-05",
    subscriptionEnd: "2025-04-05",
    status: "active",
    paymentMethod: "Credit Card",
    lastActive: "2024-10-30",
    totalSpent: 2000,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    company: "StartUp XYZ",
    subscriptionPlan: "Enterprise",
    creditsRemaining: 12000,
    totalCredits: 20000,
    subscriptionStart: "2024-01-20",
    subscriptionEnd: "2025-01-20",
    status: "active",
    paymentMethod: "Bank Transfer",
    lastActive: "2024-10-29",
    totalSpent: 8000,
  },
  {
    id: 6,
    name: "Lisa Wong",
    email: "lisa.wong@example.com",
    company: "Consulting Co.",
    subscriptionPlan: "Basic",
    creditsRemaining: 50,
    totalCredits: 100,
    subscriptionStart: "2024-08-15",
    subscriptionEnd: "2024-11-15",
    status: "expiring",
    paymentMethod: "Credit Card",
    lastActive: "2024-10-28",
    totalSpent: 50,
  },
  {
    id: 7,
    name: "Michael Brown",
    email: "michael.b@example.com",
    company: "Agency Ltd.",
    subscriptionPlan: "Premium",
    creditsRemaining: 800,
    totalCredits: 1500,
    subscriptionStart: "2024-06-01",
    subscriptionEnd: "2024-12-01",
    status: "active",
    paymentMethod: "PayPal",
    lastActive: "2024-10-30",
    totalSpent: 700,
  },
  {
    id: 8,
    name: "Emma Davis",
    email: "emma.d@example.com",
    company: "Studio 24",
    subscriptionPlan: "Enterprise",
    creditsRemaining: 7000,
    totalCredits: 15000,
    subscriptionStart: "2024-05-10",
    subscriptionEnd: "2025-05-10",
    status: "active",
    paymentMethod: "Bank Transfer",
    lastActive: "2024-10-29",
    totalSpent: 8000,
  },
];

const SUBSCRIPTION_PLANS = ["All Plans", "Basic", "Premium", "Enterprise"];
const STATUS_OPTIONS = ["All Status", "active", "expired", "expiring"];

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState(MOCK_SUBSCRIBERS);
  const [filteredSubscribers, setFilteredSubscribers] = useState(MOCK_SUBSCRIBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate stats
  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.status === "active").length,
    expiring: subscribers.filter(s => s.status === "expiring").length,
    expired: subscribers.filter(s => s.status === "expired").length,
    totalCredits: subscribers.reduce((sum, s) => sum + s.creditsRemaining, 0),
    avgCredits: Math.round(subscribers.reduce((sum, s) => sum + s.creditsRemaining, 0) / subscribers.length),
    totalRevenue: subscribers.reduce((sum, s) => sum + s.totalSpent, 0),
  };

  // Filter subscribers
  useEffect(() => {
    let filtered = subscribers;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        subscriber =>
          subscriber.name.toLowerCase().includes(query) ||
          subscriber.email.toLowerCase().includes(query) ||
          subscriber.company.toLowerCase().includes(query)
      );
    }

    // Plan filter
    if (selectedPlan !== "All Plans") {
      filtered = filtered.filter(subscriber => subscriber.subscriptionPlan === selectedPlan);
    }

    // Status filter
    if (selectedStatus !== "All Status") {
      filtered = filtered.filter(subscriber => subscriber.status === selectedStatus);
    }

    setFilteredSubscribers(filtered);
  }, [searchQuery, selectedPlan, selectedStatus, subscribers]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (id) => {
    setSelectedSubscribers(prev =>
      prev.includes(id)
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // In real app, fetch from API
      toast.success("Subscribers list refreshed");
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    toast.success("Exporting subscriber data...");
    // Add export logic here
  };

  const handleAddCredits = (subscriberId, amount) => {
    const newSubscribers = subscribers.map(sub =>
      sub.id === subscriberId
        ? { ...sub, creditsRemaining: sub.creditsRemaining + amount }
        : sub
    );
    setSubscribers(newSubscribers);
    toast.success(`Added ${amount} credits to subscriber`);
  };

  const handleUpdateStatus = (subscriberId, newStatus) => {
    const newSubscribers = subscribers.map(sub =>
      sub.id === subscriberId
        ? { ...sub, status: newStatus }
        : sub
    );
    setSubscribers(newSubscribers);
    toast.success("Status updated successfully");
  };

  const handleDeleteSubscriber = (subscriberId) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      const newSubscribers = subscribers.filter(sub => sub.id !== subscriberId);
      setSubscribers(newSubscribers);
      toast.success("Subscriber deleted successfully");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      expired: "bg-red-100 text-red-800 border-red-200",
      expiring: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPlanBadge = (plan) => {
    const styles = {
      Basic: "bg-blue-100 text-blue-800",
      Premium: "bg-purple-100 text-purple-800",
      Enterprise: "bg-indigo-100 text-indigo-800",
    };
    return styles[plan] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Subscribers Management</h1>
            <p className="text-gray-600 mt-2">Manage all subscribers and their credit balances</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiDownload className="text-lg" />
              Export CSV
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUsers className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Subscribers</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheck className="text-green-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalCredits.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCreditCard className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Credits</p>
                <p className="text-2xl font-bold text-gray-800">{stats.avgCredits}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiTrendingUp className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.expiring}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiCalendar className="text-orange-500 text-xl" />
              </div>
            </div>
          </div>

          
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {SUBSCRIPTION_PLANS.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsFilterOpen(true)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <FiFilter className="text-lg" />
                More Filters
              </button>
            </div>
          </div>

          {/* Selected count and actions */}
          {selectedSubscribers.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <p className="text-blue-700 font-medium">
                {selectedSubscribers.length} subscriber(s) selected
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddCredits(selectedSubscribers[0], 100)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Add Credits
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedSubscribers[0], "active")}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Activate
                </button>
                <button
                  onClick={() => setSelectedSubscribers([])}
                  className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">All Subscribers</h2>
            <span className="text-sm text-gray-500">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={filteredSubscribers.length > 0 && selectedSubscribers.length === filteredSubscribers.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                  />
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Period
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center">
                    <div className="text-gray-400 text-4xl mb-4">📭</div>
                    <p className="text-gray-500">No subscribers found matching your criteria</p>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber) => {
                  const daysLeft = calculateDaysLeft(subscriber.subscriptionEnd);
                  return (
                    <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onChange={() => handleSelectSubscriber(subscriber.id)}
                          className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{subscriber.name}</p>
                          <p className="text-sm text-gray-500">{subscriber.email}</p>
                          <p className="text-xs text-gray-400">{subscriber.company}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanBadge(subscriber.subscriptionPlan)}`}>
                          {subscriber.subscriptionPlan}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {subscriber.creditsRemaining.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">
                              / {subscriber.totalCredits.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{
                                width: `${(subscriber.creditsRemaining / subscriber.totalCredits) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-900">{formatDate(subscriber.subscriptionStart)}</p>
                          <p className="text-gray-500">{formatDate(subscriber.subscriptionEnd)}</p>
                          {daysLeft <= 30 && daysLeft > 0 && (
                            <p className="text-xs text-yellow-600 mt-1">
                              {daysLeft} days left
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(subscriber.status)}`}>
                            {subscriber.status}
                          </span>
                          {daysLeft <= 7 && daysLeft > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              ⏰ Soon
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-500">
                          {formatDate(subscriber.lastActive)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddCredits(subscriber.id, 100)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Add Credits"
                          >
                            <FiCreditCard className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(subscriber.id, subscriber.status === "active" ? "expired" : "active")}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Toggle Status"
                          >
                            <FiCheck className="text-lg" />
                          </button>
                          <button
                            onClick={() => {}}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FiEye className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page 1 of 1 • {filteredSubscribers.length} items
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredSubscribers.length === 0 && subscribers.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedPlan("All Plans");
              setSelectedStatus("All Status");
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}