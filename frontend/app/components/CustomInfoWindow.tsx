import Link from "next/link";
import { IMapListing } from "../map/page";

interface CustomInfoWindowProps {
  listing: IMapListing;
}

export default function CustomInfoWindow({ listing }: CustomInfoWindowProps) {
  const formattedPrice = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(listing.price);

  return (
    <div className="w-64 flex flex-col items-center bg-white shadow-lg rounded-lg">
      <Link href={`/listings/${listing.uuid}`}>
        <div className="relative mb-4 aspect-video">
          <img
            className="w-full h-full object-cover rounded-md hover:shadow-xl"
            src={listing.imageUrl}
            alt={`Listing ${listing.uuid}`}
          />
          <div className="text-blue-500 font-bold text-lg mt-2 text-center">
            {listing.type === "rent"
              ? `${formattedPrice}/month`
              : formattedPrice}
          </div>
        </div>
      </Link>
    </div>
  );
}
