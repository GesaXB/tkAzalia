"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getJadwalPpdb } from "@/lib/client/public";

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

export default function PpdbCountdown() {
  const [countdown, setCountdown] = useState<CountdownData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const res = await getJadwalPpdb();
        if (!res.success || !res.data) {
          setError("Jadwal PPDB belum diatur");
          return;
        }
        const jadwal = res.data;
        calculateCountdown(jadwal.tanggal_selesai);
      } catch (err) {
        setError("Gagal memuat jadwal");
      }
    };

    const calculateCountdown = (endDateString: string) => {
      const end = new Date(endDateString).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          ended: true,
        });
        setError(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        ended: false,
      });
      setError(null);
    };

    fetchJadwal();

    const interval = setInterval(() => {
      const getEndDate = async () => {
        const res = await getJadwalPpdb();
        if (res.success && res.data) {
          calculateCountdown(res.data.tanggal_selesai);
        }
      };
      getEndDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return null;
  }

  if (!countdown) {
    return null;
  }

  if (countdown.ended) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700">
        <Clock className="w-4 h-4" />
        <span className="text-xs font-semibold">Periode PPDB Berakhir</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
      <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
        {countdown.days > 0 && <span>{countdown.days}h</span>}
        {countdown.days > 0 && <span className="text-amber-300">·</span>}
        <span>{countdown.hours}j</span>
        <span className="text-amber-300">·</span>
        <span>{countdown.minutes}m</span>
        {/* Remove seconds to reduce frequent updates */}
        <span className="text-amber-700 font-normal ml-1">tersisa</span>
      </div>
    </div>
  );
}
