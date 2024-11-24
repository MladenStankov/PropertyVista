"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import useProfile from "../../utils/useProfile";
import ProfileMenu from "./ProfileMenu";

export default function Nav() {
  const [isProfileMenuVisible, setIsProfileMenuVisible] =
    useState<boolean>(false);

  const profile = useProfile();

  return (
    <header className="p-4 pb-5 sticky flex justify-between shadow-md border-gray-400 w-full top-0 bg-white z-10">
      <Link href="/">
        <Image
          className="min-w-[150px] min-h-[20px] hover:scale-105 transition-all duration-300"
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={20}
        />
      </Link>

      <nav className="w-2/5 min-w-fit max-md:hidden">
        <ul className="flex gap-10 justify-end">
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/listings?type=buy">Buy</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/listings?type=rent">Rent</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/sell">Sell</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light  ">
            <Link href="#">Calculators</Link>
          </li>
          <div className="flex flex-row gap-3 relative">
            {profile ? (
              <div
                className="rounded-full overflow-hidden -my-2 cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}
              >
                <Image
                  src={profile.imageUrl}
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
      {isProfileMenuVisible && (
        <ProfileMenu setIsProfileMenuVisible={setIsProfileMenuVisible} />
      )}
    </header>
  );
}
