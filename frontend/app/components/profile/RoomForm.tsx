import React from "react";
import { IForm } from "./WizardForm";

import { FaShower, FaBed } from "react-icons/fa";
import { MdOutlineOtherHouses } from "react-icons/md";
import { FaStairs } from "react-icons/fa6";

interface IRoomForm extends IForm {
  errors: { [key: string]: string };
}

export default function RoomForm({
  updatedListing,
  handleChange,
  errors,
}: IRoomForm) {
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
                value={updatedListing.rooms.numberOfBedrooms}
                name="rooms.numberOfBedrooms"
                placeholder="eg. 2"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["rooms.numberOfBedrooms"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <FaBed
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
            {errors["rooms.numberOfBedrooms"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["rooms.numberOfBedrooms"]}
              </span>
            )}
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
                value={updatedListing.rooms.numberOfBathrooms}
                name="rooms.numberOfBathrooms"
                placeholder="eg. 2"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["rooms.numberOfBathrooms"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <FaShower
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
            {errors["rooms.numberOfBathrooms"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["rooms.numberOfBathrooms"]}
              </span>
            )}
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
                value={updatedListing.rooms.numberOfOtherRooms}
                name="rooms.numberOfOtherRooms"
                placeholder="eg. 3"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["rooms.numberOfOtherRooms"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <MdOutlineOtherHouses
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
            {errors["rooms.numberOfOtherRooms"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["rooms.numberOfOtherRooms"]}
              </span>
            )}
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
                value={updatedListing.rooms.numberOfFloors}
                name="rooms.numberOfFloors"
                placeholder="eg. 1"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["rooms.numberOfFloors"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <FaStairs
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
            {errors["rooms.numberOfFloors"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["rooms.numberOfFloors"]}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
