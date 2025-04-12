import React from "react";
import { ICarouselItem } from "./MostViewedCarousel";
import Link from "next/link";
import Image from "next/image";

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
      className={`relative w-1/3 max-lg:w-1/2 h-72 group ${
        !isCurrent
          ? "scale-90 hover:scale-[95%] max-lg:hidden opacity-70"
          : "hover:scale-[102%]"
      } transition-all duration-300`}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={item.imageUrl}
          alt={item.location}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="filter brightness-90 group-hover:brightness-95 transition-all duration-300"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl">
        <p className="text-white text-xl font-semibold mb-2">{item.location}</p>
        <p className="text-white text-lg">
          {new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
          }).format(item.price)}
          {item.type === "rent" && (
            <span className="font-light ml-1">/month</span>
          )}
        </p>
      </div>
    </Link>
  );
}
