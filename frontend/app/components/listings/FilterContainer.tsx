import React from "react";
import { IFilter } from "@/app/listings/page";
import RangeSlider from "./RangeSlider";

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

const maxRange = {
  [RangeType.PRICE]: 10_000_000,
  [RangeType.SURFACE_AREA]: 10_000,
  [RangeType.BEDROOMS]: 20,
  [RangeType.BATHROOMS]: 20,
  [RangeType.OTHER_ROOMS]: 20,
  [RangeType.FLOORS]: 10,
};

const rangeStep = {
  [RangeType.PRICE]: 50_000,
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

    const maxValue = getMaxRange(range);

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

  const getMaxRange = (range: RangeType) => {
    switch (range) {
      case RangeType.PRICE:
        return 10_000_000;
      case RangeType.SURFACE_AREA:
        return 10_000;
      case RangeType.BEDROOMS:
        return 20;
      case RangeType.BATHROOMS:
        return 20;
      case RangeType.OTHER_ROOMS:
        return 20;
      case RangeType.FLOORS:
        return 10;
    }
  };
  const handleInputRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    valueName: keyof IFilter
  ) => {
    const value = e.target.value.trim();
    const numericValue = value ? parseInt(value.replace(/[^0-9]/g, "")) : null;

    setFilter((prevFilter: IFilter | null) => {
      if (!prevFilter) return {};

      return {
        ...prevFilter,
        [valueName]: numericValue / (valueName.includes("Price") ? 100 : 1),
      };
    });
  };

  return (
    <div
      className="fixed top-20 bg-white w-2/3 rounded-md z-[1] shadow-xl ring-2 flex flex-col
         justify-center p-10 self-center transition-transform duration-150 animate-shake max-h-[90vh] overflow-y-auto"
      style={{ animationDuration: "0.5s" }}
    >
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-4xl text-center self-center">Choose Filters</h2>
        <div
          onClick={() => setShowFilters(false)}
          className="cursor-pointer text-red-500 font-bold text-4xl hover:text-red-700"
        >
          X
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <RangeSlider
          title="Price range"
          range={RangeType.PRICE}
          minValue={filter?.minPrice}
          maxValue={filter?.maxPrice}
          maxRange={maxRange[RangeType.PRICE]}
          step={rangeStep[RangeType.PRICE]}
          valueName="Price"
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

      <button className="border rounded-md w-full bg-blue-500 text-white font-semibold text-xl py-2 hover:bg-blue-600">
        Apply Filters
      </button>
    </div>
  );
}
