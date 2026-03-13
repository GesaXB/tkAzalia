"use client";

import SectionCard from "@/Components/Dashboard/SectionCard";
import { AdminPpdbSiswa, KelasItem } from "@/lib/client/admin";
import {
  ChevronRight,
  Search
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

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
      description="Daftar lengkap calon siswa yang mendaftar melalui website."
    >
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, atau akun..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Year Filter */}
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="w-full sm:w-32 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
            >
              <option value="">Semua Tahun</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
            >
              <option value="">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="lulus">Lulus</option>
              <option value="tidak_lulus">Tidak Lulus</option>
            </select>

            {/* Kelas Filter */}
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700"
            >
              <option value="">Semua Kelas</option>
              {kelasList.map((k) => (
                <option key={k.kelas_id} value={k.kelas_id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Pendaftar</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Keterangan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.siswa_id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center font-black text-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300">
                            {(item.nama_anak || item.user.nama_lengkap || "?").charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                              {item.nama_anak || item.user.nama_lengkap}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {item.user.nama_lengkap}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-slate-600 font-bold text-[10px] flex items-center gap-2 uppercase tracking-tight">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.jenis_kelamin === 'P' ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
                            {item.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-Laki'}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {item.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                            (item.status_ppdb || "menunggu") === 'lulus' ? 'bg-emerald-50 text-emerald-700' :
                            (item.status_ppdb || "menunggu") === 'tidak_lulus' ? 'bg-rose-50 text-rose-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {item.status_ppdb || "menunggu"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider hover:bg-emerald-600 transition-all duration-300 active:scale-95 shadow-sm"
                        >
                          Detail
                          <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

