import React from "react";
import { AmenityType } from "./WizardForm";

interface IAmenitiesSelector {
  unselectedAmenities: AmenityType[];
  formatAmenity: (amenity: AmenityType) => string;
  handleAddAmenity: (amenity: AmenityType) => void;
  setShowSelector: (value: boolean) => void;
}

export default function AmenitiesSelector({
  unselectedAmenities,
  formatAmenity,
  handleAddAmenity,
  setShowSelector,
}: IAmenitiesSelector) {
  return (
    <div className="inset-0 absolute bg-white w-full shadow-2xl flex flex-col justify-start items-center p-4 sm:p-10">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl text-center">Select an Amenity</h2>
        <div
          onClick={() => setShowSelector(false)}
          className="cursor-pointer text-red-500 font-bold text-xl hover:text-red-700"
        >
          X
        </div>
      </div>

      {unselectedAmenities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {unselectedAmenities.map((amenity, index) => (
            <div
              className="bg-slate-400 cursor-pointer hover:bg-slate-600 text-white font-semibold px-4 py-2 sm:py-3 text-sm text-center rounded-lg"
              key={index}
              onClick={() => handleAddAmenity(amenity)}
            >
              {formatAmenity(amenity)}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No more amenities available</div>
      )}
    </div>
  );
}
