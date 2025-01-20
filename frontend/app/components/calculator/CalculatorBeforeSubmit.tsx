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
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="w-full h-full">
        <Image
          src="/calculate-image.jpg"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-25"></div>
      </div>

      <div className="absolute px-4 sm:px-8 lg:px-0 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-4xl sm:text-5xl font-semibold">
              Determine your budget
            </h1>
            <h2 className="text-white text-lg sm:text-xl font-light">
              We’ll assist you in estimating how much you can comfortably spend
              on a home.
            </h2>
          </div>

          <div className="rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-3xl bg-white">
            <h1 className="text-xl sm:text-2xl font-semibold text-left">
              Calculate your buying affordability
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col gap-1">
                <label>Monthly income</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.monthlyIncome}
                    name="monthlyIncome"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 pl-8 w-full"
                  />
                </div>
                {errors.monthlyIncome && (
                  <p className="text-red-500 text-sm">{errors.monthlyIncome}</p>
                )}
                <p className="font-extralight text-sm">
                  Total pre-tax income for you and the members of your
                  household.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Monthly debt</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.monthlyDebt}
                    name="monthlyDebt"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 pl-8 w-full"
                  />
                </div>
                {errors.monthlyDebt && (
                  <p className="text-red-500 text-sm">{errors.monthlyDebt}</p>
                )}
                {errors.fetchError && (
                  <p className="text-red-500 text-sm">{errors.fetchError}</p>
                )}
                <p className="font-extralight text-sm">
                  Payments you make towards loans or other debts, excluding
                  living expenses such as rent, groceries, or utilities.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Available funds</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </div>
                  <input
                    type="number"
                    value={form.availableFunds}
                    name="availableFunds"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 pl-8 w-full"
                  />
                </div>
                {errors.availableFunds && (
                  <p className="text-red-500 text-sm">
                    {errors.availableFunds}
                  </p>
                )}
                <p className="font-extralight text-sm">
                  Funds available for the down payment and closing costs.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label>Location</label>
                <input
                  type="text"
                  value={form.location}
                  name="location"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
                <p className="font-extralight text-sm">
                  Postal code, City, Country or Street Number you are searching
                  in.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <IoInformationCircleOutline color="blue" />
              <p className="text-xs font-extralight">
                The results are estimated and can be wrong
              </p>
            </div>

            <button
              onClick={() => handleSubmit(form)}
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
