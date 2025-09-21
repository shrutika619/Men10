"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar"; // import Navbar

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterPhone");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep("enterOtp");
      setMessage("OTP sent successfully!");
    } else {
      setMessage(data.error || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setMessage("✅ Login successful!");
    else setMessage(data.error || "❌ Invalid OTP");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <h1 className="text-2xl font-bold">Login with OTP</h1>

        {step === "enterPhone" && (
          <>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded"
            />
            <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2 rounded">Send OTP</button>
          </>
        )}

        {step === "enterOtp" && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded"
            />
            <button onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2 rounded">Verify OTP</button>
          </>
        )}

        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </>
  );
}
