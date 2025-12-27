"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginAdminPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState("ADMIN"); // ADMIN | SUPER_ADMIN

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // 🔐 DEMO API RESPONSE (later backend se aayega)
    const response = {
      role: loginMode,
    };

    // ✅ ROLE BASED REDIRECT (IMPORTANT FIX)
    if (response.role === "ADMIN") {
      router.push("/admin/admindashboard");
    }

    if (response.role === "SUPER_ADMIN") {
      router.push("/super-admin/super-admindashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">MEN10</h1>
            <p className="text-gray-600 text-sm">Welcome Back</p>
            <p className="text-gray-400 text-xs">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mb-6">
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLoginMode("ADMIN")}
                className={`flex-1 py-2 rounded-md text-sm font-medium ${
                  loginMode === "ADMIN"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setLoginMode("SUPER_ADMIN")}
                className={`flex-1 py-2 rounded-md text-sm font-medium ${
                  loginMode === "SUPER_ADMIN"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600"
                }`}
              >
                Super Admin
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button className="text-sm text-blue-600">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            Sign In to Dashboard
          </button>

          {/* Role info */}
          <p className="mt-6 text-xs text-center text-gray-500">
            Logging in as{" "}
            <span className="font-semibold text-blue-600">
              {loginMode === "ADMIN"
                ? "Administrator"
                : "Super Administrator"}
            </span>
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          © 2024 MEN10. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginAdminPage;
