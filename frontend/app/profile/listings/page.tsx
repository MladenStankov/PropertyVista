"use client";

import Loading from "@/app/components/Loading";
import ProfileListing from "@/app/components/profile/ProfileListing";
import { PropertyType } from "@/app/components/sell/WizardForm";
import React, { useEffect, useState } from "react";

export interface ProfileListings {
  uuid: string;
  imageUrl: string;
  createdAt: Date;
  price: number;
  type: PropertyType;
  views: number;
  favourites: number;
}

export default function ProfileListings() {
  const [listings, setListings] = useState<ProfileListings[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile-listings`,
        { credentials: "include" }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setListings(data);
      setIsLoading(false);
    }
    fetchListings();
  }, []);

  const handleDelete = async (uuid: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${uuid}`, {
        method: "DELETE",
        credentials: "include",
      });
      setListings(listings?.filter((listing) => listing.uuid !== uuid) || null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-auto px-4 md:px-6 lg:px-8 py-8 flex items-center justify-center">
      {isLoading && <Loading />}
      {!isLoading && listings && (
        <div className="bg-white w-full max-w-7xl border-2 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 mb-6">
            My Listings
          </h1>
          <div className="grid grid-cols-1 gap-6 overflow-y-scroll">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <ProfileListing
                  key={listing.uuid}
                  listing={listing}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center text-xl text-gray-500">
                No Listings
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
