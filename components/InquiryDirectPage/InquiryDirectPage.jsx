"use client";

import React, { useState, useMemo } from "react";
import {
  Menu,
  Bell,
  ChevronDown,
  Search,
  Plus,
  List,
  MoreVertical,
  X,
} from "lucide-react";

// --- Mock Data ---
const NAV_ITEMS = [
  { name: "Dashboard", icon: "LayoutDashboard" },
  { name: "Inquiry Direct", icon: "MessageSquare" },
  { name: "In-clinic Consultation", icon: "Users" },
  { name: "Teleconsultation", icon: "Phone", count: 1 },
  { name: "Clinic", icon: "Home" },
  { name: "Setup", icon: "Settings" },
  { name: "Audit Logs", icon: "ScrollText" },
];

const METRICS = [
  { label: "New", count: 6, color: "bg-blue-100 text-blue-800 border-blue-300" },
  { label: "Interested", count: 3, color: "bg-green-100 text-green-800 border-green-300" },
  { label: "Future", count: 0, color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { label: "Not-interested", count: 0, color: "bg-red-100 text-red-800 border-red-300" },
  { label: "Cancel", count: 0, color: "bg-gray-100 text-gray-800 border-gray-300" },
];

const TABLE_DATA = [
  {
    id: "#09883",
    name: "Sheetal Dayal",
    phone: "9973827100",
    email: "sheetald@xyz.com",
    age: 50,
    city: "Nagpur",
    doctor: "Clinic-Kothrud, pune",
    assistant: "Dr-Ashwin",
    nextCall: "10/12/2025",
    agent: "Pranjal",
    notes: "Waiting For Salary",
    response: "Interested",
  },
  {
    id: "#09883",
    name: "Sheetal Dayal",
    phone: "9973827100",
    email: "sheetald@xyz.com",
    age: 50,
    city: "Mumbai",
    doctor: "Online Consultation",
    assistant: "",
    nextCall: "-",
    agent: "Alliya",
    notes: "Asking to wife",
    response: "Interested",
  },
  {
    id: "#09883",
    name: "Test Name",
    phone: "9973827100",
    email: "",
    age: null,
    city: "",
    doctor: "",
    assistant: "",
    nextCall: "-",
    agent: "Alliya",
    notes: "-",
    response: "New",
  },
];

// --- Helper Components ---
const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => (
  <div
    className={`fixed inset-y-0 left-0 transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-xl z-30 border-r border-gray-200`}
  >
    <div className="p-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">MEN10</h1>
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>
    </div>
    <nav className="p-4 space-y-1">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveTab(item.name)}
          className={`flex items-center w-full text-left p-3 rounded-lg text-sm transition-colors duration-200 group ${
            activeTab === item.name
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <List size={20} className="mr-3" />
          <span className="flex-grow">{item.name}</span>
          {item.count && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                activeTab === item.name
                  ? "bg-white text-blue-600"
                  : "bg-orange-500 text-white"
              }`}
            >
              0{item.count}
            </span>
          )}
        </button>
      ))}
    </nav>
  </div>
);

const Header = ({ toggleSidebar }) => (
  <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:pl-4">
    <div className="flex items-center">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-600 hover:text-gray-800 mr-4"
      >
        <Menu size={24} />
      </button>
      <h2 className="text-lg font-semibold text-gray-800 hidden lg:block">
        Inquiry Direct
      </h2>
    </div>

    <div className="flex items-center space-x-4">
      <div className="relative">
        <Bell size={20} className="text-gray-500" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center p-1">
          10
        </span>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          className="h-9 w-9 rounded-full object-cover border-2 border-green-500"
          src="https://placehold.co/100x100/1E40AF/ffffff?text=U"
          alt="User Avatar"
        />
        <ChevronDown size={16} className="text-gray-400" />
      </div>
    </div>
  </header>
);

const DataTable = ({ data }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500 tracking-wider">
        <tr>
          {[
            "ID",
            "Info",
            "Doctor/clinic",
            "Ass",
            "Next Call",
            "Agent / Lead",
            "Notes",
            "Response",
            "Actions",
          ].map((header) => (
            <th key={header} className="px-6 py-3 text-left whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-sm">
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-blue-50 transition-colors">
            <td className="px-6 py-4 text-gray-900 font-medium">{row.id}</td>
            <td className="px-6 py-4">
              <div className="font-semibold">
                {row.name} {row.age && `Age ${row.age}`}
              </div>
              <div className="text-gray-500">{row.phone}</div>
              {row.email && (
                <div className="text-xs text-gray-400">{row.email}</div>
              )}
              {row.city && (
                <div className="text-xs text-gray-400">{row.city}</div>
              )}
            </td>
            <td className="px-6 py-4">
              {row.doctor}
              <div className="text-xs text-gray-500">{row.assistant}</div>
            </td>
            <td className="px-6 py-4 text-gray-500">
              {row.assistant ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 text-gray-500">{row.nextCall}</td>
            <td className="px-6 py-4 text-gray-500">
              {row.agent}
              <div className="text-xs text-gray-400">login Fail</div>
            </td>
            <td className="px-6 py-4 text-gray-500">{row.notes}</td>
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  row.response === "Interested"
                    ? "bg-green-100 text-green-800"
                    : row.response === "New"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {row.response}
              </span>
            </td>
            <td className="px-6 py-4">
              <button className="text-gray-400 hover:text-gray-700">
                <MoreVertical size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Main Application Component ---
const InquiryDirectPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Inquiry Direct");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filteredData = useMemo(() => {
    if (!searchTerm) return TABLE_DATA;
    return TABLE_DATA.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "Inquiry Direct" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Inquiry Direct
                </h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                  <Plus size={16} className="mr-1" /> Sell
                </button>
              </div>
              <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl shadow mb-6">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className={`p-2 rounded-lg border ${metric.color}`}
                  >
                    {metric.count} {metric.label}
                  </div>
                ))}
                <div className="p-2 rounded-lg border bg-green-100 text-green-800 border-green-300">
                  00 Sell
                </div>
              </div>
              <div className="relative mb-6">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full max-w-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <DataTable data={filteredData} />
            </>
          )}

          {activeTab !== "Inquiry Direct" && (
            <div className="bg-white p-8 rounded-xl shadow text-center text-gray-600">
              <h2 className="text-lg font-medium mb-2">
                {activeTab} Section Coming Soon
              </h2>
              <p>This tab is not yet connected to data.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InquiryDirectPage;

