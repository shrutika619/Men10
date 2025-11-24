"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  ChevronRight,
  Check,
  Heart,
  Shield,
  Package,
  Syringe,
  MessageSquare,
  CalendarCheck,
  Phone,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------- Helper components ----------

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < fullStars ? "text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const ConditionTag = ({ icon: Icon, label, onToggle, active }) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(label)}
      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors text-sm w-full
        ${active ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm" : "bg-white border-gray-200 hover:border-indigo-200"}`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 ${active ? "text-indigo-600" : "text-gray-400"}`} />
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 ${active ? "rotate-90 text-indigo-600" : "text-gray-300"}`} />
    </button>
  );
};

const TimingsTable = ({ timings }) => {
  return (
    <div className="text-sm space-y-2">
      {timings.map((d) => (
        <div key={d.day} className="flex justify-between items-center">
          <div className={`font-medium ${d.closed ? "text-red-500" : "text-gray-700"}`}>{d.day}</div>
          {d.closed ? (
            <div className="text-red-500 text-xs">Closed</div>
          ) : (
            <div className="flex space-x-2">
              {d.slots.map((s, i) => (
                <div key={i} className="px-2 py-0.5 rounded-md text-xs bg-gray-50 border border-gray-100">
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const EDChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const MapEmbed = ({ address }) => {
  const query = encodeURIComponent(address);
  const iframeSrc = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const [zoom, setZoom] = React.useState(15);

  const updateZoom = (change) => {
    let newZoom = zoom + change;
    if (newZoom < 1) newZoom = 1;
    if (newZoom > 20) newZoom = 20;
    setZoom(newZoom);
  };

  const dynamicSrc = `https://maps.google.com/maps?q=${query}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
      <div className="h-44 md:h-56 relative">
        <iframe
          title="clinic-map"
          src={dynamicSrc}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* --- CUSTOM ZOOM BUTTONS --- */}
      <div className="absolute bottom-3 right-3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border">
        <button
          onClick={() => updateZoom(1)}
          className="p-2 border-b hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => updateZoom(-1)}
          className="p-2 hover:bg-gray-100"
        >
          –
        </button>
      </div>
    </div>
  );
};


// ---------- Page-specific components ----------

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start space-x-6 shadow-sm">
      <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-28 object-cover rounded-lg shadow" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
              {doctor.name}
              <Check className="w-4 h-4 ml-2 text-green-500" />
            </h3>
            <div className="text-sm text-gray-600">{doctor.qualification}</div>
            <div className="text-sm text-gray-500 mt-1">Experience: {doctor.experience}</div>

            <div className="flex items-center space-x-3 mt-3">
              <StarRating rating={doctor.rating} />
              <div className="text-sm font-semibold">{doctor.rating}/5</div>
              <div className="text-sm text-gray-500">
                Languages: <span className="font-medium text-gray-700">{doctor.languages}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-md">{doctor.fee}</div>
            <button
              onClick={onBook}
              className="mt-4 block w-full bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarCard = ({ clinic, timings, onBookNow, onCall }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-indigo-500 mt-1" />
        <div>
          <div className="text-xs font-medium">Address</div>
          <div className="text-xs text-gray-600">{clinic.address}</div>
        </div>
      </div>

      <div className="mt-4">
        <TimingsTable timings={timings} />
      </div>

      {/* UPDATED BUTTONS EXACT LIKE YOUR SCREENSHOT */}
      <div className="mt-4 space-y-3">
        <button
          onClick={onBookNow}
          className="w-full flex items-center justify-center py-3 rounded-lg bg-indigo-600 text-white font-medium"
        >
          <CalendarCheck className="w-4 h-4 mr-2" /> Book Appointment
        </button>

        <button
          onClick={onCall}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-50 text-gray-700 font-medium shadow-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-50 text-gray-700 font-medium shadow-sm"
        >
          <MapPin className="w-4 h-4" />
          Get Directions
        </button>
      </div>
    </div>
  );
};

// ---------- Main Page ----------

