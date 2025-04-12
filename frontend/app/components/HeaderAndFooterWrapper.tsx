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

  const isChatRoute = pathName.includes("/chats/");
  const showHeaderAndFooter = !noLayoutRoutes.includes(pathName);

  return (
    <div
      className={`flex flex-col ${isChatRoute ? "h-screen" : "min-h-screen"}`}
    >
      {showHeaderAndFooter && <Nav />}
      <main className={`flex-1 ${isChatRoute ? "overflow-hidden" : ""}`}>
        {children}
      </main>
      {showHeaderAndFooter && !isChatRoute && <Footer />}
    </div>
  );
}
