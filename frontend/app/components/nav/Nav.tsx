"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import useProfile from "../../utils/useProfile";
import ProfileMenu from "./ProfileMenu";

export default function Nav() {
  const [isProfileMenuVisible, setIsProfileMenuVisible] =
    useState<boolean>(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);

  const profile = useProfile();

  return (
    <header className="p-4 sticky flex justify-between shadow-md border-gray-400 w-full top-0 bg-white z-10">
      <Link href="/">
        <Image
          className="min-w-[150px] min-h-[20px] hover:scale-105 transition-all duration-300"
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={20}
        />
      </Link>

      <nav className="hidden md:flex min-w-fit">
        <ul className="flex gap-10 justify-end">
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/listings">Properties</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/sell">Sell</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/calculator">Calculator</Link>
          </li>
          <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
            <Link href="/map">Map</Link>
          </li>
          <div className="flex flex-row gap-3 relative">
            {profile ? (
              <div
                className="rounded-full overflow-hidden -my-2 cursor-pointer hover:scale-105 transition-all duration-300 w-12 h-12"
                onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}
              >
                <Image
                  src={profile.imageUrl}
                  alt="Profile Image"
                  width={170}
                  height={170}
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

      <div className="md:hidden flex items-center">
        <GiHamburgerMenu
          className="text-3xl text-blue-500 hover:text-blue-600 hover:cursor-pointer"
          onClick={() => setIsMobileMenuVisible(true)}
        />
      </div>

      {isMobileMenuVisible && (
        <div className="fixed top-0 right-0 w-fit h-full bg-white z-20 flex flex-col items-start p-6 gap-4 shadow-md">
          <AiOutlineClose
            className="text-3xl text-blue-500 hover:text-blue-600 hover:cursor-pointer self-end"
            onClick={() => setIsMobileMenuVisible(false)}
          />
          <ul className="flex flex-col gap-6 w-full divide-y-[2px]">
            <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
              <Link
                href="/listings"
                onClick={() => setIsMobileMenuVisible(false)}
              >
                Properties
              </Link>
            </li>
            <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
              <Link href="/sell" onClick={() => setIsMobileMenuVisible(false)}>
                Sell
              </Link>
            </li>
            <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
              <Link
                href="/calculator"
                onClick={() => setIsMobileMenuVisible(false)}
              >
                Calculator
              </Link>
            </li>
            <li className="text-lg pt-1 hover:underline hover:text-blue-500 font-light">
              <Link href="/map" onClick={() => setIsMobileMenuVisible(false)}>
                Map
              </Link>
            </li>
            {profile ? (
              <Link
                href="/profile"
                className="flex gap-4 items-center"
                onClick={() => {
                  setIsProfileMenuVisible(false);
                  setIsMobileMenuVisible(false);
                }}
              >
                <span className="text-lg font-light">Profile</span>
              </Link>
            ) : (
              <>
                <li className="text-lg pt-1 hover:underline hover:text-blue-500">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuVisible(false)}
                  >
                    Log in
                  </Link>
                </li>
                <li className="whitespace-nowrap text-lg">
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuVisible(false)}
                  >
                    <button className="rounded-md px-3 py-1 bg-blue-500 text-white hover:bg-blue-600">
                      Sign up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {isProfileMenuVisible && (
        <ProfileMenu setIsProfileMenuVisible={setIsProfileMenuVisible} />
      )}
    </header>
  );
}
