import React from "react";

interface LoadingProps {
  color?: string;
  forNav?: boolean;
}

export default function Loading({ color, forNav = false }: LoadingProps) {
  return (
    <span
      className={`loading loading-lg loading-spinner text-blue-500 ${
        (color && "text-" + color) || ""
      }  ${!forNav && "absolute right-1/2 bottom-1/2"}`}
    ></span>
  );
}
