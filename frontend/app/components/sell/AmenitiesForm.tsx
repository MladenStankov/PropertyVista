import React, { useState } from "react";
import { AmenityType, IWizardForm } from "./WizardForm";
import {
  FaTrashAlt,
  FaSwimmingPool,
  FaParking,
  FaCar,
  FaDumbbell,
  FaSnowflake,
  FaFireAlt,
} from "react-icons/fa";
import { BiSolidWasher, BiSolidDryer } from "react-icons/bi";
import { MdOutlineSmartphone } from "react-icons/md";
import { GiGardeningShears, GiHomeGarage } from "react-icons/gi";
import { TbStairs, TbBath } from "react-icons/tb";

interface IAmenitiesForm {
  formData: IWizardForm;
  handleAmenityChange: (amenity: AmenityType[]) => void;
}

const amenityIcons: {
  [key: string]: React.ComponentType<{ size?: number; className?: string }>;
} = {
  air_conditioning: FaSnowflake,
  heating: FaFireAlt,
  washer: BiSolidWasher,
  dryer: BiSolidDryer,
  smart_home: MdOutlineSmartphone,
  swimming_pool: FaSwimmingPool,
  parking: FaParking,
  ev_charging: FaCar,
  garden: GiGardeningShears,
  terrace: TbStairs,
  fitness_center: FaDumbbell,
  sauna: TbBath,
  garage: GiHomeGarage,
};

export default function AmenitiesForm({
  formData,
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
    handleAmenityChange([...formData.amenities, amenity]);
  };

  const handleRemoveAmenity = (index: number) => {
    handleAmenityChange(formData.amenities.filter((_, i) => i !== index));
  };

  const unselectedAmenities = allAmenities.filter(
    (amenity) => !formData.amenities.includes(amenity)
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Amenities
      </h2>

      {showSelector && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-700">
                Add Amenities
              </h3>
              <button
                onClick={() => setShowSelector(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
              {unselectedAmenities.map((amenity, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleAddAmenity(amenity);
                    setShowSelector(false);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 group"
                >
                  {React.createElement(
                    amenityIcons[amenity.toLowerCase().replace(/_/g, "_")],
                    {
                      size: 24,
                      className:
                        "text-gray-600 group-hover:text-blue-600 transition-colors",
                    }
                  )}
                  <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                    {formatAmenity(amenity)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center border-2 rounded-xl p-6 min-h-[400px] bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        {formData.amenities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {formData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm group hover:border-blue-500 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {React.createElement(
                    amenityIcons[amenity.toLowerCase().replace(/_/g, "_")],
                    {
                      size: 24,
                      className: "text-blue-600",
                    }
                  )}
                  <span className="font-medium text-gray-700">
                    {formatAmenity(amenity)}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveAmenity(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No selected amenities</div>
        )}

        <button
          onClick={() => setShowSelector(true)}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Amenities
        </button>
      </div>
    </div>
  );
}
