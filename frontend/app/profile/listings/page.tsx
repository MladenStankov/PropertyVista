"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import Loading from "@/app/components/Loading";
import ProfileListing from "@/app/components/profile/ProfileListing";
import { PropertyType } from "@/app/components/sell/WizardForm";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsHouses } from "react-icons/bs";
import { motion } from "framer-motion";
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
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        {isLoading && <Loading />}
        {!isLoading && listings && (
          <div className="max-w-7xl mx-auto">
            <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <BsHouses size={28} className="text-blue-600" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
                  My Listings
                </h1>
              </div>

              <div className="space-y-6">
                {listings.length > 0 ? (
                  listings.map((listing, index) => (
                    <div key={listing.uuid}>
                      <ProfileListing
                        listing={listing}
                        handleDelete={confirmDelete}
                      />
                    </div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 px-4"
                  >
                    <div className="bg-blue-50 rounded-full p-6 mb-4">
                      <BsHouses className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">
                      No Listings Yet
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                      Create your first listing to start showcasing your
                      properties
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 
                        text-white font-medium hover:shadow-lg transition-all duration-200"
                      onClick={() => (window.location.href = "/sell")}
                    >
                      Create Listing
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {showPopup && selectedUuid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Delete Listing?
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this listing? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium
                    hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium
                    hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  onClick={() => handleDelete(selectedUuid)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ProtectedRoute>
  );
}
