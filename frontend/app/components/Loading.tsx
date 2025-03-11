import React from "react";

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
      <div
        className={`animate-spin rounded-full h-${forNav ? "6" : "12"} w-${
          forNav ? "6" : "12"
        } border-t-2 border-b-2 border-${color}-500`}
      ></div>
    </div>
  );
}
