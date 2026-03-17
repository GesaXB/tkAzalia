"use client";

import { AdminPpdbSiswa, KelasItem } from "@/lib/client/admin";
import {
  ChevronRight,
  Search
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import SectionCard from "../SectionCard";

interface AdminDataPendaftarSectionProps {
  ppdbList: AdminPpdbSiswa[];
  kelasList: KelasItem[];
}

export default function AdminDataPendaftarSection({
  ppdbList,
  kelasList,
}: AdminDataPendaftarSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKelas, setFilterKelas] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterTahun, setFilterTahun] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableYears = useMemo(() => {
    const years = ppdbList.map((item) => {
      const date = new Date(item.user.created_at);
      return date.getFullYear().toString();
    });
    return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
  }, [ppdbList]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ppdbList
      .filter((item) => 
        (item.nama_anak || item.user.nama_lengkap || "").toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [ppdbList, searchQuery]);

  const filteredList = useMemo(() => {
    let list = ppdbList;
    const q = searchQuery.trim().toLowerCase();

    if (q) {
      list = list.filter((item) =>
        (item.nama_anak || item.user.nama_lengkap || "").toLowerCase().includes(q) ||
        (item.user.email || "").toLowerCase().includes(q) ||
        (item.user.no_telp || "").toLowerCase().includes(q)
      );
    }

    if (filterKelas) {
      list = list.filter((item) => String(item.kelas_id) === filterKelas);
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
  }, [ppdbList, searchQuery, filterKelas, filterStatus, filterTahun]);

  return (
    <SectionCard
      title="Daftar Pendaftar"
      description="Kelola data pendaftar dengan mudah dan cepat."
    >
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
          {/* Search with Suggestions */}
          <div className="relative flex-1" ref={suggestionRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Cari nama, email, atau akun..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden z-20">
                <div className="px-4 py-2 border-b border-slate-50 bg-slate-50/50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saran Pencarian</span>
                </div>
                {suggestions.map((s) => (
                  <button
                    key={s.siswa_id}
                    onClick={() => {
                      setSearchQuery(s.nama_anak || s.user.nama_lengkap);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors text-left group border-b border-slate-50 last:border-b-0"
                  >
                    <Search size={14} className="text-slate-300 group-hover:text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-emerald-700">
                        {s.nama_anak || s.user.nama_lengkap}
                       </p>
                    </div>
                    {s.kelas && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {s.kelas.nama}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-600"
            >
              <option value="">Semua Tahun</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-600"
            >
              <option value="">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="lulus">Lulus</option>
              <option value="tidak_lulus">Tidak Lulus</option>
            </select>

            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-600"
            >
              <option value="">Semua Kelas</option>
              {kelasList.map((k) => (
                <option key={k.kelas_id} value={k.kelas_id}>{k.nama}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[800px] lg:min-w-0">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pendaftar</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:table-cell">Kontak</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kelas</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center min-w-[120px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400 italic font-medium">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                  filteredList.map((item) => (
                    <tr key={item.siswa_id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 shrink-0 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-black text-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300 ring-1 ring-slate-100 group-hover:ring-emerald-100">
                            {(item.nama_anak || item.user.nama_lengkap || "?").charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                              {item.nama_anak || item.user.nama_lengkap}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5 tracking-wide">
                              ID: #{item.siswa_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 hidden sm:table-cell">
                        <div className="space-y-1">
                          <p className="text-[11px] text-slate-700 font-bold uppercase tracking-tight">
                            {item.user.nama_lengkap}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium truncate">
                            {item.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        {item.kelas ? (
                          <span className="inline-flex px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest ring-1 ring-slate-200/50">
                            {item.kelas.nama}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                            Belum diisi
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                          (item.status_ppdb || "menunggu") === 'lulus' ? 'bg-emerald-50 text-emerald-600' :
                          (item.status_ppdb || "menunggu") === 'tidak_lulus' ? 'bg-rose-50 text-rose-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {item.status_ppdb || "menunggu"}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <Link
                          href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-md shadow-slate-200 hover:shadow-emerald-200"
                        >
                          Detail
                          <ChevronRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}
