"use client";
import React, { useState } from 'react';
import {
  Bell, Calendar, Users, Settings, LogOut, Menu, X, Home, FileText, Clock, Phone, Mail, MapPin
} from 'lucide-react';

const HospitalDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const hospitalData = {
    name: "Meditrina Hospital",
    area: "Kothrud",
    city: "Pune",
    phone: "+91 9876543210",
    email: "info@meditrina.com"
  };

  const todayBookings = [
    { id: 1, patientName: "Rahul Sharma", time: "10:00 AM", doctor: "Dr. Amit Verma", status: "confirmed" },
    { id: 2, patientName: "Priya Patel", time: "11:30 AM", doctor: "Dr. Neha Singh", status: "pending" },
    { id: 3, patientName: "Arjun Kumar", time: "02:00 PM", doctor: "Dr. Amit Verma", status: "confirmed" },
    { id: 4, patientName: "Sneha Reddy", time: "03:30 PM", doctor: "Dr. Rajesh Khanna", status: "pending" }
  ];

  const stats = [
    { label: "Today's Bookings", value: "12", icon: Calendar, color: "bg-blue-500" },
    { label: "Pending Requests", value: "5", icon: Clock, color: "bg-yellow-500" },
    { label: "Total Patients", value: "248", icon: Users, color: "bg-green-500" },
    { label: "Active Doctors", value: "8", icon: Users, color: "bg-indigo-500" }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white w-64 min-h-screen border-r border-gray-200 fixed lg:static transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">MEN10</h1>
          <p className="text-sm text-gray-500 mt-1">Hospital Partner</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{hospitalData.name}</h2>
                <p className="text-sm text-gray-500">{hospitalData.area}, {hospitalData.city}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={22} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                M
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-6">
            <h3 className="text-2xl font-bold mb-2">Welcome to MEN10 Partnership! 🎉</h3>
            <p className="text-blue-100">Your hospital has been successfully registered. Start managing your bookings now.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Today's Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Today's Bookings</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your appointments for today</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {todayBookings.map(booking => (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {booking.patientName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{booking.patientName}</h4>
                        <p className="text-sm text-gray-500">{booking.doctor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{booking.time}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                          Accept
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Contact Info */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Hospital Contact Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">{hospitalData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{hospitalData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800">{hospitalData.area}, {hospitalData.city}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
