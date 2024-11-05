"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <div>{token}</div>;
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
