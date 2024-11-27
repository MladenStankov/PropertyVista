"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Nav from "./nav/Nav";

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
    "/login/reset-password",
  ];
  const showHeaderAndFooter = !noLayoutRoutes.includes(pathName);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderAndFooter && <Nav />}
      <main className="flex-grow">{children}</main>
      {showHeaderAndFooter && <Footer />}
    </div>
  );
}
