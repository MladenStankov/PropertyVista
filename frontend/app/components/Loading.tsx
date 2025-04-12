import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingProps {
  color?: string;
  forNav?: boolean;
}

export default function Loading({
  color = "blue",
  forNav = false,
}: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center ${
        forNav ? "h-6 w-6" : "h-full w-full"
      }`}
    >
      <AiOutlineLoading3Quarters
        size={24}
        className={`animate-spin ${
          {
            blue: "text-blue-500",
            red: "text-red-500",
            green: "text-green-500",
            yellow: "text-yellow-500",
          }[color] || "text-blue-500"
        }`}
      />
    </div>
  );
}
