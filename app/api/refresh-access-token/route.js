import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as Constants from "node:constants";

export async function POST() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
        return NextResponse.json({ success: false, message: "No refresh token found" }, { status: 401 });
    }

    try {
        const res = await fetch(Constants.urlEndPoints.REFRESH_ACCESS_TOKEN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            return NextResponse.json({ success: false, message: "Failed to refresh token" }, { status: res.status });
        }

        const data = await res.json();
        const { accessToken } = data.data;

        // Update the access_token cookie
        const response = NextResponse.json({ success: true, accessToken });
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 15, // 15 minutes
        });

        return response;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
