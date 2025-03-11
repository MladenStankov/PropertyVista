"use client";

import React, { useEffect, useState } from "react";
import RegisterBeforeSubmit from "../components/auth/RegisterBeforeSubmit";
import RegisterAfterSubmit from "../components/auth/RegisterAfterSubmit";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

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
