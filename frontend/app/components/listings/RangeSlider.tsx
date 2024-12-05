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
        }).format(value) + " m^2"
      : new Intl.NumberFormat("en-IE", {
          style: "currency",
          currency: "EUR",
        }).format(value);

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
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
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2">
          <label className="text-sm">Min:</label>
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
            onChange={(e) => handleInputRangeChange(e, "min" + valueName)}
            className="border rounded px-2 py-1 w-32 text-right"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Max:</label>
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
            onChange={(e) => handleInputRangeChange(e, "max" + valueName)}
            className="border rounded px-2 py-1 w-32 text-right"
          />
        </div>
      </div>
    </div>
  );
}
