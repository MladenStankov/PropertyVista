"use client";

import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { redirect } from "next/navigation";

import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import Link from "next/link";
import GoogleButton from "../components/GoogleButton";

export default function LoginPage() {
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

    if (email === "" || password === "") {
      setError("Fill all the fields!");
      hasError = true;
      if (email === "")
        document.getElementById("email")?.classList.add("border-red-500");
      if (password === "")
        document.getElementById("password")?.classList.add("border-red-500");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email!");
      hasError = true;
      document.getElementById("email")?.classList.add("border-red-500");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Registration failed!");
      setLoading(false);
    } else {
      console.log("Registration successful");
      redirect("/");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <form
        onSubmit={handleSumbit}
        className="m-auto p-10 rounded-md border border-gray-300 shadow-xl bg-white"
        autoComplete="on"
      >
        <Link
          href="/"
          className="flex flex-row gap-1 w-fit mb-2 hover:underline hover:text-gray-700"
        >
          <FaArrowLeft className="mt-1 text-gray-500" />
          <p className="text-gray-500 hover:text-gray-800">Back to Home</p>
        </Link>

        <h1 className="text-center text-3xl mb-4">Enter in your Account</h1>

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
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="flex mb-3 justify-end">
          <Link
            href="/login/forgot-password"
            className="text-blue-400 underline hover:cursor-pointer hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <div>
          <p className="text-gray-500 text-center">
            Don&apos;t have an account?
          </p>
          <div className="text-center">
            <Link
              href="/register"
              className="text-blue-400 underline hover:cursor-pointer hover:text-blue-500"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <GoogleButton text="Sign in with Google" />

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
}
