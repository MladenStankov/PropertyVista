import React from "react";
import { IFilter } from "@/app/listings/page";
import { IoMdClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { AmenityType, ConstructionType } from "../sell/WizardForm";
import { TbAirConditioning } from "react-icons/tb";
import { CgSmartHomeHeat, CgSmartHomeWashMachine } from "react-icons/cg";
import { BiSolidDryer } from "react-icons/bi";
import { TbSmartHome } from "react-icons/tb";
import { MdOutlinePool, MdBalcony } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa6";
import { GiGardeningShears, GiHomeGarage } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { PiTowelLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const amenityIcons = {
  [AmenityType.AIR_CONDITIONING]: TbAirConditioning,
  [AmenityType.HEATING]: CgSmartHomeHeat,
  [AmenityType.WASHER]: CgSmartHomeWashMachine,
  [AmenityType.DRYER]: BiSolidDryer,
  [AmenityType.SMART_HOME]: TbSmartHome,
  [AmenityType.SWIMMING_POOL]: MdOutlinePool,
  [AmenityType.PARKING]: FaParking,
  [AmenityType.EV_CHARGING]: FaChargingStation,
  [AmenityType.GARDEN]: GiGardeningShears,
  [AmenityType.TERRACE]: MdBalcony,
  [AmenityType.FITNESS_CENTER]: IoIosFitness,
  [AmenityType.SAUNA]: PiTowelLight,
  [AmenityType.GARAGE]: GiHomeGarage,
};

interface FilterContainerProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  setShowFilters: (showFilters: boolean) => void;
}

const propertyTypes = ["buy", "rent"] as const;
const constructionTypes = Object.values(ConstructionType) as ConstructionType[];
const amenityTypes = Object.values(AmenityType) as AmenityType[];

export default function FilterContainer({
  filter,
  setFilter,
  setShowFilters,
}: FilterContainerProps) {
  const formatAmenityLabel = (amenity: AmenityType) => {
    return amenity
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleAmenityChange = (amenity: AmenityType) => {
    const currentAmenities = filter.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a: AmenityType) => a !== amenity)
      : [...currentAmenities, amenity];
    setFilter({ ...filter, amenities: updatedAmenities });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative z-40 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Property Type</h3>
                <div className="flex flex-wrap gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter({ ...filter, type })}
                      className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                        filter.type === type
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {capitalizeFirstLetter(type)}
                    </button>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-700 mt-6">
                  Price Range
                </h3>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filter.minPrice || ""}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          minPrice: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filter.maxPrice || ""}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          maxPrice: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-gray-700 mt-6">Area (m²)</h3>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filter.minSurfaceArea || ""}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          minSurfaceArea: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filter.maxSurfaceArea || ""}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          maxSurfaceArea: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">
                  Construction Type
                </h3>
                <div className="flex flex-wrap gap-3">
                  {constructionTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setFilter({
                          ...filter,
                          constructionType: type as ConstructionType,
                        })
                      }
                      className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                        filter.constructionType === type
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {capitalizeFirstLetter(type)}
                    </button>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-700 mt-6">Rooms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Bedrooms</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filter.minBedrooms || ""}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            minBedrooms: e.target.value
                              ? Number(e.target.value)
                              : null,
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Bathrooms</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filter.minBathrooms || ""}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            minBathrooms: e.target.value
                              ? Number(e.target.value)
                              : null,
                          })
                        }
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-700 mt-6">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenityTypes.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <button
                        key={amenity}
                        onClick={() => handleAmenityChange(amenity)}
                        className={`px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                          filter.amenities?.includes(amenity)
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded-md ${
                            filter.amenities?.includes(amenity)
                              ? "bg-white"
                              : "bg-white border-2 border-gray-300"
                          }`}
                        >
                          {filter.amenities?.includes(amenity) ? (
                            <IoCheckmark className="text-blue-500" />
                          ) : (
                            <Icon className="text-gray-500" />
                          )}
                        </div>
                        <span>{formatAmenityLabel(amenity)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setFilter({});
                  setShowFilters(false);
                }}
                className="px-6 py-2 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  const queriesString = Object.entries(filter)
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
                }}
                className="px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
