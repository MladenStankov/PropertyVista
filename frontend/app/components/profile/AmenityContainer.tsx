import React from "react";

import { GiHomeGarage } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { CgSmartHomeHeat, CgSmartHomeWashMachine } from "react-icons/cg";
import { BiSolidDryer } from "react-icons/bi";
import { TbSmartHome } from "react-icons/tb";
import { MdOutlinePool } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { FaChargingStation } from "react-icons/fa6";
import { GiGardeningShears } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";
import { PiTowelLight } from "react-icons/pi";
import { IconType } from "react-icons";

interface IAmenityContainer {
  amenity: string;
  index: number;
  handleRemoveAmenity: (index: number) => void;
}

const amenityIcons: { [key: string]: IconType } = {
  air_conditioning: TbAirConditioning,
  heating: CgSmartHomeHeat,
  washer: CgSmartHomeWashMachine,
  dryer: BiSolidDryer,
  smart_home: TbSmartHome,
  swimming_pool: MdOutlinePool,
  parking: FaParking,
  ev_charging: FaChargingStation,
  garden: GiGardeningShears,
  terrace: MdBalcony,
  fitness_center: IoIosFitness,
  sauna: PiTowelLight,
  garage: GiHomeGarage,
};

export default function AmenityContainer({
  amenity,
  index,
  handleRemoveAmenity,
}: IAmenityContainer) {
  const Icon = amenityIcons[amenity.toLowerCase().replace(/ /g, "_")];

  return (
    <div className="grid grid-cols-5 max-sm:grid-cols-1 gap-4 items-center bg-slate-100 border rounded-md p-4 h-auto">
      {Icon ? (
        <Icon
          size={50}
          className="text-gray-600 mx-auto sm:mb-2 self-center w-12 h-12"
        />
      ) : (
        <div className="text-gray-600 mx-auto sm:mb-2">No Icon</div>
      )}
      <h3 className="col-span-3 max-sm:col-span-1 text-xl font-medium text-center sm:mb-2">
        {amenity}
      </h3>
      <FaTrashAlt
        size={30}
        onClick={() => handleRemoveAmenity(index)}
        className="text-red-400 cursor-pointer hover:text-red-700 justify-self-center sm:justify-self-center"
      />
    </div>
  );
}
