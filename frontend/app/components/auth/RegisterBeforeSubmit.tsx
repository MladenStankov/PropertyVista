"use client";

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import FormInput from "./FormInput";
import { motion } from "framer-motion";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    let hasError = false;

    setFullNameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);

    setFullNameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);

    if (fullName === "") {
      setFullNameError("Full name is required");
      hasError = true;
    }
    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email");
      document.getElementById("email")?.classList.add("border-red-500");
      hasError = true;
    }
    if (password === "") {
      setPasswordError("Password is required");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-600 via-blue-500 to-cyan-400 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
            >
              <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              Create your Account
            </h1>
            <p className="text-gray-500 mb-8">
              Join PropertyVista today to find your dream home
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <FormInput
                  id="name"
                  label="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={fullNameError}
                  Icon={CiUser}
                  className={fullNameError ? "border-red-500" : ""}
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
                  className={emailError ? "border-red-500" : ""}
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
                  className={passwordError ? "border-red-500" : ""}
                />
                {!passwordError && (
                  <p className="mt-2 text-xs text-gray-500">
                    Password must contain at least 8 characters, including
                    uppercase, lowercase, numbers, and special characters
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className={`w-full p-3 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Signing up...
                  </div>
                ) : (
                  "Sign up"
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-gray-600 text-center mb-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>

            <div className="flex items-center mb-6">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-sm text-gray-500 font-medium">
                Or continue with
              </span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>

            <GoogleButton text="Continue with Google" />
          </div>
        </div>
      </div>
    </div>
  );
}
