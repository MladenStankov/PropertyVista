import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function ResetPasswordAfterSubmit() {
  return (
    <div className="flex h-screen bg-gradient-to-b from-cyan-500 to-blue-500 w-screen px-4">
      <div className="flex flex-col m-auto p-10 rounded-md border border-gray-300 shadow-xl bg-white max-w-md">
        <Link
          href="/"
          className="flex flex-row gap-1 w-fit hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Home</p>
        </Link>

        <h1 className="text-4xl my-5 break-words leading-tight text-center">
          You successfully reset your password!
        </h1>

        <Link href="/login">
          <button className="border rounded-md w-full bg-blue-500 text-white py-2 hover:bg-blue-600">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
