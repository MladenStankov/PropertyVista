import React from "react";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface RegisterAfterSubmitProps {
  email: string;
}

export default function RegisterAfterSubmit({
  email,
}: RegisterAfterSubmitProps) {
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
          You&apos;re almost there!
        </h1>
        <p className="text-wrap break-normal max-w-96">
          Just click on the email sent to{" "}
          <span className="font-semibold">{email}</span> to complete your
          sign-up. If you don&apos;t see it, you may need to check your spam
          folder! The link is valid only for 30 minutes!
        </p>
      </div>
    </div>
  );
}
