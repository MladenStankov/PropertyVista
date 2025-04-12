import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 z-10 my-auto">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="PropertyVista Logo"
            width={150}
            height={150}
          />
        </div>

        <p className="text-sm mt-4 md:mt-0 text-gray-400">
          &copy; 2024 PropertyVista. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
