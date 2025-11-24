import React, { useState } from "react";
import { Search, MapPin, Phone, Navigation, Star } from "lucide-react";

const initialClinics = [
  {
    id: 1,
    name: "MEN10 SEXUAL HEALTH CLINIC - Kothrud",
    rating: 4.8,
    distance: "3.9 km",
    status: "Closed",
    address: "Paud Road, Kothrud, Pune, Maharashtra 411038",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
    phone: "+911234567890",
  },
  {
    id: 2,
    name: "MEN10 SEXUAL HEALTH CLINIC - Baner",
    rating: 4.8,
    distance: "5.2 km",
    status: "Closed",
    address: "Baner Road, Pune, Maharashtra 411045",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop",
    phone: "+911234567890",
  },
  {
    id: 3,
    name: "MEN10 SEXUAL HEALTH CLINIC - Viman Nagar",
    rating: 4.9,
    distance: "8.1 km",
    status: "Closed",
    address: "Viman Nagar, Pune, Maharashtra 411014",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=400&fit=crop",
    phone: "+911234567890",
  },
];

export default function HerosectionPunePage() {
  const [activeTab, setActiveTab] = useState("book-in");
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState(initialClinics);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = initialClinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(term) ||
        clinic.address.toLowerCase().includes(term)
    );

    setClinics(filtered);
  };

  const handleFindNearest = () => {
    window.open(
      "https://www.google.com/maps/search/Sexual+Health+Clinics+in+Pune",
      "_blank"
    );
  };

  const handleNavigateToClinic = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleBookNow = (clinicName) => {
    alert(`Booking initialized for ${clinicName}`);
  };

  const handleSeeDetails = (clinic) => {
    alert(`Showing details for ${clinic.name}\n\nRating: ${clinic.rating}\nDistance: ${clinic.distance}\nAddress: ${clinic.address}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-4">
          <button
            onClick={() => setActiveTab("online")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "online"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Online Consultation
          </button>

          <button
            onClick={() => setActiveTab("book-in")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === "book-in"
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Book-In Clinic Visit
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Our Clinic in <span className="text-indigo-600">Pune</span>
        </h1>

        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Choose a clinic near you for a personal, in-clinic consultation with
          our experts.
        </p>
      </div>

      {/* Search Bar + Find Nearest Button */}
      <div className="w-full max-w-2xl flex gap-3 mb-10">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by city, name or area..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        <button
          onClick={handleFindNearest}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md transition-colors flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Find Nearest Clinic
        </button>
      </div>

      {/* Clinics List */}
      <div className="w-full max-w-md space-y-8">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <div className="h-48 w-full bg-gray-200 overflow-hidden border-b border-gray-300">
              <img
                src={clinic.image}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  {clinic.name}
                </h3>

                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase">
                  {clinic.status}
                </span>
              </div>

              {/* Rating + Distance + Buttons */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {clinic.rating}
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    ~ {clinic.distance}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCall(clinic.phone)}
                    className="text-purple-600 hover:bg-purple-50 p-1 rounded-md transition-colors"
                    title="Call Clinic"
                  >
                    <Phone className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleNavigateToClinic(clinic.address)}
                    className="text-purple-600 hover:bg-purple-50 p-1 rounded-md transition-colors"
                    title="Get Directions"
                  >
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-500 text-xs mb-6">{clinic.address}</p>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSeeDetails(clinic)}
                  className="bg-gray-100 hover:bg-gray-200 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  See Details
                </button>

                <button
                  onClick={() => handleBookNow(clinic.name)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg shadow-md text-sm font-semibold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {clinics.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No clinics found matching "{searchTerm}"
          </p>
        )}
      </div>
    </div>
  );
}