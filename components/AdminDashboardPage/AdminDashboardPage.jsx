"use client"
import React, { useState } from 'react'
import { Bell, FileText, Video, Calendar, Stethoscope, Filter, ChevronLeft } from 'lucide-react'

const AdminDashboardPage = () => {
  const [notifications] = useState(1)

  const handleBackClick = () => {
    // Navigate to admin page
    window.location.href = '/admin'
  }

  const handlePlaceOrder = (service) => {
    alert(`Place Order clicked for ${service}`)
  }

  const handleStatClick = (service, stat) => {
    alert(`Clicked ${stat.label} (${stat.value}) in ${service}`)
  }

  const serviceCards = [
    {
      icon: <FileText className="w-7 h-7 text-gray-700" />,
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
      icon: <Calendar className="w-7 h-7 text-gray-700" />,
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
      icon: <Stethoscope className="w-7 h-7 text-gray-700" />,
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
      icon: <Video className="w-7 h-7 text-gray-700" />,
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
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBackClick}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Back to Admin"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-base font-medium text-gray-900">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                  {notifications}
                </span>
              )}
            </button>
            <button className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
              <img 
                src="https://ui-avatars.com/api/?name=AD&background=3b82f6&color=fff&bold=true" 
                alt="User" 
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </div>

        {/* Filter Button */}
        <div className="px-4 pb-3">
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4">
        <div className="space-y-4">
          {serviceCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
                </div>
                <button
                  className="px-5 py-1.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
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
                    className={`p-4 text-center hover:opacity-80 transition-opacity ${stat.bg}`}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboardPage