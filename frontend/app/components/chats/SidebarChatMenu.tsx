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
          console.error("Failed to fetch chats");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex text-sm sm:text-base lg:text-lg border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => setCurrentChatType(CurrentChatType.HomeSeeking)}
          className={`flex-1 px-4 py-3 font-medium transition-all duration-200 ${
            currentChatType === CurrentChatType.HomeSeeking
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Property Chats
        </button>
        <button
          onClick={() => setCurrentChatType(CurrentChatType.Broker)}
          className={`flex-1 px-4 py-3 font-medium transition-all duration-200 ${
            currentChatType === CurrentChatType.Broker
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Broker Chats
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading forNav={true} />
          </div>
        ) : (
          <div key={currentChatType} className="p-2 space-y-2">
            {currentChatType === CurrentChatType.Broker ? (
              chats?.brokerChats?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-500 px-4">
                  <p className="text-center font-medium mb-2">
                    No broker chats yet
                  </p>
                  <p className="text-sm text-center text-gray-400">
                    Start browsing listings to connect with brokers
                  </p>
                </div>
              ) : (
                chats?.brokerChats?.map((chat) => (
                  <div key={chat.uuid}>
                    <BrokerChatCard {...chat} activeChatUuid={activeChatUuid} />
                  </div>
                ))
              )
            ) : (
              <>
                {chats?.homeSeekingChats?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-500 px-4">
                    <p className="text-center font-medium mb-2">
                      No property chats yet
                    </p>
                    <p className="text-sm text-center text-gray-400">
                      Your property related chats will appear here
                    </p>
                  </div>
                ) : (
                  chats?.homeSeekingChats?.map((chat) => (
                    <div key={chat.uuid}>
                      <HomeSeekingCard
                        {...chat}
                        activeChatUuid={activeChatUuid}
                      />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
