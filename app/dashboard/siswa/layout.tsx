"use client";

import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { fetchProfile } from "@/lib/client/auth";
import { clearToken } from "@/lib/client/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SISWA_SIDEBAR_ITEMS = [
  { label: "Ringkasan", href: "/dashboard/siswa" },
  { label: "Panduan SPMB", href: "/dashboard/siswa/panduan" },
  {
    label: "Data Pendaftaran",
    submenu: [
      { label: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { label: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { label: "Upload Berkas", href: "/dashboard/siswa/berkas" },
      { label: "Pilih Kelas", href: "/dashboard/siswa/kelas" }
    ]
  },
  { label: "Status SPMB", href: "/dashboard/siswa/status" },
  {
    label: "Akun",
    submenu: [
      { label: "Edit Profil", href: "/dashboard/siswa/profile?tab=profil" },
      { label: "Ubah Sandi", href: "/dashboard/siswa/profile?tab=sandi" },
    ]
  },
  { label: "Kembali ke Beranda", href: "/" },
];

import { getJadwalPpdb } from "@/lib/client/public";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [ppdbStatus, setPpdbStatus] = useState<{ open: boolean; message?: string }>({ open: true });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      
      // Fetch profile
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

      // Check PPDB Schedule
      const res = await getJadwalPpdb() as any;
      if (!res || !res.dibuka) {
        setPpdbStatus({ 
          open: false, 
          message: !res ? "Jadwal SPMB belum diatur." : "Pendaftaran SPMB saat ini sedang ditutup." 
        });
      }

      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  // Filter sidebar items if PPDB is closed
  const filteredSidebarItems = SISWA_SIDEBAR_ITEMS.map(item => {
    if (item.label === "Data Pendaftaran" && !ppdbStatus.open) {
      return { ...item, disabled: true, tooltip: ppdbStatus.message };
    }
    return item;
  });

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
      items={filteredSidebarItems}
      onLogout={handleLogout}
    >
      {children}
    </DashboardShell>
  );
}
