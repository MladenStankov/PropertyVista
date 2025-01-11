"use client";

import ChatMain from "@/app/components/chats/ChatMain";
import ChatsSideBarWithMainContent from "@/app/components/chats/ChatsSideBarWithMainContent";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    autoConnect: false,
    withCredentials: true,
  });

  const userId = usePathname().split("/").pop();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatsSideBarWithMainContent userId={Number(userId)}>
      <div className="flex-1 flex justify-center items-center bg-white">
        <ChatMain userId={Number(userId)} socket={socket} />
      </div>
    </ChatsSideBarWithMainContent>
  );
}
