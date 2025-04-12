"use client";

import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import ChatComponent from "@/app/components/chats/ChatComponent";
import SidebarChatMenu from "@/app/components/chats/SidebarChatMenu";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HiMenuAlt2 } from "react-icons/hi";

export default function Chat() {
  const chatUuid = usePathname().split("/").pop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // Close sidebar by default on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-full max-h-[calc(100vh-64px)] overflow-hidden">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-16 left-2 z-50 p-2 bg-white rounded-lg shadow-lg text-gray-600 hover:bg-gray-50"
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt2 className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-40 w-full md:w-1/3 lg:w-1/4 h-full flex-shrink-0 border-r border-gray-200 bg-white`}
        >
          <SidebarChatMenu activeChatUuid={chatUuid} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main chat area */}
        <div className="flex-1 relative w-full">
          <ChatComponent uuid={chatUuid} socket={socket} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
