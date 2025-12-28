"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  ChevronDown, 
  Calendar 
} from "lucide-react";

const AdminFirstTimeUserPage = () => {
  // --- State for Search and Filter ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");

  // --- Sample Data based on image ---
  const userData = [
    {
      id: "#09883",
      name: "Sheetal Dayal",
      age: 50,
      phone: "9973827100",
      email: "sheetald@xyz.com",
      location: "Nagpur",
      assessmentDate: "10/12/2025",
      assessmentTime: "12:40 PM",
      leadUpdateDate: "10/12/2025",
      leadUpdateTime: "12:40 PM",
      leadStatus: "Login Fail",
      assignTo: "Pranjal",
      source: "Website",
    },
    {
      id: "#09883",
      name: "Kunal Joshi",
      age: 36,
      phone: "9973827100",
      email: "Kunal@xyz.com",
      location: "Pune",
      assessmentDate: "10/12/2025",
      assessmentTime: "12:40 PM",
      leadUpdateDate: "10/12/2025",
      leadUpdateTime: "12:40 PM",
      leadStatus: "Login",
      assignTo: "Pranjal",
      source: "Website",
    },
    {
      id: "#09883",
      name: "Sheetal Dayal",
      age: 50,
      phone: "9973827100",
      email: "sheetald@xyz.com",
      location: "Nagpur",
      assessmentDate: "10/12/2025",
      assessmentTime: "12:40 PM",
      leadUpdateDate: "10/12/2025",
      leadUpdateTime: "12:40 PM",
      leadStatus: "Login Fail",
      assignTo: "Pranjal",
      source: "Website",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* --- Top Header / Filters --- */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative">
          <select 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 rounded-lg text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold border border-blue-100 flex items-center gap-1">
          <span className="text-sm">06</span>
          <span className="uppercase tracking-wider">New</span>
        </div>
      </div>

      {/* --- Search and Action Bar --- */}
      <div className="flex items-center gap-3 mb-4">
        <button className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
          <Filter className="w-5 h-5 text-gray-500" />
        </button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Assessment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Lead Update</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Assign To</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {userData.map((user, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm leading-relaxed">
                      <p className="font-semibold text-gray-800">{user.name} Age {user.age}</p>
                      <p className="text-gray-500">{user.phone}</p>
                      <p className="text-gray-500">{user.email}</p>
                      <p className="text-gray-500">{user.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div className="text-[11px] text-gray-400 font-medium">
                        <p>{user.assessmentDate}</p>
                        <p>{user.assessmentTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-500 mb-1">{user.leadUpdateDate}</p>
                      <p className="text-gray-500 mb-1">{user.leadUpdateTime}</p>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        user.leadStatus === "Login Fail" ? "text-red-500" : "text-green-600"
                      }`}>
                        {user.leadStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.assignTo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.source}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-block border border-gray-100 shadow-sm">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFirstTimeUserPage;