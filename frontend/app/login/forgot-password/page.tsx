import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-t from-cyan-500 to-blue-500 px-4">
      <form className="flex flex-col m-auto p-10 rounded-md border border-gray-300 shadow-xl gap-8 bg-white">
        <Link
          href="/login"
          className="flex flex-row gap-1 w-fit hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Login</p>
        </Link>

        <h1 className="text-center text-4xl mb-5 font-semibold">
          Forgot password?
        </h1>
        <p className="break-words max-w-96">
          No worries, provide us the email of your profile and we will send you
          an reset password email.
        </p>
        <input
          className="rounded-md py-2 pr-9 pl-2 border-gray-400 w-full border"
          id="email"
          placeholder="Enter your email"
          name="email"
        />
        <button className="border rounded-md w-full bg-blue-500 text-white py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
