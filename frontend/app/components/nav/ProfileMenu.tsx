import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { RxExit } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";

interface IProfileMenu {
  setIsProfileMenuVisible: (value: boolean) => void;
}

export default function ProfileMenu({ setIsProfileMenuVisible }: IProfileMenu) {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await fetch(
      `${String(process.env.NEXT_PUBLIC_API_URL)}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const distX = Math.max(rect.left - mouseX, mouseX - rect.right, 0);
        const distY = Math.max(rect.top - mouseY, mouseY - rect.bottom, 0);
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        if (distance > 50) {
          setIsProfileMenuVisible(false);
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setIsProfileMenuVisible]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-white top-[68px] right-0 z-20 w-60 rounded-xl shadow-lg divide-y divide-gray-100 overflow-hidden"
    >
      <div className="p-2 space-y-1">
        <Link
          href="/profile"
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <ImProfile className="text-gray-500" />
          <span>Profile</span>
        </Link>
        <Link
          href="/profile/chats"
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <TiMessages className="text-gray-500" />
          <span>Chats</span>
        </Link>
        <Link
          href="/profile/listings"
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <PiBuildingApartmentBold className="text-gray-500" />
          <span>Listings</span>
        </Link>
        <Link
          href="/profile/favourite-listings"
          className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <FaHeart className="text-gray-500" />
          <span>Favourite Listings</span>
        </Link>
      </div>
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 w-full text-left text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <RxExit />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
