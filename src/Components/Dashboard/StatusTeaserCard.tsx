"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";

interface StatusTeaserCardProps {
  href: string;
}

export default function StatusTeaserCard({ href }: StatusTeaserCardProps) {
  return (
    <Link href={href} className="block group">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -2,
          boxShadow: "0 10px 15px -3px rgb(16 185 129 / 0.2)",
          borderColor: "rgb(16 185 129 / 0.5)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <p className="text-sm font-medium text-emerald-700/80 uppercase tracking-wide">Pengumuman</p>
            <h3 className="text-xl font-bold text-emerald-900 mt-1">
              Hasil Tersedia
            </h3>
            <p className="text-xs text-emerald-800/70 mt-1 font-medium">
              Ketuk untuk membuka amplop 📩
            </p>
          </div>

          <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center ring-4 ring-emerald-50/50">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <Mail className="w-6 h-6 fill-emerald-200" />
            </motion.div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700">
          <span>Buka Sekarang</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
