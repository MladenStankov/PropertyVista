import type { Metadata } from "next";
import "./globals.css";
import HeaderAndFooterWrapper from "./components/HeaderAndFooterWrapper";

export const metadata: Metadata = {
  title: "PropertyVista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderAndFooterWrapper>{children}</HeaderAndFooterWrapper>
      </body>
    </html>
  );
}
