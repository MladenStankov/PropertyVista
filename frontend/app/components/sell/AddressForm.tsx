import React from "react";
import Map from "./Map";
import { IForm } from "./WizardForm";
import countries from "world-countries";

interface IAddressForm extends IForm {
  handleLocationChange: (longitude: number, latitude: number) => void;
  errors: { [key: string]: string };
}

export default function AddressForm({
  formData,
  handleChange,
  handleLocationChange,
  errors,
}: IAddressForm) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="streetName"
              className="text-gray-600 font-medium text-sm"
            >
              Street Name
            </label>
            <input
              type="text"
              id="streetName"
              value={formData.address.streetName}
              name="address.streetName"
              placeholder="e.g., Main Street"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["address.streetName"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            {errors["address.streetName"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.streetName"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="streetNumber"
              className="text-gray-600 font-medium text-sm"
            >
              Street Number
            </label>
            <input
              type="text"
              id="streetNumber"
              value={formData.address.streetNumber}
              name="address.streetNumber"
              placeholder="e.g., 123"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["address.streetNumber"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            {errors["address.streetNumber"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.streetNumber"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="postalCode"
              className="text-gray-600 font-medium text-sm"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={formData.address.postalCode}
              name="address.postalCode"
              placeholder="e.g., 90210"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["address.postalCode"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            {errors["address.postalCode"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.postalCode"]}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-gray-600 font-medium text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.address.city}
              name="address.city"
              placeholder="e.g., Los Angeles"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors["address.city"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
              onChange={handleChange}
            />
            {errors["address.city"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.city"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="state"
              className="text-gray-600 font-medium text-sm"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.address.state}
              name="address.state"
              placeholder="e.g., California"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="country"
            className="text-gray-600 font-medium text-sm"
          >
            Country
          </label>
          <select
            id="country"
            value={formData.address.country}
            name="address.country"
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              errors["address.country"]
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200"
            }`}
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries?.map((country, index: number) => (
              <option key={index} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
          {errors["address.country"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["address.country"]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Location
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Map
            handleLocationChange={handleLocationChange}
            streetNumber={formData.address.streetNumber}
            streetName={formData.address.streetName}
            postalCode={formData.address.postalCode}
            city={formData.address.city}
            state={formData.address.state}
            country={formData.address.country}
          />
        </div>
      </div>
    </>
  );
}
