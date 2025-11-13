"use client";  // ADD THIS LINE

import React, { useState } from "react";
import Image from "next/image";
import { Search, Filter, MoreVertical, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DoctorsPage = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Ram Sharma",
      qualification: "MBBS, M.D Medicine",
      specialty: "General Physician",
      experience: "3 years",
      time: "10:00 AM – 06:30 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      available: true,
    },
    {
      id: 2,
      name: "Dr. Shankar Dayal",
      qualification: "MBBS, M.D Medicine",
      specialty: "General Physician",
      experience: "3 years",
      time: "10:00 AM – 06:30 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      available: true,
    },
  ]);

  const handleToggle = (id) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, available: !doc.available } : doc
      )
    );
  };

  const handleAddDoctor = () => {
    router.push("/add-doctor");
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-semibold">Hospital</h1>
          </div>

          <button
            onClick={handleAddDoctor}
            className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm flex-grow max-w-md">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor..."
              className="ml-2 w-full text-sm outline-none"
            />
          </div>
          <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition"
            >
              {/* Left Section */}
              <div className="flex items-start space-x-4">
                <Image
                  src="/Images/dr.svg"
                  alt="Doctor"
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500">{doc.qualification}</p>
                  <p className="text-sm text-gray-500">
                    {doc.specialty} • Exp – {doc.experience}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Time: {doc.time}</p>

                  <div className="flex space-x-2 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <span
                          key={day}
                          className={`text-xs px-2 py-1 rounded-md ${
                            doc.days.includes(day)
                              ? "bg-teal-100 text-teal-600 font-medium"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {day}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Available</span>
                  <button
                    onClick={() => handleToggle(doc.id)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                      doc.available ? "bg-teal-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        doc.available ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;