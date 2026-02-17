"use client";

import { motion } from "framer-motion";

export default function RejectMascot() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="100" cy="100" r="80" fill="#FFE4E6" opacity="0.5" />

        {/* Bear Head */}
        <motion.path
          d="M60 70C60 40 140 40 140 70V120C140 150 60 150 60 120V70Z"
          fill="#F43F5E" // Rose-500
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />

        {/* Ears */}
        <circle cx="50" cy="50" r="15" fill="#F43F5E" />
        <circle cx="150" cy="50" r="15" fill="#F43F5E" />

        {/* Eyes (Calm/Closed) */}
        <motion.path
          d="M80 90 Q90 95 100 90" // Winking/Happy closed eye
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
           d="M110 85 L130 85" // Flat calm eye
           stroke="white"
           strokeWidth="4"
           strokeLinecap="round"
        />

        {/* Snout */}
        <ellipse cx="100" cy="110" rx="25" ry="15" fill="#FECDD3" />
        <circle cx="100" cy="105" r="5" fill="#881337" />

        {/* Arms (Hugging) */}
        <motion.path
          d="M50 120 Q30 140 60 150"
          stroke="#F43F5E"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          initial={{ d: "M50 120 Q30 140 60 150" }}
          animate={{ d: "M50 120 Q20 110 50 100" }} // Wave
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
        />
        
        {/* Heart */}
        <motion.path
          d="M130 130 C130 130 140 120 150 130 C160 140 150 150 140 160 L130 170" // Simplified heart
          fill="#FFB3B3"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0], y: -20 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
