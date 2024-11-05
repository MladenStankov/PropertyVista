"use client";

import ForgotPasswordAfterSubmit from "@/app/components/ForgotPasswordAfterSubmit";
import ForgotPasswordBeforeSubmit from "@/app/components/ForgotPasswordBeforeSubmit";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [submit, setSubmit] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmit(true);
  };

  return !submit ? (
    <ForgotPasswordBeforeSubmit handleSubmit={handleSubmit} />
  ) : (
    <ForgotPasswordAfterSubmit />
  );
}
