"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  href?: string;
  icon?: ReactNode;
  description?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

import { motion } from "framer-motion";

export default function StatCard({ title, value, href, icon, description, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "text-slate-600",
    success: "text-emerald-600",
    warning: "text-amber-600",
    danger: "text-rose-600",
  };

  const content = (
    <motion.div
      className="relative flex flex-col justify-between h-full p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <p className={`text-3xl font-black ${
            variant === 'success' ? 'text-emerald-600' : 
            variant === 'warning' ? 'text-amber-600' : 
            variant === 'danger' ? 'text-rose-600' : 
            'text-slate-900'
          }`}>{value}</p>
          {description && (
            <p className="text-[11px] text-slate-400 mt-2 font-medium leading-relaxed">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 ${variantStyles[variant]}`}>
            {icon}
          </div>
        )}
      </div>
      {href && (
        <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between group/link">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider group-hover/link:text-emerald-600 transition-colors">
            Lihat Detail
          </span>
          <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover/link:bg-emerald-50 group-hover/link:text-emerald-600 transition-all">
            →
          </div>
        </div>
      )}
    </motion.div>
  );

  if (href && !href.startsWith("#")) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}

