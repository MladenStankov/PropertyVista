"use client";

import {
  AmenityType,
  ConstructionType,
  PropertyType,
} from "@/app/components/sell/WizardForm";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  FaArrowLeft,
  FaArrowRight,
  FaChargingStation,
  FaParking,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { MdBalcony, MdIosShare, MdOutlinePool } from "react-icons/md";
import { TbAirConditioning, TbSmartHome } from "react-icons/tb";
import { CgSmartHomeHeat, CgSmartHomeWashMachine } from "react-icons/cg";
import { BiSolidDryer } from "react-icons/bi";
import { GiGardeningShears, GiHomeGarage } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { PiTowelLight } from "react-icons/pi";
import { IconType } from "react-icons";
import Map from "@/app/components/listings/Map";
import Loading from "@/app/components/Loading";

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
  isFavourited: boolean;
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
  const router = useRouter();
  const [listing, setListing] = useState<IListingExtended | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const uuid = usePathname().split("/").pop();

  useEffect(() => {
    async function fetchListing() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/${uuid}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch listings");
      }
      const listing: IListingExtended = await response.json();
      setListing(listing);
      setIsLoading(false);
    }
    fetchListing();
  }, [uuid]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      listing?.images.length
        ? prevIndex === 0
          ? listing?.images?.length - 1
          : prevIndex - 1
        : 0
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex + 1) % (listing?.images?.length ? listing.images.length : 1)
    );
  };

  const handleShareButton = () => {
    if (listing) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleFavourite = async () => {
    if (!listing) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings/favourite/${uuid}`,
      {
        method: listing?.isFavourited ? "DELETE" : "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      setListing((prevListing) =>
        prevListing
          ? { ...prevListing, isFavourited: !prevListing.isFavourited }
          : null
      );
    } else if (response.status === 401) {
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "An unexpected error occurred.");
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
    <div className="min-h-screen bg-gray-50">
      {listing != null ? (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Toaster position="top-center" reverseOrder={false} />

          {/* Broker info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 overflow-hidden rounded-full ring-2 ring-gray-100">
              <Image
                src={listing.userImage}
                alt={listing.userFullName}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Listed by</p>
              <h3 className="font-medium text-gray-900">
                {listing.userFullName}
              </h3>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-6">
            {/* Main image container */}
            <div className="relative h-[300px] md:h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-full">
                {/* Main image */}
                <div className="col-span-1 md:col-span-3 relative rounded-lg md:rounded-l-lg overflow-hidden">
                  <Image
                    src={listing.images[currentImageIndex]}
                    alt="Main property image"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    priority
                  />

                  {/* Navigation arrows - hidden on mobile, shown on touch */}
                  <button
                    onClick={handlePreviousImage}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 items-center justify-center"
                  >
                    <FaArrowLeft className="text-gray-700 w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 items-center justify-center"
                  >
                    <FaArrowRight className="text-gray-700 w-4 h-4" />
                  </button>

                  {/* Mobile touch indicators */}
                  <div className="flex md:hidden items-center justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                      <FaArrowLeft className="text-white w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                      <FaArrowRight className="text-white w-4 h-4" />
                    </div>
                  </div>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs">
                    {currentImageIndex + 1}/{listing.images.length}
                  </div>
                </div>

                {/* Desktop thumbnails */}
                <div className="hidden md:flex flex-col gap-2">
                  {[1, 2, 3].map((offset) => (
                    <div
                      key={offset}
                      className="relative h-[130px] rounded-lg overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + offset) % listing.images.length
                        )
                      }
                    >
                      <Image
                        src={
                          listing.images[
                            (currentImageIndex + offset) % listing.images.length
                          ]
                        }
                        alt={`Property view ${offset}`}
                        className="object-cover"
                        fill
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="flex md:hidden gap-2 mt-2 overflow-x-auto pb-2 snap-x snap-mandatory">
              {listing.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer snap-center ${
                    index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Property thumbnail ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="80px"
                  />
                </div>
              ))}
            </div>

            {/* Touch gesture handler */}
            <div
              className="absolute inset-0 md:hidden"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                setTouchStart({ x: touch.clientX, y: touch.clientY });
              }}
              onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - (touchStart?.x ?? 0);
                const deltaY = touch.clientY - (touchStart?.y ?? 0);

                // Only handle horizontal swipes
                if (
                  Math.abs(deltaX) > Math.abs(deltaY) &&
                  Math.abs(deltaX) > 50
                ) {
                  if (deltaX > 0) {
                    handlePreviousImage();
                  } else {
                    handleNextImage();
                  }
                }
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mb-8">
            <button
              onClick={handleFavourite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              {listing.isFavourited ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-600 text-xl" />
              )}
              <span className="text-gray-700">
                {listing.isFavourited ? "Saved" : "Save"}
              </span>
            </button>
            <button
              onClick={handleShareButton}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
            >
              <MdIosShare className="text-gray-600 text-xl" />
              <span className="text-gray-700">Share</span>
            </button>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Property header */}
              <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-4">
                  {capitalizeFirstLetter(listing.constructionType)} for{" "}
                  {listing.type === "buy" ? "sale" : "rent"}
                </h1>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  {new Intl.NumberFormat("en-IE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(listing.price)}
                  {listing.type === "rent" && (
                    <span className="text-gray-500 font-normal">/month</span>
                  )}
                </p>
                <p className="text-gray-600 text-lg">{listing.address}</p>
              </div>

              {/* Property specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-xl shadow-sm mb-8">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {listing.numberOfBedrooms}
                  </p>
                  <p className="text-gray-500">Bedrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {listing.numberOfBathrooms}
                  </p>
                  <p className="text-gray-500">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {listing.surfaceArea}
                  </p>
                  <p className="text-gray-500">m²</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">
                    {listing.numberOfFloors}
                  </p>
                  <p className="text-gray-500">Floors</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, index) => {
                    const Icon =
                      amenityIcons[amenity.toLowerCase().replace(/ /g, "_")];
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                      >
                        {Icon && (
                          <Icon className="text-blue-500 text-2xl flex-shrink-0" />
                        )}
                        <span className="text-gray-700">
                          {amenity[0].toUpperCase() + amenity.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Location</h2>
                <div className="h-[400px] rounded-xl overflow-hidden shadow-sm">
                  <Map
                    coordinates={{
                      latitude: listing.latitude,
                      longitude: listing.longitude,
                    }}
                  />
                </div>
              </div>

              {/* Construction Details */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Construction Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 mb-2">Property Type</p>
                    <p className="text-xl font-semibold">
                      {capitalizeFirstLetter(listing.constructionType)}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500 mb-2">Year Built</p>
                    <p className="text-xl font-semibold">
                      {listing.constructionYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 overflow-hidden rounded-full">
                    <Image
                      src={listing.userImage}
                      alt={listing.userFullName}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {listing.userFullName}
                    </h3>
                    <p className="text-gray-500">Property Agent</p>
                  </div>
                </div>

                <div className="py-6">
                  <p className="text-gray-600 mb-6">
                    Interested in this property? Contact {listing.userFullName}{" "}
                    for more information.
                  </p>
                  <button
                    onClick={handleContactBroker}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Listing not found</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            The listing you&apos;re looking for might have been removed or is no
            longer available.
          </p>
          <button
            onClick={() => router.push("/listings")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse other listings
          </button>
        </div>
      )}
    </div>
  );
}
