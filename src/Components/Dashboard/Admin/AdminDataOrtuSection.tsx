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
                className="group relative p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
                    {/* Ayah & Ibu */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Ayah</p>
                          <p className="font-bold text-slate-900 truncate">{item.nama_ayah || "-"}</p>
                          <p className="text-[10px] text-slate-400 font-medium truncate italic">{item.pekerjaan_ayah || "Pekerjaan tidak diisi"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Ibu</p>
                          <p className="font-bold text-slate-900 truncate">{item.nama_ibu || "-"}</p>
                          <p className="text-[10px] text-slate-400 font-medium truncate italic">{item.pekerjaan_ibu || "Pekerjaan tidak diisi"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Kontak & Alamat */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          <Phone size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp</p>
                          <a
                            href={`https://wa.me/${(item.no_whatsapp || "").replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-slate-900 hover:text-emerald-600 block transition-colors"
                          >
                            {item.no_whatsapp || "-"}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">
                          <Home size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Rumah</p>
                          <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                            {item.alamat_rumah || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Keterangan Siswa */}
                    <div className="bg-slate-50 rounded-xl p-4 self-start border border-slate-100 group-hover:bg-white transition-colors">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Terikat Siswa</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-900 shadow-sm">
                          {(item.nama_anak || item.user.nama_lengkap).charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {item.nama_anak || item.user.nama_lengkap}
                          </p>
                          {item.kelas && (
                            <span className="inline-flex mt-0.5 px-1.5 py-0.5 rounded text-[8px] font-black bg-slate-200 text-slate-600 uppercase tracking-wider">
                              {item.kelas.nama}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/admin/ppdb/${item.siswa_id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-all duration-300 uppercase tracking-wider shadow-sm active:scale-95 shrink-0"
                  >
                    Profil
                    <ChevronRight size={14} />
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

