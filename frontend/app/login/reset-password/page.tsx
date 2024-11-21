"use client";

import ResetPasswordAfterSubmit from "@/app/components/auth/ResetPasswordAfterSubmit";
import ResetPasswordBeforeSubmit from "@/app/components/auth/ResetPasswordBeforeSubmit";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";

function ResetPassword() {
  const [isSubmitted, setIsSubmittedSubmit] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = () => {
    setIsSubmittedSubmit(true);
  };

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
