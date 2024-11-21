"use client";

import ForgotPasswordAfterSubmit from "@/app/components/auth/ForgotPasswordAfterSubmit";
import ForgotPasswordBeforeSubmit from "@/app/components/auth/ForgotPasswordBeforeSubmit";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmittedSubmit] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmittedSubmit(true);
  };

  return !isSubmitted ? (
    <ForgotPasswordBeforeSubmit handleSubmit={handleSubmit} />
  ) : (
    <ForgotPasswordAfterSubmit />
  );
}
