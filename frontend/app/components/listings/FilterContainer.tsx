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
      className="fixed top-20 bg-white w-4/5 rounded-md z-[1] shadow-xl ring-2 flex flex-col
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

      <button className="border rounded-md w-full bg-blue-500 text-white font-semibold text-xl py-2 hover:bg-blue-600">
        Apply Filters
      </button>
    </div>
  );
}
