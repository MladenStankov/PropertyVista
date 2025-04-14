import { ICalculator } from "@/app/calculator/page";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Image from "next/image";

interface ICalculatorBeforeSubmitProps {
  form: ICalculator;
  errors: Partial<ICalculator>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (form: ICalculator) => void;
}

export default function CalculatorBeforeSubmit({
  form,
  errors,
  handleChange,
  handleSubmit,
}: ICalculatorBeforeSubmitProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
      <div className="w-full h-full">
        <Image
          src="/calculate-image.jpg"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          className="filter brightness-75"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/30 to-black/40"></div>
      </div>

      <div className="absolute px-4 sm:px-8 lg:px-0 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col gap-4 backdrop-blur-sm p-2 rounded-2xl"></div>

          <div className="rounded-2xl shadow-2xl p-8 w-full max-w-3xl bg-white/95 backdrop-blur-md border border-white/20">
            <h1 className="text-2xl sm:text-3xl font-bold text-left bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Calculate your buying affordability
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Monthly income
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.monthlyIncome}
                    name="monthlyIncome"
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-xl p-3 pl-8 w-full outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {errors.monthlyIncome && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.monthlyIncome}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Total pre-tax income for you and the members of your
                  household.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Monthly debt
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.monthlyDebt}
                    name="monthlyDebt"
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-xl p-3 pl-8 w-full outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {errors.monthlyDebt && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.monthlyDebt}
                  </p>
                )}
                {errors.fetchError && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fetchError}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Payments you make towards loans or other debts, excluding
                  living expenses.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Available funds
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.availableFunds}
                    name="availableFunds"
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-xl p-3 pl-8 w-full outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {errors.availableFunds && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableFunds}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Funds available for the down payment and closing costs.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={form.location}
                  name="location"
                  onChange={handleChange}
                  className="border-2 border-gray-200 rounded-xl p-3 w-full outline-none focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter location..."
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
                <p className="text-sm text-gray-500">
                  Postal code, City, Country or Street Number.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 bg-blue-50 p-4 rounded-xl">
              <IoInformationCircleOutline className="text-blue-500 text-xl flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Results are estimates and may vary based on market conditions
              </p>
            </div>

            <button
              onClick={() => handleSubmit(form)}
              className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
              text-white font-bold py-4 px-6 rounded-xl w-full transform transition-all duration-200 
              hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
