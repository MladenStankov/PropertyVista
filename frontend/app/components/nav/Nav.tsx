"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";
import Loading from "../Loading";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { TiMessages } from "react-icons/ti";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isProfileMenuVisible, setIsProfileMenuVisible] =
    useState<boolean>(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);
  const [isMobileProfileExpanded, setIsMobileProfileExpanded] =
    useState<boolean>(false);

  return (
    <header className="p-4 sticky flex justify-between shadow-md border-gray-400 w-full top-0 bg-white z-10">
      <Link href="/" className="w-22 h-9">
        <Image
          className="w-full h-full hover:scale-105 transition-all duration-300 object-cover"
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={200}
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
          <div className="flex flex-row gap-3 items-center justify-center">
            {isLoading ? (
              <div className="relative flex items-center">
                <Loading forNav={true} />
              </div>
            ) : isAuthenticated ? (
              <div
                className="rounded-full overflow-hidden -my-2 cursor-pointer hover:scale-105 transition-all duration-300 w-12 h-12"
                onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}
              >
                <Image
                  src={user?.imageUrl || ""}
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
          <ul className="flex flex-col gap-6 w-full">
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
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-4">
                <div
                  onClick={() =>
                    setIsMobileProfileExpanded(!isMobileProfileExpanded)
                  }
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-full overflow-hidden w-8 h-8">
                      <Image
                        src={user?.imageUrl || ""}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="font-medium">My Account</span>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isMobileProfileExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileProfileExpanded ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="space-y-2 pl-4 py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <ImProfile className="text-gray-600" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/profile/chats"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <TiMessages className="text-gray-600" />
                      <span>Chats</span>
                    </Link>
                    <Link
                      href="/profile/listings"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <PiBuildingApartmentBold className="text-gray-600" />
                      <span>Listings</span>
                    </Link>
                    <Link
                      href="/profile/favourite-listings"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <FaHeart className="text-gray-600" />
                      <span>Favourite Listings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuVisible(false);
                        logout();
                      }}
                      className="flex items-center gap-2 p-2 w-full text-left text-red-500 hover:bg-gray-50 rounded-md"
                    >
                      <RxExit />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
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
