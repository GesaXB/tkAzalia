"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

import { motion } from "framer-motion";

export default function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </div>
      <div>{children}</div>
    </motion.section>
  );
}

