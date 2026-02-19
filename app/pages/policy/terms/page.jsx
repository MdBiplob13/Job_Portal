"use client";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

export default function TermsOfService() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: March 2025</p>

          <div className="space-y-6 text-gray-700">
            <p>
              Welcome to BidPole! By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Acceptance of Terms</h2>
            <p>
              By creating an account, posting a job, or placing a bid, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you may not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information and to update it as necessary. You are solely responsible for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. Use of Services</h2>
            <p>
              BidPole connects employers with freelancers. We do not guarantee project outcomes or the quality of work. Users must comply with all applicable laws and refrain from posting illegal or offensive content.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Fees and Payments</h2>
            <p>
              Certain features may be subject to fees. All fees are non-refundable except as required by law. Payment processing is handled by third-party providers; we are not responsible for their errors or actions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">5. Intellectual Property</h2>
            <p>
              All content on the platform, including logos, text, and software, is the property of BidPole or its licensors and is protected by copyright and other laws. You may not copy, modify, or distribute our content without permission.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, BidPole shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the fees you paid to us in the past six months.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">7. Termination</h2>
            <p>
              We may suspend or terminate your account at any time for violations of these Terms or for any other reason at our sole discretion.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">8. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@bidpole.com.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}