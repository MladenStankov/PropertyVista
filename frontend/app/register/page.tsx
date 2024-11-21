"use client";

import React, { useState } from "react";
import RegisterBeforeSubmit from "../components/auth/RegisterBeforeSubmit";
import RegisterAfterSubmit from "../components/auth/RegisterAfterSubmit";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleRegistration = (email: string) => {
    setEmail(email);
    setIsSubmitted(true);
  };

  return !isSubmitted ? (
    <RegisterBeforeSubmit handleRegistration={handleRegistration} />
  ) : (
    <RegisterAfterSubmit email={email} />
  );
}
