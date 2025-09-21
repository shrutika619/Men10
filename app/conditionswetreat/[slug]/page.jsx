"use client";
import React from "react";

const ConditionPage = ({ params }) => {
  // Unwrap the params Promise using React.use()
  const { slug } = React.use(params);

  const conditionContent = {
    prematureejaculation: {
      title: "Premature Ejaculation Treatment",
      content: "Comprehensive information about premature ejaculation treatment options and medical care."
    },
    lowspermcount: {
      title: "Low Sperm Count Treatment", 
      content: "Information about low sperm count causes, diagnosis, and effective treatment solutions."
    },
    erectiledysfunction: {
      title: "Erectile Dysfunction Treatment",
      content: "Professional treatment options for erectile dysfunction and improving sexual health."
    }
  };

  const condition = conditionContent[slug];

  if (!condition) {
    return (
      <main className="w-full">
        <h2 className="text-center py-20">Condition not found</h2>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{condition.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            {condition.content}
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </main>
  );
};

export default ConditionPage;