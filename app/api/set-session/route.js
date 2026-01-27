import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken, role } = body;

    // Validate input
    if (!accessToken || !role) {
      return NextResponse.json({ error: "Missing token or role" }, { status: 400 });
    }

    // ✅ FIX: 'await' is now required here
    const cookieStore = await cookies();

    // 1. Set Access Token (Secure, HttpOnly)
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, 
    });

    // 2. Set Refresh Token (Secure, HttpOnly)
    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    // 3. Set User Role (NOT HttpOnly - Visible to Navbar)
    cookieStore.set("userRole", role, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session Route Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}