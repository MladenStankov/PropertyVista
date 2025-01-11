"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { Socket } from "socket.io-client";
import Loading from "../Loading";

interface ChatMainProps {
  userId: number;
  socket: Socket;
}

export enum MessageType {
  RIGHT = "right",
  LEFT = "left",
}

interface IMessage {
  messageType: MessageType;
  message: string;
  createdAt: Date;
}

export default function ChatMain({ userId, socket }: ChatMainProps) {
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats/history/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chats.");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChats();
  }, [userId]);

  useEffect(() => {
    const handleMessage = (data: IMessage) => {
      setMessages((prev) => (prev ? [...prev, data] : [data]));
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: IMessage = {
      messageType: MessageType.RIGHT,
      message: newMessage,
      createdAt: new Date(),
    };

    setMessages((prev) => (prev ? [...prev, message] : [message]));

    socket.emit("sendMessage", {
      receiverId: userId,
      message: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-10">
      <div className="overflow-y-scroll h-[70vh] sm:h-[80vh]">
        {messages ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${
                message.messageType === MessageType.RIGHT
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.messageType === MessageType.RIGHT
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } p-2 rounded-md m-2 max-w-[70%] sm:max-w-[60%] lg:max-w-[40%] text-lg break-words`}
              >
                <div className="text-xs text-white font-light mb-1">
                  {new Date(message.createdAt).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                {message.message}
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div className="flex items-center mt-2 px-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}
