import { NextResponse } from "next/server";
import axios from "axios";

global.otps = global.otps || {}; // keep OTPs in memory

export async function POST(req) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP in memory
  global.otps[phone] = otp;

  try {
    // Send SMS via Fast2SMS
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        route: "q",
        sender_id: "TXTIND", // use your Fast2SMS sender ID
        message: `Your OTP is ${otp}`,
        language: "english",
        numbers: phone,
      }),
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Fast2SMS error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
