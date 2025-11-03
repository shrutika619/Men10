"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Menu, 
  X, 
  Plus, 
  Filter, 
  Clock, 
  Settings, 
  Users, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Star
} from "lucide-react";

export default function HospitalDashboardPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const [dropdownFilter, setDropdownFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hospitalData = {
    name: "Care Hospital Nagpur",
    address: "Wardha Rd, Jhansi Rani Sq, Nagpur",
    location: "Sitaburdi, Nagpur",
    logo: "/Images/care1.png",
  };

  // Sample booking data
  const sampleBookings = [
    {
      id: 1,
      orderId: "40298848",
      time: "10:30 AM",
      calledBy: "CASH ED",
      patientName: "Pavan Karchal",
      gender: "Male",
      age: "38",
      slot: "11 AM - 12 PM",
      doctorName: "Dr. Ram Sharma",
      doctorQualification: "MBBS, M.D Medicine",
      doctorSpecialty: "General Physician",
      doctorExp: "3 years",
      status: "Available",
      bookingStatus: "pending",
    },
    {
      id: 2,
      orderId: "41288848",
      time: "10:30 AM",
      calledBy: "CASH",
      issueId: "41238098",
      issue: "Low Sperm",
      patientName: "Pavan Karchal",
      gender: "Male",
      age: "38",
      bloodGroup: "O+",
      slot: "11 AM - 12 PM",
      doctorName: "Dr. Shankar Dayal",
      doctorQualification: "MBBS, M.D Medicine",
      doctorSpecialty: "General Physician",
      doctorExp: "3 years",
      status: "Available",
      bookingStatus: "pending",
    },
    {
      id: 3,
      orderId: "41288850",
      time: "11:30 AM",
      calledBy: "ONLINE",
      patientName: "Amit Sharma",
      gender: "Male",
      age: "42",
      slot: "2 PM - 3 PM",
      doctorName: "Dr. Priya Singh",
      doctorQualification: "MBBS, MS",
      doctorSpecialty: "Cardiologist",
      doctorExp: "5 years",
      status: "Available",
      bookingStatus: "booked",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBookings(sampleBookings);
      setLoading(false);
    }, 500);
  }, []);

  // Calculate stats
  const stats = {
    all: bookings.length,
    booked: bookings.filter((b) => b.bookingStatus === "booked").length,
    cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.bookingStatus === filterStatus;
  });

  const handleAcceptBooking = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: "booked" } : b
      )
    );
  };

  const handleRejectBooking = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: "cancelled" } : b
      )
    );
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hospitalToken");
      localStorage.removeItem("hospitalId");
    }
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 bg-white shadow-lg flex-col">
        {/* Hospital Profile */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{hospitalData.name}</h3>
              <p className="text-xs text-gray-500">{hospitalData.location}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Clock size={20} />
              <span>Time Table</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Doctors</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span>Terms & Conditions</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-pink-50 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-100 transition flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={24} />
        </button>

        {/* Hospital Profile */}
        <div className="p-6 pt-16 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{hospitalData.name}</h3>
              <p className="text-xs text-gray-500">{hospitalData.location}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Clock size={20} />
              <span>Time Table</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Doctors</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
            <ChevronRight size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg mb-2 text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span>Terms & Conditions</span>
            </div>
            <ChevronRight size={16} />
          </button>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <button
            onClick={handleLogout}
            className="w-full bg-pink-50 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm lg:text-base">{hospitalData.name}</h2>
                <p className="text-xs text-gray-500 hidden sm:block">{hospitalData.address}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Filter Section */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <select
              value={dropdownFilter}
              onChange={(e) => setDropdownFilter(e.target.value)}
              className="flex-1 min-w-[150px] border border-gray-300 px-4 py-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All requests</option>
              <option value="pending">Pending</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
              <Plus size={20} />
            </button>

            <button className="bg-white border border-gray-300 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
              <Filter size={20} />
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 lg:gap-3 mb-4 lg:mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 lg:px-6 py-2 rounded-full font-medium whitespace-nowrap text-sm ${
                filterStatus === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All {stats.all}
            </button>
            <button
              onClick={() => setFilterStatus("booked")}
              className={`px-4 lg:px-6 py-2 rounded-full font-medium whitespace-nowrap text-sm ${
                filterStatus === "booked"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Booked {stats.booked}
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 lg:px-6 py-2 rounded-full font-medium whitespace-nowrap text-sm ${
                filterStatus === "cancelled"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Cancelled {stats.cancelled}
            </button>
          </div>

          {/* Booking Cards */}
          <div className="flex flex-col gap-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  {/* Order Info */}
                  <div className="text-xs text-gray-500 mb-3">
                    • Order ID#{booking.orderId} • Today {booking.time} • Called: {booking.calledBy}
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-sm">{booking.patientName}</h4>
                      <p className="text-xs text-gray-500">
                        {booking.gender} • {booking.age} years
                        {booking.bloodGroup && ` • Blood group ${booking.bloodGroup}`}
                      </p>
                    </div>
                  </div>

                  {/* Slot */}
                  <div className="text-sm text-gray-600 mb-3">
                    Slot: Today {booking.slot}
                  </div>

                  {/* Issue */}
                  {booking.issue && (
                    <div className="text-sm text-gray-600 mb-3">
                      Order ID#{booking.issueId}<br />
                      {booking.issue}
                    </div>
                  )}

                  {/* Doctor Info */}
                  <div className="text-sm text-gray-500 mb-3">Booking for</div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div>
                        <h5 className="font-semibold text-sm">{booking.doctorName}</h5>
                        <p className="text-xs text-gray-500">{booking.doctorQualification}</p>
                        <p className="text-xs text-gray-500">
                          {booking.doctorSpecialty} • Exp - {booking.doctorExp}
                        </p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill="#FFA500" stroke="#FFA500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                      {booking.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {booking.bookingStatus === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAcceptBooking(booking.id)}
                        className="flex-1 bg-white text-teal-500 border border-teal-500 py-2 rounded-lg font-medium hover:bg-teal-50 transition text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectBooking(booking.id)}
                        className="flex-1 bg-white text-red-500 border border-red-500 py-2 rounded-lg font-medium hover:bg-red-50 transition text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {booking.bookingStatus === "booked" && (
                    <div className="bg-green-50 text-green-700 py-2 rounded-lg text-center font-medium text-sm">
                      ✓ Accepted
                    </div>
                  )}
                  {booking.bookingStatus === "cancelled" && (
                    <div className="bg-red-50 text-red-700 py-2 rounded-lg text-center font-medium text-sm">
                      ✗ Rejected
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}