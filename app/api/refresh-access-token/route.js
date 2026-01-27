import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  // 1. Get the refresh token from the user's existing cookies
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    // 2. Call your Backend (The code you provided)
    const backendResponse = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!backendResponse.ok) {
      throw new Error("Backend failed to refresh");
    }

    const data = await backendResponse.json();
    const { accessToken, refreshToken: newRefreshToken } = data.data; // Extract from ApiResponse

    // 3. Update Cookies in the Browser (Matches PDF logic)
    // Access Token
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 mins
    });

    // Refresh Token (Rotation)
    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}