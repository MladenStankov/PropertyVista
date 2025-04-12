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
        className={`flex items-center p-3 rounded-lg transition-all ${
          activeChatUuid === uuid
            ? "bg-blue-50 border border-blue-100"
            : "hover:bg-gray-50 border border-transparent"
        }`}
      >
        <div className="relative flex-shrink-0">
          {homeSeekerImage ? (
            <Image
              src={homeSeekerImage}
              alt={homeSeekerFullName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <BsPersonCircle className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium text-gray-900 truncate">
              {homeSeekerFullName}
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
