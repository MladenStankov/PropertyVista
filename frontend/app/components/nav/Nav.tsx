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
    <header className="p-4 sticky flex justify-between shadow-md w-full top-0 bg-white z-10">
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
        <ul className="flex gap-10 justify-end items-center">
          <li>
            <Link
              href="/listings"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Properties
            </Link>
          </li>
          <li>
            <Link
              href="/sell"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Sell
            </Link>
          </li>
          <li>
            <Link
              href="/calculator"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/map"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Map
            </Link>
          </li>
          <div className="flex gap-4 items-center ml-4">
            {isLoading ? (
              <div className="relative flex items-center">
                <Loading forNav={true} />
              </div>
            ) : isAuthenticated ? (
              <div
                className="relative group cursor-pointer"
                onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}
              >
                <div className="rounded-full overflow-hidden w-10 h-10 transition-transform duration-200 transform group-hover:scale-105">
                  <Image
                    src={user?.imageUrl || ""}
                    alt="Profile Image"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2  hover:text-gray-900 transition-colors duration-200 font-medium">
                    Sign in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </nav>

      <div className="md:hidden flex items-center">
        <GiHamburgerMenu
          className="text-2xl text-blue-500 transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuVisible(true)}
        />
      </div>

      {isMobileMenuVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-gray-800">Menu</h2>
              <AiOutlineClose
                className="text-2xl text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => setIsMobileMenuVisible(false)}
              />
            </div>

            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/listings"
                onClick={() => setIsMobileMenuVisible(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Properties
              </Link>
              <Link
                href="/sell"
                onClick={() => setIsMobileMenuVisible(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Sell
              </Link>
              <Link
                href="/calculator"
                onClick={() => setIsMobileMenuVisible(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Calculator
              </Link>
              <Link
                href="/map"
                onClick={() => setIsMobileMenuVisible(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Map
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="mt-4 border-t">
                <div
                  onClick={() =>
                    setIsMobileProfileExpanded(!isMobileProfileExpanded)
                  }
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden w-8 h-8">
                      <Image
                        src={user?.imageUrl || ""}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="font-medium text-gray-700">
                      My Account
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
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
                  <div className="space-y-1 p-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <ImProfile className="text-gray-500" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/profile/chats"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <TiMessages className="text-gray-500" />
                      <span>Chats</span>
                    </Link>
                    <Link
                      href="/profile/listings"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <PiBuildingApartmentBold className="text-gray-500" />
                      <span>Listings</span>
                    </Link>
                    <Link
                      href="/profile/favourite-listings"
                      onClick={() => setIsMobileMenuVisible(false)}
                      className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <FaHeart className="text-gray-500" />
                      <span>Favourite Listings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuVisible(false);
                        logout();
                      }}
                      className="flex items-center gap-2 p-2 w-full text-left text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <RxExit />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-auto p-4 border-t space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuVisible(false)}
                  className="block w-full"
                >
                  <button className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium rounded-xl border border-gray-200 hover:border-gray-300">
                    Sign in
                  </button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuVisible(false)}
                  className="block w-full"
                >
                  <button className="w-full px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {isProfileMenuVisible && (
        <ProfileMenu setIsProfileMenuVisible={setIsProfileMenuVisible} />
      )}
    </header>
  );
}
