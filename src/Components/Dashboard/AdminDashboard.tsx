"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell from "./DashboardShell";
import StatCard from "./StatCard";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { listPpdbSiswa, listInformasiSekolah } from "@/lib/client/admin";
import { Users, FileText, User } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPpdb, setTotalPpdb] = useState(0);
  const [menungguCount, setMenungguCount] = useState(0);
  const [lulusCount, setLulusCount] = useState(0);
  const [tidakLulusCount, setTidakLulusCount] = useState(0);
  const [totalInfo, setTotalInfo] = useState(0);

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
      const [ppdbResponse, infoResponse] = await Promise.all([
        listPpdbSiswa(),
        listInformasiSekolah(),
      ]);
      if (!ppdbResponse.success) setError(ppdbResponse.error || "Gagal memuat PPDB");
      if (!infoResponse.success) setError(infoResponse.error || "Gagal memuat informasi");
      const ppdbList = ppdbResponse.data || [];
      setTotalPpdb(ppdbList.length);
      setMenungguCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "menunggu").length);
      setLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "lulus").length);
      setTidakLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "tidak_lulus").length);
      setTotalInfo((infoResponse.data || []).length);
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
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Memuat dashboard...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Ringkasan Admin"
      subtitle="Kelola PPDB dan informasi sekolah"
      sidebarTitle="Admin Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/admin" },
        { label: "PPDB", href: "/dashboard/admin/ppdb" },
        { label: "Informasi", href: "/dashboard/admin/informasi" },
        { label: "Profil", href: "/dashboard/admin/profile" },
      ]}
      onLogout={handleLogout}
    >
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Calon PPDB"
          value={totalPpdb}
          href="/dashboard/admin/ppdb"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={menungguCount}
          href="/dashboard/admin/ppdb"
          description="Belum diputuskan"
        />
        <StatCard
          title="Lulus"
          value={lulusCount}
          href="/dashboard/admin/ppdb"
        />
        <StatCard
          title="Tidak Lulus"
          value={tidakLulusCount}
          href="/dashboard/admin/ppdb"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <StatCard
          title="Informasi Sekolah"
          value={totalInfo}
          href="/dashboard/admin/informasi"
          icon={<FileText className="h-5 w-5" />}
          description="Konten website"
        />
        <Link
          href="/dashboard/admin/profile"
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Profil Admin</p>
            <p className="text-sm text-slate-500">Lihat & kelola akun</p>
          </div>
        </Link>
      </div>
    </DashboardShell>
  );
}
