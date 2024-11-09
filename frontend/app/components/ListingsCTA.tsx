import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListingsCTA() {
  return (
    <section className="bg-gray-200 w-full h-auto flex flex-col lg:flex-row py-10 justify-evenly gap-10 px-20">
      <div className="bg-white rounded-2xl flex flex-col p-5 gap-4 py-10 shadow-xl ring-1 ring-slate-300 ring-offset-8 w-full lg:w-1/3">
        <Image
          src="/home/listings-cta1.png"
          alt="Buy a Home"
          width={500}
          height={500}
          className="h-40 w-auto self-center md:h-1/2"
        />
        <h3 className="font-bold text-xl md:text-2xl text-center">
          Buy a Home
        </h3>
        <Link href="/listings?type=buy" className="self-center mt-4">
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-full text-base md:text-lg lg:text-xl shadow-md shadow-slate-400">
            Browse homes
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl flex flex-col p-5 gap-4 py-10 shadow-xl ring-1 ring-slate-300 ring-offset-8 w-full lg:w-1/3">
        <Image
          src="/home/listings-cta2.png"
          alt="Sell a Home"
          width={500}
          height={500}
          className="h-40 w-auto self-center md:h-1/2"
        />
        <h3 className="font-bold text-xl md:text-2xl text-center">
          Sell a Home
        </h3>
        <Link href="/sell" className="self-center mt-4">
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-full text-base md:text-lg lg:text-xl shadow-md shadow-slate-400">
            See how
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl flex flex-col p-5 gap-4 py-10 shadow-xl ring-1 ring-slate-300 ring-offset-8 w-full lg:w-1/3">
        <Image
          src="/home/listings-cta3.png"
          alt="Rent a Home"
          width={500}
          height={500}
          className="h-40 w-auto self-center md:h-1/2"
        />
        <h3 className="font-bold text-xl md:text-2xl text-center">
          Rent a Home
        </h3>
        <Link href="/listings?type=rent" className="self-center mt-4">
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-full text-base md:text-lg lg:text-xl shadow-md shadow-slate-400">
            Find rentals
          </button>
        </Link>
      </div>
    </section>
  );
}
