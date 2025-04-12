import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderAndFooterWrapper from "./components/HeaderAndFooterWrapper";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropertyVista",
  description:
    "Browse, buy, or rent properties with PropertyVista. Find apartments, houses, and commercial properties in your area.",
  keywords:
    "real estate, property listing, rental, houses for sale, apartments for rent, property search",
  authors: [{ name: "PropertyVista" }],
  openGraph: {
    title: "PropertyVista",
    description:
      "Browse, buy, or rent properties with PropertyVista. Find apartments, houses, and commercial properties in your area.",
    type: "website",
    locale: "en_IE",
    siteName: "PropertyVista",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropertyVista",
    description: "Browse, buy, or rent properties with PropertyVista",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://propertyvista.vercel.app"
  ),
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
