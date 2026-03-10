"use client";

import JenisBerkasSection from "@/Components/Dashboard/Admin/JenisBerkasSection";
import { useDashboard } from "@/context/DashboardContext";
import { useEffect, useState } from "react";

export default function AdminJenisBerkasPage() {
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDashboardInfo("Jenis Berkas", "Kelola persyaratan dokumen pendaftaran siswa");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Auth checked by layout.tsx
      setLoading(false);
    };
    load();
  }, []);


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat...
      </div>
    );
  }

  return (
    <JenisBerkasSection />
  );
}
