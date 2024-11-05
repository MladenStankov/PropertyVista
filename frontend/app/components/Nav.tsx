import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import useProfileImage from "../utils/useProfileImage";

const Header = () => {
  const imageUrl = useProfileImage();
  return (
    <header className="p-4 pb-5 sticky flex justify-between border border-gray-400 w-screen shadow-lg">
      <Link href="/">
        <Image
          className="min-w-[150px] min-h-[20px]"
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={20}
        />
      </Link>

      <nav className="w-2/5 min-w-fit max-md:hidden">
        <ul className="flex gap-10 justify-end">
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="#">Buy</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="#">Rent</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="#">Sell</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light  ">
            <Link href="#">Calculators</Link>
          </li>
          <div className="flex flex-row gap-3">
            {imageUrl ? (
              <div className="rounded-full overflow-hidden -my-2">
                <Image
                  src={imageUrl}
                  alt="Profile Image"
                  width={35}
                  height={35}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <>
                <li className="text-lg pt-1 hover:underline hover:text-blue-500">
                  <Link href="/login">Log in</Link>
                </li>
                <li className="whitespace-nowrap text-lg">
                  <Link href="/register">
                    <button className="rounded-md px-3 py-1 bg-blue-500 text-white hover:bg-blue-600">
                      Sign up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
      <GiHamburgerMenu className="md:hidden text-3xl text-blue-500 hover:text-blue-600 hover:cursor-pointer min-w-[50px]" />
    </header>
  );
};

export default Header;
