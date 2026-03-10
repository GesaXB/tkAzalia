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

    return list;
  }, [ppdbList, searchQuery, filterKelas, filterStatus]);

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

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:w-40 px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
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
              className="flex-1 sm:w-40 px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
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
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pendaftar</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Detail</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelas</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400 italic">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.siswa_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#01793B] flex items-center justify-center font-bold text-sm">
                          {(item.nama_anak || item.user.nama_lengkap || "?").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.nama_anak || item.user.nama_lengkap}
                          </p>
                          <p className="text-xs text-gray-500">
                            Akun: {item.user.nama_lengkap}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="text-gray-600 font-medium">
                          {item.jenis_kelamin || "-"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.kelas ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {item.kelas.nama}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300">Belum dipilih</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                        className="inline-flex items-center gap-1 text-[#01793B] font-medium hover:underline text-sm"
                      >
                        Detail
                        <ChevronRight size={14} />
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
