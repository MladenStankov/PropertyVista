import SidebarChatMenu from "@/app/components/chats/SidebarChatMenu";
import React from "react";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

export default function Chats() {
  return (
    <ProtectedRoute>
      <div>
        <SidebarChatMenu />
      </div>
    </ProtectedRoute>
  );
}
