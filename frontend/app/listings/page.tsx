"use client";

import React, { useEffect, useState } from "react";
import ListingsCard, {
  IListingsCard,
} from "../components/listings/ListingsCard";

import { IoSearch } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
const FilterContainer = dynamic(
  () => import("../components/listings/FilterContainer"),
  { ssr: false }
);
import {
  AmenityType,
  ConstructionType,
  PropertyType,
} from "../components/sell/WizardForm";
import Loading from "../components/Loading";
import dynamic from "next/dynamic";

enum SortType {
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
  SURFACE_AREA_ASC = "surface-area-asc",
  SURFACE_AREA_DESC = "surface-area-desc",
  CONSTRUCTION_YEAR_ASC = "construction-year-asc",
  CONSTRUCTION_YEAR_DESC = "construction-year-desc",
  NEWEST = "newest",
  OLDEST = "oldest",
}

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
  search?: string | null;
  sort?: SortType | null;
}

export default function ListingsPage() {
  const [listingsCards, setListingsCards] = useState<IListingsCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<IFilter | null>({});
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [appliedFilter, setAppliedFilter] = useState<IFilter | null>({});
  const [isFilterInitialized, setIsFilterInitialized] =
    useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialFilter: IFilter = {};

    params.getAll("amenities").forEach((value) => {
      if (value) {
        initialFilter.amenities = initialFilter.amenities
          ? [...initialFilter.amenities, value as unknown]
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [value as any];
      }
    });

    params.forEach((value, key) => {
      if (key !== "amenities") {
        if (!isNaN(Number(value))) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (initialFilter as any)[key] = parseInt(value, 10);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (initialFilter as any)[key] = value;
        }
      }
    });

    setFilter(initialFilter);
    setAppliedFilter(initialFilter);
    setIsFilterInitialized(true);
  }, []);

  useEffect(() => {
    if (!isFilterInitialized) return;

    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const queryString = Object.entries(appliedFilter || {})
          .flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
              : value !== undefined && value !== null
              ? [`${key}=${encodeURIComponent(value)}`]
              : []
          )
          .join("&");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/listings${
            queryString ? `?${queryString}` : ""
          }`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data: IListingsCard[] = await response.json();
        setListingsCards(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [appliedFilter, isFilterInitialized]);

  const handleSearch = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();

    const queriesString = Object.entries(filter || {})
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${v}`).join("&");
        } else if (value !== undefined && value !== null) {
          if (key === "search" && value === "") return "";
          return `${key}=${value}`;
        }
      })
      .filter(Boolean)
      .join("&");
    window.location.href = `listings?${queriesString}`;
  };

  const handleFavouriteChange = (uuid: string) => {
    setListingsCards((prevListingsCards) =>
      prevListingsCards.map((listingCard) => {
        if (listingCard.uuid === uuid) {
          return { ...listingCard, isFavourited: !listingCard.isFavourited };
        }
        return listingCard;
      })
    );
  };

  return (
    <div
      className={`flex flex-col px-4 md:px-20 gap-10 py-10 ${
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
            value={filter?.search || ""}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
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
      <div>
        <label>Sort by</label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
          onChange={(e) =>
            setAppliedFilter({
              ...appliedFilter,
              sort: e.target.value as SortType,
            })
          }
        >
          <option value={SortType.PRICE_ASC}>Price: Low to High</option>
          <option value={SortType.PRICE_DESC}>Price: High to Low</option>
          <option value={SortType.SURFACE_AREA_ASC}>
            Surface Area: Low to High
          </option>
          <option value={SortType.SURFACE_AREA_DESC}>
            Surface Area: High to Low
          </option>
          <option value={SortType.CONSTRUCTION_YEAR_ASC}>
            Construction Year: Oldest First
          </option>
          <option value={SortType.CONSTRUCTION_YEAR_DESC}>
            Construction Year: Newest First
          </option>
          <option value={SortType.NEWEST}>Newest</option>
          <option value={SortType.OLDEST}>Oldest</option>
        </select>
      </div>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : listingsCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listingsCards.map((listing, index) => (
            <ListingsCard
              key={index}
              {...listing}
              handleFavouriteChange={handleFavouriteChange}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-center m-5 font-light">
          No listings found
        </h2>
      )}
    </div>
  );
}
