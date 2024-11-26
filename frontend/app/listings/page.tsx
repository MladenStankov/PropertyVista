"use client";

import React from "react";
import ListingsCard from "../components/listings/ListingsCard";

import { IoSearch } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

export default function ListingsPage() {
  const handleSearch = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col p-20 gap-10">
      <div className="flex justify-center gap-10 items-center">
        <div className="w-1/2 relative">
          <input
            className="rounded-full border-2 border-black  px-14 py-4 text-xl shadow-xl w-full"
            type="text"
            placeholder="Postal code, City, Country or Street number"
          />
          <IoSearch
            className="absolute left-0 top-0 ml-2 mt-3 text-gray-500"
            size={40}
          />
          <div
            onClick={(e) => handleSearch(e)}
            className="absolute top-0 right-0 mr-4 mt-3 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600"
          >
            <FaArrowRightLong className="text-white" size={25} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-2xl border-2 border-black rounded-md p-3 cursor-pointer hover:bg-gray-100">
          <LuSettings2 />
          <p>Filter</p>
          <IoIosArrowDown />
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-3 gap-5">
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
        <ListingsCard />
      </div>
    </div>
  );
}
