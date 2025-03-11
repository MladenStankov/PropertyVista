"use client";

import ForgotPasswordAfterSubmit from "@/app/components/auth/ForgotPasswordAfterSubmit";
import ForgotPasswordBeforeSubmit from "@/app/components/auth/ForgotPasswordBeforeSubmit";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmittedSubmit] = useState<boolean>(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = () => {
    setIsSubmittedSubmit(true);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  return !isSubmitted ? (
    <ForgotPasswordBeforeSubmit handleSubmit={handleSubmit} />
  ) : (
    <ForgotPasswordAfterSubmit />
  );
}
