"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import SiswaStatusSection from "@/Components/Dashboard/Siswa/SiswaStatusSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { ensureSiswa, getPpdbStatus } from "@/lib/client/ppdb";

export default function SiswaStatusPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [status, setStatus] = useState<{ status_ppdb: string; catatan_ppdb: string | null } | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }
      setProfileName(profile.data.nama_lengkap);
      await ensureSiswa();
      const statusResponse = await getPpdbStatus();
      if (!statusResponse.success) {
        setError(statusResponse.error || "Gagal memuat status PPDB");
      }
      setStatus(statusResponse.data || null);
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
        Memuat status PPDB...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Status PPDB"
      subtitle={`Halo, ${profileName}`}
      sidebarTitle="Siswa Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/siswa" },
        { label: "Status PPDB", href: "/dashboard/siswa/status" },
        { label: "Upload Berkas", href: "/dashboard/siswa/berkas" },
        { label: "Profil", href: "/dashboard/siswa/profile" },
      ]}
      onLogout={handleLogout}
    >
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <SiswaStatusSection status={status} />
    </DashboardShell>
  );
}

