import { FC } from "react";
import Image from "next/image";
import { ProfileListings } from "../../profile/listings/page";
import { motion } from "framer-motion";
import { FaRegHeart, FaEye } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Link from "next/link";

interface ProfileListingProps {
  listing: ProfileListings;
  handleDelete: (uuid: string) => void;
}

const ProfileListing: FC<ProfileListingProps> = ({ listing, handleDelete }) => {
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <div className="flex gap-2">
                <Link href={`/profile/listings/edit/${listing.uuid}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 
                      transition-colors duration-200"
                  >
                    <MdEdit size={20} />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 
                    transition-colors duration-200"
                  onClick={() => handleDelete(listing.uuid)}
                >
                  <MdDeleteOutline size={20} />
                </motion.button>
              </div>
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
              Listed on {new Date(listing.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileListing;
