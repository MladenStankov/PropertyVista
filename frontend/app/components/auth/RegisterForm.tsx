"use client";

import React, { useState } from "react";
import FormInput from "../FormInput";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const RegisterForm = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    let hasError = false;
    document.getElementById("name")?.classList.remove("border-red-500");
    document.getElementById("email")?.classList.remove("border-red-500");
    document.getElementById("password")?.classList.remove("border-red-500");

    if (fullName === "" || email === "" || password === "") {
      setError("Fill all the fields!");
      hasError = true;
      if (fullName === "")
        document.getElementById("name")?.classList.add("border-red-500");
      if (email === "")
        document.getElementById("email")?.classList.add("border-red-500");
      if (password === "")
        document.getElementById("password")?.classList.add("border-red-500");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email!");
      hasError = true;
      document.getElementById("email")?.classList.add("border-red-500");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError("Password needs to be strong!");
      hasError = true;
      document.getElementById("password")?.classList.add("border-red-500");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Registration failed!");
      setLoading(false);
    } else {
      console.log("Registration successful");
      redirect(`/register/verify?email=${email}`);
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
          />
          <CiUser className="absolute right-3 bottom-3" />
        </div>

        <div className="relative">
          <FormInput
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdOutlineEmail className="absolute right-3 bottom-3 text-gray-500" />
        </div>

        <div className="relative">
          <FormInput
            id="password"
            label="Password"
            value={password}
            type={passwordHidden ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordHidden ? (
            <FaRegEyeSlash
              onClick={() => setPasswordHidden(!passwordHidden)}
              className="absolute right-3 bottom-3 hover:cursor-pointer hover:text-gray-800 text-gray-500"
            />
          ) : (
            <FaRegEye
              onClick={() => setPasswordHidden(!passwordHidden)}
              className="absolute right-3 bottom-3 hover:cursor-pointer hover:text-gray-800 text-gray-500"
            />
          )}
        </div>

        <button
          type="submit"
          className={`w-full my-4 border border-gray-400 p-2 rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-gray-500 text-center">Already have an account?</p>
        <div className="text-center">
          <Link
            href="/login"
            className="text-blue-400 underline hover:cursor-pointer hover:text-blue-500"
          >
            Sign in to your account
          </Link>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <Link href="http://localhost:3000/auth/google" passHref>
          <button
            type="button"
            className="w-full border border-gray-400 p-2 rounded-md flex items-center justify-center hover:bg-gray-100"
          >
            <Image
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign up with Google
          </button>
        </Link>
        {error && (
          <div className="flex flex-row gap-2 mt-3 w-full justify-center">
            <IoWarningOutline className="text-red-600 mt-[2px]" />
            <p className="text-sm break-words text-red-600 font-semibold">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
