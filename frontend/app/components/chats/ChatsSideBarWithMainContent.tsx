import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";

interface IChatWithUsers {
  userId: number;
  userName: string;
  userImage: string;
}

interface ChatsSideBarWithMainContentProps {
  children: React.ReactNode;
  userId?: number;
}

export default function ChatsSideBarWithMainContent({
  children,
  userId,
}: ChatsSideBarWithMainContentProps) {
  const [chats, setChats] = useState<IChatWithUsers[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chats.");
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChats();
  }, []);

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className="w-1/4 lg:w-1/5 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        {isLoading ? (
          <Loading />
        ) : chats && chats.length > 0 ? (
          <ul>
            {chats.map((chat, index) => (
              <Link
                href={`/profile/chats/${chat.userId}`}
                key={index}
                className={`flex items-center mb-2 gap-4 p-4 rounded-md hover:bg-gray-200 transition hover:cursor-pointer ${
                  userId === chat.userId ? "bg-gray-200" : ""
                }`}
              >
                <div className="rounded-full overflow-hidden -my-2 cursor-pointer hover:scale-105 transition-all duration-300 w-12 h-12">
                  <Image
                    src={chat.userImage || "/default-avatar.png"}
                    alt={`${chat.userName}'s avatar`}
                    width={170}
                    height={170}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-lg font-medium">{chat.userName}</span>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chats available.</p>
        )}
      </div>

      {/* Main Chat Content */}
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}
