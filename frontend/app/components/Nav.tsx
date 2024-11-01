import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className="p-2 sticky flex justify-between border border-gray-500 w-screen">
      <Image src="/file.svg" alt="Logo" width={20} height={20} />
      <nav className="w-1/5">
        <ul className="flex gap-10">
          <li className="">
            <Link href="#">Search</Link>
          </li>
          <li className="">
            <Link href="#">Properties</Link>
          </li>
          <li className="whitespace-nowrap">
            <Link href="#">Sign up</Link>
          </li>
        </ul>
        <GiHamburgerMenu className="md:hidden" />
      </nav>
    </header>
  );
};

export default Header;
