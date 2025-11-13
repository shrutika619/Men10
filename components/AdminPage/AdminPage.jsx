"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MoreVertical,
  Filter,
  LayoutDashboard,
  MessageSquare,
  Stethoscope,
  Video,
  Building2,
  Settings,
  FileText,
  Bell,
  Menu,
} from "lucide-react";

const hospitals = [
  {
    id: "#DR9087",
    name: "Care Multi Specialist Hospital",
    contact: "9987909023",
    email: "care@abc.com",
    address: "Wardha Rd, Sita Burdi, Nagpur.",
    doctors: "10 Doctors",
    status: "Active",
  },
  {
    id: "#DR9088",
    name: "City Health Hospital",
    contact: "9876543210",
    email: "city@abc.com",
    address: "Ambazari Rd, Nagpur.",
    doctors: "12 Doctors",
    status: "Active",
  },
];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Setup"); // Default Setup pe
  const [selectedCity, setSelectedCity] = useState("City");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Inquiry Direct", icon: MessageSquare },
    { name: "In-clinic Consultation", icon: Stethoscope },
    { name: "Teleconsultation", icon: Video, badge: "01" },
    { name: "Clinic", icon: Building2 },
    { name: "Setup", icon: Settings },
    { name: "Audit Logs", icon: FileText },
    { name: "Team", icon: FileText },
  ];

  const cities = ["Nagpur", "Mumbai", "Pune", "Delhi", "Bangalore"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="px-6 py-5 border-b flex items-center gap-3">
          {/* MEN10 Logo */}
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center -ml-2">
              <span className="text-white font-bold text-sm">10</span>
            </div>
          </div>
          <span className="text-xl font-semibold text-gray-800">MEN10</span>
        </div>

        <nav className="p-3 flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <li
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);

                    // Dashboard click → /admindashboard page
                    if (item.name === "Dashboard") {
                      router.push("/admindashboard");
                    }
                    // Clinic click → /clinics page
                    else if (item.name === "Clinic") {
                      router.push("/clinics");
                    }
                    // Team click → /team page
                    else if (item.name === "Team") {
                      router.push("/team");
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors relative ${
                    isActive
                      ? "bg-blue-500 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="absolute right-3 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-700">Setup</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                <Bell className="w-5 h-5 text-red-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  3
                </span>
              </button>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg hover:opacity-90 transition-opacity"></button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  <Filter size={16} />
                  <span>{selectedCity}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showCityDropdown && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-10">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">
                06 New
              </div>
              <div className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg font-medium">
                03 Active
              </div>
              <div className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-lg font-medium">
                00 Inactive
              </div>
              <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium">
                00 Block
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctors
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {hospitals.map((hosp, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {hosp.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 font-semibold">
                          C
                        </div>
                        <span className="text-gray-900 font-medium">
                          {hosp.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{hosp.contact}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {hosp.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{hosp.address}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {hosp.doctors}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        {hosp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}