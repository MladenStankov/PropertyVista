import React from "react";

interface IStep {
  step: number;
  title: string;
  current?: boolean;
}

export default function Step({ step, title, current = false }: IStep) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-left">
      <div
        className={`border rounded-full p-3 px-5 text-2xl max-md:text-base max-md:p-1 max-md:px-3 ${
          current ? "bg-blue-500 text-white" : "border-black"
        }`}
      >
        {step}
      </div>
      <p
        className={`text-xl max-md:text-sm max-sm:text-[10px] self-center ${
          current ? "text-blue-500 font-medium" : ""
        }`}
      >
        {title}
      </p>
    </div>
  );
}
