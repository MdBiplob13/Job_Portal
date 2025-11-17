"use client";
import React, { useState } from "react";
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiMoreVertical
} from "react-icons/fi";

const transactions = [
  {
    id: 1,
    title: "Received for Potable Water and Sewage Disposal",
    from: "Samuel Morgan",
    amount: 151000,
    date: "Dec 10, 2024",
    time: "2:30 PM",
    type: "income",
    status: "completed",
    category: "Project Payment",
    projectId: "PRJ-001",
    method: "Bank Transfer",
    description: "Final payment for completed water disposal project"
  },
  {
    id: 2,
    title: "Received for E-Waste Recycling Partnership",
    from: "Emma Richards",
    amount: 22300,
    date: "Dec 9, 2024",
    time: "11:45 AM",
    type: "income",
    status: "completed",
    category: "Project Payment",
    projectId: "PRJ-002",
    method: "PayPal",
    description: "Milestone payment for recycling partnership"
  },
  {
    id: 3,
    title: "Purchased 100 Bids",
    from: "BidPole Package",
    amount: -999,
    date: "Dec 8, 2024",
    time: "9:15 AM",
    type: "expense",
    status: "completed",
    category: "Service Fee",
    projectId: "SVC-001",
    method: "Credit Card",
    description: "Premium bid package for job applications"
  },
  {
    id: 4,
    title: "Profile Boost for a month",
    from: "Goldman Package",
    amount: -299,
    date: "Dec 7, 2024",
    time: "3:20 PM",
    type: "expense",
    status: "completed",
    category: "Marketing",
    projectId: "MKT-001",
    method: "Credit Card",
    description: "Monthly profile visibility boost"
  },
  {
    id: 5,
    title: "Received for Dock Reconstruction",
    from: "Oliver Jones",
    amount: 45000,
    date: "Dec 6, 2024",
    time: "4:10 PM",
    type: "income",
    status: "completed",
    category: "Project Payment",
    projectId: "PRJ-003",
    method: "Bank Transfer",
    description: "Full payment for dock reconstruction project"
  },
  {
    id: 6,
    title: "Office Building Renovation - Milestone 1",
    from: "Michael Chen",
    amount: 17500,
    date: "Dec 5, 2024",
    time: "1:30 PM",
    type: "income",
    status: "pending",
    category: "Project Payment",
    projectId: "PRJ-004",
    method: "Bank Transfer",
    description: "First milestone payment for office renovation"
  },
  {
    id: 7,
    title: "Platform Service Fee",
    from: "JobPortal Commission",
    amount: -1500,
    date: "Dec 4, 2024",
    time: "10:00 AM",
    type: "expense",
    status: "completed",
    category: "Platform Fee",
    projectId: "FEE-001",
    method: "Auto Deduction",
    description: "5% platform commission on project payments"
  }
];

const EmployerTransaction = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0));

  const netEarnings = totalIncome - totalExpenses;

  const getStatusIcon = (type, status) => {
    if (type === "income") {
      return status === "completed" ? 
        <FiCheckCircle className="text-green-500 text-xl" /> : 
        <FiClock className="text-yellow-500 text-xl" />;
    } else {
      return <FiXCircle className="text-red-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Bank Transfer":
        return <FiCreditCard className="text-blue-500" />;
      case "PayPal":
        return <FiCreditCard className="text-primary" />;
      case "Credit Card":
        return <FiCreditCard className="text-gray-600" />;
      default:
        return <FiDollarSign className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
            <p className="text-gray-600 mt-2">
              Track all your financial activities and project payments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiDownload className="text-sm" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-primary transition-colors">
              <FiCalendar className="text-sm" />
              Filter by Date
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiTrendingUp className="text-primary text-xl" />
              </div>
              <span className="text-sm text-primary font-semibold">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">${totalIncome.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Income</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiTrendingDown className="text-red-600 text-xl" />
              </div>
              <span className="text-sm text-red-600 font-semibold">+8.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">${totalExpenses.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Expenses</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiDollarSign className="text-primary text-xl" />
              </div>
              <span className="text-sm text-primary font-semibold">+15.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">${netEarnings.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Net Earnings</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search transactions, clients, or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2">
                    {getStatusIcon(transaction.type, transaction.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-primary transition-colors">
                        {transaction.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>From: <span className="font-medium text-gray-800">{transaction.from}</span></span>
                      <span>•</span>
                      <span>Project: <span className="font-medium text-gray-800">{transaction.projectId}</span></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {getMethodIcon(transaction.method)}
                        {transaction.method}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-3">{transaction.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="text-xs" />
                        {transaction.date} at {transaction.time}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-gray-600">{transaction.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      transaction.type === "income" ? "text-primary" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.type === "income" ? "Received" : "Paid"}
                    </div>
                  </div>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <FiEye className="text-gray-600" />
                  </button>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <FiMoreVertical className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No transactions found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerTransaction;
