import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function ForgotPasswordAfterSubmit() {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-t from-cyan-500 to-blue-500 px-4">
      <div className="flex flex-col m-auto p-10 rounded-md border border-gray-300 shadow-xl gap-4 bg-white">
        <Link
          href="/login"
          className="flex flex-row gap-1 w-fit hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Login</p>
        </Link>

        <h1 className="text-center text-4xl mb-5 max-w-96">
          Successfully sent a reset-password email!
        </h1>
        <p className="break-words max-w-96">
          We sent a reset-password email if an account with this email exists.
          For more instruction check your email.
        </p>
      </div>
    </div>
  );
}
