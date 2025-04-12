import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListingsCTA() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-auto flex flex-col lg:flex-row py-16 justify-evenly gap-10 px-6 sm:px-10 lg:px-20">
      <div className="bg-white rounded-2xl flex flex-col p-8 gap-6 shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-1/3 items-center justify-center border border-gray-100">
        <div className="relative h-48 w-48 md:h-56 md:w-56">
          <Image
            src="/home/listings-cta1.png"
            alt="Buy a Home"
            fill
            className="object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-bold text-2xl md:text-3xl text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Buy a Home
        </h3>
        <Link href="/listings?type=buy" className="self-center mt-2">
          <button className="px-6 py-3 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 text-lg md:text-xl transition-all duration-200 shadow-md hover:shadow-lg">
            Browse homes
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl flex flex-col p-8 gap-6 shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-1/3 items-center justify-center border border-gray-100">
        <div className="relative h-48 w-48 md:h-56 md:w-56">
          <Image
            src="/home/listings-cta2.png"
            alt="Sell a Home"
            fill
            className="object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-bold text-2xl md:text-3xl text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Sell a Home
        </h3>
        <Link href="/sell" className="self-center mt-2">
          <button className="px-6 py-3 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 text-lg md:text-xl transition-all duration-200 shadow-md hover:shadow-lg">
            See how
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl flex flex-col p-8 gap-6 shadow-xl hover:shadow-2xl transition-all duration-300 w-full lg:w-1/3 items-center justify-center border border-gray-100">
        <div className="relative h-48 w-48 md:h-56 md:w-56">
          <Image
            src="/home/listings-cta3.png"
            alt="Rent a Home"
            fill
            className="object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-bold text-2xl md:text-3xl text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Rent a Home
        </h3>
        <Link href="/listings?type=rent" className="self-center mt-2">
          <button className="px-6 py-3 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 text-lg md:text-xl transition-all duration-200 shadow-md hover:shadow-lg">
            Find rentals
          </button>
        </Link>
      </div>
    </section>
  );
}
