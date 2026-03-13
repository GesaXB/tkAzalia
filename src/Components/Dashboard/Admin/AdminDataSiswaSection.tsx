"use client";

import { AdminPpdbSiswa, KelasItem } from "@/lib/client/admin";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import SectionCard from "../SectionCard";

interface AdminDataSiswaSectionProps {
  ppdbList: AdminPpdbSiswa[];
  kelasList: KelasItem[];
}

export default function AdminDataSiswaSection({
  ppdbList,
  kelasList,
}: AdminDataSiswaSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKelas, setFilterKelas] = useState<string>("");

  const filteredList = useMemo(() => {
    let list = ppdbList;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          (item.nama_anak || "").toLowerCase().includes(q) ||
          (item.user.nama_lengkap).toLowerCase().includes(q) ||
          (item.user.email).toLowerCase().includes(q)
      );
    }
    if (filterKelas) {
      list = list.filter((item) => String(item.kelas_id) === filterKelas);
    }
    return list;
  }, [ppdbList, searchQuery, filterKelas]);

  return (
    <SectionCard
      title="Data Calon Siswa"
      description="Daftar lengkap informasi pribadi calon siswa yang mendaftar."
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama anak atau orang tua..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
            />
          </div>
          <select
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white w-full sm:w-auto focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
          >
            <option value="">Semua kelas</option>
            {kelasList.map((k) => (
              <option key={k.kelas_id} value={k.kelas_id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Peserta</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">TTL</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider">Kelas</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 border-none uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                      Tidak ada data ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((item) => (
                    <tr key={item.siswa_id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {item.nama_anak || item.user.nama_lengkap}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                            {item.user.nama_lengkap}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-600">
                        <div className="flex flex-col">
                          <span className="font-bold text-xs">{item.tempat_lahir || "-"}</span>
                          <span className="text-[11px] font-medium text-slate-400 mt-1">
                            {item.tanggal_lahir ? new Date(item.tanggal_lahir).toLocaleDateString("id-ID") : "-"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tight ${item.jenis_kelamin === 'P' ? 'text-rose-600' : 'text-blue-600'}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${item.jenis_kelamin === 'P' ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
                           {item.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-Laki'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {item.kelas ? (
                          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-600 uppercase tracking-wider leading-none">
                            {item.kelas.nama}
                          </span>
                        ) : (
                          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider italic">-</span>
                        )}
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

