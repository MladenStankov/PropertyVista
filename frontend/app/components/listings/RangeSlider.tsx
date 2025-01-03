import React from "react";
import { Slider } from "@mui/material";
import { RangeType } from "./FilterContainer";
import { IFilter } from "@/app/listings/page";

interface IRangeSlider {
  range: RangeType;
  title: string;
  minValue: number | null | undefined;
  maxValue: number | null | undefined;
  maxRange: number;
  step: number;
  marks?: { value: number }[];

  valueName: string;

  handleRangeChange: (
    event: Event,
    value: number | number[],
    activeThumb: number,
    range: RangeType
  ) => void;

  handleInputRangeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    valueName: keyof IFilter
  ) => void;
}

export default function RangeSlider({
  range,
  title,
  minValue,
  maxValue,
  maxRange,
  step,
  marks,
  valueName,
  handleRangeChange,
  handleInputRangeChange,
}: IRangeSlider) {
  const formatLabel = (value: number) =>
    range === RangeType.SURFACE_AREA
      ? new Intl.NumberFormat("en-IE", {
          style: "decimal",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value) + " m²"
      : new Intl.NumberFormat("en-IE", {
          style: "currency",
          currency: "EUR",
        }).format(value);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
      <Slider
        value={[minValue || 0, maxValue || maxRange]}
        onChange={(event, value, activeThumb) =>
          handleRangeChange(event, value, activeThumb, range)
        }
        valueLabelDisplay="off"
        min={0}
        max={maxRange}
        step={marks ? null : step}
        disableSwap
        marks={marks}
      />
      <div className="grid grid-cols-2 gap-4 md:gap-6 items-center">
        <div className="flex flex-col">
          <label className="text-sm md:text-base font-medium mb-1">Min:</label>
          <input
            type="text"
            value={
              minValue !== null && minValue != undefined
                ? range === RangeType.PRICE
                  ? formatLabel(minValue)
                  : range === RangeType.SURFACE_AREA
                  ? new Intl.NumberFormat("en-IE", {
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(minValue) + " m²"
                  : minValue
                : ""
            }
            placeholder="No min"
            onChange={(e) =>
              handleInputRangeChange(e, ("min" + valueName) as keyof IFilter)
            }
            className="border rounded px-3 py-2 w-full text-right text-sm md:text-base"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm md:text-base font-medium mb-1">Max:</label>
          <input
            type="text"
            value={
              maxValue !== null && maxValue != undefined
                ? range === RangeType.PRICE
                  ? formatLabel(maxValue)
                  : range === RangeType.SURFACE_AREA
                  ? new Intl.NumberFormat("en-IE", {
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(maxValue) + " m²"
                  : maxValue
                : ""
            }
            placeholder="No max"
            onChange={(e) =>
              handleInputRangeChange(e, ("max" + valueName) as keyof IFilter)
            }
            className="border rounded px-3 py-2 w-full text-right text-sm md:text-base"
          />
        </div>
      </div>
    </div>
  );
}
