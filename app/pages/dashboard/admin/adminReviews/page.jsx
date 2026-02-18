"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Mail,
  User,
  Building,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
} from "lucide-react";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bidId: "BID-00123",
      projectTitle: "E-commerce Website Development",
      employerName: "Sarah Johnson",
      employerEmail: "sarah@company.com",
      employerCompany: "TechCorp Inc.",
      professionalName: "John Smith",
      professionalEmail: "john@example.com",
      professionalRole: "Full-Stack Developer",
      rating: 4,
      reviewText: "Excellent work delivered on time. Communication was great throughout the project. Would definitely hire again!",
      reviewType: "employer_to_professional",
      status: "approved",
      date: "2024-01-15",
      response: "",
      flagged: false,
    },
    {
      id: 2,
      bidId: "BID-00124",
      projectTitle: "Mobile App UI/UX Design",
      employerName: "Alex Brown",
      employerEmail: "alex@design.co",
      employerCompany: "DesignStudio",
      professionalName: "Emma Wilson",
      professionalEmail: "emma@example.com",
      professionalRole: "UI/UX Designer",
      rating: 2,
      reviewText: "Work quality was below expectations. Missed several deadlines and didn't follow specifications.",
      reviewType: "employer_to_professional",
      status: "pending",
      date: "2024-01-14",
      response: "",
      flagged: true,
    },
    {
      id: 3,
      bidId: "BID-00125",
      projectTitle: "SEO Optimization",
      employerName: "Mike Chen",
      employerEmail: "mike@tech.com",
      employerCompany: "Tech Solutions",
      professionalName: "David Lee",
      professionalEmail: "david@example.com",
      professionalRole: "SEO Specialist",
      rating: 5,
      reviewText: "Outstanding results! Our organic traffic increased by 300% in 3 months. Highly recommended!",
      reviewType: "professional_to_employer",
      status: "approved",
      date: "2024-01-10",
      response: "",
      flagged: false,
    },
    {
      id: 4,
      bidId: "BID-00126",
      projectTitle: "Logo Design",
      employerName: "Lisa Wong",
      employerEmail: "lisa@brand.com",
      employerCompany: "BrandCo",
      professionalName: "Robert Kim",
      professionalEmail: "robert@example.com",
      professionalRole: "Graphic Designer",
      rating: 3,
      reviewText: "Average work. Communication could be better. Multiple revisions were needed.",
      reviewType: "professional_to_employer",
      status: "rejected",
      date: "2024-01-08",
      response: "Review contains inappropriate language",
      flagged: false,
    },
    {
      id: 5,
      bidId: "BID-00127",
      projectTitle: "Backend API Development",
      employerName: "Tom Harris",
      employerEmail: "tom@api.co",
      employerCompany: "APITech",
      professionalName: "Anna Taylor",
      professionalEmail: "anna@example.com",
      professionalRole: "Backend Developer",
      rating: 4,
      reviewText: "Good technical skills but sometimes slow to respond. Overall satisfied with the outcome.",
      reviewType: "mutual_review",
      status: "pending",
      date: "2024-01-12",
      response: "",
      flagged: false,
    },
  ]);

  const [expandedId, setExpandedId] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    reviewType: "all",
    rating: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [responseText, setResponseText] = useState("");

  const filteredReviews = reviews.filter(review => {
    if (filters.status !== "all" && review.status !== filters.status) return false;
    if (filters.reviewType !== "all" && review.reviewType !== filters.reviewType) return false;
    if (filters.rating !== "all" && review.rating !== parseInt(filters.rating)) return false;
    if (searchTerm && 
        !review.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !review.employerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !review.professionalName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewTypeColor = (type) => {
    switch(type) {
      case 'employer_to_professional': return 'bg-blue-100 text-blue-800';
      case 'professional_to_employer': return 'bg-purple-100 text-purple-800';
      case 'mutual_review': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateStatus = (id, status) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status } : review
    ));
  };

  const handleSubmitResponse = (id) => {
    if (!responseText.trim()) return;
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, response: responseText } : review
    ));
    setResponseText("");
    setExpandedId(null);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const handleToggleFlag = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, flagged: !review.flagged } : review
    ));
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    flagged: reviews.filter(r => r.flagged).length,
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating}.0
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-2">Manage and moderate all platform reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Flagged</p>
                <p className="text-2xl font-bold">{stats.flagged}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Type</label>
              <select
                value={filters.reviewType}
                onChange={(e) => setFilters({...filters, reviewType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Types</option>
                <option value="employer_to_professional">Employer → Professional</option>
                <option value="professional_to_employer">Professional → Employer</option>
                <option value="mutual_review">Mutual Review</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow border overflow-hidden">
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(review.status)}`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReviewTypeColor(review.reviewType)}`}>
                        {review.reviewType === 'employer_to_professional' ? 'Employer Review' : 
                         review.reviewType === 'professional_to_employer' ? 'Professional Review' : 'Mutual Review'}
                      </span>
                      {review.flagged && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          Flagged
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{review.projectTitle}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>BID: {review.bidId}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Employer Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Building className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{review.employerName}</p>
                            <p className="text-sm text-gray-600">{review.employerCompany}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.employerEmail}</p>
                      </div>

                      {/* Professional Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">{review.professionalName}</p>
                            <p className="text-sm text-gray-600">{review.professionalRole}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.professionalEmail}</p>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="border-t pt-4">
                      <p className="text-gray-700">{review.reviewText}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setExpandedId(expandedId === review.id ? null : review.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedId === review.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content - Admin Actions */}
              {expandedId === review.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Admin Actions */}
                    <div className="md:col-span-2 space-y-6">
                      {/* Status Update */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Moderate Review</h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleUpdateStatus(review.id, 'approved')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                              review.status === 'approved'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(review.id, 'rejected')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                              review.status === 'rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(review.id, 'pending')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                              review.status === 'pending'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                            Mark Pending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(review.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                              review.flagged
                                ? 'bg-orange-600 text-white'
                                : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                            }`}
                          >
                            <AlertCircle className="w-4 h-4" />
                            {review.flagged ? 'Unflag' : 'Flag'}
                          </button>
                        </div>
                      </div>

                      {/* Admin Response */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Admin Notes</h4>
                        {review.response ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800">{review.response}</p>
                            <button
                              onClick={() => setReviews(reviews.map(r => r.id === review.id ? {...r, response: ""} : r))}
                              className="mt-2 text-sm text-green-700 hover:text-green-900"
                            >
                              Edit Response
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Add admin notes or response..."
                              rows="3"
                              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                            />
                            <button
                              onClick={() => handleSubmitResponse(review.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                              Save Notes
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                      
                      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                        <Mail className="w-4 h-4" />
                        Email Both Parties
                      </button>
                      
                      <button className="w-full flex items-center justify-center gap-2 border border-blue-300 text-blue-700 py-2 rounded-lg hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                        Edit Review
                      </button>
                      
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-700 py-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Review
                      </button>

                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">Export Options</p>
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                          <Download className="w-4 h-4" />
                          Export Review Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;