"use client";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: March 2025</p>

          <div className="space-y-6 text-gray-700">
            <p>
              At BidPole, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">1. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, phone number, and professional details when you register, post a job, or communicate with us. We also automatically collect usage data like IP address, browser type, and pages visited.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">2. How We Use Your Information</h2>
            <p>
              Your information helps us to provide and improve our services, process transactions, send notifications, and personalize your experience. We may also use it to communicate with you about updates or promotions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">3. Sharing Your Information</h2>
            <p>
              We do not sell your personal information. We may share it with service providers who assist us in operating our platform, or when required by law. Your information may also be shared with other users as necessary for the bidding process (e.g., employers see freelancer profiles).
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@bidpole.com.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">6. Cookies</h2>
            <p>
              We use cookies to enhance your experience. You can set your browser to refuse cookies, but some features may not function properly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at support@bidpole.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}