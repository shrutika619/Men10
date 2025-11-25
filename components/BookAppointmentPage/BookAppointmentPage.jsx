import React, { useState } from 'react';
import { Check } from 'lucide-react';

const BookAppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    contactNo: '',
    age: '',
    gender: ''
  });
  const [selectedDate, setSelectedDate] = useState('16');
  const [selectedTime, setSelectedTime] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      qualification: 'MBBS, MD (General Medicine)',
      experience: '10 Years',
      price: 600,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%236366f1" width="100" height="100"/%3E%3Ctext fill="white" font-size="40" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPS%3C/text%3E%3C/svg%3E'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      qualification: 'MBBS, MD (General Medicine)',
      experience: '10 Years',
      price: 600,
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%238b5cf6" width="100" height="100"/%3E%3Ctext fill="white" font-size="40" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPS%3C/text%3E%3C/svg%3E'
    }
  ];

  const dates = [
    { day: 'Sun', date: '14' },
    { day: 'Mon', date: '15' },
    { day: 'Tue', date: '16' },
    { day: 'Wed', date: '17' },
    { day: 'Thu', date: '18' },
    { day: 'Fri', date: '19' },
    { day: 'Sat', date: '20' }
  ];

  const timeSlots = {
    morning: ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'],
    afternoon: ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'],
    evening: ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedTime || !acceptedTerms || !formData.fullName || !formData.contactNo) {
      alert('Please fill all required fields and accept terms & conditions');
      return;
    }
    alert('Booking confirmed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Book In-Clinic Appointment</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Select a specialist and a time that works for you at our <span className="text-blue-600">Besa, Nagpur</span> clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Select Doctor */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm sm:text-base">1</div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Select Doctor</h2>
              </div>
              
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className={`bg-white rounded-lg p-3 sm:p-4 border-2 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id ? 'border-indigo-600 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img src={doctor.image} alt={doctor.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{doctor.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{doctor.qualification}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{doctor.experience}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{doctor.price}</p>
                        <p className="text-xs sm:text-sm text-gray-500">per session</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Details */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Your Details</h2>
              <div className="bg-white rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="Contact No"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-pink-50"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Select Date & Time */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm sm:text-base">2</div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Select Date & Time</h2>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <button className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl">←</button>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Sep 14 - Sep 20, 2025</span>
                  <button className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl">→</button>
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {dates.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`py-2 sm:py-3 px-1 sm:px-2 rounded-lg text-center transition-all ${
                        selectedDate === d.date
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-xs">{d.day}</div>
                      <div className="font-semibold text-sm sm:text-base">{d.date}</div>
                    </button>
                  ))}
                </div>

                {/* Morning */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Morning</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.morning.map((time, idx) => (
                      <button
                        key={`morning-${idx}`}
                        onClick={() => setSelectedTime(time)}
                        disabled={idx >= 4}
                        className={`py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-indigo-600 text-white'
                            : idx >= 4
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Afternoon</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.afternoon.map((time, idx) => (
                      <button
                        key={`afternoon-${idx}`}
                        onClick={() => setSelectedTime(time)}
                        disabled={idx >= 4}
                        className={`py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-indigo-600 text-white'
                            : idx >= 4
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Evening</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.evening.map((time, idx) => (
                      <button
                        key={`evening-${idx}`}
                        onClick={() => setSelectedTime(time)}
                        disabled={idx >= 4}
                        className={`py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-indigo-600 text-white'
                            : idx >= 4
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Booking Summary</h2>
              
              {selectedDoctor && (
                <div className="flex items-center gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b">
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedDoctor.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{selectedDoctor.qualification}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900 text-right">Tuesday, September 16, 2025</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-900">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Clinic:</span>
                  <span className="font-semibold text-gray-900">Besa, Nagpur</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3 sm:mb-4 pb-3 sm:pb-4 border-b">
                <span className="text-base sm:text-lg font-bold text-gray-900">Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{selectedDoctor?.price || 600}</span>
              </div>

              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-blue-600 text-center mb-2">
                  <span className="font-semibold">Limited slots available.</span> Book now to secure your consultation.
                </p>
              </div>

              <div className="mb-3 sm:mb-4">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 sm:mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 flex-shrink-0"
                  />
                  <span className="text-xs text-gray-600">
                    I accept the <span className="text-blue-600">Terms & Conditions</span> and <span className="text-blue-600">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;