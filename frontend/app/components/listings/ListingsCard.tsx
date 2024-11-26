"use client";

import React from "react";
import { ConstructionType, PropertyType } from "../sell/WizardForm";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";

interface IListingsCard {
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
}

export default function ListingsCard({
  uuid = "1",
  address = "Розова Долина 21, 1421 София, България",
  imageUrl = "https://placehold.co/600x400",
  type = "buy",
  constructionType = ConstructionType.HOUSE,
  numberOfBathrooms = 1,
  numberOfBedrooms = 1,
  numberOfFloors = 1,
  surfaceArea = 500,
  price = 420000,
}: IListingsCard) {
  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="border-2 shadow-lg hover:shadow-xl rounded-xl grid grid-rows-3">
      <Link href={`listings/${uuid}`} className="row-span-2 relative block">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="Listing Image"
        />
        <button
          onClick={(e) => handleFavourite(e)}
          className="absolute bottom-0 right-0 flex items-center gap-2 text-sm md:text-xl 
          bg-white rounded-full border-[1px] px-4 md:px-8 py-2 md:py-4 mb-2 mr-2 
          hover:bg-gray-100 hover:font-semibold text-blue-500 font-medium border-black"
        >
          <FaRegHeart /> Favorite
        </button>
      </Link>
      <div className="flex flex-wrap sm:flex-col md:flex-row">
        <div className="p-4 flex flex-col gap-3 w-full md:w-1/2">
          <p className="font-light text-sm md:text-lg">
            {constructionType[0].toUpperCase() + constructionType.slice(1)} for{" "}
            {type === "buy" ? "sell" : type}
          </p>
          <p className="text-lg md:text-3xl font-bold">
            {new Intl.NumberFormat("en-IE", {
              style: "currency",
              currency: "EUR",
            }).format(price)}
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
  );
}
