"use client";

import ResetPasswordAfterSubmit from "@/app/components/auth/ResetPasswordAfterSubmit";
import ResetPasswordBeforeSubmit from "@/app/components/auth/ResetPasswordBeforeSubmit";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function ResetPassword() {
  const [isSubmitted, setIsSubmittedSubmit] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleReset = () => {
    setIsSubmittedSubmit(true);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  return !isSubmitted ? (
    <ResetPasswordBeforeSubmit token={token} handleReset={handleReset} />
  ) : (
    <ResetPasswordAfterSubmit />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
