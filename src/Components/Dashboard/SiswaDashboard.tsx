"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell from "./DashboardShell";
import StatCard from "./StatCard";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { ensureSiswa, getPpdbStatus, listBerkas } from "@/lib/client/ppdb";
import { FileCheck, Upload, User } from "lucide-react";

export default function SiswaDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("");
  const [statusPpdb, setStatusPpdb] = useState<string>("—");
  const [berkasCount, setBerkasCount] = useState(0);

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
      const [statusRes, berkasRes] = await Promise.all([
        getPpdbStatus(),
        listBerkas(),
      ]);
      if (!statusRes.success) setError(statusRes.error || "Gagal memuat status");
      if (!berkasRes.success) setError(berkasRes.error || "Gagal memuat berkas");
      setStatusPpdb(statusRes.data?.status_ppdb ?? "—");
      setBerkasCount((berkasRes.data || []).length);
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
      title="Ringkasan Siswa"
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
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Status PPDB"
          value={statusPpdb}
          href="/dashboard/siswa/status"
          icon={<FileCheck className="h-5 w-5" />}
          description="Status pendaftaran Anda"
        />
        <StatCard
          title="Berkas Diunggah"
          value={berkasCount}
          href="/dashboard/siswa/berkas"
          icon={<Upload className="h-5 w-5" />}
          description="Dokumen PPDB"
        />
        <Link
          href="/dashboard/siswa/berkas"
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Upload className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Upload Berkas</p>
            <p className="text-sm text-slate-500">Lengkapi dokumen PPDB</p>
          </div>
        </Link>
        <Link
          href="/dashboard/siswa/profile"
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Profil</p>
            <p className="text-sm text-slate-500">Data akun Anda</p>
          </div>
        </Link>
      </div>
    </DashboardShell>
  );
}
