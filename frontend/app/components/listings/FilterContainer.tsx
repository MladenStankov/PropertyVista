import React from "react";
import { IFilter } from "@/app/listings/page";
import RangeSlider from "./RangeSlider";
import { FaHouseChimney } from "react-icons/fa6";
import { PiBuildingFill } from "react-icons/pi";
import { ConstructionType, PropertyType } from "../sell/WizardForm";
import { BsArrows } from "react-icons/bs";
import AmenitiesSelector from "./AmenitiesSelector";
import { useRouter } from "next/router";

interface IFilterContainer {
  filter: IFilter | null;
  setFilter: (filter: IFilter) => void;
  setShowFilters: (showFilters: boolean) => void;
}

export enum RangeType {
  PRICE = "price",
  SURFACE_AREA = "surfaceArea",
  BEDROOMS = "bedrooms",
  BATHROOMS = "bathrooms",
  OTHER_ROOMS = "otherRooms",
  FLOORS = "floors",
}

const priceMarks = [
  { value: 0 },
  { value: 50_000 },
  { value: 100_000 },
  { value: 150_000 },
  { value: 200_000 },
  { value: 250_000 },
  { value: 300_000 },
  { value: 350_000 },
  { value: 400_000 },
  { value: 450_000 },
  { value: 500_000 },
  { value: 550_000 },
  { value: 600_000 },
  { value: 650_000 },
  { value: 700_000 },
  { value: 750_000 },
  { value: 800_000 },
  { value: 850_000 },
  { value: 900_000 },
  { value: 950_000 },
  { value: 1_000_000 },
  { value: 1_100_000 },
  { value: 1_200_000 },
  { value: 1_300_000 },
  { value: 1_400_000 },
  { value: 1_500_000 },
  { value: 1_600_000 },
  { value: 1_700_000 },
  { value: 1_800_000 },
  { value: 1_900_000 },
  { value: 2_000_000 },
  { value: 2_250_000 },
  { value: 2_500_000 },
  { value: 2_750_000 },
  { value: 3_000_000 },
  { value: 3_250_000 },
  { value: 3_500_000 },
  { value: 3_750_000 },
  { value: 4_000_000 },
  { value: 5_000_000 },
  { value: 6_000_000 },
  { value: 7_000_000 },
  { value: 8_000_000 },
  { value: 9_000_000 },
  { value: 10_000_000 },
];

const maxRange = {
  [RangeType.PRICE]: 10_000_000,
  [RangeType.SURFACE_AREA]: 5_000,
  [RangeType.BEDROOMS]: 6,
  [RangeType.BATHROOMS]: 6,
  [RangeType.OTHER_ROOMS]: 6,
  [RangeType.FLOORS]: 6,
};

const rangeStep = {
  [RangeType.PRICE]: 100_000,
  [RangeType.SURFACE_AREA]: 100,
  [RangeType.BEDROOMS]: 1,
  [RangeType.BATHROOMS]: 1,
  [RangeType.OTHER_ROOMS]: 1,
  [RangeType.FLOORS]: 1,
};

