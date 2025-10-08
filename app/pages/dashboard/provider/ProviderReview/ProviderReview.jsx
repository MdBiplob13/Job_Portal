// app/components/Dashboard/Reviews/ReviewsPage.jsx
"use client";
import React, { useState } from "react";
import { FiStar, FiFilter, FiSearch, FiCalendar, FiCheckCircle, FiMessageCircle, FiThumbsUp, FiAward } from "react-icons/fi";

// Mock data
const MOCK_REVIEWS = [
  {
    id: 1,
    client: {
      name: "Emma Richards",
      avatar: "/user1.jpeg",
      role: "Project Manager",
      company: "Port Authority"
    },
    job: {
      title: "Port Shed Repair",
      budget: "$15,000",
      category: "Construction",
      completedDate: "Mar 15, 2024"
    },
    rating: 5,
    comment: "Outstanding work! The team completed the port shed repair ahead of schedule and under budget. The quality of work exceeded our expectations. Highly recommended for any construction projects.",
    date: "2 days ago",
    helpful: 12,
    response: {
      text: "Thank you for your kind words, Emma! It was a pleasure working with your team. We're glad we could deliver quality results on time.",
      date: "1 day ago"
    },
    status: "completed",
    tags: ["Quality Work", "On Time", "Professional"]
  },
  {
    id: 2,
    client: {
      name: "Michael Chen",
      avatar: "/user2.jpeg",
      role: "Procurement Officer",
      company: "Maritime Authority"
    },
    job: {
      title: "Harbor Lighting Installation",
      budget: "$8,500",
      category: "Electrical",
      completedDate: "Feb 28, 2024"
    },
    rating: 4,
    comment: "Good quality work on the lighting installation. The team was professional and completed the work as specified. Minor delays due to weather, but overall satisfied with the result.",
    date: "1 week ago",
    helpful: 8,
    response: null,
    status: "completed",
    tags: ["Professional", "Good Communication"]
  },
  {
    id: 3,
    client: {
      name: "Sarah Johnson",
      avatar: "/user3.jpeg",
      role: "Environmental Director",
      company: "Environmental Division"
    },
    job: {
      title: "Coastal Reinforcement",
      budget: "$25,000",
      category: "Environmental",
      completedDate: "Feb 15, 2024"
    },
    rating: 5,
    comment: "Exceptional environmental work! The team was very knowledgeable about coastal preservation and implemented sustainable practices throughout the project. Will definitely work with them again.",
    date: "2 weeks ago",
    helpful: 15,
    response: {
      text: "We appreciate your feedback, Sarah! Protecting the coastal environment was our top priority. Looking forward to future collaborations.",
      date: "2 weeks ago"
    },
    status: "completed",
    tags: ["Environmental", "Sustainable", "Expert Team"]
  },
  {
    id: 4,
    client: {
      name: "David Wilson",
      avatar: "/user4.jpeg",
      role: "Property Manager",
      company: "Property & Procurement"
    },
    job: {
      title: "Dock Reconstruction",
      budget: "$45,000",
      category: "Construction",
      completedDate: "Jan 30, 2024"
    },
    rating: 3,
    comment: "The dock reconstruction was completed, but there were some communication issues during the project. The final result is acceptable, though there were some delays in the timeline.",
    date: "1 month ago",
    helpful: 3,
    response: {
      text: "Thank you for your honest feedback, David. We've taken note of your concerns about communication and are implementing new processes to improve this area.",
      date: "1 month ago"
    },
    status: "completed",
    tags: ["Acceptable", "Communication Issues"]
  },
  {
    id: 5,
    client: {
      name: "Lisa Rodriguez",
      avatar: "/user5.jpeg",
      role: "Public Works Director",
      company: "Public Works Department"
    },
    job: {
      title: "Office Building Renovation",
      budget: "$35,000",
      category: "Renovation",
      completedDate: "Jan 15, 2024"
    },
    rating: 5,
    comment: "Absolutely fantastic work! The office renovation was completed with exceptional attention to detail. The team was professional, punctual, and the quality exceeded our expectations. Highly recommended!",
    date: "2 months ago",
    helpful: 20,
    response: null,
    status: "completed",
    tags: ["Exceptional", "Attention to Detail", "Punctual"]
  }
];

const StarRating = ({ rating, size = "sm" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${
            sizeClasses[size]
          } ${
            star <= rating 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function ProviderReview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Calculate overall stats
  const stats = {
    totalReviews: MOCK_REVIEWS.length,
    averageRating: (MOCK_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / MOCK_REVIEWS.length).toFixed(1),
    fiveStar: MOCK_REVIEWS.filter(review => review.rating === 5).length,
    responseRate: Math.round((MOCK_REVIEWS.filter(review => review.response).length / MOCK_REVIEWS.length) * 100)
  };

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: MOCK_REVIEWS.filter(review => review.rating === rating).length,
    percentage: Math.round((MOCK_REVIEWS.filter(review => review.rating === rating).length / MOCK_REVIEWS.length) * 100)
  }));

  // Filter and sort reviews
  const filteredReviews = MOCK_REVIEWS.filter(review => {
    const matchesSearch = 
      review.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
    const matchesCategory = filterCategory === "all" || review.job.category === filterCategory;

    return matchesSearch && matchesRating && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const categories = [...new Set(MOCK_REVIEWS.map(review => review.job.category))];

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
            {review.client.avatar ? (
              <img src={review.client.avatar} alt={review.client.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              review.client.name.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{review.client.name}</h3>
            <p className="text-sm text-gray-600">{review.client.role} • {review.client.company}</p>
          </div>
        </div>
        <div className="text-right">
          <StarRating rating={review.rating} size="md" />
          <p className="text-sm text-gray-500 mt-1">{review.date}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-semibold text-gray-800">{review.job.title}</span>
            <span className="text-gray-600 ml-2">• {review.job.category}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              <FiCalendar className="text-gray-400" />
              {review.job.completedDate}
            </span>
            <span className="font-semibold text-gray-800">{review.job.budget}</span>
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {review.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Client Reviews</h1>
          <p className="text-gray-600 mt-2">See what your clients are saying about your work</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Stats and Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Rating Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-800 mb-2">{stats.averageRating}</div>
                <StarRating rating={Math.round(stats.averageRating)} size="lg" />
                <p className="text-gray-600 text-sm mt-2">Average Rating</p>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{item.rating}</span>
                      <FiStar className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-gray-600 w-8 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">{stats.totalReviews}</div>
                <div className="text-gray-600 text-sm">Total Reviews</div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{stats.responseRate}%</div>
                <div className="text-gray-600 text-sm">Response Rate</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                Filters
              </h3>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Stats Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews, clients, or projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Showing {filteredReviews.length} of {MOCK_REVIEWS.length} reviews</span>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                filteredReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>

            {/* Load More */}
            {filteredReviews.length > 0 && (
              <div className="mt-8 text-center">
                <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}