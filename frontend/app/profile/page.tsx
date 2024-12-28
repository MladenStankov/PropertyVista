"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

import { CiEdit } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsHouses } from "react-icons/bs";
import { MdOutlineChat } from "react-icons/md";
import { FaRegHeart, FaHandHoldingHeart, FaEye } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import Link from "next/link";
import { PiBuildingApartmentBold } from "react-icons/pi";

interface ProfileInfo {
  fullName: string;
  email: string;
  imageUrl: string;
  totalListings: number;
  totalChats: number;
  totalFavouritedListings: number;
  totalReceivedFavourites: number;
  totalViewsOnProfile: number;
}

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    async function fetchProfileInfo() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile-info`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile info");
      }
      const data: ProfileInfo = await response.json();
      setProfileInfo(data);
      console.log(data);
    }

    fetchProfileInfo();
  }, []);

  const handleImageEdit = () => {};

  const handleNameEdit = () => {};

  return (
    <div className="w-full h-full bg-gradient-to-t from-sky-500 to-cyan-400 flex justify-center items-center py-10">
      {profileInfo ? (
        <div className="bg-white w-11/12 sm:w-5/6 lg:w-2/3 h-full rounded-2xl shadow-2xl flex flex-col p-5 sm:p-10">
          <div className="px-5 sm:px-10 lg:pl-32">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-24 sm:w-36 h-24 sm:h-36 rounded-full relative">
                <Image
                  src={profileInfo.imageUrl}
                  alt="Profile Image"
                  width={170}
                  height={170}
                  className="object-cover rounded-full w-full h-full"
                />
                <CiEdit
                  onClick={() => handleImageEdit()}
                  size={30}
                  className="absolute rounded-full p-1 border-2 w-10 h-10 sm:w-12 sm:h-12 bg-white bottom-0 right-0
                   hover:cursor-pointer hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-gray-600 text-center sm:text-left">
                <div className="flex gap-2 items-center">
                  <h1 className="text-2xl sm:text-4xl font-semibold">
                    {profileInfo.fullName}
                  </h1>
                  <CiEdit
                    onClick={() => handleNameEdit()}
                    size={30}
                    className="rounded-full p-1 border-2 w-8 h-8 sm:w-10 sm:h-10 bg-white
                   hover:cursor-pointer hover:scale-110 transition-transform"
                  />
                </div>
                <p className="font-light text-sm sm:text-lg">
                  {profileInfo.email}
                </p>
              </div>
            </div>
            <div className="ml-2 mt-10 sm:mt-20">
              <div className="flex items-center text-gray-600 mb-4">
                <IoInformationCircleOutline size={20} className="mt-1" />
                <h2 className="text-xl sm:text-2xl">About you</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <BsHouses size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total published listings:{" "}
                    <span className="font-medium">
                      {profileInfo.totalListings}
                    </span>
                  </p>
                </div>

                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <TiMessages size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total chats with other people:{" "}
                    <span className="font-medium">
                      {profileInfo.totalChats}
                    </span>
                  </p>
                </div>

                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <FaRegHeart size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total favourited listings:{" "}
                    <span className="font-medium">
                      {profileInfo.totalFavouritedListings}
                    </span>
                  </p>
                </div>

                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <FaHandHoldingHeart size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total received favourites:{" "}
                    <span className="font-medium">
                      {profileInfo.totalReceivedFavourites}
                    </span>
                  </p>
                </div>

                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <FaEye size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total views on your listings:{" "}
                    <span className="font-medium">
                      {profileInfo.totalViewsOnProfile}
                    </span>
                  </p>
                </div>

                <div className="border-b-2 border-blue-500 flex items-center gap-2 p-2">
                  <MdOutlineChat size={40} />
                  <p className="text-base sm:text-2xl font-light">
                    Total sent messages: <span className="font-medium">0</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-5 font-light items-center border-t border-gray-400 w-full mt-20 sm:mt-32 py-3 sm:py-5 text-gray-700">
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-gray-300 rounded-xl hover:scale-105 transition-transform hover:text-gray-800"
              href="/profile/listings"
            >
              <div className="flex items-center gap-2">
                <PiBuildingApartmentBold />
                <span>Listings</span>
              </div>
            </Link>
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-gray-300 rounded-xl hover:scale-105 transition-transform hover:text-gray-800"
              href="/profile/chats"
            >
              <div className="flex items-center gap-2">
                <TiMessages />
                <span>Chats</span>
              </div>
            </Link>
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-gray-300 rounded-xl hover:scale-105 transition-transform hover:text-gray-800"
              href="/profile/favourite-listings"
            >
              <div className="flex items-center gap-2">
                <FaRegHeart />
                <span>Favourite Listings</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Loading color="white" />
      )}
    </div>
  );
}
