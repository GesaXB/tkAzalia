"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import AdminJadwalSection from "@/Components/Dashboard/Admin/AdminJadwalSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { getJadwalPpdbAdmin } from "@/lib/client/admin";

export default function AdminJadwalPpdbPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jadwal, setJadwal] = useState<{
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    dibuka: boolean;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }
      const res = await getJadwalPpdbAdmin();
      if (res.success && res.data) setJadwal(res.data);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSaved = async () => {
    const res = await getJadwalPpdbAdmin();
    if (res.success && res.data) setJadwal(res.data);
  };

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat jadwal...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Jadwal PPDB"
      subtitle="Atur periode pendaftaran PPDB TK Azalia"
      sidebarTitle="Admin Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/admin" },
        { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
        { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
        { label: "PPDB", href: "/dashboard/admin/ppdb" },
        { label: "Blog", href: "/dashboard/admin/informasi" },
        { label: "Profil", href: "/dashboard/admin/profile" },
      ]}
      onLogout={handleLogout}
    >
      <AdminJadwalSection jadwal={jadwal} onSaved={handleSaved} />
    </DashboardShell>
  );
}
