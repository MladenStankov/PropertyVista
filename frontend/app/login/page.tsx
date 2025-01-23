"use client";

import React, { useState } from "react";
import FormInput from "../components/auth/FormInput";
import { redirect } from "next/navigation";

import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import GoogleButton from "../components/auth/GoogleButton";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    let hasError = false;
    setError({});

    if (email === "" || password === "") {
      setError((prev) => ({
        ...prev,
        email: email === "" ? "Email is required" : undefined,
        password: password === "" ? "Password is required" : undefined,
      }));
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setError({ email: errorData.message || "Login failed!" });
      setLoading(false);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
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

        <h1 className="text-center text-3xl mb-4">Sign in your Account</h1>

        <FormInput
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error?.email}
          Icon={MdOutlineEmail}
        />

        <FormInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error?.password}
          Icon={passwordHidden ? FaRegEye : FaRegEyeSlash}
          iconHandler={() => setPasswordHidden(!passwordHidden)}
          type={passwordHidden ? "password" : "text"}
        />

        <button
          type="submit"
          className={`w-full my-4 border border-gray-400 p-2 rounded-md font-semibold text-lg transition-colors ${
            loading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600 transition-colors"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="flex mb-3 justify-center">
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
      </form>
    </div>
  );
}
