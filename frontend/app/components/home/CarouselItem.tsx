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
      href={`/listings/${item.id}`}
      className={`relative w-full max-lg:w-1/2 h-72 shadow-2xl hover:cursor-pointer transition-transform ${
        !isCurrent ? "scale-90 max-lg:hidden" : ""
      } `}
    >
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75 rounded-lg hover:scale-105 transition-transform"
        style={{ background: `url(${item.imageUrl})` }}
      ></div>

      <div className="absolute top-4 left-4 text-white text-lg font-bold underline">
        {item.location}
      </div>
      <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
        <p>
          € <span>{item.price}</span>
        </p>
      </div>
    </Link>
  );
}
