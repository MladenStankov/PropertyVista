import { IResults } from "@/app/calculator/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface IProps {
  results: IResults | null;
  location: string;
}

export default function CalculatorAfterSubmit({ results, location }: IProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-full h-full relative">
        <Image
          src="/calculate-image.jpg"
          alt="Calculate background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-25"></div>
      </div>

      <div className="absolute top-[40%] w-11/12 sm:w-3/4 lg:w-1/2 rounded-lg shadow-2xl p-4 py-10 bg-white">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-left">
          Your affordability
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="border-2 rounded-xl p-4 hover:shadow-lg flex-1 transition-shadow shadow-sm">
            <div className="text-white bg-green-600 p-1 rounded-full px-2 w-fit font-semibold">
              Easy
            </div>
            <div className="font-bold text-lg sm:text-xl">
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.easy[0]))}{" "}
              -{" "}
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.easy[1]))}
            </div>
            <p className="text-sm sm:text-base">Easy to afford</p>
          </div>

          <div className="border-2 rounded-xl p-4 hover:shadow-lg flex-1 transition-shadow">
            <div className="text-white bg-yellow-500 p-1 rounded-full px-2 w-fit font-semibold">
              Stretch
            </div>
            <div className="font-bold text-lg sm:text-xl">
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.stretch[0]))}{" "}
              -{" "}
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.stretch[1]))}
            </div>
            <p className="text-sm sm:text-base">Stretches your budget</p>
          </div>

          <div className="border-2 rounded-xl p-4 hover:shadow-lg flex-1 transition-shadow">
            <div className="text-white bg-red-500 p-1 rounded-full px-2 w-fit font-semibold">
              Difficult
            </div>
            <div className="font-bold text-lg sm:text-xl">
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.difficult[0]))}{" "}
              -{" "}
              {new Intl.NumberFormat("en-IE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(results?.difficult[1]))}
            </div>
            <p className="text-sm sm:text-base">Over your budget</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <FaSearch size={25} className="text-blue-600" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Browse for easy to afford homes in your desired location
            </h2>
          </div>
          <Link
            href={`/listings?search=${location}&minPrice=${results?.easy[0]}&maxPrice=${results?.easy[1]}&type=buy`}
          >
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 font-bold px-4 py-2 rounded-full text-base sm:text-lg
             lg:text-xl shadow-md shadow-slate-400 mt-8 transition-all hover:shadow-xl"
            >
              Browse homes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
