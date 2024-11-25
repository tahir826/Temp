"use client";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMale,
  FaFemale,
  FaTransgender,
  FaUserGraduate,
  FaChild,
  FaBrain,
  FaUsers,
  FaBook,
  FaMusic,
  FaGamepad,
  FaTrophy,
  FaCompass,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLightbulb,
  FaGlobe,
  FaHeart,
  FaMedal,
  FaBriefcase,
  FaCogs,
  FaStethoscope,
  FaPalette,
  FaChartLine,
} from "react-icons/fa";

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

const icons: Record<string, React.ReactNode> = {
  Male: <FaMale size={32} />,
  Female: <FaFemale size={32} />,
  Other: <FaTransgender size={32} />,
  Introvert: <FaBrain size={32} />,
  Extrovert: <FaUsers size={32} />,
  Ambivert: <FaUserGraduate size={32} />,
  Thinker: <FaLightbulb size={32} />,
  Feeler: <FaHeart size={32} />,
  Reading: <FaBook size={32} />,
  Sports: <FaTrophy size={32} />,
  Music: <FaMusic size={32} />,
  Gaming: <FaGamepad size={32} />,
  Grades: <FaTrophy size={32} />,
  Knowledge: <FaLightbulb size={32} />,
  "Personal Growth": <FaCompass size={32} />,
  Curiosity: <FaGraduationCap size={32} />,
  "Peer Competition": <FaChalkboardTeacher size={32} />,
  "Passing Exams": <FaGraduationCap size={32} />,
  "Improving Grades": <FaTrophy size={32} />,
  "Gaining Knowledge": <FaLightbulb size={32} />,
  "Graduate with Honors": <FaMedal size={32} />,
  "Build a Career": <FaBriefcase size={32} />,
  "Personal Fulfillment": <FaHeart size={32} />,
  Engineering: <FaCogs size={32} />,
  Medicine: <FaStethoscope size={32} />,
  Arts: <FaPalette size={32} />,
  Business: <FaChartLine size={32} />,
  Math: <FaCogs size={32} />, // Representing math with a gear icon
  Science: <FaBrain size={32} />, // Representing science with a brain icon
  History: <FaBook size={32} />, // Representing history with a book icon
  Art: <FaPalette size={32} />, // Representing art with a palette icon
 // A generic "other" icon
};


type OnboardingQuestion = {
  question: string;
  type: "select" | "input" | "button";
  options?: string[];
};

const onboardingQuestions: OnboardingQuestion[] = [
  { question: "How old are you?", type: "input" },
  { question: "What is your gender?", type: "button", options: ["Male", "Female", "Other"] },
  { question: "Which country do you currently live in?", type: "select", options: countries },
  { question: "How would you describe your style of interacting with others?", type: "button", options: ["Introvert", "Extrovert", "Ambivert"] },
  { question: "How do you typically make decisions?", type: "button", options: ["Thinker", "Feeler"] },
  { question: "What is your current level of education?", type: "button", options: ["High School", "Undergraduate", "Postgraduate", "Other"] },
  { question: "What was your grade in the most recent academic assessment?", type: "button", options: ["A", "B", "C", "D", "F"] },
  { question: "What is your favorite subject?", type: "button", options: ["Math", "Science", "History", "Art", "Other"] },
  { question: "What activities do you enjoy in your free time?", type: "button", options: ["Reading", "Sports", "Music", "Gaming", "Other"] },
  { question: "What motivates you to study?", type: "button", options: ["Grades", "Knowledge", "Personal Growth", "Curiosity", "Peer Competition"] },
  { question: "What are your short-term academic goals?", type: "button", options: ["Passing Exams", "Improving Grades", "Gaining Knowledge"] },
  { question: "What are your long-term academic goals?", type: "button", options: ["Graduate with Honors", "Build a Career", "Personal Fulfillment"] },
  { question: "What career paths are you interested in pursuing?", type: "button", options: ["Engineering", "Medicine", "Arts", "Business", "Other"] },
];

const OnboardingPage: FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(onboardingQuestions.length).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitProfile = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Map the answers to the API request format
    const requestBody = {
      age: parseInt(answers[0]) || 0,
      gender: answers[1],
      country: answers[2],
      social_interaction_style: answers[3],
      decision_making_approach: answers[4],
      current_level_of_education: answers[5],
      last_grade: answers[6],
      favorite_subject: answers[7],
      free_time_activities: answers[8],
      motivation_to_study: answers[9],
      short_term_academic_goals: answers[10],
      long_term_academic_goals: answers[11],
      interested_career_paths: answers[12],
    };

    try {
      const response = await fetch(
        "https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/student/create_profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit profile. Please try again.");
      }

      const data = await response.json();
      setSuccessMessage(`Profile created successfully! Welcome, ${data.name}.`);
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = onboardingQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / onboardingQuestions.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div
        className="w-full max-w-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="mb-4 text-lg font-medium">{currentQuestion.question}</div>
        {currentQuestion.type === "input" && (
          <input
            type="text"
            value={answers[currentQuestionIndex]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="border p-2 w-full"
          />
        )}
        {currentQuestion.type === "button" && currentQuestion.options && (
          <div className="flex flex-wrap gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`p-2 border rounded ${
                  answers[currentQuestionIndex] === option ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleAnswerChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {currentQuestion.type === "select" && currentQuestion.options && (
          <select
            value={answers[currentQuestionIndex]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select...</option>
            {currentQuestion.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        <div className="mt-4 flex justify-between">
          <button
            className="p-2 border rounded"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex === onboardingQuestions.length - 1 ? (
            <button className="p-2 border rounded bg-blue-500 text-white" onClick={submitProfile} disabled={isLoading}>
             submit
            </button>
          ) : (
            <button className="p-2 border rounded" onClick={goToNextQuestion}>
              Next
            </button>
          )}
        </div>

        <div className="mt-4">
          {successMessage && <div className="text-green-500">{successMessage}</div>}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;