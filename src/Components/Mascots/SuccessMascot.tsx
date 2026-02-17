"use client";

import { motion } from "framer-motion";

export default function SuccessMascot() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Burst */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="#10B981"
          opacity="0.2"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Robot Head */}
        <motion.rect
          x="60"
          y="60"
          width="80"
          height="70"
          rx="15"
          fill="#10B981" // Emerald-500
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />

        {/* Eyes (Happy Curves) */}
        <motion.path
          d="M75 90 Q85 80 95 90"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.path
          d="M105 90 Q115 80 125 90"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Smile */}
        <motion.path
          d="M80 110 Q100 130 120 110"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />

        {/* Antenna */}
        <motion.line
          x1="100"
          y1="60"
          x2="100"
          y2="40"
          stroke="#059669" // Emerald-600
          strokeWidth="4"
          transform="translate(0, 0)"
        />
        <motion.circle
          cx="100"
          cy="35"
          r="6"
          fill="#F59E0B" // Amber-500
          animate={{ fill: ["#F59E0B", "#FCD34D", "#F59E0B"] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Confetti Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r="3"
            fill={["#F472B6", "#60A5FA", "#FBBF24"][i % 3]}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 150,
              y: (Math.random() - 0.5) * 150,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 1,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
