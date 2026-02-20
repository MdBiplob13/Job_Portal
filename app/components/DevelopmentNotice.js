"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function DevelopmentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Use localStorage for permanent dismissal, or sessionStorage for per-session
    // Change 'localStorage' to 'sessionStorage' if you want the popup to reappear after browser restart
    const storage = localStorage; // or sessionStorage

    const dismissed = storage.getItem("devPopupDismissed");
    console.log("Dismissed value:", dismissed); // Check console to see what's stored

    if (dismissed !== "true") {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Use the same storage as above
    localStorage.setItem("devPopupDismissed", "true");
    // sessionStorage.setItem("devPopupDismissed", "true"); // uncomment if using sessionStorage
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Under Development
          </h3>
          <p className="text-gray-600 mb-6">
            This website is currently in development. Some features may not work as expected. Thank you for your patience!
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue to Site
          </button>
        </div>
      </div>
    </div>
  );
}