import React from "react";

interface LoadingProps {
  color?: string;
}

export default function Loading({ color }: LoadingProps) {
  return (
    <span
      className={`loading loading-lg loading-spinner text-blue-500 ${
        (color && "text-" + color) || ""
      }  absolute right-1/2 bottom-1/2`}
    ></span>
  );
}
