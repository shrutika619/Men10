"use client";
import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Navigation, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllClinics } from "@/app/services/clinic.service";

export default function HerosectionCity({ cityName }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to match slugs back to city names (e.g., "new-delhi" matches "New Delhi")
  const normalizeString = (str) => str?.toLowerCase().replace(/\s+/g, '-');

 useEffect(() => {
    const loadClinics = async () => {
      setLoading(true);
      const response = await getAllClinics();

      // FIX: Check for response.data.data (the nested array)
      // The first '.data' is the API body, the second '.data' is your list of clinics
      if (response?.data?.data) {
        
        // FIX: Filter 'response.data.data' instead of 'response.data'
        const filteredClinics = response.data.data.filter(clinic => 
          clinic.status === "approved" && 
          normalizeString(clinic.city) === normalizeString(cityName)
        );
        
        setClinics(filteredClinics);
      } else {
         // Optional: Handle case where data is missing
         console.log("No clinics found or API structure changed", response);
      }
      setLoading(false);
    };

    if (cityName) loadClinics();
  }, [cityName]);

  // Client-side search within the city results
  const filteredList = clinics.filter(
      (clinic) =>
        clinic.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.areaName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCall = (phone) => window.location.href = `tel:${phone}`;
  const handleDetails = (id) => router.push(`/clinicseedetails?id=${id}`); // Passing ID via query or path

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          Find Our Clinic in <span className="text-indigo-600">{cityName?.replace(/-/g, ' ')}</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Choose a clinic near you for a personal, in-clinic consultation.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl flex gap-3 mb-10">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by area or name..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Clinics List */}
      <div className="w-full max-w-md space-y-8">
        {loading ? (
           <p className="text-center text-gray-500">Loading clinics...</p>
        ) : filteredList.length > 0 ? (
          filteredList.map((clinic) => (
            <div
              key={clinic._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 w-full bg-gray-200 overflow-hidden border-b border-gray-300">
                <img
                  src={clinic.photos?.clinicfrontPhoto || "https://via.placeholder.com/800x400"}
                  alt={clinic.clinicName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {clinic.clinicName}
                  </h3>
                  <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full uppercase">
                    Open
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                     <span className="flex items-center gap-1 font-semibold">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9
                     </span>
                     <span>{clinic.areaName}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleCall(clinic.mobileNo)} className="text-purple-600 hover:bg-purple-50 p-1 rounded-md">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button onClick={() => window.open(clinic.googleMapsLink, '_blank')} className="text-purple-600 hover:bg-purple-50 p-1 rounded-md">
                        <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mb-6 truncate">{clinic.fulladdress}</p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDetails(clinic._id)}
                    className="bg-gray-100 hover:bg-gray-200 py-2.5 rounded-lg font-semibold text-sm"
                  >
                    See Details
                  </button>
                  <button
                    onClick={() => handleDetails(clinic._id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg shadow-md text-sm font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            No clinics found in {cityName?.replace(/-/g, ' ')}.
          </p>
        )}
      </div>
    </div>
  );
}