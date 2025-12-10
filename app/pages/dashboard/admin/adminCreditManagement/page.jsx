// app/pages/dashboard/admin/credits/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FiCreditCard,
  FiDollarSign,
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiTrendingUp,
  FiPackage,
  FiCalendar
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// Mock credit settings - In real app, fetch from API
const initialCreditSettings = {
  jobPostCost: 50,
  jobApplyCost: 5,
  bidSubmitCost: 10,
  profileVerificationCost: 100,
  featuredJobCost: 200,
  urgentJobCost: 100,
  resumeViewCost: 3,
  connectionRequestCost: 2,
  messageCost: 1,
  creditPackageOptions: [
    { id: 1, credits: 100, price: 10, discount: 0 },
    { id: 2, credits: 500, price: 45, discount: 10 },
    { id: 3, credits: 1000, price: 80, discount: 20 },
    { id: 4, credits: 5000, price: 350, discount: 30 }
  ],
  creditExpiryDays: 365,
  minimumCreditsForJobPost: 50,
  freeCreditsOnSignup: 10,
  referralCredits: 25
};

const transactionHistory = [
  { id: 1, user: "John Smith", action: "Job Post", credits: 50, date: "2024-10-28", type: "debit" },
  { id: 2, user: "Sarah Johnson", action: "Job Apply", credits: 5, date: "2024-10-28", type: "debit" },
  { id: 3, user: "Robert Chen", action: "Credit Purchase", credits: 500, date: "2024-10-27", type: "credit" },
  { id: 4, user: "Maria Garcia", action: "Bid Submission", credits: 10, date: "2024-10-27", type: "debit" },
  { id: 5, user: "David Wilson", action: "Featured Job", credits: 200, date: "2024-10-26", type: "debit" },
  { id: 6, user: "Lisa Wong", action: "Credit Purchase", credits: 1000, date: "2024-10-26", type: "credit" },
  { id: 7, user: "Michael Brown", action: "Profile Verification", credits: 100, date: "2024-10-25", type: "debit" },
  { id: 8, user: "Emma Davis", action: "Job Apply", credits: 5, date: "2024-10-25", type: "debit" },
];

