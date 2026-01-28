import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    
    const backendResponse = await fetch(`${backendUrl}/api/v1/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!backendResponse.ok) {
      throw new Error("Backend failed to refresh");
    }

    const data = await backendResponse.json();
    
    const { accessToken, refreshToken: newRefreshToken } = data.data;

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", 
      maxAge: 15 * 60, 
    });

    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, 
    });

    return NextResponse.json({ 
      success: true, 
      accessToken: accessToken 
    });

  } catch (error) {
    console.error("Refresh API Route Error:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}