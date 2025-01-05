import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChatCTA() {
  return (
    <section className="bg-gray-200 h-auto flex flex-col md:flex-row justify-around px-6 py-10 w-full overflow-hidden gap-10 md:gap-20">
      <div className="flex justify-center md:w-1/2 max-w-[500px] w-full">
        <Image
          src="/home/chat-cta.png"
          alt="Accounts"
          width={500}
          height={500}
          className="h-auto w-full max-w-[350px] md:max-w-[500px] object-contain"
        />
      </div>
      <div className="flex flex-col gap-5 w-full md:w-1/2 self-center max-w-full">
        <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center text-slate-600">
          Communicate with others
        </h3>
        <p className="font-light text-xl sm:text-2xl md:text-3xl text-center">
          Connect with people, using our in-app chat system.
        </p>
        <Link href="/profile/chats" className="self-center">
          <button
            className="border-blue-500 bg-blue-500 px-6 py-3 md:px-8 md:py-4 border-2 rounded-full
           text-white text-xl sm:text-2xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Check your chats
          </button>
        </Link>
      </div>
    </section>
  );
}
