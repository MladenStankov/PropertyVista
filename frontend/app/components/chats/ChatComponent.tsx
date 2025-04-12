import { useRef, useEffect } from "react";
import getProfileData, { IUser } from "@/app/utils/getProfileData";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import React, { useState } from "react";
import { Socket } from "socket.io-client";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [profile, setProfileData] = useState<IUser | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getProfileData();
      setProfileData(data);
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!uuid) return;

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
    setIsLoading(true);
  }, [uuid]);

  useEffect(() => {
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
              currentUser: data.senderId === profile?.id,
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!uuid) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <h3 className="text-xl font-semibold mb-2">Select a chat</h3>
          <p className="text-sm">Choose a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {chatMessages?.map((chat, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  chat.currentUser ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center mb-1 space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={chat.userImage}
                      alt={chat.userFullName}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {chat.userFullName}
                  </span>
                </div>
                <div className="space-y-1 w-full sm:w-auto">
                  {chat.messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] break-words ${
                        chat.currentUser ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          chat.currentUser
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                          {message.message}
                        </p>
                        <span
                          className={`text-[11px] ${
                            chat.currentUser ? "text-blue-100" : "text-gray-500"
                          } block mt-1`}
                        >
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
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t py-3 px-2 sm:p-4">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
