"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProfile } from "@/lib/client/auth";
import { AdminPpdbSiswa, listPpdbSiswa, listKelasAdmin, KelasItem } from "@/lib/client/admin";
import AdminDataPendaftarSection from "@/Components/Dashboard/Admin/AdminDataPendaftarSection";
import { ArrowLeft, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/context/DashboardContext";

export default function AdminKelasDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const { setDashboardInfo } = useDashboard();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ppdbList, setPpdbList] = useState<AdminPpdbSiswa[]>([]);
  const [kelasList, setKelasList] = useState<KelasItem[]>([]);
  const [currentKelas, setCurrentKelas] = useState<KelasItem | null>(null);

  useEffect(() => {
    setDashboardInfo("Detail Kelas", "Daftar siswa di kelas ini");
  }, [setDashboardInfo]);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError("ID Kelas tidak valid");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }

      const [ppdbRes, kelasRes] = await Promise.all([
        listPpdbSiswa(),
        listKelasAdmin()
      ]);

      if (!kelasRes.success) {
        setError(kelasRes.error || "Gagal memuat data kelas");
      } else {
        const kList = kelasRes.data || [];
        setKelasList(kList);
        const k = kList.find(k => k.kelas_id === id);
        if (k) {
          setCurrentKelas(k);
          setDashboardInfo(`Kelas ${k.nama}`, "Daftar siswa di kelas ini");
        } else {
          setError("Kelas tidak ditemukan");
        }
      }

      if (!ppdbRes.success) {
        setError(ppdbRes.error || "Gagal memuat data siswa");
      } else {
        // Filter only students in this class
        const studentsInClass = (ppdbRes.data || []).filter(s => s.kelas_id === id);
        setPpdbList(studentsInClass);
      }

      setLoading(false);
    };

    load();
  }, [id, router, setDashboardInfo]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium font-outfit">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin"></div>
          <span>Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/admin/kelas"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01793B] transition-colors w-fit"
      >
        <ArrowLeft size={18} />
        Kembali ke Kelola Kelas
      </Link>

      {error ? (
        <div className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 flex items-center gap-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          {error}
        </div>
      ) : (
        <>
          {currentKelas && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookOpen size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{currentKelas.nama}</h2>
                  <p className="text-sm text-gray-500 mt-1">{currentKelas.deskripsi || "Tidak ada deskripsi"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 px-6 py-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kuota</p>
                  <p className="text-lg font-black text-slate-700">{currentKelas.kuota || 0}</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Terisi</p>
                  <p className={`text-lg font-black ${ppdbList.length >= (currentKelas.kuota || 0) && currentKelas.kuota && currentKelas.kuota > 0 ? 'text-red-500' : 'text-[#01793B]'}`}>
                    {ppdbList.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          <AdminDataPendaftarSection ppdbList={ppdbList} kelasList={kelasList} />
        </>
      )}
    </div>
  );
}
