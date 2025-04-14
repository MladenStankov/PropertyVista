import React from "react";
import { FaCheck } from "react-icons/fa";

interface IStep {
  step: number;
  title: string;
  current?: boolean;
  completed?: boolean;
}

export default function Step({
  step,
  title,
  current = false,
  completed = false,
}: IStep) {
  return (
    <div className="flex items-center gap-3 group">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-medium transition-all duration-300 ${
          current
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20 scale-110"
            : completed
            ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md shadow-green-500/20"
            : "bg-white text-gray-400 border-2 border-gray-200"
        }`}
      >
        {completed ? <FaCheck className="w-4 h-4" /> : step}
      </div>
      <span
        className={`text-sm font-medium transition-all duration-300 ${
          current
            ? "text-blue-600"
            : completed
            ? "text-green-600"
            : "text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}
