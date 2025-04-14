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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Type and Price
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="type"
                className="text-gray-600 font-medium text-sm"
              >
                Type
              </label>
              <select
                id="type"
                value={formData.general.type}
                name="general.type"
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors["general.type"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="price"
                className="text-gray-600 font-medium text-sm"
              >
                Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  value={formData.general.price}
                  name="general.price"
                  placeholder="e.g., 47000"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors["general.price"]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200"
                  }`}
                  onChange={handleChange}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600 flex items-center gap-1">
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
          <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Construction Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="constructionType"
                className="text-gray-600 font-medium text-sm"
              >
                Construction Type
              </label>
              <select
                id="constructionType"
                value={formData.general.constructionType}
                name="general.constructionType"
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors["general.constructionType"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200"
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="surfaceArea"
                className="text-gray-600 font-medium text-sm"
              >
                Surface Area
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="surfaceArea"
                  value={formData.general.surfaceArea}
                  name="general.surfaceArea"
                  placeholder="e.g., 70"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors["general.surfaceArea"]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200"
                  }`}
                  onChange={handleChange}
                />
                <TbMeterSquare
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600"
                  size={25}
                />
              </div>
              {errors["general.surfaceArea"] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors["general.surfaceArea"]}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="constructionYear"
                className="text-gray-600 font-medium text-sm"
              >
                Construction Year
              </label>
              <input
                type="number"
                id="constructionYear"
                value={formData.general.constructionYear}
                name="general.constructionYear"
                placeholder="e.g., 1999"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors["general.constructionYear"]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200"
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
          <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Description
          </h2>
          <div className="flex flex-col gap-2">
            <textarea
              id="description"
              value={formData.general.description}
              name="general.description"
              placeholder="Describe your property..."
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 h-40 resize-none ${
                errors["general.description"]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
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
      </div>
    </>
  );
}