export default function FilterContainer({
  filter,
  setFilter,
  setShowFilters,
}: IFilterContainer) {
  const handleRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
    range: RangeType
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const maxValue = maxRange[range];

    switch (range) {
      case RangeType.PRICE: {
        setFilter({
          ...filter,
          minPrice: newValue[0] === 0 ? null : newValue[0],
          maxPrice: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
      case RangeType.SURFACE_AREA: {
        setFilter({
          ...filter,
          minSurfaceArea: newValue[0] === 0 ? null : newValue[0],
          maxSurfaceArea: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
      case RangeType.BEDROOMS: {
        setFilter({
          ...filter,
          minBedrooms: newValue[0] === 0 ? null : newValue[0],
          maxBedrooms: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
      case RangeType.BATHROOMS: {
        setFilter({
          ...filter,
          minBathrooms: newValue[0] === 0 ? null : newValue[0],
          maxBathrooms: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
      case RangeType.OTHER_ROOMS: {
        setFilter({
          ...filter,
          minOtherRooms: newValue[0] === 0 ? null : newValue[0],
          maxOtherRooms: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
      case RangeType.FLOORS: {
        setFilter({
          ...filter,
          minFloors: newValue[0] === 0 ? null : newValue[0],
          maxFloors: newValue[1] === maxValue ? null : newValue[1],
        });
        break;
      }
    }
  };

  const handleInputRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueName: keyof IFilter
  ): void => {
    const value = e.target.value.trim();
    let numericValue = value
      ? parseInt(value.replace(/[^0-9]/g, ""), 10)
      : null;

    setFilter((prevFilter: IFilter | null): IFilter | null => {
      if (!prevFilter) return {};

      if (valueName === "minYear" || valueName === "maxYear") {
        const currentYear = new Date().getFullYear();
        if (numericValue && (numericValue <= 0 || numericValue > currentYear)) {
          numericValue = Math.max(0, Math.min(currentYear, numericValue));
        }
      }

      return {
        ...prevFilter,
        [valueName]: numericValue
          ? numericValue / (valueName.includes("Price") ? 100 : 1)
          : null,
      };
    });
  };

  const handleConstructionTypeChange = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    value: ConstructionType
  ) => {
    e.preventDefault();
    if (filter?.constructionType === value) {
      setFilter({
        ...filter,
        constructionType: null,
      });
    } else {
      setFilter({
        ...filter,
        constructionType: value,
      });
    }
  };

  const handleListingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setFilter({
      ...filter,
      type: e.target.value as PropertyType,
    });
  };

  const handleApplyFilters = () => {
    const queriesString = Object.entries(filter || {})
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${v}`).join("&");
        } else if (value !== undefined && value !== null) {
          return `${key}=${value}`;
        }
      })
      .filter(Boolean)
      .join("&");
    window.location.href = `listings?${queriesString}`;
  };

  const handleClearFilters = () => {
    window.location.href = `/listings`;
  };

  return (
    <div
      className="fixed top-20 bg-white w-[90%] sm:w-4/5 lg:w-2/3 rounded-md z-[1] shadow-xl ring-2 
             flex flex-col justify-center p-6 sm:p-8 lg:p-10 self-center 
             transition-transform duration-150 animate-shake max-h-[90vh] sm:max-h-[80vh] overflow-hidden"
      style={{ animationDuration: "0.5s" }}
    >
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex-1" />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center underline">
          Choose Filters
        </h2>
        <div className="flex-1 flex justify-end">
          <div
            onClick={() => setShowFilters(false)}
            className="cursor-pointer text-red-500 font-bold text-2xl sm:text-4xl hover:text-red-700"
          >
            X
          </div>
        </div>
      </div>

      <div className="overflow-y-auto max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 mx-4">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl mb-2">
              Listing Type
            </h2>
            <select
              className="border-2 px-2 py-2 w-full rounded-md"
              value={filter?.type || ""}
              onChange={(e) => handleListingTypeChange(e)}
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="flex flex-col items-center max-md:items-start">
            <h2 className="text-lg sm:text-xl lg:text-2xl mb-2 ">
              Construction Type
            </h2>
            <div className="flex justify-center gap-4">
              <FaHouseChimney
                size={50}
                color={
                  filter?.constructionType === ConstructionType.HOUSE
                    ? "white"
                    : ""
                }
                className={`p-2 border-2 rounded-l-md hover:cursor-pointer ${
                  filter?.constructionType === ConstructionType.HOUSE
                    ? "bg-blue-500"
                    : ""
                }`}
                onClick={(e) =>
                  handleConstructionTypeChange(e, ConstructionType.HOUSE)
                }
              />
              <PiBuildingFill
                size={50}
                color={
                  filter?.constructionType === ConstructionType.APARTMENT
                    ? "white"
                    : ""
                }
                className={`p-2 border-2 rounded-r-md hover:cursor-pointer ${
                  filter?.constructionType === ConstructionType.APARTMENT
                    ? "bg-blue-500"
                    : ""
                }`}
                onClick={(e) =>
                  handleConstructionTypeChange(e, ConstructionType.APARTMENT)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl mb-2">
              Year of Construction
            </h2>
            <div className="flex gap-2">
              <input
                type="number"
                value={filter?.minYear || ""}
                placeholder="No Min"
                onChange={(e) => handleInputRangeChange(e, "minYear")}
                className="p-2 border-2 rounded-md w-full"
              />
              <BsArrows className="self-center" size={50} />
              <input
                type="number"
                value={filter?.maxYear || ""}
                placeholder="No Max"
                onChange={(e) => handleInputRangeChange(e, "maxYear")}
                className="p-2 border-2 rounded-md w-full"
              />
            </div>
          </div>

          <div>
            <AmenitiesSelector
              selectedAmenities={filter?.amenities || []}
              setSelectedAmenities={(amenities) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  amenities,
                }))
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-2">Ranges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 p-2">
            <RangeSlider
              title="Price range"
              range={RangeType.PRICE}
              minValue={filter?.minPrice}
              maxValue={filter?.maxPrice}
              maxRange={maxRange[RangeType.PRICE]}
              step={rangeStep[RangeType.PRICE]}
              valueName="Price"
              marks={priceMarks}
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />

            <RangeSlider
              title="Surface area range"
              range={RangeType.SURFACE_AREA}
              minValue={filter?.minSurfaceArea}
              maxValue={filter?.maxSurfaceArea}
              maxRange={maxRange[RangeType.SURFACE_AREA]}
              step={rangeStep[RangeType.SURFACE_AREA]}
              valueName="SurfaceArea"
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />

            <RangeSlider
              title="Bedrooms range"
              range={RangeType.BEDROOMS}
              minValue={filter?.minBedrooms}
              maxValue={filter?.maxBedrooms}
              maxRange={maxRange[RangeType.BEDROOMS]}
              step={rangeStep[RangeType.BEDROOMS]}
              valueName="Bedrooms"
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />

            <RangeSlider
              title="Bathrooms range"
              range={RangeType.BATHROOMS}
              minValue={filter?.minBathrooms}
              maxValue={filter?.maxBathrooms}
              maxRange={maxRange[RangeType.BATHROOMS]}
              step={rangeStep[RangeType.BATHROOMS]}
              valueName="Bathrooms"
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />

            <RangeSlider
              title="Other rooms range"
              range={RangeType.OTHER_ROOMS}
              minValue={filter?.minOtherRooms}
              maxValue={filter?.maxOtherRooms}
              maxRange={maxRange[RangeType.OTHER_ROOMS]}
              step={rangeStep[RangeType.OTHER_ROOMS]}
              valueName="OtherRooms"
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />

            <RangeSlider
              title="Floors range"
              range={RangeType.FLOORS}
              minValue={filter?.minFloors}
              maxValue={filter?.maxFloors}
              maxRange={maxRange[RangeType.FLOORS]}
              step={rangeStep[RangeType.FLOORS]}
              valueName="Floors"
              handleRangeChange={handleRangeChange}
              handleInputRangeChange={handleInputRangeChange}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleApplyFilters}
        className="border rounded-md mt-4 w-full sm:w-2/3 self-center bg-blue-500 text-white 
                     font-semibold text-lg sm:text-xl py-2 hover:bg-blue-600"
      >
        Apply Filters
      </button>

      <button
        onClick={handleClearFilters}
        className="border rounded-md mt-4 w-full sm:w-2/3 self-center text-black 
                     font-semibold text-lg sm:text-xl py-2 hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  );
}
