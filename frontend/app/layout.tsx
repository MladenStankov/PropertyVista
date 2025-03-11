import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderAndFooterWrapper from "./components/HeaderAndFooterWrapper";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthProvider>
          <HeaderAndFooterWrapper>{children}</HeaderAndFooterWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
