"use client";
import React, { useState } from "react";
import LoginModal from "@/components/Auth/LoginModal";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => setShowLogin(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Open Login
      </button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
