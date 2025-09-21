import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });
  }

  // Check OTP from memory
  if (global.otps && global.otps[phone] === otp) {
    delete global.otps[phone]; // clear OTP after use
    return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });
  }

  return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
}
