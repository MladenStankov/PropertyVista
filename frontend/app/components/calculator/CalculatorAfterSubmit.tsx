import { IResults } from "@/app/calculator/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  BsGraphUp,
  BsShieldCheck,
  BsExclamationTriangle,
} from "react-icons/bs";

interface IProps {
  results: IResults | null;
  location: string;
}

export default function CalculatorAfterSubmit({ results, location }: IProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative min-h-full w-full">
      <div className="absolute inset-0 w-full min-h-svh">
        <Image
          src="/calculate-image.jpg"
          alt="Calculate background"
          layout="fill"
          objectFit="cover"
          className="filter brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="w-full max-w-[1000px] mx-auto">
          <div className="backdrop-blur-md bg-white/95 rounded-3xl shadow-2xl p-8 border border-white/20">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-8">
              Your Home Buying Power
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="backdrop-blur-sm bg-gradient-to-br from-green-50 to-green-100/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-green-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <BsShieldCheck className="text-2xl text-green-600" />
                  <div className="text-green-700 font-semibold text-lg">
                    Easy
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-2xl text-gray-800">
                    {formatCurrency(Number(results?.easy[0]))}
                    <span className="mx-2">-</span>
                    {formatCurrency(Number(results?.easy[1]))}
                  </div>
                  <p className="text-green-700">
                    Comfortable range for your budget
                  </p>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-50 to-yellow-100/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-yellow-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <BsGraphUp className="text-2xl text-yellow-600" />
                  <div className="text-yellow-700 font-semibold text-lg">
                    Stretch
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-2xl text-gray-800">
                    {formatCurrency(Number(results?.stretch[0]))}
                    <span className="mx-2">-</span>
                    {formatCurrency(Number(results?.stretch[1]))}
                  </div>
                  <p className="text-yellow-700">
                    May require budget adjustments
                  </p>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-gradient-to-br from-red-50 to-red-100/80 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-red-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <BsExclamationTriangle className="text-2xl text-red-600" />
                  <div className="text-red-700 font-semibold text-lg">
                    Difficult
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-2xl text-gray-800">
                    {formatCurrency(Number(results?.difficult[0]))}
                    <span className="mx-2">-</span>
                    {formatCurrency(Number(results?.difficult[1]))}
                  </div>
                  <p className="text-red-700">Beyond recommended budget</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaSearch size={25} className="text-blue-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Find Your Perfect Home
                </h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 mb-8">
                  Ready to explore properties within your comfortable budget
                  range? We&apos;ve curated a selection of homes in {location}{" "}
                  that match your financial preferences.
                </p>

                <Link
                  href={`/listings?search=${location}&minPrice=${results?.easy[0]}&maxPrice=${results?.easy[1]}&type=buy`}
                >
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                    text-white font-bold py-4 px-8 rounded-xl transform transition-all duration-200 
                    hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Browse Available Homes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
