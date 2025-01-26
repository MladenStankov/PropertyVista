"use client";

import ChatComponent from "@/app/components/chats/ChatComponent";
import SidebarChatMenu from "@/app/components/chats/SidebarChatMenu";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const chatUuid = usePathname().split("/").pop();
  const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    autoConnect: false,
    withCredentials: true,
  });

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="flex h-[90%]">
      <SidebarChatMenu activeChatUuid={chatUuid} />
      <ChatComponent uuid={chatUuid} socket={socket} />
    </div>
  );
}
