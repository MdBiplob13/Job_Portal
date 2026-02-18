"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Mail,
  User,
  Building,
  Star,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from "lucide-react";

const AdminReportsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bidId: "BID-00123",
      reportedBy: "Professional",
      reporterName: "John Smith",
      reporterEmail: "john@example.com",
      title: "Payment Not Received",
      description: "Completed the project 2 weeks ago but haven't received payment yet. Employer is not responding to messages.",
      issueType: "payment",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-15",
      response: "",
    },
    {
      id: 2,
      bidId: "BID-00124",
      reportedBy: "Employer",
      reporterName: "Sarah Johnson",
      reporterEmail: "sarah@company.com",
      title: "Poor Quality Work",
      description: "The delivered work does not meet the quality standards we agreed upon. Multiple revisions requested but not completed properly.",
      issueType: "quality",
      status: "in_review",
      priority: "medium",
      createdAt: "2024-01-14",
      response: "Contacted professional for clarification",
    },
    {
      id: 3,
      bidId: "BID-00125",
      reportedBy: "Professional",
      reporterName: "Mike Chen",
      reporterEmail: "mike@example.com",
      title: "Scope Creep Issues",
      description: "Employer keeps requesting additional features beyond the original scope without additional compensation.",
      issueType: "communication",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-10",
      response: "Additional budget negotiated and agreed",
    },
    {
      id: 4,
      bidId: "BID-00126",
      reportedBy: "Employer",
      reporterName: "Alex Brown",
      reporterEmail: "alex@techcorp.com",
      title: "Missed Deadline",
      description: "Project delivery was 5 days late without prior notice or explanation.",
      issueType: "deadline",
      status: "closed",
      priority: "high",
      createdAt: "2024-01-08",
      response: "Professional provided valid reasons, penalty applied",
    },
    {
      id: 5,
      bidId: "BID-00127",
      reportedBy: "Professional",
      reporterName: "Emma Wilson",
      reporterEmail: "emma@example.com",
      title: "Unprofessional Communication",
      description: "Employer using inappropriate language and making unreasonable demands.",
      issueType: "behavior",
      status: "pending",
      priority: "critical",
      createdAt: "2024-01-12",
      response: "",
    },
  ]);

  const [expandedId, setExpandedId] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    issueType: "all",
    priority: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [responseText, setResponseText] = useState("");

  const filteredReviews = reviews.filter(review => {
    if (filters.status !== "all" && review.status !== filters.status) return false;
    if (filters.issueType !== "all" && review.issueType !== filters.issueType) return false;
    if (filters.priority !== "all" && review.priority !== filters.priority) return false;
    if (searchTerm && !review.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !review.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueTypeColor = (type) => {
    switch(type) {
      case 'payment': return 'bg-red-100 text-red-800';
      case 'quality': return 'bg-purple-100 text-purple-800';
      case 'communication': return 'bg-blue-100 text-blue-800';
      case 'deadline': return 'bg-amber-100 text-amber-800';
      case 'behavior': return 'bg-pink-100 text-pink-800';
      case 'technical': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
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

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    resolved: reviews.filter(r => r.status === 'resolved').length,
    critical: reviews.filter(r => r.priority === 'critical').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-2">Manage and respond to user reviews and reports</p>
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
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold">{stats.critical}</p>
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
                <option value="in_review">In Review</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
              <select
                value={filters.issueType}
                onChange={(e) => setFilters({...filters, issueType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Types</option>
                <option value="payment">Payment</option>
                <option value="quality">Quality</option>
                <option value="communication">Communication</option>
                <option value="deadline">Deadline</option>
                <option value="behavior">Behavior</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
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
                        {review.status.replace('_', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIssueTypeColor(review.issueType)}`}>
                        {review.issueType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(review.priority)}`}>
                        {review.priority}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{review.title}</h3>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{review.reporterName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.reportedBy === "Employer" ? (
                          <Building className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                        <span>{review.reportedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>BID: {review.bidId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{review.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
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
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === review.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Description */}
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                      <div className="bg-white rounded-lg p-4 border">
                        <p className="text-gray-700 whitespace-pre-line">{review.description}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                      
                      {/* Status Update */}
                      <div className="space-y-3 mb-6">
                        <div className="flex gap-2">
                          {['pending', 'in_review', 'resolved', 'closed'].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateStatus(review.id, status)}
                              className={`px-3 py-1.5 text-sm rounded-lg ${
                                review.status === status
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Response */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Admin Response</h5>
                        {review.response ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800">{review.response}</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Type your response..."
                              rows="3"
                              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                            />
                            <button
                              onClick={() => handleSubmitResponse(review.id)}
                              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
                            >
                              Submit Response
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Contact */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                          <Mail className="w-4 h-4" />
                          Contact {review.reporterName}
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

export default AdminReportsPage;