"use client";

import React, { useState } from "react";
import { ConstructionType, PropertyType } from "../sell/WizardForm";
import { FaRegHeart, FaStairs } from "react-icons/fa6";
import { FaBath, FaBed, FaHeart } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

export interface IListingsCard {
  uuid: string;
  address: string;
  imageUrl: string;
  type: PropertyType;
  constructionType: ConstructionType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfFloors: number;
  surfaceArea: number;
  price: number;
  isFavourited: boolean;
  handleFavouriteChangeAction: (uuid: string) => void;
}

export default function ListingsCard({
  uuid,
  address,
  imageUrl,
  type,
  constructionType,
  numberOfBathrooms,
  numberOfBedrooms,
  numberOfFloors,
  surfaceArea,
  price,
  isFavourited,
  handleFavouriteChangeAction,
}: IListingsCard) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFavourite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings/favourite/${uuid}`,
      {
        method: isFavourited ? "DELETE" : "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      handleFavouriteChangeAction(uuid);
    } else if (response.status === 401) {
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "An unexpected error occurred.");
    }
  };

  const handleContactBroker = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chats/${uuid}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      window.location.href = `/profile/chats/${data.uuid}`;
    }

    if (response.status === 401) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] bg-white">
        <Link href={`listings/${uuid}`} className="relative">
          <div className="relative w-full h-72 overflow-hidden">
            <Image
              src={imageUrl}
              alt="Listing Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              priority={true}
            />
          </div>
          <button
            onClick={(e) => handleFavourite(e)}
            className={`absolute bottom-3 right-3 flex items-center justify-center w-10 h-10
            bg-white rounded-full backdrop-blur-sm bg-opacity-90 
            hover:bg-gray-100 text-blue-500 shadow-md
            transform hover:scale-110 transition-all duration-200 ${
              isFavourited ? "text-red-500" : ""
            }`}
          >
            {isFavourited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </Link>
        <div className="flex flex-col p-4 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {new Intl.NumberFormat("en-IE", {
                  style: "currency",
                  currency: "EUR",
                }).format(price)}
                {type === "rent" && (
                  <span className="text-base text-gray-500 font-normal">
                    /month
                  </span>
                )}
              </p>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                {capitalizeFirstLetter(constructionType)}
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              {capitalizeFirstLetter(
                type === "buy" ? "For sale" : `For ${type}`
              )}
            </p>
            <div className="flex gap-4 text-gray-600">
              <span className="flex items-center gap-1.5">
                <FaBed className="text-blue-500" /> {numberOfBedrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <FaBath className="text-blue-500" /> {numberOfBathrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <FaStairs className="text-blue-500" /> {numberOfFloors}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-blue-500 font-medium">{surfaceArea}</span>{" "}
                m²
              </span>
            </div>
            <p className="text-gray-500 line-clamp-2 text-sm">{address}</p>
          </div>
          <button
            onClick={() => handleContactBroker()}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
            text-white font-medium rounded-lg shadow-sm hover:shadow-md 
            transition-all duration-200 flex items-center justify-center gap-2"
          >
            <BsChatLeftText />
            Contact broker
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
}
