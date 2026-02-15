"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdminPpdbSiswa } from "@/lib/client/admin";
import SectionCard from "../SectionCard";
import { Search, FileCheck, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";

interface AdminPpdbSectionProps {
  ppdbList: AdminPpdbSiswa[];
  statusOptions: string[];
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    menunggu: "Menunggu",
    lulus: "Lulus",
    tidak_lulus: "Tidak Lulus",
  };
  return map[s] ?? s;
}

function StatusIcon({ status }: { status: string }) {
  if (status === "lulus") return <CheckCircle size={18} className="text-emerald-600 shrink-0" />;
  if (status === "tidak_lulus") return <XCircle size={18} className="text-red-600 shrink-0" />;
  return <Clock size={18} className="text-amber-500 shrink-0" />;
}

export default function AdminPpdbSection({
  ppdbList,
  statusOptions,
}: AdminPpdbSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredList = useMemo(() => {
    let list = ppdbList;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.user.nama_lengkap.toLowerCase().includes(q) ||
          item.user.email.toLowerCase().includes(q) ||
          (item.user.no_telp || "").toLowerCase().includes(q)
      );
    }
    if (filterStatus) {
      list = list.filter((item) => (item.status_ppdb || "menunggu") === filterStatus);
    }
    return list;
  }, [ppdbList, searchQuery, filterStatus]);

  return (
    <SectionCard
      title="Penerimaan PPDB"
      description="Lihat berkas calon siswa dan beri keputusan lulus / tidak lulus. Klik peserta untuk melihat file dan memutuskan."
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, no. telepon..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white w-full sm:w-auto focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
          >
            <option value="">Semua status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {statusLabel(s)}
              </option>
            ))}
          </select>
        </div>

        {filteredList.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500">
              {ppdbList.length === 0
                ? "Belum ada data PPDB."
                : "Tidak ada peserta yang cocok dengan filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredList.map((item) => {
              const currentStatus = item.status_ppdb || "menunggu";
              return (
                <div
                  key={item.siswa_id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-[#01793B]/20 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={currentStatus} />
                      <p className="font-semibold text-gray-900 truncate">{item.user.nama_lengkap}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.user.email}</p>
                    {item.kelas && (
                      <p className="text-xs text-[#01793B] mt-0.5">{item.kelas.nama}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <FileCheck size={14} />
                      {item.berkas.length} berkas
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shrink-0"
                  >
                    Lihat & putuskan
                    <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