export default function ClinicDetailsPage() {
  const doctor = {
    name: "Dr. Priya Sharma",
    qualification: "MBBS, MD (General Medicine)",
    experience: "12+ Yrs",
    rating: 4.8,
    languages: "English, Hindi",
    fee: "₹600",
    imageUrl: "https://placehold.co/100x120/8b5cf6/ffffff?text=Dr+Priya",
  };

  const conditionsList = [
    "Sexual Dysfunction",
    "Erectile Dysfunction",
    "Low Sex Desire",
    "Premature Ejaculation",
    "Couple Sex Problem",
    "Delayed Ejaculation",
  ];

  const [activeConditions, setActiveConditions] = useState([]);
  const toggleCondition = (label) => {
    setActiveConditions((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const clinicTimings = [
    { day: "Sunday", closed: true, slots: [] },
    { day: "Monday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
    { day: "Tuesday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
    { day: "Wednesday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
    { day: "Thursday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
    { day: "Friday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
    { day: "Saturday", closed: false, slots: ["11am - 1pm", "2pm - 5pm", "6pm - 8pm"] },
  ];

  const chartData = [
    { label: "Start", value: 10 },
    { label: "2 Weeks", value: 30 },
    { label: "4 Weeks", value: 55 },
    { label: "8 Weeks", value: 82 },
    { label: "12 Weeks", value: 95 },
  ];

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingPanel, setShowBookingPanel] = useState(false);

  const openBooking = () => setShowBookingPanel(true);
  const closeBooking = () => setShowBookingPanel(false);

  const handleBook = () => {
    if (!selectedDay || !selectedSlot) {
      alert("Please select a day and a time slot before booking.");
      return;
    }
    alert(`Booked on ${selectedDay} at ${selectedSlot}`);
    setSelectedDay(null);
    setSelectedSlot(null);
    setShowBookingPanel(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-lg font-semibold mb-2">Meet Our Specialists</h2>

          <DoctorCard doctor={doctor} onBook={openBooking} />

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-md font-semibold mb-4">Conditions We Treat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {conditionsList.map((c) => {
                const iconMap = {
                  "Sexual Dysfunction": Heart,
                  "Erectile Dysfunction": Shield,
                  "Low Sex Desire": MessageSquare,
                  "Premature Ejaculation": Clock,
                  "Couple Sex Problem": Package,
                  "Delayed Ejaculation": Syringe,
                };
                const Icon = iconMap[c] || Heart;
                return (
                  <ConditionTag
                    key={c}
                    icon={Icon}
                    label={c}
                    onToggle={toggleCondition}
                    active={activeConditions.includes(c)}
                  />
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Proven Results: A Patient's Journey</h3>
              <p className="text-sm text-gray-500">
                We believe in data-driven results. Typical improvement timeline shown below.
              </p>
            </div>

            <EDChart data={chartData} />
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <MapEmbed address={"Plot 50, Manish Nagar Road, Besa, Nagpur, Maharashtra 440024"} />

          <SidebarCard
            clinic={{
              name: "MEN10 Clinic - Besa",
              address: "Plot 50, Manish Nagar Road, Besa, Nagpur, Maharashtra 440024",
            }}
            timings={clinicTimings}
            onBookNow={openBooking}
            onCall={() => alert("Calling clinic...")}
          />
        </div>
      </div>

      {showBookingPanel && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeBooking} />

          <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full md:w-3/5 mx-4 md:mx-0 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Book Appointment - {doctor.name}</h4>
              <button onClick={closeBooking} className="text-gray-500">
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-2">Select Day</h5>
                <div className="space-y-2">
                  {clinicTimings.map((d) => (
                    <button
                      key={d.day}
                      onClick={() => {
                        if (!d.closed) setSelectedDay(d.day);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md border ${
                        selectedDay === d.day ? "border-indigo-500 bg-indigo-50" : "border-gray-100 bg-white"
                      } ${d.closed ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-200"}`}
                      disabled={d.closed}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{d.day}</div>
                        {d.closed ? (
                          <div className="text-red-500 text-xs">Closed</div>
                        ) : (
                          <div className="text-xs text-gray-500">Open</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Select Time Slot</h5>
                <div className="space-y-2">
                  {clinicTimings.map((d) =>
                    d.closed ? null : (
                      <div
                        key={d.day}
                        className={`p-2 rounded-md ${selectedDay === d.day ? "bg-gray-50" : "bg-white"}`}
                      >
                        <div className="text-xs text-gray-500 font-semibold mb-1">{d.day}</div>
                        <div className="flex flex-wrap gap-2">
                          {d.slots.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                if (selectedDay === d.day) setSelectedSlot(s);
                                else {
                                  setSelectedDay(d.day);
                                  setSelectedSlot(s);
                                }
                              }}
                              className={`px-3 py-1 text-xs rounded-md border ${
                                selectedSlot === s && selectedDay === d.day
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button onClick={closeBooking} className="px-4 py-2 rounded-lg border">
                Cancel
              </button>
              <button onClick={handleBook} className="px-6 py-2 rounded-lg bg-indigo-600 text-white">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
