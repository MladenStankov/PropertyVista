"use client";

import React, { useState, useEffect } from "react";
import FormInput from "../components/auth/FormInput";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import GoogleButton from "../components/auth/GoogleButton";
import { motion } from "framer-motion";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      router.push("/");
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
              Welcome Back
            </h1>
            <p className="text-gray-500 mb-8">
              Sign in to continue to PropertyVista
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              autoComplete="on"
            >
              <div className="relative">
                <FormInput
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error?.email}
                  Icon={MdOutlineEmail}
                />
              </div>

              <div className="relative">
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
                <Link
                  href="/login/forgot-password"
                  className="block text-sm text-blue-500 hover:text-blue-600 hover:underline mt-2 text-right"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-gray-600 text-center mb-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
              >
                Sign up
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
