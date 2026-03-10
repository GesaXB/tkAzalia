"use client";

import AdminJadwalSection from "@/Components/Dashboard/Admin/AdminJadwalSection";
import { useDashboard } from "@/context/DashboardContext";
import { getJadwalPpdbAdmin } from "@/lib/client/admin";
import { useEffect, useState } from "react";

export default function AdminJadwalPpdbPage() {
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDashboardInfo("Jadwal PPDB", "Atur periode pendaftaran PPDB TK Azalia");
  }, []);

  const [jadwal, setJadwal] = useState<{
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    dibuka: boolean;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getJadwalPpdbAdmin();
      if (res.success && res.data) setJadwal(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSaved = async () => {
    const res = await getJadwalPpdbAdmin();
    if (res.success && res.data) setJadwal(res.data);
  };


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat jadwal...
      </div>
    );
  }

  return (
    <AdminJadwalSection jadwal={jadwal} onSaved={handleSaved} />
  );
}
