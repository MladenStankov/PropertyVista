import React from "react";
import Map from "./Map";
import { IForm } from "./WizardForm";
import countries from "world-countries";

interface IAddressForm extends IForm {
  handleLocationChange: (longitude: number, latitude: number) => void;
  errors: { [key: string]: string };
}

export default function AddressForm({
  updatedListing,
  handleChange,
  handleLocationChange,
  errors,
}: IAddressForm) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="streetName"
              className="mb-1 text-gray-700 font-medium"
            >
              Street Name
            </label>
            <input
              type="text"
              id="streetName"
              value={updatedListing.address.streetName}
              name="address.streetName"
              placeholder="e.g., Main Street"
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["address.streetName"] ? "border-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors["address.streetName"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.streetName"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="streetNumber"
              className="mb-1 text-gray-700 font-medium"
            >
              Street Number
            </label>
            <input
              type="text"
              id="streetNumber"
              value={updatedListing.address.streetNumber}
              name="address.streetNumber"
              placeholder="e.g., 123"
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["address.streetNumber"] ? "border-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors["address.streetNumber"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.streetNumber"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="postalCode"
              className="mb-1 text-gray-700 font-medium"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={updatedListing.address.postalCode}
              name="address.postalCode"
              placeholder="e.g., 90210"
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["address.postalCode"] ? "border-red-500" : ""
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 text-gray-700 font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              value={updatedListing.address.city}
              name="address.city"
              placeholder="e.g., Los Angeles"
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["address.city"] ? "border-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors["address.city"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["address.city"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1 text-gray-700 font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              value={updatedListing.address.state}
              name="address.state"
              placeholder="e.g., California"
              className="border-2 rounded-xl px-4 py-2"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-1 text-gray-700 font-medium">
            Country
          </label>
          <select
            id="country"
            value={updatedListing.address.country}
            name="address.country"
            onChange={handleChange}
            className={`border-2 rounded-xl px-4 py-2 ${
              errors["address.country"] ? "border-red-500" : ""
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

      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Location</h2>
        <Map
          handleLocationChange={handleLocationChange}
          streetNumber={updatedListing.address.streetNumber}
          streetName={updatedListing.address.streetName}
          postalCode={updatedListing.address.postalCode}
          city={updatedListing.address.city}
          state={updatedListing.address.state}
          country={updatedListing.address.country}
        />
      </div>
    </>
  );
}
