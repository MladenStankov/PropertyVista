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
    <section className="px-5 sm:px-10 py-16 space-y-10 flex flex-col bg-gradient-to-br from-white to-gray-50">
      <h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        Most viewed listings
      </h2>
      {Array.isArray(carouselItems) && carouselItems.length > 0 ? (
        <>
          <div className="flex flex-row justify-center items-center gap-4">
            <button
              onClick={decrementItem}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              aria-label="Previous item"
            >
              <FaArrowLeft className="size-6 max-md:size-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
            {carouselItems.length > 1 && <CarouselItem item={getPrevItem()} />}
            <CarouselItem item={carouselItems[itemIndex]} isCurrent={true} />
            {carouselItems.length > 1 && <CarouselItem item={getNextItem()} />}
            <button
              onClick={incrementItem}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              aria-label="Next item"
            >
              <FaArrowRight className="size-6 max-md:size-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setItemIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === itemIndex
                    ? "bg-blue-500 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-center text-2xl text-gray-600">
          No listings found
        </h3>
      )}
    </section>
  );
}
