"use client";

import { AdminPpdbSiswa } from "@/lib/client/admin";
import { ChevronRight, Home, Phone, Search, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import SectionCard from "../SectionCard";

interface AdminDataOrtuSectionProps {
  ppdbList: AdminPpdbSiswa[];
}

export default function AdminDataOrtuSection({
  ppdbList,
}: AdminDataOrtuSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = useMemo(() => {
    let list = ppdbList;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          (item.nama_ayah || "").toLowerCase().includes(q) ||
          (item.nama_ibu || "").toLowerCase().includes(q) ||
          (item.no_whatsapp || "").toLowerCase().includes(q) ||
          (item.alamat_rumah || "").toLowerCase().includes(q) ||
          (item.user.nama_lengkap).toLowerCase().includes(q)
      );
    }
    return list;
  }, [ppdbList, searchQuery]);

  return (
    <SectionCard
      title="Data Orang Tua / Wali"
      description="Daftar lengkap informasi kontak dan latar belakang orang tua/wali calon siswa."
    >
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama orang tua, WA, atau alamat..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-gray-500 text-sm">
              Tidak ada data ditemukan.
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.siswa_id}
                className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#01793B]/20 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {/* Ayah & Ibu */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <User size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Ayah</p>
                          <p className="font-semibold text-gray-900 mt-0.5">{item.nama_ayah || "-"}</p>
                          <p className="text-xs text-gray-500">{item.pekerjaan_ayah || "Pekerjaan tidak diisi"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                          <User size={18} className="text-pink-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Ibu</p>
                          <p className="font-semibold text-gray-900 mt-0.5">{item.nama_ibu || "-"}</p>
                          <p className="text-xs text-gray-500">{item.pekerjaan_ibu || "Pekerjaan tidak diisi"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Kontak & Alamat */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                          <Phone size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak WhatsApp</p>
                          <a
                            href={`https://wa.me/${(item.no_whatsapp || "").replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-900 mt-0.5 hover:text-[#01793B] block"
                          >
                            {item.no_whatsapp || "-"}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                          <Home size={18} className="text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat Rumah</p>
                          <p className="text-sm text-gray-700 mt-0.5 line-clamp-2 leading-relaxed">
                            {item.alamat_rumah || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Keterangan Siswa */}
                    <div className="bg-gray-50/50 rounded-xl p-4 self-start">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Terikat Siswa</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {(item.nama_anak || item.user.nama_lengkap).charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-tight">
                            {item.nama_anak || item.user.nama_lengkap}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {item.kelas?.nama || "Pilihan kelas belum ada"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#01793B] hover:text-white transition-all group/btn shrink-0"
                  >
                    Profil Lengkap
                    <ChevronRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionCard>
  );
}
