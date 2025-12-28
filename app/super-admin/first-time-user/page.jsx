"use client";

import React from "react";

const SuperAdminInquiryDirectPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Inquiry Direct
        </h1>
        <p className="text-sm text-gray-500">
          Manage all direct inquiries received from users
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Inquiry List
          </h2>

          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add Inquiry
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Phone</th>
                <th className="px-4 py-3 border-b">Date</th>
                <th className="px-4 py-3 border-b">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-sm text-gray-700 hover:bg-gray-50">
                <td className="px-4 py-3 border-b">Rahul Sharma</td>
                <td className="px-4 py-3 border-b">rahul@gmail.com</td>
                <td className="px-4 py-3 border-b">9876543210</td>
                <td className="px-4 py-3 border-b">12 Aug 2025</td>
                <td className="px-4 py-3 border-b">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>

              {/* Empty state example */}
              {/* 
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  No inquiries found
                </td>
              </tr> 
              */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminInquiryDirectPage;
