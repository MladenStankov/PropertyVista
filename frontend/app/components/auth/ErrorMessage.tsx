import React from "react";
import { IoWarningOutline } from "react-icons/io5";

interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    error && (
      <div className="flex flex-row gap-2 mt-3 w-full justify-center">
        <IoWarningOutline className="text-red-600 mt-[2px]" />
        <p className="text-sm break-words text-red-600 font-semibold">
          {error}
        </p>
      </div>
    )
  );
}
