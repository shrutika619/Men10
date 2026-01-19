"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendLoginOtp, verifyLoginOtp } from "@/app/services/auth.service";

const OTPLogin = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [step, setStep] = useState("send"); 
  // send | verify | success | profile
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("male");

  const isValidPhone = (num) => /^[6-9]\d{9}$/.test(num);

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!isValidPhone(phone)) {
      setMessage("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await sendLoginOtp(phone);
      setMessage(res.message);
      setStep("verify");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setMessage("Enter valid OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyLoginOtp(phone, finalOtp);
      const { accessToken, refreshToken } = res.data;

      // 🔒 TOKEN LOGIC (UNCHANGED)
      await fetch("/api/set-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      toast.success(res.message);
      setStep("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg text-center">

        {/* ================= SEND OTP ================= */}
        {step === "send" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Login</h2>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className="border rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* ================= VERIFY OTP ================= */}
        {step === "verify" && (
          <>
            <h2 className="text-lg font-semibold mb-2">Login</h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter OTP received on xxxxxx{phone.slice(-4)}
            </p>

            <div className="flex justify-between mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-10 h-10 border text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded mb-2"
            >
              {loading ? "Verifying..." : "Submit"}
            </button>

            <button
              onClick={sendOtp}
              className="border border-blue-600 text-blue-600 w-full py-2 rounded hover:bg-blue-50 transition"
            >
              Resend OTP
            </button>
          </>
        )}

        {/* ================= SUCCESS ================= */}
        {step === "success" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-green-500 text-green-600 text-xl">
                ✓
              </div>
            </div>

            <p className="mb-4 font-medium">Register Successfully</p>

            <button
              onClick={() => setStep("profile")}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded mb-2"
            >
              Set Profile
            </button>

            <button
              onClick={() => router.push("/")}
              className="border border-blue-600 text-blue-600 w-full py-2 rounded hover:bg-blue-50 transition"
            >
              Skip
            </button>
          </>
        )}

        {/* ================= PROFILE ================= */}
        {step === "profile" && (
          <>
            <div className="flex mb-4 rounded overflow-hidden border">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-2 text-sm font-medium ${
                  gender === "male"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                Male
              </button>

              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-2 text-sm font-medium ${
                  gender === "female"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                Female
              </button>
            </div>

            <input
              placeholder="Name"
              className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Enter Age"
              className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Mail"
              className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded"
            >
              Save
            </button>
          </>
        )}

        {/* ================= MESSAGE ================= */}
        {message && (
          <p
            className={`text-sm mt-3 ${
              step === "verify" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPLogin;
