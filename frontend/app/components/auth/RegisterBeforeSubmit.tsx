"use client";

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import FormInput from "./FormInput";

interface RegisterBeforeSubmitProps {
  handleRegistration: (email: string) => void;
}

export default function RegisterBeforeSubmit({
  handleRegistration,
}: RegisterBeforeSubmitProps) {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [fullNameError, setFullNameError] = useState<string | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    let hasError = false;

    setFullNameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);

    document.getElementById("name")?.classList.remove("border-red-500");
    document.getElementById("email")?.classList.remove("border-red-500");
    document.getElementById("password")?.classList.remove("border-red-500");

    if (fullName === "") {
      setFullNameError("Full name is required");
      document.getElementById("name")?.classList.add("border-red-500");
      hasError = true;
    }
    if (email === "") {
      setEmailError("Email is required");
      document.getElementById("email")?.classList.add("border-red-500");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email");
      document.getElementById("email")?.classList.add("border-red-500");
      hasError = true;
    }
    if (password === "") {
      setPasswordError("Password is required");
      document.getElementById("password")?.classList.add("border-red-500");
      hasError = true;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setPasswordError("Password needs to be strong");
      document.getElementById("password")?.classList.add("border-red-500");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setPasswordError(errorData.message || "Registration failed!");
        setLoading(false);
      } else {
        handleRegistration(email);
      }
    } catch (error) {
      console.log(error);
      setPasswordError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-l from-cyan-500 to-blue-500">
      <form
        onSubmit={handleSumbit}
        className="m-auto p-10 rounded-md border border-gray-300 shadow-xl bg-white max-w-md"
        autoComplete="on"
      >
        <Link
          href="/"
          className="flex flex-row gap-1 w-fit mb-2 hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Home</p>
        </Link>
        <h1 className="text-center text-3xl mb-4 hover:text-gray-800">
          Create your Account
        </h1>

        <div className="relative">
          <FormInput
            id="name"
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={fullNameError}
            Icon={CiUser}
          />
        </div>

        <div className="relative">
          <FormInput
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            Icon={MdOutlineEmail}
          />
        </div>

        <div className="relative">
          <FormInput
            id="password"
            label="Password"
            value={password}
            type={passwordHidden ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            Icon={passwordHidden ? FaRegEyeSlash : FaRegEye}
            iconHandler={() => setPasswordHidden(!passwordHidden)}
          />
        </div>

        <button
          type="submit"
          className={`w-full my-4 border border-gray-400 p-2 rounded-md font-semibold text-lg transition-colors ${
            loading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600 transition-colors"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-gray-500 text-center">
          Already have an account?{" "}
          <span>
            {" "}
            <Link
              href="/login"
              className="text-blue-400 underline hover:cursor-pointer hover:text-blue-500"
            >
              Sign in
            </Link>
          </span>
        </p>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <GoogleButton text="Continue with Google" />
      </form>
    </div>
  );
}
