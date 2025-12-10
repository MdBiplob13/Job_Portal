// app/pages/dashboard/admin/packages/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FiPackage,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiSave,
  FiX,
  FiCheck,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiDownload,
  FiCopy
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// Mock data - Replace with API calls
const initialPackages = [
  {
    id: 1,
    name: "Basic Plan",
    description: "For individuals starting out",
    price: 29,
    duration: 30,
    credits: 100,
    features: [
      "Post 5 jobs per month",
      "10 job applications",
      "Basic profile visibility",
      "Email support"
    ],
    popular: false,
    active: true,
    createdAt: "2024-01-15",
    subscribers: 45
  },
  {
    id: 2,
    name: "Professional Plan",
    description: "For growing professionals",
    price: 79,
    duration: 30,
    credits: 500,
    features: [
      "Post 20 jobs per month",
      "50 job applications",
      "Featured profile",
      "Priority support",
      "Analytics dashboard"
    ],
    popular: true,
    active: true,
    createdAt: "2024-02-01",
    subscribers: 128
  },
  {
    id: 3,
    name: "Enterprise Plan",
    description: "For businesses and teams",
    price: 199,
    duration: 30,
    credits: 2000,
    features: [
      "Unlimited job posts",
      "Unlimited applications",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "Advanced analytics"
    ],
    popular: false,
    active: true,
    createdAt: "2024-03-10",
    subscribers: 32
  },
  {
    id: 4,
    name: "Annual Pro",
    description: "Professional plan yearly",
    price: 799,
    duration: 365,
    credits: 6000,
    features: [
      "All Professional features",
      "2 months free",
      "Priority onboarding",
      "Custom reports"
    ],
    popular: false,
    active: true,
    createdAt: "2024-04-05",
    subscribers: 18
  },
  {
    id: 5,
    name: "Starter Trial",
    description: "7-day trial for new users",
    price: 0,
    duration: 7,
    credits: 20,
    features: [
      "Post 1 job",
      "5 job applications",
      "Basic features",
      "Community support"
    ],
    popular: false,
    active: false,
    createdAt: "2024-05-01",
    subscribers: 256
  },
];

