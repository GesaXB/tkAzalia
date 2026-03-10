"use client";

import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { fetchProfile } from "@/lib/client/auth";
import { clearToken } from "@/lib/client/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SISWA_SIDEBAR_ITEMS = [
  { label: "Ringkasan", href: "/dashboard/siswa" },
  { label: "Panduan PPDB", href: "/dashboard/siswa/panduan" },
  {
    label: "Data Pendaftaran",
    submenu: [
      { label: "Data Siswa", href: "/dashboard/siswa/data-siswa" },
      { label: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { label: "Upload Berkas", href: "/dashboard/siswa/berkas" },
      { label: "Pilih Kelas", href: "/dashboard/siswa/kelas" }
    ]
  },
  { label: "Status PPDB", href: "/dashboard/siswa/status" },
  {
    label: "Akun",
    submenu: [
      { label: "Edit Profil", href: "/dashboard/siswa/profile?tab=profil" },
      { label: "Ubah Sandi", href: "/dashboard/siswa/profile?tab=sandi" },
    ]
  },
  { label: "← Kembali ke Beranda", href: "/" },
];

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
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
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Memuat...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Dashboard Siswa"
      subtitle={`Halo, ${profileName}`}
      sidebarTitle="Siswa Menu"
      items={SISWA_SIDEBAR_ITEMS}
      onLogout={handleLogout}
    >
      {children}
    </DashboardShell>
  );
}
