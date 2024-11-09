import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="PropertyVista Logo"
            width={150}
            height={150}
          />
        </div>

        <nav className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </nav>

        <p className="text-sm mt-4 md:mt-0 text-gray-400">
          &copy; {new Date().getFullYear()} PropertyVista. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
