import React from "react";
import { IForm } from "./WizardForm";

import { FaShower, FaBed } from "react-icons/fa";
import { MdOutlineOtherHouses } from "react-icons/md";
import { FaStairs } from "react-icons/fa6";

export default function RoomForm({ formData, handleChange }: IForm) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Room Info</h2>
        <div className="grid grid-cols-1 gap-5">
          <div className="relative flex flex-col">
            <label
              htmlFor="numberOfBedrooms"
              className="mb-1 text-gray-700 font-medium"
            >
              Total Bedrooms
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="numberOfBedrooms"
                value={formData.rooms.numberOfBedrooms}
                name="rooms.numberOfBedrooms"
                placeholder="eg. 2"
                className="border-2 rounded-xl px-4 pr-10 py-2 w-full"
                onChange={handleChange}
              />
              <FaBed
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
          </div>

          <div className="relative flex flex-col">
            <label
              htmlFor="numberOfBathrooms"
              className="mb-1 text-gray-700 font-medium"
            >
              Total Bathrooms
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="numberOfBathrooms"
                value={formData.rooms.numberOfBathrooms}
                name="rooms.numberOfBathrooms"
                placeholder="eg. 2"
                className="border-2 rounded-xl px-4 pr-10 py-2 w-full"
                onChange={handleChange}
              />
              <FaShower
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
          </div>

          <div className="relative flex flex-col">
            <label
              htmlFor="numberOfOtherRooms"
              className="mb-1 text-gray-700 font-medium"
            >
              Total Other Rooms
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="numberOfOtherRooms"
                value={formData.rooms.numberOfOtherRooms}
                name="rooms.numberOfOtherRooms"
                placeholder="eg. 3"
                className="border-2 rounded-xl px-4 pr-10 py-2 w-full"
                onChange={handleChange}
              />
              <MdOutlineOtherHouses
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
          </div>
        </div>

        <h2 className="font-medium text-lg md:text-xl">Area Info</h2>
        <div className="grid grid-cols-1 gap-5">
          <div className="relative flex flex-col">
            <label
              htmlFor="numberOfFloors"
              className="mb-1 text-gray-700 font-medium"
            >
              Total Floors
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="numberOfFloors"
                value={formData.rooms.numberOfFloors}
                name="rooms.numberOfFloors"
                placeholder="eg. 1"
                className="border-2 rounded-xl px-4 pr-10 py-2 w-full"
                onChange={handleChange}
              />
              <FaStairs
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}