"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell, FileText, Video, Calendar, Stethoscope, Filter,
  LayoutDashboard, Users, Settings, Building2, ScrollText,
  MessageSquare, Menu, Search, MoreVertical
} from 'lucide-react';

const AdminDashboardPage = () => {
  const router = useRouter();

  const [notifications] = useState(10);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [selectedCity, setSelectedCity] = useState('City');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', badge: null },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiry Direct', badge: null },
    { icon: <Building2 className="w-5 h-5" />, label: 'In-clinic Consultation', badge: null },
    { icon: <Video className="w-5 h-5" />, label: 'Teleconsultation', badge: 1 },
    { icon: <Stethoscope className="w-5 h-5" />, label: 'Clinic', badge: null },
    { icon: <Settings className="w-5 h-5" />, label: 'Setup', badge: null },
    { icon: <ScrollText className="w-5 h-5" />, label: 'Audit Logs', badge: null },
    { icon: <Users className="w-5 h-5" />, label: 'Team', badge: null }
  ];

  const cities = ['Nagpur', 'Mumbai', 'Pune', 'Delhi', 'Bangalore'];

  const hospitals = [
    {
      id: '#DR9087',
      name: 'Care Multi Specialist Hospital',
      contact: '9987909023',
      email: 'care@abc.com',
      address: 'Wardha Rd, Sita Burdi, Nagpur.',
      doctors: '10 Doctors',
      status: 'Active'
    },
    {
      id: '#DR9088',
      name: 'City Health Hospital',
      contact: '9876543210',
      email: 'city@abc.com',
      address: 'Ambazari Rd, Nagpur.',
      doctors: '12 Doctors',
      status: 'Active'
    }
  ];

  const handlePlaceOrder = (service) => {
    alert(`Place Order clicked for ${service}`);
  };

  const handleStatClick = (service, stat) => {
    alert(`Clicked ${stat.label} (${stat.value}) in ${service}`);
  };

  const serviceCards = [
    {
      icon: <FileText className="w-8 h-8 text-gray-700" />,
      title: "Inquiry Direct",
      stats: [
        { label: "New", value: "03", bg: "bg-purple-100" },
        { label: "Not Interested", value: "00", bg: "bg-orange-50" },
        { label: "50/50", value: "01", bg: "bg-yellow-50" },
        { label: "Closed", value: "01", bg: "bg-pink-50" },
        { label: "Offline", value: "12", bg: "bg-purple-100" },
        { label: "Complete", value: "03", bg: "bg-teal-100" }
      ]
    },
    {
      icon: <Calendar className="w-8 h-8 text-gray-700" />,
      title: "Assessment Inquiry",
      stats: [
        { label: "New", value: "03", bg: "bg-purple-100" },
        { label: "Not Interested", value: "00", bg: "bg-orange-50" },
        { label: "50/50", value: "01", bg: "bg-yellow-50" },
        { label: "Closed", value: "01", bg: "bg-pink-50" },
        { label: "Offline", value: "12", bg: "bg-purple-100" },
        { label: "Complete", value: "03", bg: "bg-teal-100" }
      ]
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-gray-700" />,
      title: "In Clinic Consultation",
      stats: [
        { label: "New", value: "03", bg: "bg-purple-100" },
        { label: "Not Interested", value: "00", bg: "bg-orange-50" },
        { label: "50/50", value: "01", bg: "bg-yellow-50" },
        { label: "Closed", value: "01", bg: "bg-pink-50" },
        { label: "Online", value: "12", bg: "bg-purple-100" },
        { label: "Complete", value: "03", bg: "bg-teal-100" }
      ]
    },
    {
      icon: <Video className="w-8 h-8 text-gray-700" />,
      title: "Teleconsultation",
      stats: [
        { label: "New", value: "03", bg: "bg-purple-100" },
        { label: "Done", value: "03", bg: "bg-teal-100" },
        { label: "Pending", value: "00", bg: "bg-yellow-50" },
        { label: "Canceled", value: "01", bg: "bg-pink-50" },
        { label: "Sell Done", value: "01", bg: "bg-orange-50" },
        { label: "Sell Done", value: "12", bg: "bg-yellow-50" }
      ]
    }
  ];

  // Updated handler with Clinic & Team redirects
  const handleMenuClick = (label) => {
    if (label === 'Clinic') {
      router.push('/clinics');
      return;
    }
    if (label === 'Team') {
      router.push('/team');
      return;
    }
    setActiveMenu(label);
  };

  const renderDashboard = () => (
    <div className="space-y-5">
      {serviceCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gray-50 rounded-lg">
                {card.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900">{card.title}</h3>
            </div>
            <button
              className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              onClick={() => handlePlaceOrder(card.title)}
            >
              Place Order
            </button>
          </div>
          <div className="grid grid-cols-6 divide-x divide-gray-100">
            {card.stats.map((stat, statIndex) => (
              <button
                key={statIndex}
                onClick={() => handleStatClick(card.title, stat)}
                className={`p-5 text-center hover:opacity-75 transition-all ${stat.bg}`}
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSetup = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              <span>{selectedCity}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
          <div className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">06 New</div>
          <div className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg font-medium">03 Active</div>
          <div className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-lg font-medium">00 Inactive</div>
          <div className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium">00 Block</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctors</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hospitals.map((hosp, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900 font-medium">{hosp.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 font-semibold">
                      C
                    </div>
                    <span className="text-gray-900 font-medium">{hosp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{hosp.contact}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{hosp.email}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{hosp.address}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{hosp.doctors}</td>
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
    </>
  );

  const renderContent = () => {
    if (activeMenu === 'Clinic' || activeMenu === 'Team') return null;

    switch (activeMenu) {
      case 'Dashboard':
        return renderDashboard();
      case 'Setup':
        return renderSetup();
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{activeMenu}</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600">MEN10</h1>
        </div>
        <nav className="flex-1 p-5">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuClick(item.label)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg text-base font-medium transition-colors relative ${
                    activeMenu === item.label && item.label !== 'Clinic' && item.label !== 'Team'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content - Hidden when on Clinic or Team page */}
      {(activeMenu !== 'Clinic' && activeMenu !== 'Team') && (
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">{activeMenu}</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded transition-colors">
                  <Bell className="w-5 h-5 text-gray-700" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center rounded-full font-bold">
                      {notifications}
                    </span>
                  )}
                </button>
                <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src="https://ui-avatars.com/api/?name=AD&background=3b82f6&color=fff&bold=true"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
            {activeMenu === 'Dashboard' && (
              <div className="px-6 pb-4">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;