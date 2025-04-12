import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

interface RegisterAfterSubmitProps {
  email: string;
}

export default function RegisterAfterSubmit({
  email,
}: RegisterAfterSubmitProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-500 w-full px-4 py-8">
      <div className="flex flex-col m-auto p-8 sm:p-10 rounded-xl border border-gray-200 shadow-2xl bg-white max-w-md w-full">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-8"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <MdMarkEmailRead className="text-7xl text-blue-500" />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              You&apos;re almost there!
            </h1>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                We&apos;ve sent a verification email to{" "}
                <span className="font-semibold text-blue-700 break-all">
                  {email}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600">
              Please check your email and click the verification link to
              complete your registration.
            </p>
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p> The verification link expires in 30 minutes</p>
              <p> Don&apos;t forget to check your spam folder!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
