import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import React from "react";

interface GoogleButtonProps {
  text: string;
}

export default function GoogleButton({ text }: GoogleButtonProps) {
  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 
        bg-white hover:bg-gray-50 transition-all duration-200 text-gray-600 font-medium shadow-sm hover:shadow-md"
    >
      <FcGoogle className="text-2xl" />
      <span>{text}</span>
    </motion.button>
  );
}
