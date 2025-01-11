"use client";

import ChatsSideBarWithMainContent from "@/app/components/chats/ChatsSideBarWithMainContent";
import React from "react";

export default function ChatsHome() {
  return (
    <ChatsSideBarWithMainContent>
      <div className="flex-1 flex justify-center items-center bg-white">
        <p className="text-gray-500 text-2xl font-medium">Start chatting!</p>
      </div>
    </ChatsSideBarWithMainContent>
  );
}