export default function AdminCreditManagement() {
  const [settings, setSettings] = useState(initialCreditSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pricing");
  const [packageForm, setPackageForm] = useState({
    credits: "",
    price: "",
    discount: ""
  });

  // Stats
  const stats = {
    totalCreditsSold: 12850,
    totalRevenue: 12450,
    activeSubscribers: 45,
    averageCreditsPerUser: 285,
    creditsUsedThisMonth: 3250,
    creditsPurchasedThisMonth: 5000
  };

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const handlePackageChange = (field, value) => {
    setPackageForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddPackage = () => {
    if (!packageForm.credits || !packageForm.price) {
      toast.error("Please fill in credits and price");
      return;
    }

    const newPackage = {
      id: settings.creditPackageOptions.length + 1,
      credits: parseInt(packageForm.credits),
      price: parseInt(packageForm.price),
      discount: parseInt(packageForm.discount) || 0
    };

    setSettings(prev => ({
      ...prev,
      creditPackageOptions: [...prev.creditPackageOptions, newPackage]
    }));

    setPackageForm({ credits: "", price: "", discount: "" });
    toast.success("Credit package added successfully");
  };

  const handleRemovePackage = (id) => {
    if (window.confirm("Are you sure you want to remove this package?")) {
      setSettings(prev => ({
        ...prev,
        creditPackageOptions: prev.creditPackageOptions.filter(pkg => pkg.id !== id)
      }));
      toast.success("Package removed successfully");
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In real app: API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Credit settings saved successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "pricing", label: "Pricing Settings", icon: <FiDollarSign /> },
    { id: "packages", label: "Credit Packages", icon: <FiPackage /> },
    { id: "transactions", label: "Transactions", icon: <FiFileText /> },
    { id: "stats", label: "Statistics", icon: <FiTrendingUp /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Token Credit Management</h1>
            <p className="text-gray-600 mt-2">Configure credit costs and packages for platform actions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiSettings className="text-lg" />
              {isEditing ? "Cancel Editing" : "Edit Settings"}
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={!isEditing || loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <FiSave className={`text-lg ${loading ? 'animate-spin' : ''}`} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Credits Sold</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalCreditsSold.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiCreditCard className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiDollarSign className="text-green-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeSubscribers}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiUsers className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Credits/User</p>
                <p className="text-2xl font-bold text-gray-800">{stats.averageCreditsPerUser}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiTrendingUp className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Credits Used (Month)</p>
                <p className="text-2xl font-bold text-red-600">{stats.creditsUsedThisMonth}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <FiBriefcase className="text-red-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Credits Bought (Month)</p>
                <p className="text-2xl font-bold text-green-600">{stats.creditsPurchasedThisMonth}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FiCalendar className="text-indigo-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Pricing Settings Tab */}
        {activeTab === "pricing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Related Costs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <FiBriefcase className="text-blue-500 text-xl" />
                <h2 className="text-xl font-bold text-gray-800">Job Related Costs</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Post a Job</p>
                    <p className="text-sm text-gray-500">Cost for employers to post a new job</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.jobPostCost}
                        onChange={(e) => handleSettingChange("jobPostCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.jobPostCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Apply to a Job</p>
                    <p className="text-sm text-gray-500">Cost for job seekers to apply</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.jobApplyCost}
                        onChange={(e) => handleSettingChange("jobApplyCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.jobApplyCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Submit a Bid</p>
                    <p className="text-sm text-gray-500">Cost to submit a bid for projects</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.bidSubmitCost}
                        onChange={(e) => handleSettingChange("bidSubmitCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.bidSubmitCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Featured Job Post</p>
                    <p className="text-sm text-gray-500">Additional cost for featured job listing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.featuredJobCost}
                        onChange={(e) => handleSettingChange("featuredJobCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.featuredJobCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Urgent Job Tag</p>
                    <p className="text-sm text-gray-500">Cost to mark job as urgent</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.urgentJobCost}
                        onChange={(e) => handleSettingChange("urgentJobCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.urgentJobCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile & Other Costs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <FiUsers className="text-purple-500 text-xl" />
                <h2 className="text-xl font-bold text-gray-800">Profile & Other Costs</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Profile Verification</p>
                    <p className="text-sm text-gray-500">Cost for ID verification badge</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.profileVerificationCost}
                        onChange={(e) => handleSettingChange("profileVerificationCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.profileVerificationCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">View Resume</p>
                    <p className="text-sm text-gray-500">Cost for employers to view candidate resumes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.resumeViewCost}
                        onChange={(e) => handleSettingChange("resumeViewCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.resumeViewCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Send Message</p>
                    <p className="text-sm text-gray-500">Cost to send message to other users</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.messageCost}
                        onChange={(e) => handleSettingChange("messageCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.messageCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Connection Request</p>
                    <p className="text-sm text-gray-500">Cost to send connection request</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={settings.connectionRequestCost}
                        onChange={(e) => handleSettingChange("connectionRequestCost", e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-800">{settings.connectionRequestCost}</span>
                    )}
                    <span className="text-gray-500">credits</span>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <FiSettings className="text-gray-500 text-xl" />
                  <h2 className="text-xl font-bold text-gray-800">System Settings</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Credit Expiry Days</p>
                      <p className="text-sm text-gray-500">Number of days before credits expire</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={settings.creditExpiryDays}
                          onChange={(e) => handleSettingChange("creditExpiryDays", e.target.value)}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-800">{settings.creditExpiryDays}</span>
                      )}
                      <span className="text-gray-500">days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Minimum Credits for Job Post</p>
                      <p className="text-sm text-gray-500">Required credits to post a job</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={settings.minimumCreditsForJobPost}
                          onChange={(e) => handleSettingChange("minimumCreditsForJobPost", e.target.value)}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-800">{settings.minimumCreditsForJobPost}</span>
                      )}
                      <span className="text-gray-500">credits</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Free Credits on Signup</p>
                      <p className="text-sm text-gray-500">Credits given to new users</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={settings.freeCreditsOnSignup}
                          onChange={(e) => handleSettingChange("freeCreditsOnSignup", e.target.value)}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-800">{settings.freeCreditsOnSignup}</span>
                      )}
                      <span className="text-gray-500">credits</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Referral Bonus Credits</p>
                      <p className="text-sm text-gray-500">Credits for successful referrals</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <input
                          type="number"
                          value={settings.referralCredits}
                          onChange={(e) => handleSettingChange("referralCredits", e.target.value)}
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg text-center"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-800">{settings.referralCredits}</span>
                      )}
                      <span className="text-gray-500">credits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Credit Packages Tab */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiPackage className="text-blue-500 text-xl" />
                  <h2 className="text-xl font-bold text-gray-800">Credit Packages</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {isEditing ? "Done Editing" : "Edit Packages"}
                </button>
              </div>

              {/* Add New Package Form */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Credits
                    </label>
                    <input
                      type="number"
                      value={packageForm.credits}
                      onChange={(e) => handlePackageChange("credits", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={packageForm.price}
                      onChange={(e) => handlePackageChange("price", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={packageForm.discount}
                      onChange={(e) => handlePackageChange("discount", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 20"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleAddPackage}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add Package
                  </button>
                </div>
              </div>

              {/* Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {settings.creditPackageOptions.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 relative"
                  >
                    {isEditing && (
                      <button
                        onClick={() => handleRemovePackage(pkg.id)}
                        className="absolute top-3 right-3 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                    
                    {pkg.discount > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          {pkg.discount}% OFF
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-800 mb-2">
                        {pkg.credits.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Credits</div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-gray-800 mb-1">
                        ${pkg.price}
                      </div>
                      {pkg.discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          ${Math.round(pkg.price / (1 - pkg.discount / 100))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      ${(pkg.price / pkg.credits).toFixed(3)} per credit
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Package Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Most Popular</div>
                  <div className="text-4xl font-bold text-blue-600">1,000</div>
                  <div className="text-gray-600">credits package</div>
                  <div className="text-sm text-gray-500 mt-2">45% of purchases</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Highest Revenue</div>
                  <div className="text-4xl font-bold text-green-600">5,000</div>
                  <div className="text-gray-600">credits package</div>
                  <div className="text-sm text-gray-500 mt-2">$12,250 total revenue</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Conversion Rate</div>
                  <div className="text-4xl font-bold text-purple-600">8.2%</div>
                  <div className="text-gray-600">from view to purchase</div>
                  <div className="text-sm text-gray-500 mt-2">Above industry average</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Credit Transactions</h2>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Export All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionHistory.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{tx.user}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-800">{tx.action}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'credit' ? '+' : '-'}{tx.credits}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'credit' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Credit Usage Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Job Posting</span>
                    <span className="font-medium text-gray-800">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Job Applications</span>
                    <span className="font-medium text-gray-800">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Featured Jobs</span>
                    <span className="font-medium text-gray-800">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Profile Verification</span>
                    <span className="font-medium text-gray-800">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">Other Actions</span>
                    <span className="font-medium text-gray-800">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Revenue Trend</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">This Month</div>
                  <div className="font-bold text-green-600">$2,450</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">Last Month</div>
                  <div className="font-bold text-gray-800">$2,150</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">Growth</div>
                  <div className="font-bold text-blue-600">+14%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">Average Monthly</div>
                  <div className="font-bold text-gray-800">$1,850</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700">Projected Yearly</div>
                  <div className="font-bold text-purple-600">$29,400</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <FiInfo className="text-blue-500 text-xl mt-1" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">How Credits Work</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Credits are deducted automatically when users perform actions</li>
              <li>• Users receive free credits upon signup and for referrals</li>
              <li>• Credits expire after the configured number of days</li>
              <li>• Users cannot perform actions if they have insufficient credits</li>
              <li>• All credit transactions are logged and visible in the transactions tab</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}