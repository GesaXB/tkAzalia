"use client";

import { fetchProfile } from "@/lib/client/auth";
import { ensureSiswa, getPpdbStatus, listBerkas } from "@/lib/client/ppdb";
import { getJadwalPpdb } from "@/lib/client/public";
import { clearToken } from "@/lib/client/session";
import { motion } from "framer-motion";
import { AlertCircle, FileCheck, Upload, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassSelection from "./ClassSelection";
import DashboardShell from "./DashboardShell";
import StatCard from "./StatCard";
import StatusTeaserCard from "./StatusTeaserCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export default function SiswaDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("");
  const [statusPpdb, setStatusPpdb] = useState<string>("—");
  const [berkasCount, setBerkasCount] = useState(0);
  const [ppdbDibuka, setPpdbDibuka] = useState(true);

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
      const [statusRes, berkasRes, jadwalRes] = await Promise.all([
        getPpdbStatus(),
        listBerkas(),
        getJadwalPpdb(),
      ]);
      if (!statusRes.success) setError(statusRes.error || "Gagal memuat status");
      if (!berkasRes.success) setError(berkasRes.error || "Gagal memuat berkas");
      setStatusPpdb(statusRes.data?.status_ppdb ?? "—");
      setBerkasCount((berkasRes.data || []).length);
      setPpdbDibuka(jadwalRes.success && jadwalRes.data?.dibuka === true);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  // Helper to check if decision is made
  const isDecisionMade = (status: string) => {
    const s = status.toLowerCase();
    return s === "lulus" || s === "tidak_lulus" || s === "diterima" || s === "ditolak" || s === "tidak diterima";
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
        { label: "Panduan PPDB", href: "/dashboard/siswa/panduan" },
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

      {!ppdbDibuka && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Periode pendaftaran PPDB telah berakhir</p>
            <p className="text-sm mt-0.5 opacity-90">
              Upload berkas dan perubahan data PPDB tidak tersedia. Anda hanya dapat melihat status dan berkas yang sudah diunggah.
            </p>
          </div>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          {isDecisionMade(statusPpdb) ? (
            <StatusTeaserCard href="/dashboard/siswa/status" />
          ) : (
            <StatCard
              title="Status PPDB"
              value={statusPpdb}
              href="/dashboard/siswa/status"
              icon={<FileCheck className="h-5 w-5" />}
              description="Status pendaftaran Anda"
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Berkas Diunggah"
            value={berkasCount}
            href="/dashboard/siswa/berkas"
            icon={<Upload className="h-5 w-5" />}
            description="Dokumen PPDB"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          {ppdbDibuka ? (
            <Link
              href="/dashboard/siswa/berkas"
              className="block h-full"
            >
              <motion.div
                className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex items-center gap-4"
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Upload Berkas</p>
                  <p className="text-sm text-slate-500">Lengkapi dokumen PPDB</p>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 flex items-center gap-4 opacity-80 h-full">
              <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-600">Upload Berkas</p>
                <p className="text-sm text-slate-500">Tidak tersedia — PPDB telah berakhir</p>
              </div>
            </div>
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href="/dashboard/siswa/profile"
            className="block h-full"
          >
            <motion.div
              className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex items-center gap-4"
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Profil</p>
                <p className="text-sm text-slate-500">Data akun Anda</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
        className="mt-8"
      >
        <ClassSelection />
      </motion.div>
    </DashboardShell>
  );
}
