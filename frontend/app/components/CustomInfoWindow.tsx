import Link from "next/link";
import { IMapListing } from "../map/page";
import Image from "next/image";

interface CustomInfoWindowProps {
  listing: IMapListing;
  onClose: () => void;
}

export default function CustomInfoWindow({
  listing,
  onClose,
}: CustomInfoWindowProps) {
  const formattedPrice = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(listing.price);

  return (
    <div className="relative w-64 flex flex-col items-center bg-white shadow-lg rounded-lg">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
      >
        ✕
      </button>
      <Link href={`/listings/${listing.uuid}`}>
        <div className="relative mb-4 aspect-video">
          <Image
            className="w-full h-full object-cover rounded-md hover:shadow-xl"
            src={listing.imageUrl}
            alt={`Listing ${listing.uuid}`}
            width={640}
            height={360}
            layout="responsive"
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
