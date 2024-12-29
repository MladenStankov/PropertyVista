import React, { useState } from "react";
import { AmenityType } from "./WizardForm";
import AmenityContainer from "./AmenityContainer";
import AmenitiesSelector from "./AmenitiesSelector";
import { IUpdatedListing } from "@/app/profile/listings/edit/[uuid]/page";

interface IAmenitiesForm {
  updatedListing: IUpdatedListing;
  handleAmenityChange: (amenity: AmenityType[]) => void;
}

export default function AmenitiesForm({
  updatedListing,
  handleAmenityChange,
}: IAmenitiesForm) {
  const [showSelector, setShowSelector] = useState(false);
  const [allAmenities] = useState<AmenityType[]>(Object.values(AmenityType));

  const formatAmenity = (amenity: AmenityType) =>
    amenity
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleAddAmenity = (amenity: AmenityType) => {
    handleAmenityChange([...updatedListing.amenities, amenity]);
  };

  const handleRemoveAmenity = (index: number) => {
    handleAmenityChange(updatedListing.amenities.filter((_, i) => i !== index));
  };

  const unselectedAmenities = allAmenities.filter(
    (amenity) => !updatedListing.amenities.includes(amenity)
  );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-medium text-lg md:text-xl">Amenities</h2>
      {showSelector && (
        <AmenitiesSelector
          formatAmenity={formatAmenity}
          unselectedAmenities={unselectedAmenities}
          handleAddAmenity={handleAddAmenity}
          setShowSelector={setShowSelector}
        />
      )}
      <div className="flex flex-col justify-center items-center border-2 p-4 h-96 gap-2 rounded-md shadow-lg">
        {updatedListing.amenities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-full w-full">
            {updatedListing.amenities.map((amenity, index) => (
              <AmenityContainer
                key={index}
                amenity={formatAmenity(amenity)}
                handleRemoveAmenity={handleRemoveAmenity}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="mb-auto">No selected amenities at the moment</div>
        )}
        <button
          onClick={() => setShowSelector(true)}
          className="mt-auto cursor-pointer text-blue-500 shadow-md self-center px-10 py-2 ring-2 font-bold hover:bg-gray-200 text-sm md:text-base"
        >
          Add Amenities
        </button>
      </div>
    </div>
  );
}
