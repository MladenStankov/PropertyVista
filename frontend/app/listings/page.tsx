"use client";

import React, { useEffect, useState } from "react";
import ListingsCard, {
  IListingsCard,
} from "../components/listings/ListingsCard";

import { IoSearch } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

export default function ListingsPage() {
  const [listingsCards, setListingsCards] = useState<IListingsCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setListingsCards(data);
      setIsLoading(false);
    };

    fetchListings();
  }, []);

  const handleSearch = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col px-4 md:px-20 gap-10 py-10">
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 items-center">
        <div className="w-full md:w-1/2 relative mt-2">
          <input
            className="rounded-full border-2 border-black px-14 py-4 text-sm md:text-xl shadow-xl w-full"
            type="text"
            placeholder="Postal code, City, Country or Street number"
          />
          <IoSearch
            className="absolute left-2 top-2 ml-2 mt-1 md:mt-3 text-gray-500"
            size={30}
          />
          <div
            onClick={(e) => handleSearch(e)}
            className="absolute top-2 right-2 mr-3 mt-1 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600"
          >
            <FaArrowRightLong className="text-white" size={20} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm md:text-2xl border-2 border-black rounded-md px-2 md:px-3 py-2 cursor-pointer hover:bg-gray-100">
          <LuSettings2 />
          <p>Filter</p>
          <IoIosArrowDown />
        </div>
      </div>
      {isLoading === false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listingsCards.map((listing, index) => (
            <ListingsCard key={index} {...listing} />
          ))}
        </div>
      ) : (
        <h2 className="text-5xl text-center ">Loading ...</h2>
      )}
    </div>
  );
}
