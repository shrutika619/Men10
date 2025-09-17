"use client";
import React, { useState } from "react";

// =================== Assessment Component ===================
const Assessment = () => {
  const [gender, setGender] = useState(null);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const questionsDb = {
    male: {
      "Sexual Dysfunction": [
        "Do you have a persistent lack of interest in sexual activity?",
        "Is it difficult to get aroused or excited during sexual encounters?",
        "Do you have trouble reaching orgasm, or is it absent?",
        "Do you feel anxiety or fear related to sexual performance?",
        "Has this caused distress in your life or relationship?",
      ],
      "Erectile Dysfunction": [
        "Do you find it difficult to get an erection?",
        "Do you struggle to maintain an erection firm enough for intercourse?",
        "Do you experience a decrease in the rigidity of your erections?",
        "Are you less confident in your ability to get and keep an erection?",
        "Have you noticed a reduction in morning erections?",
      ],
      "Low Sex Desire": [
        "Is your desire for sex lower than you feel it should be?",
        "Do you rarely or never initiate sexual activity?",
        "Are you often not receptive to your partner's advances?",
        "Do you make excuses to avoid sexual intimacy?",
        "Does your low desire cause you personal distress?",
      ],
    },
    female: {
      "Sexual Dysfunction": [
        "Do you have a persistent lack of interest in sexual activity?",
        "Is it difficult to get aroused, even with adequate stimulation?",
        "Has your interest in sex or pleasure caused you distress?",
        "Do you feel anxiety or fear associated with sexual activity?",
        "Are you unsatisfied with the intimacy in your sexual life?",
      ],
      "Low Lubrication": [
        "Do you often feel a lack of vaginal lubrication during sexual activity?",
        "Do you experience discomfort or friction due to dryness?",
        "Do you find yourself needing to use artificial lubricants frequently?",
        "Does lack of lubrication make sex less pleasurable for you?",
        "Do you feel anxious about intimacy because you worry about dryness?",
      ],
    },
  };

  const handleConditionToggle = (cond) => {
    setSelectedConditions([cond]);
    setAnswers({});
    setShowResults(false);
    setShowQuestions(true);
  };

  const handleAnswer = (condition, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [condition]: { ...prev[condition], [index]: value },
    }));
  };

  const calculateResults = () => {
    let newResults = [];

    selectedConditions.forEach((condition) => {
      const totalScore = Object.values(answers[condition] || {}).reduce(
        (a, b) => a + b,
        0
      );
      let severity = "Low";
      let color = "bg-green-100 text-green-800";
      if (totalScore > 6) {
        severity = "High";
        color = "bg-red-100 text-red-800";
      } else if (totalScore > 3) {
        severity = "Medium";
        color = "bg-yellow-100 text-yellow-800";
      }
      newResults.push({ condition, score: totalScore, severity, color });
    });

    setResults(newResults);
    setShowResults(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
      {/* Gender Selection */}
      {!gender && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">First, what is your gender?</h2>
          <div className="mt-6 space-y-3 max-w-xs mx-auto">
            {["male", "female"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="w-full border-2 border-gray-200 p-3 rounded-lg hover:border-blue-500"
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conditions */}
      {gender && !showQuestions && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-center">
            What are your primary concerns?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {Object.keys(questionsDb[gender]).map((cond) => (
              <button
                key={cond}
                onClick={() => handleConditionToggle(cond)}
                className={`border-2 p-4 rounded-lg text-center ${
                  selectedConditions.includes(cond)
                    ? "border-blue-600 bg-blue-50 font-semibold"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {showQuestions && selectedConditions.length > 0 && (
        <div className="mt-10 space-y-6">
          {selectedConditions.map((cond) => (
            <div key={cond}>
              <h3 className="text-lg font-bold text-blue-700">{cond}</h3>
              {questionsDb[gender][cond].map((q, i) => (
                <div
                  key={i}
                  className="mt-3 p-4 border rounded-lg bg-gray-50 space-y-2"
                >
                  <p className="font-medium">{q}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAnswer(cond, i, 2)}
                      className={`flex-1 border-2 p-2 rounded-lg ${
                        answers[cond]?.[i] === 2
                          ? "bg-blue-100 border-blue-600"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer(cond, i, 0)}
                      className={`flex-1 border-2 p-2 rounded-lg ${
                        answers[cond]?.[i] === 0
                          ? "bg-blue-100 border-blue-600"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Buttons row */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowQuestions(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium"
            >
              ← Back
            </button>
            <button
              onClick={calculateResults}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700"
            >
              Calculate My Score
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Your Assessment Results
          </h2>
          {results.map((r) => (
            <div
              key={r.condition}
              className="border p-5 rounded-xl bg-white shadow text-left"
            >
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-800">{r.condition}</h4>
                <span className="text-blue-600 font-bold">{r.score}/10</span>
              </div>
              <p className="mt-2">
                Concern Level:{" "}
                <span className={`${r.color} px-2 py-1 rounded-full`}>
                  {r.severity}
                </span>
              </p>
            </div>
          ))}

          {/* Back button from results */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowResults(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-lg font-medium"
            >
              ← Back to Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// =================== SecondHomePage ===================
const SecondHomePage = () => {
  const [start, setStart] = useState(false);

  return (
    <div className="flex items-center justify-center py-14 w-full bg-gray-50">
      {!start ? (
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">
            Confidential Wellness Assessment 🔒
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            This 2-minute assessment will help you understand your sexual health
            better. Your responses are 100% private.
          </p>
          <button
            onClick={() => setStart(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-md transition duration-200"
          >
            Let's Begin
          </button>
        </div>
      ) : (
        <Assessment />
      )}
    </div>
  );
};

export default SecondHomePage;
