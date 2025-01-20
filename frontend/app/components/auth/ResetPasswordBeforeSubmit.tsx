"use client";

import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ResetPasswordBeforeSubmitProps {
  token: string | null;
  handleReset: () => void;
}

export default function ResetPasswordBeforeSubmit({
  token,
  handleReset,
}: ResetPasswordBeforeSubmitProps) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] =
    useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    let hasError = false;
    document.getElementById("password")?.classList.remove("border-red-500");
    document
      .getElementById("confirm-password")
      ?.classList.remove("border-red-500");

    if (password === "" || confirmPassword === "") {
      setError("Fill all the fields!");
      hasError = true;

      if (password === "")
        document.getElementById("password")?.classList.add("border-red-500");

      if (confirmPassword === "")
        document
          .getElementById("confirm-password")
          ?.classList.add("border-red-500");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError("Password needs to be strong!");
      hasError = true;

      document.getElementById("password")?.classList.add("border-red-500");
    } else if (password != confirmPassword) {
      setError("Passwords need to match");
      hasError = true;

      document.getElementById("password")?.classList.add("border-red-500");
      document
        .getElementById("confirm-password")
        ?.classList.add("border-red-500");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/email-sending/password-reset`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || "Reset password failed!");
      setLoading(false);
    } else {
      handleReset();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <form
        onSubmit={handleSumbit}
        className="m-auto p-10 rounded-md border border-gray-300 shadow-xl bg-white"
        autoComplete="on"
      >
        <h1 className="text-center text-3xl mb-4">Reset your password!</h1>

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

        <div className="relative">
          <FormInput
            id="confirm-password"
            label="Confirm your password"
            value={confirmPassword}
            type={confirmPasswordHidden ? "password" : "text"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordHidden ? (
            <FaRegEyeSlash
              onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
              className="absolute right-3 bottom-3 hover:cursor-pointer hover:text-gray-800 text-gray-500"
            />
          ) : (
            <FaRegEye
              onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
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
          {loading ? "Resetting password..." : "Reset password"}
        </button>

        <ErrorMessage error={error} />
      </form>
    </div>
  );
}
