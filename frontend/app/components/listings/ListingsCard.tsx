"use client";

import React, { useState } from "react";
import { ConstructionType, PropertyType } from "../sell/WizardForm";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";

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
  handleFavouriteChange: (uuid: string) => void;
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
  handleFavouriteChange,
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
      handleFavouriteChange(uuid);
    } else if (response.status === 401) {
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center text-red-500">
            <p className="text-lg font-semibold mb-4">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <div className="border-2 shadow-lg hover:shadow-xl rounded-xl grid grid-rows-2">
        <Link href={`listings/${uuid}`} className="relative">
          <img
            src={imageUrl}
            className="w-full h-72 object-cover"
            alt="Listing Image"
          />
          <button
            onClick={(e) => handleFavourite(e)}
            className={`absolute bottom-0 right-0 flex items-center gap-2 text-sm md:text-xl 
            bg-white rounded-2xl border-[1px] px-4 md:px-6 py-2 md:py-4 mb-2 mr-2 
            hover:bg-gray-100 hover:font-semibold text-blue-500 font-medium border-black bg-opacity-80 hover:scale-105 transition-transform ${
              isFavourited ? "text-red-500" : ""
            }`}
          >
            <FaRegHeart size={30} />
            <span className="text-2xl font-bold">
              {isFavourited ? "Favourited" : "Favourite"}
            </span>
          </button>
        </Link>
        <div className="flex flex-wrap sm:flex-col md:flex-row">
          <div className="p-4 flex flex-col gap-3 w-full md:w-1/2">
            <p className="font-light text-sm md:text-lg">
              {constructionType[0].toUpperCase() + constructionType.slice(1)}{" "}
              for {type === "buy" ? "sell" : type}
            </p>
            <p className="text-lg md:text-3xl font-bold">
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
              {type === "rent" && (
                <span className="font-light text-lg">/month</span>
              )}
            </p>
            <div className="flex gap-1 text-xs md:text-base">
              <span className="font-bold">{numberOfBedrooms}</span> bed
              <span className="font-bold">{numberOfBathrooms}</span> bath
              <span className="font-bold">{numberOfFloors}</span> floor
              <span className="font-bold">{surfaceArea}</span> m&sup2;
            </div>
            <p className="max-w-full break-words font-light line-clamp-2 text-sm md:text-base">
              {address}
            </p>
          </div>
          <div className="flex flex-col items-center w-full mb-4 md:mr-2">
            <Link href="/chats" passHref>
              <button className="border-2 rounded-full border-black px-6 md:px-8 py-2 md:py-4 hover:bg-gray-100 hover:font-semibold text-sm md:text-xl">
                Contact agent
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
