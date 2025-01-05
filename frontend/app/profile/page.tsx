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
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(profileInfo?.fullName || "");

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
      setNewName(data.fullName);
    }

    fetchProfileInfo();
  }, []);

  const handleImageEdit = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/change-image`,
          {
            method: "PUT",
            credentials: "include",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile image");
        }

        const data = await response.json();
        setProfileInfo((prev) =>
          prev ? { ...prev, imageUrl: data.newImage } : null
        );
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    };
    fileInput.click();
  };

  const handleNameEdit = async () => {
    if (isEditingName) {
      if (!newName || newName.trim() === "") {
        alert("Name cannot be empty.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/change-name`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullName: newName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile name");
        }

        setProfileInfo((prev) =>
          prev ? { ...prev, fullName: newName } : null
        );
      } catch (error) {
        console.error("Error updating profile name:", error);
      }
    }
    setIsEditingName(!isEditingName);
  };

  return (
    <div className="w-full h-full flex justify-center items-center py-10">
      {profileInfo ? (
        <div
          className="bg-white w-11/12 sm:w-5/6 lg:w-2/3 h-full rounded-2xl
         border-blue-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] flex flex-col p-5 sm:p-10"
        >
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
                  {isEditingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-2xl sm:text-4xl font-semibold bg-transparent border-b-2 border-gray-500 focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-2xl sm:text-4xl font-semibold">
                      {profileInfo.fullName}
                    </h1>
                  )}
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

          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-5 font-light items-center border-t
           border-gray-400 w-full mt-20 sm:mt-32 py-3 sm:py-5 text-gray-700"
          >
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-blue-500
               text-white font-normal rounded-xl hover:scale-105 transition-transform "
              href="/profile/listings"
            >
              <div className="flex items-center gap-2">
                <PiBuildingApartmentBold />
                <span>Listings</span>
              </div>
            </Link>
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-blue-500
               text-white font-normal rounded-xl hover:scale-105 transition-transform "
              href="/profile/chats"
            >
              <div className="flex items-center gap-2">
                <TiMessages />
                <span>Chats</span>
              </div>
            </Link>
            <Link
              className="flex-grow sm:flex-grow-0 p-2 sm:p-3 text-lg sm:text-2xl bg-blue-500
               text-white font-normal rounded-xl hover:scale-105 transition-transform "
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
