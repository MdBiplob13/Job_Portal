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
          toast.success('Proposal submitted successfully!');
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

      {/* Existing Applications Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recent Proposals</h3>
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer">
            View All ({singleBid.applicationCount || 0})
          </button>
        </div>

        {singleBid.applicationCount > 0 ? (
          <div className="space-y-4">
            {/* Example proposal item - you would map through actual proposals */}
            <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    JS
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">John Smith</h4>
                    <p className="text-sm text-gray-500">
                      Submitted 2 days ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$5,500</div>
                  <div className="text-sm text-gray-500">Proposed</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Timeline: 3 months</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Under Review
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-green-600 font-bold">
                    MK
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Maria Khan</h4>
                    <p className="text-sm text-gray-500">Submitted 1 day ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">$4,800</div>
                  <div className="text-sm text-gray-500">Proposed</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Timeline: 2.5 months</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  New
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              No Proposals Yet
            </h4>
            <p className="text-gray-600">
              Be the first to submit a proposal for this bid!
            </p>
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
