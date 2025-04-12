import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiHome } from "react-icons/hi";

interface IProps {
  uuid: string;
  listingImageUrl: string;
  listingAddress: string;
  lastMessage: string;
  lastMessageBy: string;
  activeChatUuid?: string;
}

export default function HomeSeekingCard({
  uuid,
  listingImageUrl,
  listingAddress,
  lastMessage,
  lastMessageBy,
  activeChatUuid,
}: IProps) {
  return (
    <Link href={`/profile/chats/${uuid}`}>
      <div
        className={`flex items-center p-3 rounded-lg transition-all ${
          activeChatUuid === uuid
            ? "bg-blue-50 border border-blue-100"
            : "hover:bg-gray-50 border border-transparent"
        }`}
      >
        <div className="relative flex-shrink-0">
          {listingImageUrl ? (
            <Image
              src={listingImageUrl}
              alt="Property Image"
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <HiHome className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium text-gray-900 truncate max-w-[70%]">
              {listingAddress}
            </h3>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <p className="text-gray-600 truncate">
              <span className="font-medium mr-1">{lastMessageBy}:</span>
              {lastMessage}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
