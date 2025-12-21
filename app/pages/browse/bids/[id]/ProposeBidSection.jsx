"use client";
import useGetAllProposeForSingleBid from "@/app/hooks/jobs/bids/GetAllProposeForSingleBid";
import useUser from "@/app/hooks/user/userHook";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiHelpCircle, FiX } from "react-icons/fi";

const ProposeBidSection = ({
  singleBid,
  timeLeft,
  getBudgetTypeText,
  formatDate,
}) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const { user } = useUser();

  const bidId = singleBid._id;
  const { allProposals, refreshProposals } =
    useGetAllProposeForSingleBid(bidId);

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
          toast.success("Proposal submitted successfully!");
          form.reset();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="space-y-8">
      {/* Help Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
        >
          <FiHelpCircle className="text-lg" />
          Help & Guidelines
        </button>
      </div>

      {/* Application Statistics */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Submit Your Proposal
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
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Submit Your Proposal
        </h3>

        <form onSubmit={handleSubmitProposal} className="space-y-6">
          {/* Bid Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <p className="mt-1 text-sm text-gray-500">
              Original budget: ${singleBid.budget}
              {getBudgetTypeText(singleBid.BudgetType)}
            </p>
          </div>

          {/* Project Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <p className="mt-1 text-sm text-gray-500">
              Provide a realistic timeline for project completion
            </p>
          </div>

          {/* Resume Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume Link
            </label>
            <input
              type="url"
              name="resumeLink"
              placeholder="https://example.com/resume.pdf"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <p className="mt-1 text-sm text-gray-500">
              Provide a link to your resume or CV
            </p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter / Proposal *
            </label>
            <textarea
              rows={6}
              required
              name="coverLetter"
              placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
            <p className="mt-1 text-sm text-gray-500">
              Minimum 200 characters. Explain your qualifications and approach.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition shadow-sm cursor-pointer"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>

      {/* Existing Applications Preview - Updated Design */}
<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-bold text-slate-800">Recent Proposals</h3>
      <p className="text-sm text-slate-500 mt-1">
        {allProposals.length} proposal{allProposals.length !== 1 ? 's' : ''} submitted
      </p>
    </div>
    <button 
      onClick={refreshProposals}
      className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer flex items-center gap-1"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Refresh
    </button>
  </div>

  {allProposals.length > 0 ? (
    <div className="grid gap-4">
      {allProposals.map((proposal) => {
        // Calculate days until deadline
        const deadlineDate = new Date(proposal.deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        
        // Professional name with fallback
        const professionalName = proposal.professionalId?.name || 'Unknown Professional';
        const professionalInitials = professionalName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        
        // Format submission date
        const submittedDate = new Date(proposal.createdAt);
        const timeAgo = Math.floor((new Date() - submittedDate) / (1000 * 60 * 60 * 24));
        const timeAgoText = timeAgo === 0 ? 'Today' : 
                           timeAgo === 1 ? 'Yesterday' : 
                           `${timeAgo} days ago`;

        return (
          <div 
            key={proposal._id} 
            className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-gradient-to-r from-white to-slate-50/50"
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {professionalInitials}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{professionalName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      Submitted {timeAgoText}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                      {proposal.professionalId?.currentJobStatus || 'Available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="text-right">
                <div className="text-xl font-bold text-slate-800">
                  ${proposal.budget}
                  <span className="text-sm font-normal text-slate-500 ml-1">
                    /{proposal.budgetType === 'fixed' ? 'project' : proposal.budgetType}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {proposal.budgetType === 'fixed' ? 'Fixed price' : 
                   proposal.budgetType === 'hourly' ? 'Hourly rate' : 'Monthly rate'}
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
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    Deadline: <span className="font-medium">{formatDate(proposal.deadline)}</span>
                  </span>
                  {daysLeft >= 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      daysLeft <= 3 ? 'bg-red-100 text-red-800' :
                      daysLeft <= 7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                    </span>
                  )}
                </div>

                {/* Resume Link */}
                {proposal.resume && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </span>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer">
                  View Details
                </button>
              </div>
            </div>

            {/* Ratings (if available) */}
            {proposal.professionalId?.review && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(proposal.professionalId.review.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-slate-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {proposal.professionalId.review.rating?.toFixed(1) || '0.0'} 
                  <span className="text-slate-400 ml-1">
                    ({proposal.professionalId.review.totalRatings || 0} reviews)
                  </span>
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
        <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">No Proposals Yet</h4>
      <p className="text-gray-600 max-w-md mx-auto">
        Be the first professional to submit a proposal for this bid. 
        Share your expertise and stand out from the competition!
      </p>
      <div className="mt-4 flex justify-center gap-2 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {timeLeft(singleBid.deadline)} left to apply
        </span>
        <span>•</span>
        <span>{singleBid.applicationLimit || 50} spots available</span>
      </div>
    </div>
  )}
</div>

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Help & Guidelines
              </h2>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <FiX className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Important Notes Section */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500 text-xl">📢</div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-3 text-lg">
                      Important Notes Before Applying
                    </h4>
                    <ul className="space-y-3 text-yellow-700">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-yellow-600">•</span>
                        <span>
                          Your proposal amount and timeline are binding if
                          selected. Make sure you can commit to your quoted
                          price and delivery date.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-yellow-600">•</span>
                        <span>
                          Ensure you have the capacity and resources to complete
                          the project within your proposed timeline.
                          Overcommitting can lead to penalties.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-yellow-600">•</span>
                        <span>
                          You cannot modify your proposal after submission.
                          Double-check all details before clicking submit.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-yellow-600">•</span>
                        <span>
                          The client will review all proposals after the
                          deadline:{" "}
                          <span className="font-semibold">
                            {formatDate(singleBid.deadline)}
                          </span>
                          . You will be notified if you're selected.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips for Success Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">💡</div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3 text-lg">
                      Tips for a Winning Proposal
                    </h4>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-blue-600">•</span>
                        <span>
                          <span className="font-medium">Be Specific:</span>{" "}
                          Clearly explain how you'll approach the project. Break
                          down your methodology and timeline.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-blue-600">•</span>
                        <span>
                          <span className="font-medium">
                            Show Relevant Experience:
                          </span>
                          Highlight similar projects you've completed and the
                          results you achieved.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-blue-600">•</span>
                        <span>
                          <span className="font-medium">Ask Questions:</span> If
                          anything is unclear in the bid description, it's
                          better to ask for clarification in your cover letter.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-blue-600">•</span>
                        <span>
                          <span className="font-medium">
                            Competitive Pricing:
                          </span>
                          Research market rates and price competitively. The
                          lowest bid isn't always selected - value matters.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Budget Guidelines Section */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-green-500 text-xl">💰</div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3 text-lg">
                      Budget Guidelines
                    </h4>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-green-600">•</span>
                        <span>
                          Original budget:{" "}
                          <span className="font-semibold">
                            ${singleBid.budget}
                            {getBudgetTypeText(singleBid.BudgetType)}
                          </span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-green-600">•</span>
                        <span>
                          Consider your costs, time investment, and desired
                          profit margin when proposing your budget.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-green-600">•</span>
                        <span>
                          Your proposed budget should reflect the value you
                          provide. Too low might suggest low quality, too high
                          might price you out.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-purple-500 text-xl">❓</div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3 text-lg">
                      Frequently Asked Questions
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-purple-700 mb-1">
                          Can I withdraw my proposal after submitting?
                        </h5>
                        <p className="text-purple-600 text-sm">
                          No, proposals cannot be withdrawn once submitted. Make
                          sure you're committed before submitting.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-700 mb-1">
                          When will I know if I'm selected?
                        </h5>
                        <p className="text-purple-600 text-sm">
                          The client will review proposals after the deadline (
                          {formatDate(singleBid.deadline)}). You'll receive a
                          notification if selected.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-700 mb-1">
                          What happens if I'm selected but can't complete the
                          work?
                        </h5>
                        <p className="text-purple-600 text-sm">
                          There are penalties for failing to deliver as
                          promised, including account restrictions and negative
                          reviews. Only commit if you can deliver.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setIsHelpModalOpen(false)}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Got It, Start My Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposeBidSection;
