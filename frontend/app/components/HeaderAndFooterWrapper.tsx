"use client";

import { usePathname } from "next/navigation";
import Header from "./Nav";
import Footer from "./Footer";
import React from "react";

export default function HeaderAndFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const noLayoutRoutes = [
    "/login",
    "/register",
    "/register/verify",
    "/login/forgot-password",
  ];
  const showHeaderAndFooter = !noLayoutRoutes.includes(pathName);

  return (
    <React.Fragment>
      {showHeaderAndFooter && <Header />}
      <main>{children}</main>
      {showHeaderAndFooter && <Footer />}
    </React.Fragment>
  );
}
