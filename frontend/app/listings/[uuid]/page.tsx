"use client";

import {
  AmenityType,
  ConstructionType,
  PropertyType,
} from "@/app/components/sell/WizardForm";
import Image from "next/image";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaChargingStation,
  FaParking,
  FaRegHeart,
} from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { MdBalcony, MdIosShare, MdOutlinePool } from "react-icons/md";
import { TbAirConditioning, TbSmartHome } from "react-icons/tb";
import { CgSmartHomeHeat, CgSmartHomeWashMachine } from "react-icons/cg";
import { BiSolidDryer } from "react-icons/bi";
import { GiGardeningShears, GiHomeGarage } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { PiTowelLight } from "react-icons/pi";
import { IconType } from "react-icons";
import Map from "@/app/components/listings/Map";

export interface IListingExtended {
  userId: number;
  userFullName: string;
  userImage: string;
  address: string;
  images: string[];
  type: PropertyType;
  constructionType: ConstructionType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfOtherRooms: number;
  numberOfFloors: number;
  surfaceArea: number;
  price: number;
  description: string;
  amenities: AmenityType[];
  longitude: number;
  latitude: number;
  constructionYear: number;
}

const amenityIcons: { [key: string]: IconType } = {
  air_conditioning: TbAirConditioning,
  heating: CgSmartHomeHeat,
  washer: CgSmartHomeWashMachine,
  dryer: BiSolidDryer,
  smart_home: TbSmartHome,
  swimming_pool: MdOutlinePool,
  parking: FaParking,
  ev_charging: FaChargingStation,
  garden: GiGardeningShears,
  terrace: MdBalcony,
  fitness_center: IoIosFitness,
  sauna: PiTowelLight,
  garage: GiHomeGarage,
};

export default function Listing() {
  const [listing, setListing] = useState<IListingExtended | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const uuid = usePathname().split("/").pop();

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/${uuid}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const listing: IListingExtended = await response.json();
      setListing(listing);
    }
    fetchListing();
  }, [uuid]);

  return (
    <div className="w-full h-full">
      {listing != null ? (
        <div className="flex flex-col mx-auto my-10 max-w-7xl px-4 md:px-6">
          <h2 className="font-extralight mb-2 text-sm md:text-base">
            Listed by{" "}
            <span className="font-semibold">{listing?.userFullName}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-2">
            <div className="col-span-1 sm:col-span-2 sm:row-span-2 relative">
              <img
                src={listing.images[currentImageIndex]}
                className="w-full h-64 sm:h-full object-cover"
                alt="Main image"
              />
              <div className="bg-white rounded-full absolute left-1 top-1/2 p-4 opacity-80 hover:cursor-pointer hover:opacity-100">
                <FaArrowLeft />
              </div>
              <div className="bg-white rounded-full absolute right-1 top-1/2 p-4 opacity-80 hover:cursor-pointer hover:opacity-100">
                <FaArrowRight />
              </div>
            </div>

            <div className="row-span-1">
              <img
                src={
                  listing.images[
                    listing.images.length > currentImageIndex + 1
                      ? currentImageIndex + 1
                      : currentImageIndex
                  ]
                }
                className="w-full h-32 sm:h-full object-cover"
                alt="Next image"
              />
            </div>

            <div className="row-span-1">
              <img
                src={
                  listing.images[
                    listing.images.length > currentImageIndex + 2
                      ? currentImageIndex + 2
                      : currentImageIndex
                  ]
                }
                className="w-full h-32 sm:h-full object-cover"
                alt="Next next image"
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 place-self-end mt-2 mr-2">
            <div className="bg-white rounded-full p-3 border w-fit border-black hover:cursor-pointer hover:bg-gray-200">
              <FaRegHeart size={40} />
            </div>
            <div className="bg-white rounded-full p-3 border w-fit border-black hover:cursor-pointer hover:bg-gray-200">
              <MdIosShare size={40} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl">
                {listing.constructionType[0].toUpperCase() +
                  listing.constructionType.slice(1)}{" "}
                for {listing.type === "buy" ? "sale" : "rent"}
              </h2>

              <p className="text-lg md:text-2xl font-bold mt-2">
                {new Intl.NumberFormat("en-IE", {
                  style: "currency",
                  currency: "EUR",
                }).format(listing.price)}
                {listing.type === "rent" && (
                  <span className="font-light">/month</span>
                )}
              </p>

              <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 text-sm sm:text-base md:text-lg mt-4">
                  <span className="font-bold">{listing.numberOfBedrooms}</span>{" "}
                  bed
                  <span className="font-bold">
                    {listing.numberOfBathrooms}
                  </span>{" "}
                  bath
                  <span className="font-bold">
                    {listing.numberOfOtherRooms}
                  </span>{" "}
                  other rooms
                  <span className="font-bold">
                    {listing.numberOfFloors}
                  </span>{" "}
                  floor
                  <span className="font-bold">{listing.surfaceArea}</span>{" "}
                  m&sup2;
                </div>

                <p className="max-w-full break-words font-light line-clamp-2 text-sm sm:text-lg mt-4">
                  {listing.address}
                </p>
              </div>
            </div>

            <div className="flex flex-col border-2 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <Image
                    src={listing.userImage}
                    alt="Broker Image"
                    width={35}
                    height={35}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm sm:text-lg">{listing?.userFullName}</p>
              </div>

              <div className="flex gap-4 mt-4">
                <BsChatLeftText size={30} className="self-center" />
                <p className="text-sm sm:text-lg leading-6">
                  For all other questions, contact <br />
                  <span className="font-semibold underline">
                    {listing.userFullName}
                  </span>
                </p>
              </div>

              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full text-sm sm:text-base md:text-lg mt-4">
                Contact Broker
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-4xl font-semibold">Description</h2>
            <p className="text-sm sm:text-lg md:text-xl">
              {listing.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-4xl font-semibold">Amenities</h2>
            <div className="flex flex-wrap gap-4">
              {listing.amenities.map((amenity, index) => {
                const Icon =
                  amenityIcons[amenity.toLowerCase().replace(/ /g, "_")];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-md p-4 w-full sm:w-auto"
                  >
                    {Icon ? (
                      <Icon size={70} className="text-gray-600" />
                    ) : (
                      <div className="text-gray-600">No Icon</div>
                    )}
                    <span className="text-base sm:text-lg font-medium">
                      {amenity[0].toUpperCase() + amenity.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-4xl font-semibold">Location</h2>
            <div className="border-2 border-blue-500 h-64 sm:h-96">
              <Map
                coordinates={{
                  latitude: listing.latitude,
                  longitude: listing.longitude,
                }}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-4xl font-semibold">Construction</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-b-4 border-gray-400 flex justify-between text-base sm:text-xl items-center p-2">
                <h3 className="font-light">Type</h3>
                <p className="text-2xl font-semibold text-gray-500">
                  {listing.constructionType[0].toUpperCase() +
                    listing.constructionType.slice(1)}
                </p>
              </div>
              <div className="border-b-4 border-gray-400 flex justify-between text-base sm:text-xl items-center p-2">
                <h3 className="font-light">Construction year</h3>
                <p className="text-2xl font-semibold text-gray-500">
                  {listing.constructionYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-lg font-semibold">Loading...</h1>
      )}
    </div>
  );
}
