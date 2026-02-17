"use client";

import { motion } from "framer-motion";

export default function ProcessingMascot() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Document Background */}
        <motion.rect
          x="60"
          y="50"
          width="80"
          height="100"
          rx="5"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        {/* Lines on Doc */}
        <line x1="75" y1="70" x2="125" y2="70" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        <line x1="75" y1="90" x2="125" y2="90" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
        <line x1="75" y1="110" x2="105" y2="110" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />

        {/* Magnifying Glass (The Detective) */}
        <motion.g
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, 10, 20, 10, 0],
            rotate: [0, 10, 0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Glass Handle */}
          <line x1="80" y1="120" x2="60" y2="140" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
          
          {/* Glass Rim */}
          <circle cx="95" cy="105" r="30" stroke="#3B82F6" strokeWidth="6" fill="#BFDBFE" fillOpacity="0.3" />
          
          {/* Glass Reflection */}
          <path d="M85 95 Q105 95 105 115" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </motion.g>

        {/* Loading Dots */}
        <motion.circle cx="160" cy="100" r="4" fill="#3B82F6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="175" cy="100" r="4" fill="#3B82F6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
        <motion.circle cx="190" cy="100" r="4" fill="#3B82F6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />

      </svg>
    </div>
  );
}
