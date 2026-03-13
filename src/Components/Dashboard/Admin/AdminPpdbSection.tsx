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
  const [filterTahun, setFilterTahun] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Extract unique years from registrations
  const availableYears = useMemo(() => {
    const years = ppdbList.map((item) => {
      const date = new Date(item.user.created_at);
      return date.getFullYear().toString();
    });
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  }, [ppdbList]);

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
    
    if (filterTahun) {
      list = list.filter((item) => {
        const year = new Date(item.user.created_at).getFullYear().toString();
        return year === filterTahun;
      });
    }
    
    return list;
  }, [ppdbList, searchQuery, filterStatus, filterTahun]);

  // Handle Search Suggestion Click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <SectionCard
      title="Penerimaan PPDB"
      description="Lihat berkas calon siswa dan beri keputusan lulus / tidak lulus. Klik peserta untuk melihat file dan memutuskan."
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 relative">
          <div className="relative flex-1 min-w-0" onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Cari nama, email, no. telepon..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-400"
            />
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                {filteredList.length > 0 ? (
                  <ul className="divide-y divide-slate-100">
                    {filteredList.slice(0, 5).map((item) => (
                      <li key={item.siswa_id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(item.user.nama_lengkap)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex flex-col"
                        >
                          <span className="text-sm font-bold text-slate-900">{item.user.nama_lengkap}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{item.user.email}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500 italic">Tidak ada saran ditemukan</div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            {/* Year Filter */}
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="flex-1 sm:w-32 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
            >
              <option value="">Semua Tahun</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:w-40 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
            >
              <option value="">Semua status</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </select>
          </div>
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
                  className="group relative flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 transition-colors group-hover:bg-emerald-50 ${
                        currentStatus === 'lulus' ? 'text-emerald-600' :
                        currentStatus === 'tidak_lulus' ? 'text-rose-600' :
                        'text-amber-500'
                      }`}>
                        <StatusIcon status={currentStatus} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                          {item.user.nama_lengkap}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate font-medium">{item.user.email}</p>
                      </div>
                    </div>
                    {item.kelas && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-slate-100 text-slate-600 uppercase tracking-wider">
                          {item.kelas.nama}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <FileCheck size={12} className="text-emerald-500" />
                          {item.berkas.length} Berkas
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                    className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-all duration-300 uppercase tracking-wider shadow-sm active:scale-95 shrink-0"
                  >
                    Profil
                    <ChevronRight size={14} />
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

