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
    <div className="h-full min-h-svh flex flex-col bg-white">
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
                  <svg
                    className="w-16 h-16 mb-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
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
                    <svg
                      className="w-16 h-16 mb-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
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
