"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";
import getProfileData, { IUser } from "@/app/utils/getProfileData";
import Loading from "../Loading";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { TiMessages } from "react-icons/ti";

export default function Nav() {
  const [isProfileMenuVisible, setIsProfileMenuVisible] =
    useState<boolean>(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfile() {
      setProfileData(await getProfileData());
      setIsLoading(false);
    }

    fetchProfile();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${String(process.env.NEXT_PUBLIC_API_URL)}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Logout failed");
    }
  };

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
            ) : profileData ? (
              <div
                className="rounded-full overflow-hidden -my-2 cursor-pointer hover:scale-105 transition-all duration-300 w-12 h-12"
                onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}
              >
                <Image
                  src={profileData.imageUrl}
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
            {profileData ? (
              <>
                <Link
                  className="p-3 hover:bg-gray-100"
                  href="/profile"
                  onClick={() => setIsMobileMenuVisible(false)}
                >
                  <div className="flex items-center gap-2 hover:underline font-light text-lg">
                    <ImProfile />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link
                  className="p-3 hover:bg-gray-100"
                  href="/profile/chats"
                  onClick={() => setIsMobileMenuVisible(false)}
                >
                  <div className="flex items-center gap-2 hover:underline font-light text-lg">
                    <TiMessages />
                    <span>Chats</span>
                  </div>
                </Link>
                <Link
                  className="p-3 hover:bg-gray-100"
                  href="/profile/listings"
                  onClick={() => setIsMobileMenuVisible(false)}
                >
                  <div className="flex items-center gap-2 hover:underline font-light text-lg">
                    <PiBuildingApartmentBold />
                    <span>Listings</span>
                  </div>
                </Link>
                <Link
                  className="p-3 hover:bg-gray-100"
                  href="/profile/favourite-listings"
                  onClick={() => setIsMobileMenuVisible(false)}
                >
                  <div className="flex items-center gap-2 hover:underline font-light text-lg">
                    <FaHeart />
                    <span>Favourite Listings</span>
                  </div>
                </Link>
                <div
                  className="flex items-center gap-2 p-3 self-center hover:bg-gray-100 text-red-500
       hover:text-red-600 cursor-pointer hover:underline font-light text-lg"
                  onClick={(e) => {
                    setIsMobileMenuVisible(false);
                    handleLogout(e);
                  }}
                >
                  <RxExit />
                  <span>Logout</span>
                </div>
              </>
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
