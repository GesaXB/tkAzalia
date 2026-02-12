"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  href?: string;
  icon?: ReactNode;
  description?: string;
}

export default function StatCard({ title, value, href, icon, description }: StatCardProps) {
  const content = (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {href && (
        <span className="mt-4 inline-block text-sm font-medium text-[#01793B]">
          Lihat detail →
        </span>
      )}
    </div>
  );

  if (href && !href.startsWith("#")) {
    return <Link href={href} className="block">{content}</Link>;
  }
  return content;
}
