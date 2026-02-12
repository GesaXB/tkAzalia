"use client";

import SectionCard from "../SectionCard";

interface SiswaStatusSectionProps {
  status: { status_ppdb: string; catatan_ppdb: string | null } | null;
}

export default function SiswaStatusSection({ status }: SiswaStatusSectionProps) {
  return (
    <SectionCard title="Status PPDB" description="Pantau status pendaftaran Anda.">
      {status ? (
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">
              {status.status_ppdb}
            </span>
          </div>
          <div className="text-gray-500">
            Catatan: {status.catatan_ppdb || "Belum ada catatan."}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Status belum tersedia.</p>
      )}
    </SectionCard>
  );
}

