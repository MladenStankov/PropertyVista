import React from "react";
import { IForm } from "./WizardForm";
import { FaEuroSign } from "react-icons/fa";
import { TbMeterSquare } from "react-icons/tb";

interface IGeneralInformationForm extends IForm {
  errors: Record<string, string>;
}

export default function GeneralInformationForm({
  formData,
  handleChange,
  errors,
}: IGeneralInformationForm) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Type and Price</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="type" className="mb-1 text-gray-700 font-medium">
              Type
            </label>
            <select
              id="type"
              value={formData.general.type}
              name="general.type"
              onChange={handleChange}
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["general.type"] ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
            {errors["general.type"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["general.type"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 text-gray-700 font-medium">
              Price
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="price"
                value={formData.general.price}
                name="general.price"
                placeholder="eg. 47000"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["general.price"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600 flex items-center gap-1">
                <FaEuroSign />
                {formData.general.type === "rent" && (
                  <span className="text-sm">/month</span>
                )}
              </div>
            </div>
            {errors["general.price"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["general.price"]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Construction Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="constructionType"
              className="mb-1 text-gray-700 font-medium"
            >
              Construction Type
            </label>
            <select
              id="constructionType"
              value={formData.general.constructionType}
              name="general.constructionType"
              onChange={handleChange}
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["general.constructionType"] ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
            </select>
            {errors["general.constructionType"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["general.constructionType"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="surfaceArea"
              className="mb-1 text-gray-700 font-medium"
            >
              Surface Area
            </label>
            <div className="relative flex">
              <input
                type="number"
                id="surfaceArea"
                value={formData.general.surfaceArea}
                name="general.surfaceArea"
                placeholder="eg. 70"
                className={`border-2 rounded-xl px-4 pr-10 py-2 w-full ${
                  errors["general.surfaceArea"] ? "border-red-500" : ""
                }`}
                onChange={handleChange}
              />
              <TbMeterSquare
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600"
                size={25}
              />
            </div>
            {errors["general.surfaceArea"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["general.surfaceArea"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="constructionYear"
              className="mb-1 text-gray-700 font-medium"
            >
              Construction Year
            </label>
            <input
              type="number"
              id="constructionYear"
              value={formData.general.constructionYear}
              name="general.constructionYear"
              placeholder="eg. 1999"
              className={`border-2 rounded-xl px-4 py-2 ${
                errors["general.constructionYear"] ? "border-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors["general.constructionYear"] && (
              <span className="text-red-500 text-sm mt-1">
                {errors["general.constructionYear"]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-lg md:text-xl">Description</h2>
        <div className="flex flex-col">
          <textarea
            id="description"
            value={formData.general.description}
            name="general.description"
            placeholder="eg. Cool house"
            className={`border-2 rounded-xl px-4 py-2 h-40 resize-none ${
              errors["general.description"] ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors["general.description"] && (
            <span className="text-red-500 text-sm mt-1">
              {errors["general.description"]}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
