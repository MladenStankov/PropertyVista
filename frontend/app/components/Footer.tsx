import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div className="space-y-4">
          <Link href="/" className="block w-36">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={200}
              className="brightness-0 invert hover:scale-105 transition-all duration-300"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner in finding the perfect home. PropertyVista
            helps you discover, buy, sell, and rent properties with ease.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <nav className="space-y-2">
            <Link
              href="/listings"
              className="block text-gray-400 hover:text-white transition-colors duration-200"
            >
              Properties
            </Link>
            <Link
              href="/sell"
              className="block text-gray-400 hover:text-white transition-colors duration-200"
            >
              Sell
            </Link>
            <Link
              href="/calculator"
              className="block text-gray-400 hover:text-white transition-colors duration-200"
            >
              Calculator
            </Link>
            <Link
              href="/map"
              className="block text-gray-400 hover:text-white transition-colors duration-200"
            >
              Map
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Contact
          </h3>
          <div className="space-y-2">
            <p className="text-gray-400">Sofia, Bulgaria</p>
            <a
              href="mailto:property.vista.services@gmail.com"
              className="block text-gray-400 hover:text-white transition-colors duration-200"
            >
              property.vista.services@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} PropertyVista. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
