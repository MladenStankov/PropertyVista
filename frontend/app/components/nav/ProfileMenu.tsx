import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { RxExit } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

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
      className="absolute bg-white divide-y-[1px] top-[68px] right-0 z-10 w-60 text-base shadow-2xl p-2
     grid grid-rows-4 rounded-sm text-gray-700"
    >
      <Link className="p-3 hover:bg-gray-100" href="/profile">
        <div className="flex items-center gap-2 hover:underline">
          <ImProfile />
          <span>Profile</span>
        </div>
      </Link>
      <Link className="p-3 hover:bg-gray-100" href="#">
        <div className="flex items-center gap-2 hover:underline">
          <PiBuildingApartmentBold />
          <span>Listings</span>
        </div>
      </Link>
      <Link className="p-3 hover:bg-gray-100" href="#">
        <div className="flex items-center gap-2 hover:underline">
          <FaHeart />
          <span>Favourite Listings</span>
        </div>
      </Link>
      <div
        className="flex items-center gap-2 p-3 self-center hover:bg-gray-100 text-red-500
       hover:text-red-600 cursor-pointer hover:underline"
        onClick={(e) => handleLogout(e)}
      >
        <RxExit />
        <span>Logout</span>
      </div>
    </div>
  );
}
