"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { HiOutlineMailOpen } from "react-icons/hi";

const Verify = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div className="flex h-screen mx-10">
      <div className="flex flex-col items-center m-auto p-10 rounded-md border border-gray-300 shadow-xl n max-w-screen-sm">
        <h1 className="text-center text-3xl mb-5 font-semibold">
          Please verify your email!
        </h1>
        <h2 className="text-xl mb-5 text-center">
          You&apos;re almost there! We sent an email to{" "}
          <p className="font-semibold underline">{email}</p>
        </h2>
        <p className="text-wrap break-normal text-md  text-center">
          Just click on the link in the email to complete your sign-up. If you
          don&apos;t see it, you may need to check your spam folder!
        </p>
        <HiOutlineMailOpen className="w-[50px] h-[50px] mt-5" />
      </div>
    </div>
  );
};

export default Verify;
