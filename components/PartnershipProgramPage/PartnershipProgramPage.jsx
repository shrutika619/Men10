"use client"
import React, { useState } from "react";
const PartnershipProgramPage = () => {
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: "",
    officialCallingNumber: "",
    hospitalEmailID: "",
    areaNameOnly: "",
    hospitalInfo: "",
    cityNameOnly: "",
    hospitalDescription: "",
    fullAddress: "",
    googleMapsLink: "",
    ownerName: "",
    ownerContactNumber: "",
    contactPersonName: "",
    contactPersonEmail: "",
    attendantName: "",
    attendantNumber: "",
    finalOtpMobile: "",
  });

  const [ownerProfilePhoto, setOwnerProfilePhoto] = useState(null);
  const [hospitalInteriorPhoto, setHospitalInteriorPhoto] = useState(null);
  const [hospitalFrontPhoto, setHospitalFrontPhoto] = useState(null);
  const [doctorClaimPhoto, setDoctorClaimPhoto] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [finalOtpSent, setFinalOtpSent] = useState(false);
  const [finalOtp, setFinalOtp] = useState("");

  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);

  const handleSendOTP = () => {
    if (!isValidMobile || !agree) {
      alert("Please enter valid mobile and accept terms.");
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to +91${mobile}`);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }
    alert("OTP verified successfully!");
    setOtpVerified(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleGetFinalOTP = () => {
    const finalMobile = formData.finalOtpMobile;
    if (!/^[6-9]\d{9}$/.test(finalMobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setFinalOtpSent(true);
    alert(`OTP sent to +91${finalMobile}`);
  };

  const handleFormSubmit = () => {
    if (!acceptedTerms) {
      alert("Please accept Terms and Conditions.");
      return;
    }
    
    if (!finalOtpSent || finalOtp.length !== 6) {
      alert("Please verify your mobile number with OTP.");
      return;
    }
    
    console.log("Form Submitted:", formData);
    alert("Hospital registered successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          MEN10 Partnership Program
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Log in / Sign up to continue.
        </p>

        {!otpVerified && (
          <div className="max-w-sm mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <span className="text-gray-500 pr-2">+91</span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full outline-none text-gray-700 text-sm"
                  disabled={otpSent}
                />
              </div>
            </div>

            {!otpSent && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
                />
                <label className="ml-2 text-sm text-gray-500">
                  I agree to the{" "}
                  <a href="#" className="text-purple-500 underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                disabled={!agree || !isValidMobile}
                className={`w-full py-2 rounded-lg text-sm font-medium text-white ${
                  !agree || !isValidMobile
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
              >
                Send OTP
              </button>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={handleVerifyOTP}
                  className="w-full mt-3 py-2 rounded-lg text-white bg-purple-500 hover:bg-purple-600"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
        )}

        {otpVerified && (
          <div className="space-y-8 mt-6">
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Hospital Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    placeholder="e.g., Meditrina Hospital"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official Calling Number
                  </label>
                  <input
                    type="tel"
                    name="officialCallingNumber"
                    placeholder="+91 XXXX-XXX-XXX"
                    value={formData.officialCallingNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Email ID
                  </label>
                  <input
                    type="email"
                    name="hospitalEmailID"
                    placeholder="e.g., Meditrina Hospital"
                    value={formData.hospitalEmailID}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area Name Only
                  </label>
                  <input
                    type="text"
                    name="areaNameOnly"
                    placeholder="Kothrud"
                    value={formData.areaNameOnly}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Info
                  </label>
                  <input
                    type="text"
                    name="hospitalInfo"
                    placeholder="e.g., Meditrina Hospital"
                    value={formData.hospitalInfo}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City Name Only
                  </label>
                  <input
                    type="text"
                    name="cityNameOnly"
                    placeholder="Pune"
                    value={formData.cityNameOnly}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Description
                </label>
                <textarea
                  name="hospitalDescription"
                  placeholder="Enter complete hospital Description"
                  value={formData.hospitalDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  name="fullAddress"
                  placeholder="Enter complete hospital address"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  name="googleMapsLink"
                  placeholder="https://maps.app.goo.gl/..."
                  value={formData.googleMapsLink}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Key Personnel Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder=""
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Contact Number
                  </label>
                  <input
                    type="tel"
                    name="ownerContactNumber"
                    placeholder=""
                    value={formData.ownerContactNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    name="contactPersonName"
                    placeholder=""
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person Email ID
                  </label>
                  <input
                    type="email"
                    name="contactPersonEmail"
                    placeholder="person@hospital.com"
                    value={formData.contactPersonEmail}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attendant Name
                  </label>
                  <input
                    type="text"
                    name="attendantName"
                    placeholder=""
                    value={formData.attendantName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attendant Number
                  </label>
                  <input
                    type="tel"
                    name="attendantNumber"
                    placeholder=""
                    value={formData.attendantNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Media & Verification
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner's Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setOwnerProfilePhoto)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Front Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setHospitalFrontPhoto)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Interior Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setHospitalInteriorPhoto)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor's Cabin Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setDoctorClaimPhoto)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I accept the{" "}
                  <a href="#" className="text-purple-500 underline">
                    Terms and Conditions
                  </a>{" "}
                  for partnering with MEN10.
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Final Step: Verification
              </h3>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Number (for OTP)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Please provide the mobile number to receive a verification OTP.
                </p>
                
                <div className="flex gap-3 mb-4">
                  <input
                    type="tel"
                    name="finalOtpMobile"
                    placeholder="10-digit number"
                    value={formData.finalOtpMobile}
                    onChange={handleInputChange}
                    maxLength={10}
                    disabled={finalOtpSent}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleGetFinalOTP}
                    disabled={finalOtpSent}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white ${
                      finalOtpSent
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    Get OTP
                  </button>
                </div>

                {finalOtpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Enter the 6-digit code sent to your mobile number.
                    </p>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={finalOtp[index] || ""}
                          onChange={(e) => {
                            const newOtp = finalOtp.split("");
                            newOtp[index] = e.target.value;
                            setFinalOtp(newOtp.join(""));
                            if (e.target.value && index < 5) {
                              const nextInput = e.target.nextElementSibling;
                              if (nextInput) nextInput.focus();
                            }
                          }}
                          className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFormSubmit}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Register Hospital
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipProgramPage;