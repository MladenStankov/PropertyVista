import { FC } from "react";
import Image from "next/image";
import { ProfileListings } from "../../profile/favourite-listings/page";
import { motion } from "framer-motion";
import { FaRegHeart, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

interface ProfileFavouriteListingProps {
  listing: ProfileListings;
  handleUnfavourite: (uuid: string) => void;
}

const ProfileFavouriteListing: FC<ProfileFavouriteListingProps> = ({
  listing,
  handleUnfavourite,
}) => {
  return (
    <div
      className="group bg-white/50 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg 
      transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/listings/${listing.uuid}`}
          className="sm:w-48 h-48 sm:h-36 relative rounded-xl overflow-hidden"
        >
          <Image
            src={listing.imageUrl}
            alt="Property"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <Link href={`/listings/${listing.uuid}`}>
                <h3
                  className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 
                  transition-colors duration-200"
                >
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </h3>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 
                  transition-colors duration-200"
                onClick={() => handleUnfavourite(listing.uuid)}
              >
                <MdDeleteOutline size={20} />
              </motion.button>
            </div>

            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${listing.price.toLocaleString()}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-500">
                <FaEye className="text-blue-500" />
                <span>{listing.views} views</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaRegHeart className="text-pink-500" />
                <span>{listing.favourites} favourites</span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-gray-500">
              Added on {new Date(listing.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFavouriteListing;
