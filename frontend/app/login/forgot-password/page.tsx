"use client";

import ForgotPasswordAfterSubmit from "@/app/components/ForgotPasswordAfterSubmit";
import ForgotPasswordBeforeSubmit from "@/app/components/ForgotPasswordBeforeSubmit";
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
