"use client";

import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface ICarouselItem {
  id: number;
  price: number;
  location: string;
  imageUrl: string;
}

const carouselItems: ICarouselItem[] = [
  {
    id: 1,
    price: 100_000,
    location: "Sofia, Bulgaria",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: 2,
    price: 60_000,
    location: "Munich, Germany",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: 3,
    price: 50_000,
    location: "Varna, Bulgaria",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: 4,
    price: 120_000,
    location: "London, United Kingdom",
    imageUrl: "https://placehold.co/600x400",
  },
  {
    id: 5,
    price: 420_000,
    location: "Rome, Italy",
    imageUrl: "https://placehold.co/600x400",
  },
];

export default function MostViewedCarousel() {
  const [itemIndex, setItemIndex] = useState<number>(0);

  const getPrevItem = () => {
    if (itemIndex <= 0) {
      return carouselItems[carouselItems.length - 1];
    } else return carouselItems[itemIndex - 1];
  };

  const getNextItem = () => {
    if (itemIndex >= carouselItems.length - 1) {
      return carouselItems[0];
    } else return carouselItems[itemIndex + 1];
  };

  const incrementItem = () => {
    setItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const decrementItem = () => {
    setItemIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <section className="px-5 sm:px-10 py-10 space-y-10 flex flex-col">
      <h2 className="text-center font-bold text-2xl sm:text-4xl md:text-5xl text-slate-600">
        Most viewed listings
      </h2>
      <div className="flex flex-row justify-center items-center gap-2">
        <FaArrowLeft
          onClick={decrementItem}
          className="hover:cursor-pointer hover:scale-125 transition-transform size-10 lg:size-20 max-md:size-7"
        />
        <CarouselItem item={getPrevItem()} />
        <CarouselItem item={carouselItems[itemIndex]} isCurrent={true} />
        <CarouselItem item={getNextItem()} />
        <FaArrowRight
          onClick={incrementItem}
          className="hover:cursor-pointer hover:scale-125 transition-transform size-10 lg:size-20 max-md:size-7"
        />
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {carouselItems.map((item, i) => (
          <div
            key={i}
            className={`w-[10px] h-[10px] rounded-full ${
              i === itemIndex ? "bg-slate-500" : "bg-slate-200"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}