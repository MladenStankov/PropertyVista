import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AccountCTA() {
  return (
    <section className="bg-gray-200 h-auto flex flex-col md:flex-row justify-around px-6 py-10 w-full overflow-hidden gap-10 md:gap-20">
      <div className="flex justify-center md:w-1/2 max-w-[500px] w-full">
        <Image
          src="/home/account-cta.png"
          alt="Accounts"
          width={500}
          height={500}
          className="h-auto w-full max-w-[350px] md:max-w-[500px] object-contain"
        />
      </div>
      <div className="flex flex-col gap-5 w-full md:w-1/2 self-center max-w-full">
        <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center text-slate-600">
          Experience the benefits of having a profile
        </h3>
        <p className="font-light text-xl sm:text-2xl md:text-3xl text-center">
          Publish and save your listings and be able to communicate with others.
        </p>
        <Link href="/register" className="self-center">
          <button className="border-blue-500 bg-white px-6 py-3 md:px-8 md:py-4 border-2 rounded-full text-blue-500 text-xl sm:text-2xl font-semibold hover:bg-slate-300">
            Sign up
          </button>
        </Link>
      </div>
    </section>
  );
}
