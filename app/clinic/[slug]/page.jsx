"use client";
import React from "react";

// Import components directly (not dynamically)
// Try multiple possible file locations
let NagpurPage, PunePage, NashikPage, KolhapurPage;

try {
  // Try importing from index file first
  NagpurPage = require("@/components/ClinicPage/NagpurPage/index").default;
} catch (e) {
  try {
    // Try importing from named file
    NagpurPage = require("@/components/ClinicPage/NagpurPage/NagpurPage").default;
  } catch (e2) {
    console.error("Could not load NagpurPage");
  }
}

try {
  PunePage = require("@/components/ClinicPage/PunePage/index").default;
} catch (e) {
  try {
    PunePage = require("@/components/ClinicPage/PunePage/PunePage").default;
  } catch (e2) {
    console.error("Could not load PunePage");
  }
}

try {
  NashikPage = require("@/components/ClinicPage/NashikPage/index").default;
} catch (e) {
  try {
    NashikPage = require("@/components/ClinicPage/NashikPage/NashikPage").default;
  } catch (e2) {
    console.error("Could not load NashikPage");
  }
}

try {
  KolhapurPage = require("@/components/ClinicPage/KolhapurPage/index").default;
} catch (e) {
  try {
    KolhapurPage = require("@/components/ClinicPage/KolhapurPage/KolhapurPage").default;
  } catch (e2) {
    console.error("Could not load KolhapurPage");
  }
}

// Map slugs to their respective components
const componentMap = {
  "nagpur": NagpurPage,
  "pune": PunePage,
  "nashik": NashikPage,
  "kolhapur": KolhapurPage,
};

const ClinicPage = ({ params }) => {
  const { slug } = React.use(params);
  const Component = componentMap[slug];

  // If component doesn't exist, show 404
  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Clinic Not Found</h2>
          <p className="text-gray-600 mb-4">
            The clinic page <span className="font-semibold">"{slug}"</span> could not be loaded.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Available clinics: {Object.keys(componentMap).filter(key => componentMap[key]).join(", ") || "None loaded"}
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/clinic'}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Clinics
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default ClinicPage;