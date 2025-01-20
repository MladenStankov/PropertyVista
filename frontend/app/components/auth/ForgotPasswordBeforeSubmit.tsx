"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";

interface ForgotPasswordBeforeSubmitProps {
  handleSubmit: () => void;
}

export default function ForgotPasswordBeforeSubmit({
  handleSubmit,
}: ForgotPasswordBeforeSubmitProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    let hasError = false;
    document.getElementById("email")?.classList.remove("border-red-500");

    if (email == "") {
      setError("Fill in you email!");
      hasError = true;
      document.getElementById("email")?.classList.add("border-red-500");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email!");
      hasError = true;
      document.getElementById("email")?.classList.add("border-red-500");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/email-sending/password-forgot`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Failed to send a reset password email!");
      setLoading(false);
    } else {
      handleSubmit();
    }
  };
  return (
    <div className="flex h-screen flex-col bg-gradient-to-t from-cyan-500 to-blue-500 px-4">
      <form
        onSubmit={handleRequest}
        className="flex flex-col m-auto p-10 rounded-md border border-gray-300 shadow-xl gap-8 bg-white"
      >
        <Link
          href="/login"
          className="flex flex-row gap-1 w-fit hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Login</p>
        </Link>

        <h1 className="text-center text-4xl mb-5">Forgot password?</h1>
        <p className="break-words max-w-96">
          No worries, provide us the email of your profile and we will send you
          an reset password email.
        </p>
        <input
          className="rounded-md py-2 pr-9 pl-2 border-gray-400 w-full border"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={`border rounded-md w-full bg-blue-500 text-white py-2 ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Submit
        </button>
        <ErrorMessage error={error} />
      </form>
    </div>
  );
}
