"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import AdminPpdbSection from "@/Components/Dashboard/Admin/AdminPpdbSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { AdminPpdbSiswa, listPpdbSiswa } from "@/lib/client/admin";

export default function AdminPpdbPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ppdbList, setPpdbList] = useState<AdminPpdbSiswa[]>([]);
  const statusOptions = useMemo(() => ["menunggu", "lulus", "tidak_lulus"], []);

  useEffect(() => {
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
      const ppdbResponse = await listPpdbSiswa();
      if (!ppdbResponse.success) {
        setError(ppdbResponse.error || "Gagal memuat data PPDB");
      }
      setPpdbList(ppdbResponse.data || []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat data PPDB...
      </div>
    );
  }

  return (
    <DashboardShell
      title="PPDB"
      subtitle="Kelola status PPDB calon siswa"
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
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <AdminPpdbSection ppdbList={ppdbList} statusOptions={statusOptions} />
    </DashboardShell>
  );
}