const PACKAGE_TYPES = ["All Types", "Monthly", "Yearly", "Trial", "Custom"];
const STATUS_OPTIONS = ["All Status", "active", "inactive"];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [filteredPackages, setFilteredPackages] = useState(initialPackages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    credits: "",
    features: [],
    popular: false,
    active: true
  });
  const [featureInput, setFeatureInput] = useState("");

  // Filter packages
  useEffect(() => {
    let filtered = packages;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== "All Types") {
      filtered = filtered.filter(pkg => {
        if (selectedType === "Monthly") return pkg.duration === 30;
        if (selectedType === "Yearly") return pkg.duration === 365;
        if (selectedType === "Trial") return pkg.price === 0;
        return true;
      });
    }

    // Status filter
    if (selectedStatus !== "All Status") {
      filtered = filtered.filter(pkg => 
        selectedStatus === "active" ? pkg.active : !pkg.active
      );
    }

    setFilteredPackages(filtered);
  }, [searchQuery, selectedType, selectedStatus, packages]);

  // Calculate stats
  const stats = {
    total: packages.length,
    active: packages.filter(p => p.active).length,
    popular: packages.filter(p => p.popular).length,
    free: packages.filter(p => p.price === 0).length,
    totalRevenue: packages.reduce((sum, p) => sum + (p.price * p.subscribers), 0),
    totalSubscribers: packages.reduce((sum, p) => sum + p.subscribers, 0),
  };

  // Open modal for add/edit
  const openModal = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg.id);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        credits: pkg.credits,
        features: [...pkg.features],
        popular: pkg.popular,
        active: pkg.active
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        duration: "",
        credits: "",
        features: [],
        popular: false,
        active: true
      });
    }
    setFeatureInput("");
    setIsModalOpen(true);
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === "price" || field === "duration" || field === "credits" 
        ? parseInt(value) || 0 
        : value
    }));
  };

  // Add feature
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput("");
    }
  };

  // Remove feature
  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Handle save package
  const handleSavePackage = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Package name is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (formData.price < 0) {
      toast.error("Price must be positive");
      return;
    }
    if (formData.duration < 1) {
      toast.error("Duration must be at least 1 day");
      return;
    }
    if (formData.credits < 0) {
      toast.error("Credits must be positive");
      return;
    }

    if (editingPackage) {
      // Update existing package
      const updatedPackages = packages.map(pkg =>
        pkg.id === editingPackage
          ? {
              ...pkg,
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : pkg
      );
      setPackages(updatedPackages);
      toast.success("Package updated successfully");
    } else {
      // Add new package
      const newPackage = {
        id: packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        subscribers: 0
      };
      setPackages([...packages, newPackage]);
      toast.success("Package added successfully");
    }

    setIsModalOpen(false);
    setEditingPackage(null);
  };

  // Handle delete package
  const handleDeletePackage = () => {
    if (!selectedPackage) return;

    const updatedPackages = packages.filter(pkg => pkg.id !== selectedPackage.id);
    setPackages(updatedPackages);
    setIsDeleteModalOpen(false);
    setSelectedPackage(null);
    toast.success("Package deleted successfully");
  };

  // Open delete confirmation
  const confirmDelete = (pkg) => {
    setSelectedPackage(pkg);
    setIsDeleteModalOpen(true);
  };

  // Duplicate package
  const duplicatePackage = (pkg) => {
    const duplicatedPackage = {
      ...pkg,
      id: packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1,
      name: `${pkg.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      subscribers: 0
    };
    setPackages([...packages, duplicatedPackage]);
    toast.success("Package duplicated successfully");
  };

  // Toggle package status
  const togglePackageStatus = (pkgId) => {
    const updatedPackages = packages.map(pkg =>
      pkg.id === pkgId
        ? { ...pkg, active: !pkg.active }
        : pkg
    );
    setPackages(updatedPackages);
    toast.success("Package status updated");
  };

  // Export packages
  const exportPackages = () => {
    toast.success("Packages exported to CSV");
    // Add export logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Package Management</h1>
            <p className="text-gray-600 mt-2">Create, edit, and manage subscription packages</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportPackages}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiDownload className="text-lg" />
              Export
            </button>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiPlus className="text-lg" />
              Add Package
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Packages</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPackage className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Packages</p>
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
                <p className="text-sm text-gray-500">Popular Plans</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.popular}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiStar className="text-yellow-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Free Plans</p>
                <p className="text-2xl font-bold text-purple-600">{stats.free}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiDollarSign className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalSubscribers}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FiUsers className="text-indigo-500 text-xl" />
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
                <FiTrendingUp className="text-green-500 text-xl" />
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
                placeholder="Search packages by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {PACKAGE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
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
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All Types");
                  setSelectedStatus("All Status");
                }}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <FiFilter className="text-lg" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {filteredPackages.length === 0 ? (
          <div className="col-span-3 bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No packages found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or create a new package</p>
          </div>
        ) : (
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-xl shadow-sm border ${
                pkg.popular ? 'border-yellow-300' : 'border-gray-200'
              } overflow-hidden hover:shadow-md transition-all duration-300`}
            >
              {pkg.popular && (
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-2 font-bold text-sm">
                  🏆 MOST POPULAR
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                    <p className="text-gray-600 mt-1">{pkg.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Price and Credits */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                      <FiDollarSign className="text-lg" />
                      <div className="text-2xl font-bold">{pkg.price}</div>
                    </div>
                    <div className="text-sm text-blue-600">Price</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-purple-700 mb-1">
                      <FiPackage className="text-lg" />
                      <div className="text-2xl font-bold">{pkg.credits}</div>
                    </div>
                    <div className="text-sm text-purple-600">Credits</div>
                  </div>
                </div>

                {/* Duration and Subscribers */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="text-gray-400" />
                    <span>{pkg.duration} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiUsers className="text-gray-400" />
                    <span>{pkg.subscribers} subscribers</span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <FiCheck className="text-green-500 mt-0.5" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => openModal(pkg)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FiEdit className="text-sm" />
                    Edit
                  </button>
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      pkg.active
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {pkg.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => duplicatePackage(pkg)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Duplicate"
                  >
                    <FiCopy className="text-lg" />
                  </button>
                  <button
                    onClick={() => confirmDelete(pkg)}
                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., Professional Plan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder="Brief description of the package"
                  />
                </div>
              </div>

              {/* Pricing & Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleFormChange("duration", e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits Included
                  </label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) => handleFormChange("credits", e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                  <span className="text-sm text-gray-500">{formData.features.length} added</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature (press Enter)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <FiCheck className="text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                      <button
                        onClick={() => removeFeature(index)}
                        className="p-1 hover:bg-red-50 rounded"
                      >
                        <FiX className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => handleFormChange("popular", e.target.checked)}
                      className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Mark as Popular Plan</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => handleFormChange("active", e.target.checked)}
                      className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Active (visible to users)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePackage}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiSave className="text-lg" />
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Package</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{selectedPackage.name}</span>?
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePackage}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Delete Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}