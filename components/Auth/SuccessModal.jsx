"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, User, X, Home, Sparkles } from "lucide-react";

const SuccessModal = ({ onClose, userData }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSetProfile = () => {
    console.log("Redirect to profile setup");
    onClose();
    // You can add routing logic here:
    // router.push('/profile-setup');
    // Or emit an event to parent component
  };

  const handleContinue = () => {
    console.log("Continue to main app");
    onClose();
    // You can add routing logic here:
    // router.push('/dashboard') or router.push('/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className={`bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center relative transform transition-all duration-500 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Success animation/icon */}
        <div className="mb-6">
          <div className={`mx-auto w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-700 ${
            showAnimation ? 'rotate-0 scale-100' : 'rotate-180 scale-50'
          }`}>
            <CheckCircle className="text-green-500 w-10 h-10 drop-shadow-sm" />
          </div>
          
          <div className={`transform transition-all duration-500 delay-200 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              Welcome! 
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </h2>
            
            <p className="text-gray-600 text-base mb-2">
              Your phone number has been verified successfully
            </p>

            {userData && (
              <div className="bg-gray-50 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Phone:</span> {userData.phoneNumber}
                </p>
                {userData.uid && (
                  <p className="text-xs text-gray-500 mt-1">
                    User ID: {userData.uid.slice(0, 8)}...
                  </p>
                )}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-600">Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-blue-600">Secure</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className={`space-y-3 transform transition-all duration-500 delay-300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <button
            onClick={handleSetProfile}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <User size={18} />
            Complete Your Profile
          </button>
          
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Continue to App
          </button>
        </div>

        {/* Additional info */}
        <div className={`mt-6 transform transition-all duration-500 delay-400 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 mb-2">
              You can complete your profile anytime from settings
            </p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Authenticated
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                Saved
              </span>
            </div>
          </div>
        </div>

        {/* Celebration confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {showAnimation && (
            <>
              <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute top-12 left-8 w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-16 right-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute bottom-20 left-6 w-1 h-1 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute top-6 right-12 w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.7s'}}></div>
              <div className="absolute bottom-24 left-12 w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;