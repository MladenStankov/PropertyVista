import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GoogleButtonProps {
  text: string;
}

export default function GoogleButton({ text }: GoogleButtonProps) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`} passHref>
      <button
        type="button"
        className="w-full border border-gray-400 p-2 rounded-md flex items-center justify-center hover:bg-gray-100"
      >
        <Image
          src="https://img.icons8.com/color/24/000000/google-logo.png"
          alt="Google logo"
          width={24}
          height={24}
          className="mr-2"
        />
        {text}
      </button>
    </Link>
  );
}
