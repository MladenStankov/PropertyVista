import React, { useEffect, useRef } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { AmenityType } from "../sell/WizardForm";

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
}

export default function AmenitiesSelector({
  selectedAmenities,
  setSelectedAmenities,
}: AmenitiesSelectorProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const choices = new Choices(selectRef.current, {
        removeItemButton: true,
        placeholder: true,
        placeholderValue: "Select amenities",
        searchEnabled: true,
        duplicateItemsAllowed: false,
      });

      const handleChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        const selectedValues = Array.from(target.options)
          .filter((option) => option.selected)
          .map((option) => option.value);
        setSelectedAmenities(selectedValues);
      };

      choices.passedElement.element.addEventListener("change", handleChange);

      return () => {
        choices.passedElement.element.removeEventListener(
          "change",
          handleChange
        );
      };
    }
  }, [setSelectedAmenities]);

  return (
    <div>
      <h2 className="text-lg sm:text-xl lg:text-2xl mb-2">Amenities</h2>
      <select
        ref={selectRef}
        className="border-2 rounded-md w-full px-2 py-2"
        multiple
        defaultValue={selectedAmenities}
      >
        {Object.entries(AmenityType).map(([key, value]) => (
          <option key={key} value={value}>
            {key
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/^\w/, (c) => c.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}
