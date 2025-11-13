"use client";

import React, { useState } from "react";
import { Sun, Sunset, ArrowLeft, CheckCircle } from "lucide-react"; 
// Removed 'next/navigation' import to resolve compilation error
// import { useRouter } from "next/navigation"; 

const TimeTablePage = () => {
  // Mock the router functionality for 'back' for environments without 'next/navigation'
  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history) {
        window.history.back();
    } else {
        console.log("Navigation back unavailable in this environment.");
    }
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [activeDay, setActiveDay] = useState("Mon");
  const [isSaved, setIsSaved] = useState(false); // State for custom notification

  const defaultTiming = {
    morning: { enabled: true, start: "10:00 AM", end: "06:30 PM", label: "Morning" },
    afternoon: { enabled: true, start: "10:00 AM", end: "06:30 PM", label: "Afternoon" },
    evening: { enabled: false, start: "10:00 AM", end: "06:30 PM", label: "Evening" },
  };

  const [schedule, setSchedule] = useState({
    Mon: { ...defaultTiming },
    Tue: { ...defaultTiming },
    Wed: { ...defaultTiming },
    Thu: { ...defaultTiming },
    Fri: { ...defaultTiming },
    Sat: { ...defaultTiming },
    Sun: { ...defaultTiming },
  });

  const toggleSession = (day, session) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [session]: {
          ...prev[day][session],
          enabled: !prev[day][session].enabled,
        },
      },
    }));
  };

  const handleTimeChange = (day, session, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [session]: { ...prev[day][session], [field]: value },
      },
    }));
  };

  const handleSave = () => {
    // Show custom notification
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide after 3 seconds
    console.log("Schedule Saved:", schedule);
  };

  const timeOptions = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "08:00 PM", "09:00 PM",
  ];

  const sessionIcons = {
    morning: <Sun className="w-5 h-5 text-yellow-600" />,
    afternoon: <Sun className="w-5 h-5 text-orange-600" />,
    evening: <Sunset className="w-5 h-5 text-indigo-600" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-0">
      
      {/* Custom Success Notification */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 p-4 bg-green-500 text-white flex items-center justify-center transition-transform duration-300 transform ${
          isSaved ? "translate-y-0 shadow-lg" : "-translate-y-full"
        }`}
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        <span className="font-medium">Timing updated successfully!</span>
      </div>

      {/* Main Card Container */}
      <div className="bg-white shadow-lg rounded-none w-full max-w-md min-h-screen sm:rounded-2xl sm:min-h-0">
        
        {/* Header (Back Button & Title) - Updated to match image border */}
        <div className="p-4 border-b flex items-center">
          <button
            onClick={handleGoBack} // Using the mock back function
            className="mr-4 p-1 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        </div>

        <div className="p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
            Hospital Timing
            </h3>

            {/* Tabs */}
            <div className="flex justify-between mb-4">
            {days.map((day) => (
                <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`text-sm px-1.5 pb-2 transition-colors duration-200 font-medium ${
                    activeDay === day
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                >
                {day}
                </button>
            ))}
            </div>

            {/* Session Blocks */}
            {Object.keys(schedule[activeDay]).map((session) => {
            const sessionData = schedule[activeDay][session];
            
            return (
                <div
                key={session}
                className="py-4 border-b border-gray-100 last:border-b-0"
                >
                <div className="flex justify-between items-center mb-3">
                    {/* Session Title and Icon */}
                    <div className="flex items-center space-x-2">
                        {sessionIcons[session]}
                        <span className="capitalize font-medium text-gray-800">
                            {sessionData.label} 
                        </span>
                    </div>

                    {/* Toggle Switch */}
                    <button
                    onClick={() => toggleSession(activeDay, session)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        sessionData.enabled ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    >
                    <span className="sr-only">Toggle {session}</span>
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        sessionData.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                    </button>
                </div>

                {/* Time Selectors (Visible only when enabled) */}
                {sessionData.enabled && (
                    <div className="flex justify-between space-x-3 mt-2">
                        <select
                            value={sessionData.start}
                            onChange={(e) =>
                                handleTimeChange(activeDay, session, "start", e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded-xl text-sm px-3 py-2 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {timeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <select
                            value={sessionData.end}
                            onChange={(e) =>
                                handleTimeChange(activeDay, session, "end", e.target.value)
                            }
                            className="flex-1 border border-gray-300 rounded-xl text-sm px-3 py-2 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {timeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                )}
                </div>
            );
            })}

            {/* Save Button */}
            <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition mt-6 shadow-md"
            >
            Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;