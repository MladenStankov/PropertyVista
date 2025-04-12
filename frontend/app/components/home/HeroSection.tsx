import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[400px] xs:min-h-[350px]">
      <div className="absolute inset-0">
        <Image
          src="/home/hero-section.png"
          alt="Hero section background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="brightness-[.65]"
        />
      </div>
      <div className="relative flex flex-col justify-center items-start px-6 sm:px-10 lg:px-20 py-10 h-full gap-6">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight max-w-3xl bg-clip-text">
          Find Your Dream Home.
        </h1>
        <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-medium max-w-xl">
          Discover your next home with our comprehensive real estate solutions.
          Explore a wide range of properties, from cozy apartments to spacious
          family homes.
        </h2>
        <div className="flex flex-wrap gap-5 mt-6">
          <Link href="/listings">
            <button className="text-white font-semibold px-6 py-3 bg-blue-500 hover:bg-blue-600 text-sm sm:text-lg rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
              Explore Properties
            </button>
          </Link>
          <Link href="/map">
            <button className="font-semibold px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 hover:text-gray-900 text-sm sm:text-lg rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
              Find on Map
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
