"use client";

import React, { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PropertyType } from "../sell/WizardForm";

export interface ICarouselItem {
  uuid: string;
  price: number;
  location: string;
  imageUrl: string;
  type: PropertyType;
}

export default function MostViewedCarousel() {
  const [carouselItems, setCarouselItems] = useState<ICarouselItem[]>([]);
  const [itemIndex, setItemIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchMostViewedListings() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/listings/top-viewed`
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setCarouselItems(data);
          console.log(data);
        } else {
          console.error("Expected an array but got:", data);
          setCarouselItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setCarouselItems([]);
      }
    }

    fetchMostViewedListings();
  }, []);

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
      {Array.isArray(carouselItems) && carouselItems.length > 0 ? (
        <>
          <div className="flex flex-row justify-center items-center gap-2">
            <FaArrowLeft
              onClick={decrementItem}
              className="hover:cursor-pointer hover:scale-125 transition-transform size-10 lg:size-20 max-md:size-7"
            />
            {carouselItems.length > 1 && <CarouselItem item={getPrevItem()} />}
            <CarouselItem item={carouselItems[itemIndex]} isCurrent={true} />
            {carouselItems.length > 1 && <CarouselItem item={getNextItem()} />}
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
        </>
      ) : (
        <h3 className="text-center text-2xl text-slate-600">
          No listings found
        </h3>
      )}
    </section>
  );
}
