"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJadwalPpdb } from "@/lib/client/public";

function formatDateId(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Item({
  title,
  content,
  status,
  cta,
  dibuka,
}: {
  title: string;
  content: string;
  status: string | null;
  cta: string | null;
  dibuka?: boolean;
}) {
  return (
    <div className="flex-shrink-0 flex items-center gap-4 px-8 py-3 border-r border-white/20">
      <span className="text-xs font-medium uppercase tracking-wider opacity-90 whitespace-nowrap">
        {title}
      </span>
      <span className="font-bold text-base whitespace-nowrap">{content}</span>
      {status && (
        <span
          className={`px-3 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
            dibuka ? "bg-white/20" : "bg-amber-500/80"
          }`}
        >
          {status}
        </span>
      )}
      {cta && (
        <Link
          href="/auth/register"
          className="flex-shrink-0 inline-flex items-center gap-1 rounded-lg bg-white text-[#01793B] px-3 py-1.5 text-sm font-semibold hover:bg-gray-100 whitespace-nowrap"
        >
          {cta}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default function JadwalPpdbCarousel() {
  const [jadwal, setJadwal] = useState<{
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    dibuka: boolean;
  } | null>(null);

  useEffect(() => {
    getJadwalPpdb().then((res) => {
      if (res.success && res.data) setJadwal(res.data);
    });
  }, []);

  const items = jadwal
    ? [
        {
          title: "Jadwal PPDB",
          content: `${formatDateId(jadwal.tanggal_mulai)} — ${formatDateId(jadwal.tanggal_selesai)}`,
          status: jadwal.dibuka ? "Dibuka" : "Ditutup",
          cta: jadwal.dibuka ? "Daftar" : null,
          dibuka: jadwal.dibuka,
        },
        {
          title: "Syarat",
          content: "Usia 4–6 tahun • Akte • KK • Pas foto 3x4",
          status: null,
          cta: jadwal.dibuka ? "Daftar sekarang" : null,
          dibuka: jadwal.dibuka,
        },
      ]
    : [
        {
          title: "PPDB TK Azalia",
          content: "Jadwal pendaftaran akan segera diumumkan",
          status: "Menunggu",
          cta: null,
          dibuka: false,
        },
      ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#01793B] to-emerald-700 text-white py-3">
      <div className="flex animate-marquee">
        {[...items, ...items].map((s, i) => (
          <Item
            key={i}
            title={s.title}
            content={s.content}
            status={s.status}
            cta={s.cta}
            dibuka={s.dibuka}
          />
        ))}
      </div>
    </section>
  );
}
