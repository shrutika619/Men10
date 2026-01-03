import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { accessToken, refreshToken } = await request.json();

        if (!accessToken || !refreshToken) {
            return NextResponse.json({ success: false, message: "Missing tokens" }, { status: 400 });
        }

        const response = NextResponse.json({
            success: true,
            message: "Tokens set successfully",
        });

        // Set HttpOnly cookies
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 15, // 15 minutes
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Error setting tokens:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
