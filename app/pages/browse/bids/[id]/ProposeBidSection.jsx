"use client";
import useGetAllProposeForSingleBid from "@/app/hooks/jobs/bids/GetAllProposeForSingleBid";
import useUser from "@/app/hooks/user/userHook";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { 
  FiHelpCircle, 
  FiX, 
  FiPlus, 
  FiDollarSign, 
  FiCalendar,
  FiFileText,
  FiLink,
  FiChevronRight,
  FiClock,
  FiAward,
  FiCheck,
  FiAlertCircle,
  FiStar
} from "react-icons/fi";

const ProposeBidSection = ({
  singleBid,
  timeLeft,
  getBudgetTypeText,
  formatDate,
}) => {
  const [isPostBidModalOpen, setIsPostBidModalOpen] = useState(false);
  const { user } = useUser();

  const bidId = singleBid._id;
  const { allProposals, refreshProposals } = useGetAllProposeForSingleBid(bidId);

  

  const handleSubmitProposal = (e) => {
    e.preventDefault();

    const form = e.target;
    const budget = form.budget.value;
    const deadline = form.deadline.value;
    const budgetType = form.budgetType.value;
    const coverLetter = form.coverLetter.value;
    const resume = form.resumeLink.value;

    const payload = {
      budget,
      deadline,
      budgetType,
      coverLetter,
      bidId: singleBid._id,
      professionalId: user._id,
      employerId: singleBid.employerId,
      resume,
    };

    fetch("/api/dashboard/professional/proposeForBid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Bid submitted successfully!");
          refreshProposals();
          form.reset();
          setIsPostBidModalOpen(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to submit bid. Please try again.");
      });
  };

  return (
    <div className="space-y-8">
      {/* Application Statistics - Keep this visible */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Bid Applications
            </h3>
            <p className="text-slate-600">
              {singleBid.applicationCount || 0} proposals received so far
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {singleBid.applicationCount || 0}/
                {singleBid.applicationLimit || 50}
              </div>
              <div className="text-sm text-slate-500">Spots Filled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {timeLeft(singleBid.deadline)}
              </div>
              <div className="text-sm text-slate-500">Left to Apply</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-500 mb-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  ((singleBid.applicationCount || 0) /
                    (singleBid.applicationLimit || 50)) *
                    100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Post Bid Button */}
        <div className={`mt-6 flex justify-center ${timeLeft(singleBid.deadline) === 'Closed' ? 'hidden' : ''}`}>
          <button
            onClick={() => setIsPostBidModalOpen(true)}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 cursor-pointer"
          >
            <FiPlus className="w-5 h-5" />
            Post Your Bid
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Existing Applications Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Recent Proposals
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {allProposals.length} proposal
              {allProposals.length !== 1 ? "s" : ""} submitted
            </p>
          </div>
          <button
            onClick={refreshProposals}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {allProposals.length > 0 ? (
          <div className="grid gap-4">
            {allProposals.map((proposal) => {
              const deadlineDate = new Date(proposal.deadline);
              const today = new Date();
              const daysLeft = Math.ceil(
                (deadlineDate - today) / (1000 * 60 * 60 * 24)
              );

              const professionalName =
                proposal.professionalId?.name || "Unknown Professional";
              const professionalInitials = professionalName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              const submittedDate = new Date(proposal.createdAt);
              const timeAgo = Math.floor(
                (new Date() - submittedDate) / (1000 * 60 * 60 * 24)
              );
              const timeAgoText =
                timeAgo === 0
                  ? "Today"
                  : timeAgo === 1
                  ? "Yesterday"
                  : `${timeAgo} days ago`;

              return (
                <Link
                  href={`/pages/browse/bids/bidPropose/${proposal._id}`}
                  key={proposal._id}
                  className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-linear-to-r from-white to-slate-50/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    {/* Professional Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {proposal.professionalId?.photo ? (
                          <img
                            src={proposal.professionalId.photo}
                            alt={professionalName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {professionalInitials}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <FiCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {professionalName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">
                            Submitted {timeAgoText}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                            {proposal.professionalId?.currentJobStatus ||
                              "Available"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-800">
                        ${proposal.budget}
                        <span className="text-sm font-normal text-slate-500 ml-1">
                          /
                          {proposal.budgetType === "fixed"
                            ? "project"
                            : proposal.budgetType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {proposal.budgetType === "fixed"
                          ? "Fixed price"
                          : proposal.budgetType === "hourly"
                          ? "Hourly rate"
                          : "Monthly rate"}
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter Preview */}
                  <div className="mb-4">
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {proposal.coverLetter}
                    </p>
                  </div>

                  {/* Details Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Deadline */}
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          Deadline:{" "}
                          <span className="font-medium">
                            {formatDate(proposal.deadline)}
                          </span>
                        </span>
                        {daysLeft >= 0 && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              daysLeft <= 3
                                ? "bg-red-100 text-red-800"
                                : daysLeft <= 7
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                          </span>
                        )}
                      </div>

                      {/* Resume Link */}
                      {proposal.resume && (
                        <div className="flex items-center gap-2">
                          <FiFileText className="w-4 h-4 text-slate-400" />
                          <a
                            href={proposal.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
                          >
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          proposal.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : proposal.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : proposal.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {proposal.status.charAt(0).toUpperCase() +
                          proposal.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Ratings */}
                  {proposal.professionalId?.review && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i <
                              Math.floor(
                                proposal.professionalId.review.rating || 0
                              )
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {proposal.professionalId.review.rating?.toFixed(1) ||
                          "0.0"}
                        <span className="text-slate-400 ml-1">
                          ({proposal.professionalId.review.totalRatings || 0}{" "}
                          reviews)
                        </span>
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
              <FiFileText className="w-10 h-10 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              No Bids Yet
            </h4>
            <p className="text-gray-600 max-w-md mx-auto">
              Be the first professional to submit a bid for this project. Share
              your expertise and stand out from the competition!
            </p>
            <div className="mt-4 flex justify-center gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                {timeLeft(singleBid.deadline)} <p className={`text-slate-400 ${timeLeft(singleBid.deadline)=== 'Closed' ? 'hidden' : ''}`}>left to apply</p>
              </span>
              <span>•</span>
              <span>{singleBid.applicationLimit || 50} spots available</span>
            </div>
          </div>
        )}
      </div>

      {/* Post Bid Modal - Contains both help guidelines and form */}
      {isPostBidModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Submit Your Bid
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Complete the form below to submit your proposal
                </p>
              </div>
              <button
                onClick={() => setIsPostBidModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <FiX className="text-xl text-slate-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Help & Guidelines Section */}
              <div className="mb-8 space-y-6">
                {/* Important Notes */}
                <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FiAlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-3 text-lg">
                        Important Guidelines
                      </h4>
                      <ul className="space-y-2 text-amber-700">
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            Your proposed budget and timeline are binding if selected. Ensure you can commit to your quoted price and delivery date.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            You cannot modify your bid after submission. Double-check all details before submitting.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            The client will review all bids after the deadline:{" "}
                            <span className="font-semibold">
                              {formatDate(singleBid.deadline)}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiAward className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-3 text-lg">
                        Tips for a Winning Bid
                      </h4>
                      <ul className="space-y-2 text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            <span className="font-medium">Be Specific:</span> Clearly explain your approach and methodology
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            <span className="font-medium">Show Experience:</span> Highlight similar projects and results
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            <span className="font-medium">Competitive Pricing:</span> The lowest bid isn't always selected - value matters
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Budget Info */}
                <div className="bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <FiDollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-3 text-lg">
                        Budget Information
                      </h4>
                      <div className="space-y-2 text-emerald-700">
                        <p>
                          Original budget:{" "}
                          <span className="font-semibold">
                            ${singleBid.budget}
                            {getBudgetTypeText(singleBid.BudgetType)}
                          </span>
                        </p>
                        <p>
                          Consider your costs, time investment, and desired profit margin when proposing your budget.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bid Form Section */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Your Bid Details
                </h3>

                <form onSubmit={handleSubmitProposal} className="space-y-6">
                  {/* Bid Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <FiDollarSign className="w-4 h-4" />
                      Your Proposed Budget *
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="budget"
                          required
                          min="1"
                          placeholder="Enter your proposed amount"
                          className="w-full pl-7 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">
                            {singleBid.BudgetType === "monthly"
                              ? "/month"
                              : singleBid.BudgetType === "hourly"
                              ? "/hour"
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="w-32">
                        <select
                          name="budgetType"
                          className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          defaultValue={singleBid.BudgetType || "fixed"}
                        >
                          <option value="fixed">Fixed</option>
                          <option value="hourly">Hourly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Original budget: ${singleBid.budget}
                      {getBudgetTypeText(singleBid.BudgetType)}
                    </p>
                  </div>

                  {/* Project Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      Your Proposed Completion Date *
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="date"
                          name="deadline"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                      <div className="text-sm text-gray-500">
                        Bid deadline: {formatDate(singleBid.deadline)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Provide a realistic timeline for project completion
                    </p>
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <FiLink className="w-4 h-4" />
                      Resume / Portfolio Link
                    </label>
                    <input
                      type="url"
                      name="resumeLink"
                      placeholder="https://example.com/resume.pdf"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Provide a link to your resume, CV, or portfolio
                    </p>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <FiFileText className="w-4 h-4" />
                      Cover Letter / Proposal *
                    </label>
                    <textarea
                      rows={6}
                      required
                      name="coverLetter"
                      placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    />
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-500">
                        Minimum 200 characters recommended
                      </p>
                      <p className="text-sm text-gray-500">
                        Explain your qualifications and approach
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsPostBidModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-sm cursor-pointer"
                    >
                      Submit Bid
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposeBidSection;