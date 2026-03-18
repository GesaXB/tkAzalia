"use client";

import AdminDataPendaftarSection from "@/Components/Dashboard/Admin/AdminDataPendaftarSection";
import { useDashboard } from "@/context/DashboardContext";
import { AdminPpdbSiswa, KelasItem, listKelasAdmin, listPpdbSiswa } from "@/lib/client/admin";
import { useEffect, useState } from "react";

export default function AdminDataPendaftarPage() {
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ppdbList, setPpdbList] = useState<AdminPpdbSiswa[]>([]);
  const [kelasList, setKelasList] = useState<KelasItem[]>([]);

  useEffect(() => {
    setDashboardInfo("Data Pendaftar", "Kelola informasi calon siswa dan orang tua dalam satu tempat");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const [ppdbResponse, kelasResponse] = await Promise.all([
        listPpdbSiswa(),
        listKelasAdmin(),
      ]);

      if (!ppdbResponse.success) {
        setError(ppdbResponse.error || "Gagal memuat data SPMB");
      } else {
        setPpdbList(ppdbResponse.data || []);
      }

      if (!kelasResponse.success) {
        console.error("Gagal memuat data kelas:", kelasResponse.error);
      } else {
        setKelasList(kelasResponse.data || []);
      }

      setLoading(false);
    };
    load();
  }, []);


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium font-outfit">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin"></div>
          <span>Memuat data pendaftar...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          {error}
        </div>
      )}

      <AdminDataPendaftarSection ppdbList={ppdbList} kelasList={kelasList} />
    </>
  );
}
