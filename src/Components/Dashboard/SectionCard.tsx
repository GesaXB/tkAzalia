"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  );
}

