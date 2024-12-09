"use client";

import React, { useEffect, useState } from "react";
import ListingsCard, {
  IListingsCard,
} from "../components/listings/ListingsCard";

import { IoSearch } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import FilterContainer from "../components/listings/FilterContainer";
import {
  AmenityType,
  ConstructionType,
  PropertyType,
} from "../components/sell/WizardForm";

export interface IFilter {
  type?: PropertyType | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  constructionType?: ConstructionType | null;
  minSurfaceArea?: number | null;
  maxSurfaceArea?: number | null;
  minYear?: number | null;
  maxYear?: number | null;
  minBedrooms?: number | null;
  maxBedrooms?: number | null;
  minBathrooms?: number | null;
  maxBathrooms?: number | null;
  minOtherRooms?: number | null;
  maxOtherRooms?: number | null;
  minFloors?: number | null;
  maxFloors?: number | null;
  amenities?: AmenityType[];
}

export default function ListingsPage() {
  const [listingsCards, setListingsCards] = useState<IListingsCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<IFilter | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

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
      if (data !== null) {
        setListingsCards(data);
      }
      setIsLoading(false);
    };

    fetchListings().catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  }, []);

  const handleSearch = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      className={`flex flex-col px-4 md:px-20 gap-10 py-10 relative ${
        showFilters
          ? "after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:backdrop-blur-sm"
          : ""
      }`}
    >
      {showFilters && (
        <FilterContainer
          filter={filter}
          setFilter={setFilter}
          setShowFilters={setShowFilters}
        />
      )}
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 items-center">
        <div className="w-full md:w-1/2 relative mt-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-4 text-sm md:text-2xl border-2 border-black rounded-md px-2 md:px-3 py-2 cursor-pointer hover:bg-gray-100"
        >
          <LuSettings2 />
          <p>Filter</p>
          <IoIosArrowDown />
        </div>
      </div>
      {isLoading === false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listingsCards.map((listing, index) => {
            if (listing !== null) {
              return <ListingsCard key={index} {...listing} />;
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <h2 className="text-5xl text-center ">Loading ...</h2>
      )}
    </div>
  );
}
