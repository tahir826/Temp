"use client";
import { FC } from "react";
import Link from "next/link";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaDownload } from "react-icons/fa";
import { MdOutlineFeedback, MdOutlineGrade } from "react-icons/md";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type QuestionResult = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  isCorrect: boolean;
};

type ResultData = {
  totalScore: number;
  totalQuestions: number;
  correctAnswers: number;
  grade: string;
  feedback: string;
  improvementAreas: string[];
  questions: QuestionResult[];
};

const resultData: ResultData = {
  totalScore: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  grade: "A",
  feedback: "Great job! You have a strong understanding of the material.",
  improvementAreas: ["Focus on complex problem-solving", "Review physics concepts"],
  questions: [
    {
      question: "What is the acceleration due to gravity on Earth?",
      correctAnswer: "9.8 m/s²",
      userAnswer: "10 m/s²",
      explanation: "The correct answer is 9.8 m/s², as it is the standard gravitational acceleration on Earth.",
      isCorrect: false,
    },
    {
      question: "What is the chemical symbol for water?",
      correctAnswer: "H₂O",
      userAnswer: "H₂O",
      explanation: "Water is represented by H₂O, combining hydrogen and oxygen.",
      isCorrect: true,
    },
  ],
};

const ResultPage: FC = () => {
  const percentage = (resultData.correctAnswers / resultData.totalQuestions) * 100;

  const pieData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        label: "Exam Results",
        data: [resultData.correctAnswers, resultData.totalQuestions - resultData.correctAnswers],
        backgroundColor: ["#66BB6A", "#FFCDD2"],
        hoverBackgroundColor: ["#388E3C", "#D32F2F"],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Exam Results", 105, 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Grade: ${resultData.grade}`, 10, 20);
    doc.text(`Score: ${resultData.totalScore}/100`, 10, 30);
    doc.text("Improvement Areas:", 10, 40);
    resultData.improvementAreas.forEach((area, index) => {
      doc.text(`${index + 1}. ${area}`, 15, 50 + index * 10);
    });

    doc.autoTable({
      head: [["Question", "Correct Answer", "Your Answer", "Explanation"]],
      body: resultData.questions.map((q) => [
        q.question,
        q.correctAnswer,
        q.userAnswer,
        q.explanation,
      ]),
      startY: 70,
    });

    doc.save("Exam_Results.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#FDFDFD] to-[#E0E0E0] py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-10 mt-8 transform transition-all duration-500 hover:scale-105">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#388E3C] mb-4">Exam Results</h1>
          <p className="text-[#66BB6A]">Student: Tahir | Date: October 28, 2024</p>
        </header>

        <section className="flex flex-wrap justify-between mb-8 bg-[#A5D6A7] p-6 rounded-lg shadow-lg relative">
          <div className="w-full md:w-1/3 mb-4 text-center">
            <h2 className="text-xl font-semibold text-white">Total Marks</h2>
            <p className="text-3xl font-bold text-[#388E3C]">{resultData.totalScore}/100</p>
          </div>
          <div className="w-full md:w-1/3 text-center relative">
          <h1 className="text-white font-bold text-xl">Percentage</h1>
            <div className="relative w-20 h-20 mx-auto">
              <Pie data={pieData} options={pieOptions} />
              <div className="absolute inset-0 flex items-center justify-center text-[#49674b] font-bold text-lg">
                {percentage.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <h2 className="text-xl font-semibold text-white">Grade</h2>
            <p className="text-3xl font-bold text-[#388E3C]">{resultData.grade}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-[#388E3C]">
            <MdOutlineFeedback className="mr-2" />
            Personalized Feedback
          </h2>
          <p className="bg-[#A5D6A7] p-6 rounded-lg border-l-4 border-[#66BB6A] text-[#2B2B2B] shadow-lg">
            {resultData.feedback}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="flex items-center text-2xl font-semibold mb-4 text-[#388E3C]">
            <MdOutlineGrade className="mr-2" />
            Areas for Improvement
          </h2>
          <ul className="list-disc list-inside pl-4 text-[#388E3C] space-y-2">
            {resultData.improvementAreas.map((area, index) => (
              <li key={index} className="hover:text-[#66BB6A] hover:scale-105 transform transition-all duration-300">
                {area}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex justify-between mt-8">
          <button
            onClick={downloadPDF}
            className="flex items-center bg-[#388E3C] hover:bg-[#66BB6A] text-white font-bold py-2 px-8 rounded-lg transform hover:scale-110"
          >
            <FaDownload className="mr-2" />
            Download Results
          </button>
          <Link href="/exams">
            <p className="bg-[#9E9E9E] hover:bg-[#66BB6A] text-white font-bold py-2 px-8 rounded-lg transform hover:scale-110">
              Create New Exam
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
