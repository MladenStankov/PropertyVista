"use client";

import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import BrokerChatCard from "./BrokerChatCard";
import HomeSeekingCard from "./HomeSeekingCard";

export class ChatDto {
  brokerChats?: IBrokerChat[];
  homeSeekingChats?: IHomeSeekingChat[];
}

export interface IBrokerChat {
  uuid: string;
  homeSeekerImage: string;
  homeSeekerFullName: string;
  lastMessage: string;
  lastMessageBy: string;
}

export interface IHomeSeekingChat {
  uuid: string;
  listingImageUrl: string;
  listingAddress: string;
  lastMessage: string;
  lastMessageBy: string;
}

enum CurrentChatType {
  Broker,
  HomeSeeking,
}

interface IProps {
  activeChatUuid?: string;
}

export default function SidebarChatMenu({ activeChatUuid }: IProps) {
  const [chats, setChats] = useState<ChatDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentChatType, setCurrentChatType] = useState<CurrentChatType>(
    CurrentChatType.HomeSeeking
  );

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `${String(process.env.NEXT_PUBLIC_API_URL)}/chats`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChats(data);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch chats:");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="border-r-2 h-screen w-full sm:w-80 lg:w-96">
      <div className="flex text-sm sm:text-base lg:text-lg justify-around border-b-2 font-medium">
        <button
          onClick={() => setCurrentChatType(CurrentChatType.HomeSeeking)}
          className={`p-1 hover:cursor-pointer hover:bg-gray-200 w-full ${
            currentChatType === CurrentChatType.HomeSeeking ? "bg-gray-100" : ""
          }`}
        >
          Property Seeking Chats
        </button>
        <button
          onClick={() => setCurrentChatType(CurrentChatType.Broker)}
          className={`p-2 hover:cursor-pointer hover:bg-gray-200 w-full ${
            currentChatType === CurrentChatType.Broker ? "bg-gray-100" : ""
          }`}
        >
          Broker Chats
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 divide-y-2 p-2 overflow-y-auto">
        {isLoading ? (
          <Loading forNav={true} />
        ) : (
          <>
            {currentChatType === CurrentChatType.Broker ? (
              chats?.brokerChats?.length === 0 ? (
                <p className="text-center text-sm p-2">No broker chats yet</p>
              ) : (
                chats?.brokerChats?.map((chat) => (
                  <BrokerChatCard
                    key={chat.uuid}
                    {...chat}
                    activeChatUuid={activeChatUuid}
                  />
                ))
              )
            ) : currentChatType === CurrentChatType.HomeSeeking ? (
              chats?.homeSeekingChats?.length === 0 ? (
                <p className="text-center text-sm p-2">
                  No property seeking chats yet
                </p>
              ) : (
                chats?.homeSeekingChats?.map((chat) => (
                  <HomeSeekingCard
                    key={chat.uuid}
                    {...chat}
                    activeChatUuid={activeChatUuid}
                  />
                ))
              )
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
