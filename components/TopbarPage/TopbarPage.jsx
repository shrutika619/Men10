"use client";

import React from "react";

export default function TopbarPage({ hospital }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded"></div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{hospital.name}</h2>
          <p className="text-sm text-gray-500">{hospital.address}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
        <span className="text-2xl text-gray-600">☰</span>
      </button>
    </div>
  );
}