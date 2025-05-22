"use client";

import React, { useEffect, useState } from "react";

import ListingsCard, {
  IListingsCard,
} from "../components/listings/ListingsCard";
import Loading from "../components/Loading";
import FilterContainer from "../components/listings/FilterContainer";

import { IoSearch, IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

import {
  AmenityType,
  ConstructionType,
  PropertyType,
} from "../components/sell/WizardForm";

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
  const [filter, setFilter] = useState<IFilter>({});
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [appliedFilter, setAppliedFilter] = useState<IFilter>({});
  const [isFilterInitialized, setIsFilterInitialized] =
    useState<boolean>(false);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialFilter: IFilter = {};

    params.getAll("amenities").forEach((value) => {
      if (value) {
        initialFilter.amenities = initialFilter.amenities
          ? [...initialFilter.amenities, value as AmenityType]
          : [value as AmenityType];
      }
    });

    params.forEach((value, key) => {
      if (key !== "amenities") {
        if (!isNaN(Number(value))) {
          const numValue = parseInt(value, 10);
          switch (key) {
            case "minPrice":
            case "maxPrice":
            case "minSurfaceArea":
            case "maxSurfaceArea":
            case "minYear":
            case "maxYear":
            case "minBedrooms":
            case "maxBedrooms":
            case "minBathrooms":
            case "maxBathrooms":
            case "minOtherRooms":
            case "maxOtherRooms":
            case "minFloors":
            case "maxFloors":
              (initialFilter as Record<string, number | null>)[key] = numValue;
              break;
          }
        } else {
          switch (key) {
            case "type":
              initialFilter.type = value as PropertyType;
              break;
            case "constructionType":
              initialFilter.constructionType = value as ConstructionType;
              break;
            case "search":
              initialFilter.search = value;
              break;
            case "sort":
              initialFilter.sort = value as SortType;
              break;
          }
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
        const queryString = Object.entries(appliedFilter)
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
        setListingsCards(data.map(({ ...rest }) => rest));
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [appliedFilter, isFilterInitialized]);

  const handleSearch = async (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setIsFilterLoading(true);

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

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${queriesString ? `?${queriesString}` : ""}`
    );
    window.location.reload();

    setAppliedFilter(filter);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
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

  const removeFilter = (key: keyof IFilter, value?: string) => {
    const newFilter = { ...filter };
    if (key === "amenities" && value && Array.isArray(newFilter[key])) {
      newFilter.amenities = newFilter.amenities?.filter(
        (v) => v !== (value as AmenityType)
      );
      if (newFilter.amenities?.length === 0) {
        delete newFilter.amenities;
      }
    } else {
      delete newFilter[key];
    }
    setFilter(newFilter);

    const queriesString = Object.entries(newFilter)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          return v.map((val) => `${k}=${val}`).join("&");
        } else if (v !== undefined && v !== null) {
          return `${k}=${v}`;
        }
      })
      .filter(Boolean)
      .join("&");
    window.location.href = `listings?${queriesString}`;
  };

  const formatFilterValue = (
    key: string,
    value: string | number | PropertyType | ConstructionType | AmenityType
  ): string => {
    if (key === "minPrice" || key === "maxPrice") {
      return `€${new Intl.NumberFormat().format(Number(value))}`;
    }
    if (key === "minSurfaceArea" || key === "maxSurfaceArea") {
      return `${value}m²`;
    }
    if (key === "amenities") {
      return value
        .toString()
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    }
    return value
      .toString()
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  };

  const updateUrlWithFilters = (newFilter: IFilter) => {
    const queriesString = Object.entries(newFilter)
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

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${queriesString ? `?${queriesString}` : ""}`
    );
  };

  const handleSort = (sortValue: string) => {
    const newFilter = {
      ...appliedFilter,
      sort: sortValue as SortType,
    };
    setAppliedFilter(newFilter);
    updateUrlWithFilters(newFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div
        className={`flex flex-col px-4 md:px-20 gap-10 py-10 ${
          showFilters
            ? "after:fixed after:inset-0 after:bg-black/20 after:backdrop-blur-sm after:z-20"
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
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              <input
                value={filter?.search || ""}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
                onKeyPress={handleKeyPress}
                className={`w-full px-14 py-4 text-base md:text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-md hover:shadow-lg focus:shadow-lg outline-none ${
                  isFilterLoading ? "bg-gray-50" : ""
                }`}
                type="text"
                placeholder="Postal code, City, Country or Street number"
                disabled={isFilterLoading}
              />
              <IoSearch
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isFilterLoading ? "text-gray-300" : "text-gray-400"
                }`}
                size={24}
              />
              <div
                onClick={(e) => !isFilterLoading && handleSearch(e)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 rounded-lg p-2 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg group ${
                  isFilterLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isFilterLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaArrowRightLong
                    className="text-white transform group-hover:translate-x-0.5 transition-transform"
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => !isFilterLoading && setShowFilters(true)}
            disabled={isFilterLoading}
            className={`flex items-center gap-3 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 shadow-md hover:shadow-lg font-medium ${
              isFilterLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <LuSettings2 className="text-xl" />
            <span>Filters</span>
            <IoIosArrowDown className="text-lg transition-transform duration-200" />
          </button>

          <div className="flex items-center gap-3">
            <label className="text-gray-600 font-medium">Sort by:</label>
            <select
              className={`bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-md hover:shadow-lg outline-none appearance-none pr-10 relative ${
                isFilterLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onChange={(e) => !isFilterLoading && handleSort(e.target.value)}
              value={appliedFilter.sort || SortType.NEWEST}
              disabled={isFilterLoading}
            >
              <option value={SortType.PRICE_ASC}>Price: Low to High</option>
              <option value={SortType.PRICE_DESC}>Price: High to Low</option>
              <option value={SortType.SURFACE_AREA_ASC}>
                Area: Low to High
              </option>
              <option value={SortType.SURFACE_AREA_DESC}>
                Area: High to Low
              </option>
              <option value={SortType.CONSTRUCTION_YEAR_ASC}>
                Year: Oldest First
              </option>
              <option value={SortType.CONSTRUCTION_YEAR_DESC}>
                Year: Newest First
              </option>
              <option value={SortType.NEWEST}>Newest Listings</option>
              <option value={SortType.OLDEST}>Oldest Listings</option>
            </select>
          </div>
        </div>

        {Object.keys(filter).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(filter).map(([key, value]) => {
              if (!value) return null;
              if (Array.isArray(value)) {
                return value.map((v) => (
                  <div
                    key={`${key}-${v}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 flex items-center gap-2 text-sm"
                  >
                    <span>{formatFilterValue(key, v)}</span>
                    <button
                      onClick={() => removeFilter(key as keyof IFilter, v)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IoClose className="text-lg" />
                    </button>
                  </div>
                ));
              }
              return (
                <div
                  key={key}
                  className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 flex items-center gap-2 text-sm"
                >
                  <span>
                    {key.startsWith("min") && "Min "}
                    {key.startsWith("max") && "Max "}
                    {formatFilterValue(key, value)}
                  </span>
                  <button
                    onClick={() => removeFilter(key as keyof IFilter)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <IoClose className="text-lg" />
                  </button>
                </div>
              );
            })}
            {Object.keys(filter).length > 0 && (
              <button
                onClick={() => {
                  setFilter({});
                  window.location.href = "listings";
                }}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {isLoading || isFilterLoading ? (
          <div className="h-96 w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loading />
              <p className="text-gray-500">Loading listings...</p>
            </div>
          </div>
        ) : listingsCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listingsCards.map((listing) => (
              <ListingsCard
                key={listing.uuid}
                {...listing}
                handleFavouriteChangeAction={handleFavouriteChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-600 font-medium">
              No listings found
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
