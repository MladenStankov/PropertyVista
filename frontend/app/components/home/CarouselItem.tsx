import React from "react";
import { ICarouselItem } from "./MostViewedCarousel";
import Link from "next/link";

interface CarouselItemProps {
  item: ICarouselItem;
  isCurrent?: boolean;
}

export default function CarouselItem({
  item,
  isCurrent = false,
}: CarouselItemProps) {
  return (
    <Link
      href={`/listings/${item.uuid}`}
      className={`relative w-1/3 max-lg:w-1/2 h-72 shadow-md hover:cursor-pointer transition-all hover:shadow-2xl ${
        !isCurrent
          ? "scale-90 hover:scale-[95%] max-lg:hidden"
          : "hover:scale-105"
      } `}
    >
      <img
        src={item.imageUrl}
        alt={item.location}
        className="absolute inset-0 w-full h-full object-cover filter brightness-75 rounded-lg"
      />

      <div
        className="absolute top-4 left-4 text-white text-xl font-bold bg-black bg-opacity-30 px-2 shadow-lg rounded-lg underline"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
      >
        {item.location}
      </div>
      <div
        className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black bg-opacity-30 px-2 shadow-lg rounded-lg"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <p>
          {new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
          }).format(item.price)}
          {item.type === "rent" && <span className="font-light">/month</span>}
        </p>
      </div>
    </Link>
  );
}
