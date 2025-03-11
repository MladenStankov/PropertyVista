"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
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
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

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
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (uuid: string) => {
    setSelectedUuid(uuid);
    setShowPopup(true);
  };

  return (
    <ProtectedRoute>
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
                    handleDelete={confirmDelete}
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
        {showPopup && selectedUuid && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Are you sure you want to delete this listing?
              </h2>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(selectedUuid)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
