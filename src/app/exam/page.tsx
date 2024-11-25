// pages/exam.tsx
"use client"
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

type ExamQuestion = {
  question: string;
  type: "MCQ" | "Essay";
  options?: string[];
};

const examQuestions: ExamQuestion[] = [
  { question: "What is the capital of France?", type: "MCQ", options: ["Paris", "Berlin", "Rome", "Madrid"] },
  { question: "Explain the process of photosynthesis.", type: "Essay" },
  { question: "Select the correct statement about gravity.", type: "MCQ", options: ["It is stronger on the moon.", "It is weaker in water.", "It pulls objects toward the Earth.", "It pushes objects away from Earth."] },
];

const ExamPage: FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(examQuestions.length).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(300); // 5-minute timer (in seconds)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer Countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      handleSubmit();
    }
  }, [timer]);

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("Exam submitted:", answers);
  };

  const currentQuestion = examQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examQuestions.length - 1;

  // Format time (MM:SS)
  const formatTime = (time: number) => `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8F5E9] to-[#A5D6A7] py-12">
      <motion.div
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#388E3C]">Exam</h1>
          <div className="text-[#388E3C] text-lg font-semibold">Time Left: {formatTime(timer)}</div>
        </header>

        {/* Question */}
        <div className="space-y-8">
          <motion.div
            key={currentQuestionIndex}
            className="w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-2xl font-semibold text-[#388E3C] mb-4">
              {currentQuestion.question}
            </label>
            {currentQuestion.type === "MCQ" && (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, optIndex) => (
                  <motion.button
                    key={optIndex}
                    onClick={() => handleAnswerChange(option)}
                    className={`p-4 rounded-lg text-center text-lg ${
                      answers[currentQuestionIndex] === option
                        ? "bg-[#388E3C] text-white"
                        : "bg-[#E8F5E9] text-[#388E3C]"
                    } transition-all duration-300 ease-in-out hover:scale-110`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 * optIndex }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
            {currentQuestion.type === "Essay" && (
              <textarea
                className="w-full p-4 rounded-lg border-2 border-[#388E3C] focus:outline-none focus:ring-2 focus:ring-[#66BB6A] resize-none"
                rows={5}
                placeholder="Type your answer here..."
                value={answers[currentQuestionIndex]}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            className="text-[#66BB6A] hover:text-[#388E3C] font-semibold"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            style={{ border: "none", padding: "0" }}
          >
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              className={`text-[#66BB6A] hover:text-[#388E3C] font-semibold ${
                !answers[currentQuestionIndex] ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!answers[currentQuestionIndex]}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              style={{ border: "none", padding: "0" }}
            >
              Next
            </button>
          ) : (
            <motion.button
              className="bg-[#388E3C] hover:bg-[#66BB6A] text-white font-bold py-2 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 ease-in-out"
              onClick={handleSubmit}
            >
              Submit
            </motion.button>
          )}
        </div>

        {/* Submit Confirmation */}
        {isSubmitted && (
          <motion.div
            className="mt-10 p-4 bg-[#388E3C] text-white font-semibold text-center rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Your exam has been submitted successfully. Thank you!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExamPage;
