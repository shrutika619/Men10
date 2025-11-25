import React from "react";
import { Check, X } from "lucide-react";

const FifthHomePage = () => {
  return (
    <div className="w-full py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        What Makes MEN10 Different?
      </h2>

      {/* Desktop View - Table */}
      <div className="hidden lg:block max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <th className="py-5 px-6 text-left text-lg font-semibold">Feature</th>
              <th className="py-5 px-6 text-center text-lg font-semibold">MEN10</th>
              <th className="py-5 px-6 text-center text-lg font-semibold">Other Platforms</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="py-6 px-6 text-gray-700 font-medium">Treatment Approach</td>
              <td className="py-6 px-6 text-center text-gray-700">
                Customized Ayurvedic + Modern Medicine
              </td>
              <td className="py-6 px-6 text-center text-gray-700">Generic Allopathy</td>
            </tr>

            {/* Row 2 */}
            <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="py-6 px-6 text-gray-700 font-medium">Medicine</td>
              <td className="py-6 px-6 text-center text-gray-700">In-house, Patented</td>
              <td className="py-6 px-6 text-center text-gray-700">Third-party</td>
            </tr>

            {/* Row 3 */}
            <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="py-6 px-6 text-gray-700 font-medium">Consultation Process</td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600 w-6 h-6" />
                  <span className="text-gray-700">Free Doctor Consultation</span>
                </div>
              </td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <X className="text-red-600 w-6 h-6" />
                  <span className="text-gray-700">Paid Medical Consultation</span>
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="py-6 px-6 text-gray-700 font-medium">Follow-up Care</td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600 w-6 h-6" />
                  <span className="text-gray-700">Regular Free Follow-up</span>
                </div>
              </td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <X className="text-red-600 w-6 h-6" />
                  <span className="text-gray-700">Minimal follow-up support</span>
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="py-6 px-6 text-gray-700 font-medium">Satisfaction Guarantee</td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Check className="text-green-600 w-6 h-6" />
                  <span className="text-gray-700">90-day money-back guarantee*</span>
                </div>
              </td>
              <td className="py-6 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <X className="text-red-600 w-6 h-6" />
                  <span className="text-gray-700">No Guarantee</span>
                </div>
              </td>
            </tr>

            {/* ⭐ Proper centered note row */}
            <tr>
              <td colSpan="3" className="bg-gray-50 py-4 text-center">
                <p className="text-sm text-gray-500">
                  *Terms and conditions apply.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet View - Cards */}
      <div className="lg:hidden max-w-2xl mx-auto space-y-6">
        
        {/* CARD 1 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4 font-semibold">
            Treatment Approach
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-green-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">MEN10</div>
                <div className="text-gray-600 text-sm">Customized Ayurvedic + Modern Medicine</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Other Platforms</div>
                <div className="text-gray-600 text-sm">Generic Allopathy</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4 font-semibold">Medicine</div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-green-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">MEN10</div>
                <div className="text-gray-600 text-sm">In-house, Patented</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className="text-red-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Other Platforms</div>
                <div className="text-gray-600 text-sm">Third-party</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4 font-semibold">
            Consultation Process
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-green-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">MEN10</div>
                <div className="text-gray-600 text-sm">Free Doctor Consultation</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className="text-red-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Other Platforms</div>
                <div className="text-gray-600 text-sm">Paid Medical Consultation</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4 font-semibold">Follow-up Care</div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-green-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">MEN10</div>
                <div className="text-gray-600 text-sm">Regular Free Follow-up</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className="text-red-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Other Platforms</div>
                <div className="text-gray-600 text-sm">Minimal follow-up support</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-3 px-4 font-semibold">Satisfaction Guarantee</div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Check className="text-green-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">MEN10</div>
                <div className="text-gray-600 text-sm">90-day money-back guarantee*</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <X className="text-red-600 w-5 h-5 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-800">Other Platforms</div>
                <div className="text-gray-600 text-sm">No Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ Proper centered mobile note */}
        <p className="text-sm text-gray-500 text-center py-4">
          *Terms and conditions apply.
        </p>
      </div>
    </div>
  );
};

export default FifthHomePage;
