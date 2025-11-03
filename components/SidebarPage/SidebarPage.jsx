"use client";

import React, { useState } from "react";

export default function SidebarPage({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "time-table", label: "Time Table", icon: "⏰" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "doctors", label: "Doctors", icon: "👨‍⚕️" },
    { id: "help", label: "Help", icon: "❓" },
    { id: "terms", label: "Terms & Conditions", icon: "📄" },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Hospital Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-purple-600 rounded"></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Care Hospital</h3>
            <p className="text-sm text-gray-500">Sitaburdi, Nagpur</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition ${
              activeMenu === item.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full bg-pink-50 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}