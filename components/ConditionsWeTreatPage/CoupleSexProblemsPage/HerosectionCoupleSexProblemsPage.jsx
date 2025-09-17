"use client";
import React from "react";
import { HeartPulse, Dumbbell, Users } from "lucide-react"; // icons

const HerosectionCoupleSexProblemsPage = () => {
  return (
    <section className="w-full">
      {/* ================= INTEGRATED TREATMENT APPROACH ================= */}
      <div className="bg-[#F9FAFB] py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Our Integrated Treatment <span className="text-blue-600">Approach</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <HeartPulse className="w-10 h-10 text-blue-600 mx-auto mb-4" />,
              title: "Herbal Remedies",
              desc: "Tailored Ayurvedic formulations to address your specific root causes."
            },
            {
              icon: <Dumbbell className="w-10 h-10 text-blue-600 mx-auto mb-4" />,
              title: "Exercise & Lifestyle",
              desc: "Guidance on pelvic floor exercises (Kegels), yoga, and diet care."
            },
            {
              icon: <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />,
              title: "Counseling & Support",
              desc: "Managing stress, improving communication, and boosting confidence."
            }
          ].map((card, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer text-center"
            >
              {card.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TREATMENT JOURNEY ================= */}
      <div className="w-full bg-white py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Your <span className="text-blue-600">Treatment Journey</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto text-center">
          {[
            "Confidential Consultation",
            "Root-Cause Diagnosis",
            "Personalized Ayurvedic Plan",
            "Monitoring & regular follow-up",
            "Long-Term Wellness",
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-md">
                {index + 1}
              </span>
              <p className="text-gray-700 text-sm sm:text-base">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HerosectionCoupleSexProblemsPage;
