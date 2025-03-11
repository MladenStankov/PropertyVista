"use client";

import React, { useEffect } from "react";
import WizardForm from "../components/sell/WizardForm";
import ProtectedRoute from "../components/auth/ProtectedRoute";
export default function Sell() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <ProtectedRoute>
      <WizardForm />
    </ProtectedRoute>
  );
}
