import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Constants } from "@/app/utils/constants"; 

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // 1. Notify Backend (Best Effort)
  if (accessToken) {
    try {
      await fetch(Constants.urlEndPoints.LOGOUT, {
        method: "POST",
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error("Backend logout warning:", error.message);
    }
  }

  // 2. Prepare the Response
  const response = NextResponse.json({ 
    success: true, 
    message: "Logged out successfully" 
  });

  // 3. FORCE DELETE COOKIES (Matching Set-Session Logic)
  // We use the exact same variable as your set-session route
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    path: "/",       // Matches set-session
    sameSite: "lax", // Matches set-session
    secure: isProduction, // ✅ CRITICAL: Matches set-session (False on Local, True on Prod)
    maxAge: 0,       // Forces immediate expiration
    expires: new Date(0) // Sets date to 1970
  };

  // Delete Access Token (Must specify httpOnly: true to match creation)
  response.cookies.set("accessToken", "", { 
    ...cookieOptions, 
    httpOnly: true 
  });

  // Delete Refresh Token (Must specify httpOnly: true to match creation)
  response.cookies.set("refreshToken", "", { 
    ...cookieOptions, 
    httpOnly: true 
  });

  // Delete User Role (Must specify httpOnly: false to match creation)
  response.cookies.set("userRole", "", { 
    ...cookieOptions, 
    httpOnly: false 
  });

  return response;
}