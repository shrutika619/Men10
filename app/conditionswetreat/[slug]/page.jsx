"use client";
import React from "react";

// Import components directly (not dynamically)
// Try multiple possible file locations
let ErectileDysfunctionPage, LowSpermCountPage, PrematureEjaculationPage;

try {
  // Try importing from index file first
  ErectileDysfunctionPage = require("@/components/ConditionsWeTreatPage/ErectileDysfunctionPage/index").default;
} catch (e) {
  try {
    // Try importing from named file
    ErectileDysfunctionPage = require("@/components/ConditionsWeTreatPage/ErectileDysfunctionPage/ErectileDysfunctionPage").default;
  } catch (e2) {
    console.error("Could not load ErectileDysfunctionPage");
  }
}

try {
  LowSpermCountPage = require("@/components/ConditionsWeTreatPage/LowSpermCountPage/index").default;
} catch (e) {
  try {
    LowSpermCountPage = require("@/components/ConditionsWeTreatPage/LowSpermCountPage/LowSpermCountPage").default;
  } catch (e2) {
    console.error("Could not load LowSpermCountPage");
  }
}

try {
  PrematureEjaculationPage = require("@/components/ConditionsWeTreatPage/PrematureEjaculationPage/index").default;
} catch (e) {
  try {
    PrematureEjaculationPage = require("@/components/ConditionsWeTreatPage/PrematureEjaculationPage/PrematureEjaculationPage").default;
  } catch (e2) {
    console.error("Could not load PrematureEjaculationPage");
  }
}

// Map slugs to their respective components
const componentMap = {
  "erectile-dysfunction": ErectileDysfunctionPage,
  "low-sperm-count": LowSpermCountPage,
  "premature-ejaculation": PrematureEjaculationPage,
};

const ConditionPage = ({ params }) => {
  const { slug } = React.use(params);
  const Component = componentMap[slug];

  // If component doesn't exist, show 404
  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-4">
            The condition page <span className="font-semibold">"{slug}"</span> could not be loaded.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Available pages: {Object.keys(componentMap).filter(key => componentMap[key]).join(", ") || "None loaded"}
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default ConditionPage;