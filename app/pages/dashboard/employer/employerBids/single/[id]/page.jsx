"use client";
import useGetSingleBid from "@/app/hooks/dashboard/admin/bids/GetSingleBid";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  PlayCircle,
  FileText,
  Upload,
  Package,
  AlertCircle,
  ChevronRight,
  Award,
  User,
  Mail,
  Phone,
  Briefcase,
  Target,
  BarChart3,
  Timer,
  Shield,
  Star,
  Eye,
  Download,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Edit,
  MoreVertical,
  ArrowLeft,
  Loader2,
  Flag,
  Send,
  X,
  FileWarning,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BidSinglePage = () => {
  const params = useParams();
  const router = useRouter();
  const bidId = params?.id;
  const { singleBid, singleBidLoading, singleBidError, refreshSingleBid } =
    useGetSingleBid(bidId);
  
  const [currentStatus, setCurrentStatus] = useState(singleBid?.status || 'accepted');
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    issueType: 'technical',
    priority: 'medium'
  });

  // Modified status flow configuration - Starts from accepted
  const statusFlow = [
    { value: "accepted", label: "Accepted", icon: CheckCircle, color: "bg-green-100 text-green-800 border-green-200", isWorkStart: true },
    { value: "in progress", label: "In Progress", icon: PlayCircle, color: "bg-blue-100 text-blue-800 border-blue-200" },
    { value: "submitted", label: "Submitted", icon: FileText, color: "bg-purple-100 text-purple-800 border-purple-200" },
    { value: "waiting for payment", label: "Payment Pending", icon: DollarSign, color: "bg-amber-100 text-amber-800 border-amber-200" },
    { value: "completed", label: "Completed", icon: Award, color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    { value: "cancelled", label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-800 border-red-200" },
    { value: "in review", label: "In Review", icon: Eye, color: "bg-indigo-100 text-indigo-800 border-indigo-200" }
  ];

  // Get current status object
  const currentStatusObj = statusFlow.find(s => s.value === currentStatus) || statusFlow[0];

  // Check if user is employer or professional (you'll need to replace with actual auth check)
  const isEmployer = true; // TODO: Get from auth context
  const isProfessional = false; // TODO: Get from auth context

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    setIsLoadingAction(true);
    try {
      const response = await fetch(`/api/bids/${bidId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setCurrentStatus(newStatus);
        refreshSingleBid();
        // Show success message (you can use toast here)
        alert(`Status updated to ${newStatus}`);
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoadingAction(false);
      setShowConfirmDialog(false);
    }
  };

  // Confirm action dialog
  const confirmAction = (action) => {
    setActionToConfirm(action);
    setShowConfirmDialog(true);
  };

  // Get available actions based on current status and user role
  const getAvailableActions = () => {
    const actions = [];
    
    switch(currentStatus) {
      case 'accepted':
        if (isProfessional) {
          // Project starts from accepted status for professional
          actions.push({ label: 'Start Work', status: 'in progress', color: 'bg-blue-600 hover:bg-blue-700', icon: PlayCircle });
        }
        if (isEmployer) {
          actions.push({ label: 'Cancel Project', status: 'cancelled', color: 'bg-gray-600 hover:bg-gray-700', icon: XCircle });
        }
        break;
      case 'in progress':
        if (isProfessional) {
          actions.push({ label: 'Submit Work', status: 'submitted', color: 'bg-purple-600 hover:bg-purple-700', icon: FileText });
        }
        actions.push({ label: 'Cancel Project', status: 'cancelled', color: 'bg-gray-600 hover:bg-gray-700', icon: XCircle });
        break;
      case 'submitted':
        if (isEmployer) {
          actions.push({ label: 'Accept Submission', status: 'waiting for payment', color: 'bg-green-600 hover:bg-green-700', icon: CheckCircle });
          actions.push({ label: 'Request Changes', status: 'in review', color: 'bg-yellow-600 hover:bg-yellow-700', icon: Edit });
          actions.push({ label: 'Reject Submission', status: 'cancelled', color: 'bg-red-600 hover:bg-red-700', icon: XCircle });
        }
        break;
      case 'waiting for payment':
        if (isEmployer) {
          actions.push({ label: 'Mark as Paid', status: 'completed', color: 'bg-emerald-600 hover:bg-emerald-700', icon: DollarSign });
        }
        break;
      case 'in review':
        if (isProfessional) {
          actions.push({ label: 'Resubmit Work', status: 'submitted', color: 'bg-purple-600 hover:bg-purple-700', icon: FileText });
        }
        actions.push({ label: 'Cancel Project', status: 'cancelled', color: 'bg-gray-600 hover:bg-gray-700', icon: XCircle });
        break;
      default:
        break;
    }
    
    return actions;
  };

  // Handle report submission
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAction(true);
    try {
      const response = await fetch(`/api/bids/${bidId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reportData,
          bidId,
          reportedBy: isEmployer ? 'employer' : 'professional'
        })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Report submitted successfully! Our team will review it shortly.');
        setShowReportModal(false);
        setReportData({
          title: '',
          description: '',
          issueType: 'technical',
          priority: 'medium'
        });
      } else {
        alert(data.message || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoadingAction(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format budget
  const formatBudget = () => {
    if (!singleBid) return 'N/A';
    return `$${singleBid.budget} ${singleBid.BudgetType || 'fixed'}`;
  };

  // Loading state
  if (singleBidLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading bid details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (singleBidError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md border border-red-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error Loading Bid</h2>
          <p className="text-gray-600 mb-6 text-center">{singleBidError}</p>
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 font-medium"
            >
              Go Back
            </button>
            <button
              onClick={refreshSingleBid}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!singleBid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bid Not Found</h2>
          <p className="text-gray-600 mb-6">The bid you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const availableActions = getAvailableActions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{singleBid.title}</h1>
                <p className="text-sm text-gray-600">
                  ID: {singleBid._id?.slice(-8)} • Created: {formatDate(singleBid.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${currentStatusObj.color}`}>
                {currentStatusObj.label}
              </span>
              <button
                onClick={refreshSingleBid}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  Job Details
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700">{formatBudget()}</div>
                  <div className="text-sm text-gray-500">Project Budget</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{singleBid.description}</p>
                </div>
                
                {/* Key Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Company</div>
                        <div className="font-medium text-gray-900">{singleBid.companyName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium text-gray-900">{singleBid.companyLocation}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Deadline</div>
                        <div className="font-medium text-gray-900">{formatDate(singleBid.deadline)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Work Time</div>
                        <div className="font-medium text-gray-900">{singleBid.workTime || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Applications</div>
                        <div className="font-medium text-gray-900">{singleBid.applicationCount || 0}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Job Type</div>
                        <div className="font-medium text-gray-900 capitalize">{singleBid.jobType}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements & Responsibilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Requirements
                    </h4>
                    <ul className="space-y-3">
                      {singleBid.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronRight className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {singleBid.responsibilities?.map((resp, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronRight className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                <div className="pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {singleBid.skills?.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-green-600" />
                Employer Information
              </h2>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {singleBid.employerEmail}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Company</div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        {singleBid.companyName}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Location</div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {singleBid.companyLocation}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Project Duration</div>
                      <div className="font-medium text-gray-900">{singleBid.ProjectDuration || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-green-200">
                  <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-all duration-200">
                    <MessageCircle className="w-5 h-5" />
                    Message Employer
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Info Card */}
            {singleBid.bidder && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Assigned Professional
                </h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                      {singleBid.bidder.photo ? (
                        <img src={singleBid.bidder.photo} alt={singleBid.bidder.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                          <User className="w-10 h-10 text-blue-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{singleBid.bidder.name}</h3>
                          <p className="text-gray-600">{singleBid.bidder.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-700">
                            ${singleBid.bidder.price} <span className="text-sm font-normal text-gray-600">{singleBid.bidder.budgetType}</span>
                          </div>
                          <div className="text-sm text-gray-500">Agreed Price</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-sm text-gray-600">Project Deadline</div>
                          <div className="font-semibold text-gray-900 mt-1">
                            {formatDate(singleBid.bidder.projectDeadline)}
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-sm text-gray-600">Status</div>
                          <div className={`font-semibold mt-1 ${
                            currentStatus === 'cancelled' ? 'text-red-600' : 
                            currentStatus === 'completed' ? 'text-emerald-600' : 'text-green-600'
                          }`}>
                            {currentStatusObj.label}
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-sm text-gray-600">Work Started</div>
                          <div className="font-semibold text-gray-900 mt-1">
                            {formatDate(singleBid.updatedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200">
                        <MessageCircle className="w-5 h-5" />
                        Contact
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-3 border border-blue-300 text-blue-700 py-3 rounded-xl hover:bg-blue-50 font-medium transition-all duration-200">
                        <Eye className="w-5 h-5" />
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Submission Area */}
            {(currentStatus === 'in progress' || currentStatus === 'submitted' || currentStatus === 'in review') && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Work Submission
                </h2>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  {currentStatus === 'in progress' && isProfessional && (
                    <div className="space-y-6">
                      <p className="text-gray-700">Upload your completed work files here. Make sure to include all required deliverables.</p>
                      <div className="border-3 border-dashed border-purple-300 rounded-2xl p-8 text-center bg-white/50">
                        <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-700 font-medium mb-2">Drag & drop your files here</p>
                        <p className="text-gray-500 text-sm mb-6">Supported formats: PDF, DOC, ZIP, Images</p>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                          Browse Files
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {(currentStatus === 'submitted' || currentStatus === 'in review') && (
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">Submitted Files</h4>
                          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                            <Download className="w-5 h-5" />
                            Download All
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <div>
                                <div className="font-medium">project_final.zip</div>
                                <div className="text-sm text-gray-500">245 MB • 2 days ago</div>
                              </div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {currentStatus === 'in review' && isEmployer && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Review & Feedback</h4>
                          <textarea 
                            className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                            placeholder="Provide your feedback or requested changes here..."
                          />
                          <div className="flex gap-3">
                            <button className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-medium">
                              Approve Changes
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 font-medium">
                              Request Revision
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status & Actions */}
          <div className="space-y-8">
            {/* Status Workflow Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Project Status Flow</h2>
              
              <div className="relative">
                {statusFlow.map((status, index) => {
                  const StatusIcon = status.icon;
                  const isCurrent = currentStatus === status.value;
                  const isCompleted = statusFlow.findIndex(s => s.value === currentStatus) > index;
                  const isUpcoming = statusFlow.findIndex(s => s.value === currentStatus) < index;
                  const isWorkStart = status.isWorkStart;
                  
                  return (
                    <div key={status.value} className="relative flex items-center mb-8 last:mb-0">
                      {/* Connection Line */}
                      {index < statusFlow.length - 1 && (
                        <div className={`absolute left-6 top-14 w-0.5 h-12 ${
                          isCompleted ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                      
                      {/* Status Circle */}
                      <div className={`
                        relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                        ${isCurrent ? status.color : ''}
                        ${isCompleted ? 'bg-green-100 text-green-600' : ''}
                        ${isUpcoming ? 'bg-gray-100 text-gray-400' : ''}
                        border-2 ${isCurrent ? 'border-current' : isCompleted ? 'border-green-300' : 'border-gray-200'}
                      `}>
                        <StatusIcon className="w-6 h-6" />
                        {isCurrent && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        {isWorkStart && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <PlayCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Status Label */}
                      <div className="ml-4">
                        <div className={`font-semibold ${
                          isCurrent ? 'text-gray-900' : 
                          isCompleted ? 'text-green-700' : 
                          'text-gray-500'
                        }`}>
                          {status.label}
                        </div>
                        {isCurrent && (
                          <div className="text-sm text-gray-500 mt-1">Current Status</div>
                        )}
                        {isWorkStart && (
                          <div className="text-xs text-blue-600 font-medium mt-1">Work Starts Here</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Project Actions</h2>
              
              <div className="space-y-4">
                {availableActions.length > 0 ? (
                  availableActions.map((action, index) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => confirmAction(action)}
                        disabled={isLoadingAction}
                        className={`
                          w-full flex items-center justify-center gap-3 text-white py-4 rounded-xl font-medium
                          ${action.color}
                          ${isLoadingAction ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}
                          transition-all duration-200
                        `}
                      >
                        <ActionIcon className="w-5 h-5" />
                        {action.label}
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No actions available at this stage.</p>
                  </div>
                )}
                
                {/* Additional Actions */}
                <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="w-full flex items-center justify-center gap-3 border border-red-300 text-red-600 py-3 rounded-xl hover:bg-red-50 font-medium"
                  >
                    <Flag className="w-5 h-5" />
                    Report Issue
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Project Started</p>
                    <p className="text-sm text-gray-500">Professional assigned to project</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday at 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Professional Assigned</p>
                    <p className="text-sm text-gray-500">{singleBid.bidder?.name || 'Professional'} assigned</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(singleBid.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Project Created</p>
                    <p className="text-sm text-gray-500">Project started by employer</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(singleBid.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl ${actionToConfirm?.color.replace('hover:', '').split(' ')[0]} flex items-center justify-center`}>
                {actionToConfirm?.icon && <actionToConfirm.icon className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Action</h3>
                <p className="text-gray-600">This action will change the project status</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Status</span>
                <span className={`px-3 py-1 rounded-full text-sm ${currentStatusObj.color}`}>
                  {currentStatusObj.label}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-600">New Status</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  statusFlow.find(s => s.value === actionToConfirm?.status)?.color || 'bg-gray-100 text-gray-800'
                }`}>
                  {statusFlow.find(s => s.value === actionToConfirm?.status)?.label}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to <span className="font-semibold">{actionToConfirm?.label.toLowerCase()}</span>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(actionToConfirm.status)}
                disabled={isLoadingAction}
                className={`flex-1 text-white py-3 rounded-xl font-medium ${actionToConfirm?.color} ${
                  isLoadingAction ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                } transition-all duration-200`}
              >
                {isLoadingAction ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <FileWarning className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Report an Issue</h3>
                  <p className="text-gray-600">Describe the problem you're facing with this project</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  required
                  value={reportData.title}
                  onChange={(e) => setReportData({...reportData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Type
                  </label>
                  <select
                    value={reportData.issueType}
                    onChange={(e) => setReportData({...reportData, issueType: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="technical">Technical Issue</option>
                    <option value="communication">Communication Problem</option>
                    <option value="payment">Payment Issue</option>
                    <option value="quality">Quality Concern</option>
                    <option value="deadline">Deadline Missed</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={reportData.priority}
                    onChange={(e) => setReportData({...reportData, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  required
                  value={reportData.description}
                  onChange={(e) => setReportData({...reportData, description: e.target.value})}
                  rows="6"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Please provide detailed information about the issue, including any relevant dates, messages, or supporting information..."
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Your report will be reviewed by our support team within 24 hours. We may contact you for additional information if needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoadingAction}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl hover:from-red-700 hover:to-rose-700 font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {isLoadingAction ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidSinglePage;