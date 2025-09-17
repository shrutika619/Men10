"use client";

import React, { useState, useRef, useEffect } from "react";
import SuccessModal from "./SuccessModal";

const OtpModal = ({ onClose, phoneNumber, confirmationResult, onResend }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear error when user starts typing
    if (error) setError("");
    
    // Auto-focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // Clear current input on backspace
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setOtp(newOtp);
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Verify OTP
  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("🔐 Verifying OTP:", otpCode);
      
      // Confirm OTP with Firebase
      const result = await confirmationResult.confirm(otpCode);
      const user = result.user;
      
      console.log("✅ User signed in:", user.uid);

      // Get Firebase token
      const token = await user.getIdToken();

      // Save user to database via API
      const response = await fetch("/api/auth/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName || null,
          email: user.email || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save user');
      }

      const savedUserData = await response.json();
      console.log("✅ User saved successfully:", savedUserData);

      // Set user data and show success modal
      setUserData(savedUserData.user);
      setShowSuccess(true);

    } catch (err) {
      console.error("❌ Error verifying OTP:", err);
      
      // Handle specific errors
      if (err.code === 'auth/invalid-verification-code') {
        setError("Invalid OTP. Please check and try again.");
      } else if (err.code === 'auth/code-expired') {
        setError("OTP has expired. Please request a new one.");
      } else if (err.message.includes('Failed to save user')) {
        setError("Authentication successful but failed to save user data.");
      } else {
        setError("Invalid OTP. Please try again.");
      }
      
      // Reset OTP input
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setLoading(false);
  };

  // Handle resend OTP
  const handleResend = () => {
    if (canResend && onResend) {
      setCanResend(false);
      setResendTimer(60);
      setError("");
      setOtp(["", "", "", "", "", ""]);
      onResend();
    }
  };

  // Show success modal if verification successful
  if (showSuccess) {
    return <SuccessModal onClose={onClose} userData={userData} />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] max-w-sm mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to<br />
            <span className="font-medium text-gray-800">
              xxxxxx{phoneNumber?.slice(-4) || "****"}
            </span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between mb-6 gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={loading || otp.some(digit => !digit)}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">
            Didn't receive the code?
          </p>
          
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-400 text-sm">
              Resend in {resendTimer}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;