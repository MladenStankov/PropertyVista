"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Verify = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex h-screen bg-gradient-to-b from-cyan-500 to-blue-500 w-screen px-4">
      <div className="flex flex-col m-auto p-10 rounded-md border border-gray-300 shadow-xl gap-5 bg-white">
        <Link
          href="/register"
          className="flex flex-row gap-1 w-fit hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Register</p>
        </Link>

        <h1 className="text-2xl max-w-96">
          You&apos;re almost there! We sent an email to{" "}
          <span className="font-semibold">{email}</span>
        </h1>
        <p className="text-wrap break-normal max-w-96">
          Just click on the link in the email to complete your sign-up. If you
          don&apos;t see it, you may need to check your spam folder! The link is
          valid only for 30 minutes!
        </p>
      </div>
    </div>
  );
};

const VerifyPage = () => {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  );
};

export default VerifyPage;
