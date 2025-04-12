import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CalculatorCTA() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 h-auto flex flex-col-reverse md:flex-row justify-around px-6 py-16 w-full overflow-hidden gap-10 md:gap-20">
      <div className="flex flex-col gap-7 w-full md:w-1/2 self-center max-w-full">
        <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Calculate your mortgage
        </h3>
        <p className="font-normal text-xl sm:text-2xl md:text-3xl text-center text-gray-600">
          Get detailed mortgage calculations with our advanced calculator tool.
        </p>
        <Link href="/calculator" className="self-center">
          <button className="px-8 py-3 md:px-10 md:py-4 rounded-xl font-medium text-white bg-blue-500 hover:bg-blue-600 text-xl sm:text-2xl transition-all duration-200 shadow-md hover:shadow-lg">
            Try calculator
          </button>
        </Link>
      </div>
      <div className="flex justify-center md:w-1/2 max-w-[500px] w-full">
        <Image
          src="/home/calculator-cta.svg"
          alt="Calculator"
          width={500}
          height={500}
          className="h-auto w-full max-w-[350px] md:max-w-[500px] object-contain transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
}
