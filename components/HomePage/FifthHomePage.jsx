import React from "react";
import { Check, X } from "lucide-react";

const FifthHomePage = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold">
          What Makes <span className="text-blue-700">MEN10</span> Different?
        </h2>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <table
          className="border-collapse shadow-lg rounded-2xl overflow-hidden text-sm md:text-base"
          style={{
            width: "1200px",
            height: "394.5px",
            borderColor: "#E9ECEF",
          }}
        >
          <thead>
            <tr>
              <th
                className="bg-gray-50 py-4 px-6 text-left font-bold border"
                style={{ color: "#2C3E50", borderColor: "#E9ECEF" }}
              >
                Feature
              </th>
              <th
                className="bg-gradient-to-r from-blue-600 to-blue-500 py-4 px-6 text-center font-bold text-white border"
                style={{ borderColor: "#E9ECEF" }}
              >
                MEN10
              </th>
              <th
                className="bg-gray-50 py-4 px-6 text-center font-bold border"
                style={{ color: "#2C3E50", borderColor: "#E9ECEF" }}
              >
                Other Platforms
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr style={{ borderColor: "#E9ECEF" }}>
              <td
                className="bg-gray-50 py-4 px-6 font-medium text-gray-700 border"
                style={{ borderColor: "#E9ECEF" }}
              >
                Treatment Approach
              </td>
              <td
                className="bg-green-50 py-4 px-6 text-center text-green-700 font-medium border"
                style={{ borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} /> Customized Ayurvedic + Modern Medicine
                </div>
              </td>
              <td
                className="py-4 px-6 text-center font-medium border"
                style={{ color: "#666666", borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <X size={18} className="text-red-500" /> Generic Allopathy
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr style={{ borderColor: "#E9ECEF" }}>
              <td
                className="bg-gray-50 py-4 px-6 font-medium text-gray-700 border"
                style={{ borderColor: "#E9ECEF" }}
              >
                Medicine
              </td>
              <td
                className="bg-green-50 py-4 px-6 text-center text-green-700 font-medium border"
                style={{ borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} /> In-house, Patented
                </div>
              </td>
              <td
                className="py-4 px-6 text-center font-medium border"
                style={{ color: "#666666", borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <X size={18} className="text-red-500" /> Third-party
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr style={{ borderColor: "#E9ECEF" }}>
              <td
                className="bg-gray-50 py-4 px-6 font-medium text-gray-700 border"
                style={{ borderColor: "#E9ECEF" }}
              >
                Consultation Process
              </td>
              <td
                className="bg-green-50 py-4 px-6 text-center text-green-700 font-medium border"
                style={{ borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} /> Free Doctor Consultation
                </div>
              </td>
              <td
                className="py-4 px-6 text-center font-medium border"
                style={{ color: "#666666", borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <X size={18} className="text-red-500" /> Paid Medical
                  Consultation
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr style={{ borderColor: "#E9ECEF" }}>
              <td
                className="bg-gray-50 py-4 px-6 font-medium text-gray-700 border"
                style={{ borderColor: "#E9ECEF" }}
              >
                Follow-up Care
              </td>
              <td
                className="bg-green-50 py-4 px-6 text-center text-green-700 font-medium border"
                style={{ borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} /> Regular Free Follow-up
                </div>
              </td>
              <td
                className="py-4 px-6 text-center font-medium border"
                style={{ color: "#666666", borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <X size={18} className="text-red-500" /> Minimal follow-up
                  support
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr style={{ borderColor: "#E9ECEF" }}>
              <td
                className="bg-gray-50 py-4 px-6 font-medium text-gray-700 border"
                style={{ borderColor: "#E9ECEF" }}
              >
                Satisfaction Guarantee
              </td>
              <td
                className="bg-green-50 py-4 px-6 text-center text-green-700 font-medium border"
                style={{ borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} /> 90-day money-back guarantee*
                </div>
              </td>
              <td
                className="py-4 px-6 text-center font-medium border"
                style={{ color: "#666666", borderColor: "#E9ECEF" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <X size={18} className="text-red-500" /> No Guarantee
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-400 text-center mt-4">
        *Terms and conditions apply.
      </p>
    </section>
  );
};

export default FifthHomePage;
