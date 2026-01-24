"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendLoginOtp, verifyLoginOtp } from "@/app/services/auth.service";

// ✅ NEW IMPORTS
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";

const OTPLogin = () => {
  const router = useRouter();

  // ✅ INIT DISPATCH
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [step, setStep] = useState("send");
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
      toast.success("OTP Sent!");
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

      const payload = res.data?.data || res.data || {};
      const { accessToken, refreshToken, user } = payload;

      if (!accessToken) {
        if (payload.status === "pending") {
          throw new Error("Your account is pending approval.");
        }
        throw new Error("Login failed: Access Token missing.");
      }

      // 1️⃣ Set Session Cookies (Server-side auth)
      await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          role: "patient",
        }),
      });
      console.log(accessToken)
      // 2️⃣ ✅ UPDATE REDUX AUTH STATE (THIS WAS MISSING)
      dispatch(
        loginSuccess({
          token: accessToken,
          role: "patient",
          user: user || null,
        })
      );

      // 3️⃣ UI Feedback
      toast.success("Login Successful");
      setStep("success");

    } catch (err) {
      console.error("Login Error:", err);
      setMessage(err.response?.data?.message || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT HELPER ================= */
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

        {/* SEND OTP */}
        {step === "send" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Mobile Number"
              className="border rounded w-full p-2 mb-4"
              maxLength={10}
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* VERIFY OTP */}
        {step === "verify" && (
          <>
            <h2 className="text-lg font-semibold mb-2">Login</h2>
            <div className="flex justify-between mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-10 h-10 border text-center rounded"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-blue-600 text-white w-full py-2 rounded mb-2"
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
          </>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <>
            <p className="mb-4 font-medium">Login Successful</p>

            <button
              onClick={() => setStep("profile")}
              className="bg-blue-600 text-white w-full py-2 rounded mb-2"
            >
              Set Profile
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="border border-blue-600 text-blue-600 w-full py-2 rounded"
            >
              Skip & Go Home
            </button>
          </>
        )}

        {/* MESSAGE */}
        {message && (
          <p className="text-sm mt-3 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default OTPLogin;
