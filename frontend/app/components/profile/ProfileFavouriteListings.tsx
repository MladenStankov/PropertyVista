import { ProfileListings } from "@/app/profile/listings/page";
import Link from "next/link";
import React from "react";

import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface IProifleFavouriteListingProps {
  listing: ProfileListings;
  handleUnfavourite: (uuid: string) => void;
}

export default function ProfileFavouriteListing({
  listing,
  handleUnfavourite,
}: IProifleFavouriteListingProps) {
  return (
    <div className="bg-gray-300 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-10 rounded-md text-base md:text-lg lg:text-xl flex-wrap">
      <img
        className="h-40 md:h-52 w-full md:w-auto aspect-video rounded-md object-cover"
        src={listing.imageUrl}
        alt="Listing Image"
      />
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="font-bold">
          {new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
          }).format(listing.price)}
          {listing.type === "rent" && (
            <span className="font-light">/month</span>
          )}
        </p>
        <p>
          <span className="font-light">Created:</span>{" "}
          {new Intl.DateTimeFormat("en-IE").format(new Date(listing.createdAt))}
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2">
            <p>{listing.views}</p>
            <FaEye size={20} />
          </div>
          <div className="flex items-center gap-2">
            <p>{listing.favourites}</p>
            <FaHeart size={20} />
          </div>
        </div>
        <div className="flex gap-4 mt-4 justify-center md:justify-start max-[400px]:flex-col">
          <Link href={`/listings/${listing.uuid}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-600 w-full">
              View
            </button>
          </Link>

          <button
            onClick={() => handleUnfavourite(listing.uuid)}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600"
          >
            Unfavourite
          </button>
        </div>
      </div>
    </div>
  );
}
