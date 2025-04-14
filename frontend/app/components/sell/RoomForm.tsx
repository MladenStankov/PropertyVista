import React from "react";
import { IForm } from "./WizardForm";
import { FaShower } from "react-icons/fa";
import { MdOutlineStairs } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";

interface IRoomForm extends IForm {
  errors: Record<string, string>;
}

export default function RoomForm({
  formData,
  handleChange,
  errors,
}: IRoomForm) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Room Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="numberOfBedrooms"
            className="text-gray-600 font-medium text-sm"
          >
            Number of Bedrooms
          </label>
          <div className="relative">
            <input
              type="number"
              id="numberOfBedrooms"
              value={formData.rooms.numberOfBedrooms}
              name="rooms.numberOfBedrooms"
              placeholder="e.g., 3"
              min="0"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["rooms.numberOfBedrooms"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            <IoBedOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
              size={20}
            />
          </div>
          {errors["rooms.numberOfBedrooms"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["rooms.numberOfBedrooms"]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="numberOfBathrooms"
            className="text-gray-600 font-medium text-sm"
          >
            Number of Bathrooms
          </label>
          <div className="relative">
            <input
              type="number"
              id="numberOfBathrooms"
              value={formData.rooms.numberOfBathrooms}
              name="rooms.numberOfBathrooms"
              placeholder="e.g., 2"
              min="0"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["rooms.numberOfBathrooms"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            <FaShower
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
              size={20}
            />
          </div>
          {errors["rooms.numberOfBathrooms"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["rooms.numberOfBathrooms"]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="numberOfOtherRooms"
            className="text-gray-600 font-medium text-sm"
          >
            Number of Other Rooms
          </label>
          <div className="relative">
            <input
              type="number"
              id="numberOfOtherRooms"
              value={formData.rooms.numberOfOtherRooms}
              name="rooms.numberOfOtherRooms"
              placeholder="e.g., 2"
              min="0"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["rooms.numberOfOtherRooms"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            <LuDoorOpen
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
              size={20}
            />
          </div>
          {errors["rooms.numberOfOtherRooms"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["rooms.numberOfOtherRooms"]}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="numberOfFloors"
            className="text-gray-600 font-medium text-sm"
          >
            Number of Floors
          </label>
          <div className="relative">
            <input
              type="number"
              id="numberOfFloors"
              value={formData.rooms.numberOfFloors}
              name="rooms.numberOfFloors"
              placeholder="e.g., 2"
              min="1"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["rooms.numberOfFloors"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            <MdOutlineStairs
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
              size={20}
            />
          </div>
          {errors["rooms.numberOfFloors"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["rooms.numberOfFloors"]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
        <h3 className="text-lg font-medium text-gray-700">Room Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
            <IoBedOutline size={24} className="text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-700">
              {formData.rooms.numberOfBedrooms || "0"}
            </span>
            <span className="text-sm text-gray-500">Bedrooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
            <FaShower size={24} className="text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-700">
              {formData.rooms.numberOfBathrooms || "0"}
            </span>
            <span className="text-sm text-gray-500">Bathrooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
            <LuDoorOpen size={24} className="text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-700">
              {formData.rooms.numberOfOtherRooms || "0"}
            </span>
            <span className="text-sm text-gray-500">Other Rooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
            <MdOutlineStairs size={24} className="text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-700">
              {formData.rooms.numberOfFloors || "0"}
            </span>
            <span className="text-sm text-gray-500">Floors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
