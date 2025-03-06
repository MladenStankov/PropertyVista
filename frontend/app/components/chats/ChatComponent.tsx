import getProfileData, { IUser } from "@/app/utils/getProfileData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getCookie } from "@/app/utils/authUtils";

export interface ChatMessagesDto {
  userFullName: string;
  userImage: string;
  currentUser: boolean;
  senderId: number;
  messages: Message[];
}

export interface Message {
  message: string;
  createdAt: Date;
}

export interface MessageResponse {
  message: string;
  createdAt: Date;
  senderId: number;
  userFullName: string;
  userImage: string;
  chatUuid: string;
}

interface IProps {
  uuid?: string;
  socket: Socket;
}

export default function ChatComponent({ uuid, socket }: IProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessagesDto[] | null>(
    null
  );
  const [, /*isLoading*/ setIsLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [profile, setProfileData] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getProfileData();
      setProfileData(data);
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetch(
          `${String(process.env.NEXT_PUBLIC_API_URL)}/chats/${uuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChatMessages(data);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch chat messages");
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [uuid]);

  useEffect(() => {
    // Connect to WebSocket with auth token from cookie
    const token = getCookie("access_token");
    if (token) {
      socket.auth = { token };
    }
    socket.connect();

    const handleReceiveMessage = (data: MessageResponse) => {
      setChatMessages((prevChatMessages) => {
        if (!prevChatMessages) {
          return [
            {
              userFullName: data.userFullName,
              userImage: data.userImage,
              currentUser: data.senderId === profile?.id,
              senderId: data.senderId,
              messages: [{ message: data.message, createdAt: data.createdAt }],
            },
          ];
        }

        const lastChat = prevChatMessages[prevChatMessages.length - 1];

        if (lastChat && lastChat.senderId === data.senderId) {
          const updatedChatMessages = [...prevChatMessages];
          updatedChatMessages[updatedChatMessages.length - 1].messages.push({
            message: data.message,
            createdAt: data.createdAt,
          });
          return updatedChatMessages;
        } else {
          return [
            ...prevChatMessages,
            {
              userFullName: data.userFullName,
              userImage: data.userImage,
              currentUser: !lastChat.currentUser,
              senderId: data.senderId,
              messages: [{ message: data.message, createdAt: data.createdAt }],
            },
          ];
        }
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, profile]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      chatUuid: uuid,
      message: newMessage,
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className="overflow-y-scroll bg-gray-100 rounded-lg shadow-lg h-[85%]">
        {chatMessages?.map((chat, index) => (
          <div key={index} className="p-4">
            <div
              className={`flex items-start ${
                chat.currentUser ? "flex-row-reverse" : "flex-row"
              } gap-4 mb-2`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mt-8">
                <Image
                  src={chat.userImage}
                  alt={chat.userFullName}
                  width={200}
                  height={200}
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 mb-1">
                  {chat.userFullName}
                </span>
                {chat.messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex mb-2 ${
                      chat.currentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg shadow-md ${
                        chat.currentUser
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <p>{message.message}</p>
                      <span className="block text-xs italic mt-1">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
