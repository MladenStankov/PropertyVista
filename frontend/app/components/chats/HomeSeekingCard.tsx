import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowRedoOutline } from "react-icons/io5";

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
  listingAddress,
  listingImageUrl,
  lastMessage,
  lastMessageBy,
  activeChatUuid,
}: IProps) {
  return (
    <Link
      href={`/profile/chats/${uuid}`}
      className={`w-full flex group hover:bg-gray-200 transition-colors duration-200 p-2 rounded-lg justify-start items-center ${
        activeChatUuid === uuid ? "bg-gray-200" : ""
      }`}
    >
      <div className="overflow-hidden rounded-full w-16 h-16">
        <Image
          src={listingImageUrl}
          alt="Listing Image"
          width={360}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pl-2 self-center">
        <p className="text-sm italic">{listingAddress}</p>
        <div className="flex text-lg items-center">
          <h2 className="font-medium">{lastMessageBy}</h2>
          <IoArrowRedoOutline className="mx-1 text-blue-700" />
          <p className="font-light">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}
