// "use client";

// import React, { useState, useEffect } from "react";
// import { signInWithPhoneNumber } from "firebase/auth";
// import OtpModal from "./OtpModal";
// import { auth, setupRecaptcha, cleanupRecaptcha } from "@/lib/firebase";

// const LoginModal = ({ onClose }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Cleanup reCAPTCHA on component unmount
//   useEffect(() => {
//     return () => {
//       cleanupRecaptcha();
//     };
//   }, []);

//   const handleGetOtp = async () => {
//     if (!phoneNumber || phoneNumber.length !== 10) {
//       setError("Please enter a valid 10-digit phone number");
//       return;
//     }

//     const formattedPhone = `+91${phoneNumber}`;
//     setLoading(true);
//     setError("");

//     try {
//       console.log("Setting up reCAPTCHA...");
      
//       // Setup reCAPTCHA
//       const appVerifier = setupRecaptcha("recaptcha-container");
      
//       console.log("Sending OTP to:", formattedPhone);
      
//       // Send OTP
//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         formattedPhone,
//         appVerifier
//       );
      
//       setConfirmationResult(confirmation);
//       setShowOtp(true);
//       console.log("✅ OTP sent successfully");
      
//     } catch (err) {
//       console.error("❌ Error sending OTP:", err);
      
//       // Handle specific errors
//       if (err.code === 'auth/invalid-phone-number') {
//         setError("Invalid phone number format");
//       } else if (err.code === 'auth/too-many-requests') {
//         setError("Too many requests. Please try again later");
//       } else if (err.code === 'auth/captcha-check-failed') {
//         setError("Captcha verification failed. Please try again");
//       } else if (err.code === 'auth/quota-exceeded') {
//         setError("SMS quota exceeded. Please try again later");
//       } else {
//         setError(err.message || "Failed to send OTP. Please try again");
//       }
      
//       // Clean up reCAPTCHA on error
//       cleanupRecaptcha();
//     }

//     setLoading(false);
//   };

//   const handleResendOtp = () => {
//     setShowOtp(false);
//     setConfirmationResult(null);
//     setError("");
//   };

//   if (showOtp) {
//     return (
//       <OtpModal
//         onClose={onClose}
//         phoneNumber={`+91${phoneNumber}`}
//         confirmationResult={confirmationResult}
//         onResend={handleResendOtp}
//       />
//     );
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] max-w-sm mx-4">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//             Login with Phone
//           </h2>
//           <p className="text-gray-600 text-sm">
//             We'll send you a verification code
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Phone Number
//           </label>
//           <div className="flex">
//             <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-medium">
//               +91
//             </span>
//             <input
//               type="tel"
//               placeholder="Enter 10-digit number"
//               value={phoneNumber}
//               onChange={(e) =>
//                 setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
//               }
//               className="flex-1 border border-gray-300 rounded-r-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               maxLength="10"
//               disabled={loading}
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-1">
//             We'll send a verification code to this number
//           </p>
//         </div>

//         {/* reCAPTCHA container */}
//         <div id="recaptcha-container" className="mb-4"></div>

//         <div className="space-y-3">
//           <button
//             onClick={handleGetOtp}
//             disabled={loading || phoneNumber.length !== 10}
//             className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Sending OTP...
//               </span>
//             ) : (
//               "Send OTP"
//             )}
//           </button>

//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
//           >
//             Cancel
//           </button>
//         </div>

//         <div className="mt-4 text-center">
//           <p className="text-xs text-gray-500">
//             By continuing, you agree to our Terms of Service
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;