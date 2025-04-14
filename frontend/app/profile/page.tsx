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
import ProtectedRoute from "../components/auth/ProtectedRoute";

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
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-start py-10 px-4">
        {profileInfo ? (
          <div
            className="backdrop-blur-md bg-white/80 w-11/12 sm:w-5/6 lg:w-3/4 rounded-3xl 
            shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col p-6 sm:p-12 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)]"
          >
            <div className="px-4 sm:px-8 lg:px-16">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={profileInfo.imageUrl}
                      alt="Profile Image"
                      width={170}
                      height={170}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <button
                    onClick={() => handleImageEdit()}
                    className="absolute bottom-2 right-2 rounded-xl p-2 bg-white/90 backdrop-blur-sm
                    shadow-lg hover:scale-110 transition-all duration-300 group-hover:translate-y-0 translate-y-10"
                  >
                    <CiEdit size={24} className="text-gray-700" />
                  </button>
                </div>
                <div className="text-gray-700 text-center sm:text-left flex-1">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    {isEditingName ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="text-3xl sm:text-4xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none px-2"
                      />
                    ) : (
                      <h1 className="text-3xl sm:text-4xl font-bold">
                        {profileInfo.fullName}
                      </h1>
                    )}
                    <button
                      onClick={() => handleNameEdit()}
                      className="rounded-xl p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <CiEdit
                        size={24}
                        className="text-gray-500 hover:text-gray-700"
                      />
                    </button>
                  </div>
                  <p className="text-gray-500 text-lg mt-1">
                    {profileInfo.email}
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <div className="flex items-center text-gray-700 mb-8">
                  <IoInformationCircleOutline size={24} className="mr-3" />
                  <h2 className="text-2xl font-semibold">Profile Statistics</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <BsHouses size={28} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          Published Listings
                        </p>
                        <p className="text-2xl font-semibold text-gray-700">
                          {profileInfo.totalListings}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <TiMessages size={28} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Active Chats</p>
                        <p className="text-2xl font-semibold text-gray-700">
                          {profileInfo.totalChats}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-pink-100 rounded-xl">
                        <FaRegHeart size={28} className="text-pink-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Saved Listings</p>
                        <p className="text-2xl font-semibold text-gray-700">
                          {profileInfo.totalFavouritedListings}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-100 rounded-xl">
                        <FaHandHoldingHeart
                          size={28}
                          className="text-red-600"
                        />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Received Saves</p>
                        <p className="text-2xl font-semibold text-gray-700">
                          {profileInfo.totalReceivedFavourites}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <FaEye size={28} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Profile Views</p>
                        <p className="text-2xl font-semibold text-gray-700">
                          {profileInfo.totalViewsOnProfile}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <MdOutlineChat size={28} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Messages Sent</p>
                        <p className="text-2xl font-semibold text-gray-700">
                          0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-16 pb-4">
              <Link
                href="/profile/listings"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                rounded-xl font-medium text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <PiBuildingApartmentBold size={20} />
                <span>My Listings</span>
              </Link>
              <Link
                href="/profile/chats"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white 
                rounded-xl font-medium text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <TiMessages size={20} />
                <span>My Chats</span>
              </Link>
              <Link
                href="/profile/favourite-listings"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white 
                rounded-xl font-medium text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaRegHeart size={20} />
                <span>Saved Listings</span>
              </Link>
            </div>
          </div>
        ) : (
          <Loading color="indigo" />
        )}
      </div>
    </ProtectedRoute>
  );
}
