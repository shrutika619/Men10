"use client";
import { useState } from "react";
import axios from "axios";
import {Constants} from "@/app/utils/constants";

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("send"); // "send" → "verify"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Validate phone number
  const isValidPhone = (num) => /^[6-9]\d{9}$/.test(num);

  // Send OTP API call
  const sendOtp = async () => {
    if (!isValidPhone(phone)) {
      setMessage("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(Constants.urlEndPoints.SEND_OTP, {
        mobileNo: phone,
      });
      setMessage(res.data.message || "OTP sent successfully");
      setStep("verify");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP API call
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage("Enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(Constants.urlEndPoints.VERIFY_OTP, {
        mobileNo: phone,
        otp,
      });

      console.log(res.data);
      const { accessToken, refreshToken } = res.data.data;

      // Send tokens to Next.js API route to set HttpOnly cookies
      await fetch("/api/set-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      setMessage(res.data.message || "OTP verified successfully");

      // TODO : Redirect user here

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h1 className="text-xl font-bold mb-4">Login with OTP</h1>

        {step === "send" && (
          <>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className="border p-2 w-full mb-3 rounded"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 w-full rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "verify" && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 w-full mb-3 rounded"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 w-full rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p
              className="mt-2 text-blue-500 cursor-pointer text-sm"
              onClick={() => setStep("send")}
            >
              Resend OTP
            </p>
          </>
        )}

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default OTPLogin;