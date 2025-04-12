import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";

interface IProps {
  uuid: string;
  homeSeekerImage: string;
  homeSeekerFullName: string;
  lastMessage: string;
  lastMessageBy: string;
  activeChatUuid?: string;
}

export default function BrokerChatCard({
  uuid,
  homeSeekerImage,
  homeSeekerFullName,
  lastMessage,
  lastMessageBy,
  activeChatUuid,
}: IProps) {
  return (
    <Link href={`/profile/chats/${uuid}`}>
      <div
        className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
          activeChatUuid === uuid
            ? "bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 shadow-md"
            : "hover:bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
        }`}
      >
        <div className="relative flex-shrink-0">
          {homeSeekerImage ? (
            <div className="relative">
              <Image
                src={homeSeekerImage}
                alt={homeSeekerFullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-gray-100"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-2 ring-offset-2 ring-gray-100">
              <BsPersonCircle className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="ml-4 flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold text-gray-900 truncate max-w-[70%]">
              {homeSeekerFullName}
            </h3>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center text-sm mt-1">
            <p className="text-gray-600 truncate">
              <span className="font-medium mr-1 text-gray-700">
                {lastMessageBy}:
              </span>
              <span className="text-gray-500">{lastMessage}</span>
            </p>
          </div>
        </div>

        {activeChatUuid === uuid && (
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ml-2 animate-pulse"></div>
        )}
      </div>
    </Link>
  );
}
