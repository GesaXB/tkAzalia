"use client";

import { useDashboard } from "@/context/DashboardContext";
import { listInformasiSekolah, listKelasAdmin, listPpdbSiswa } from "@/lib/client/admin";
import { fetchProfile } from "@/lib/client/auth";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, Clock, FileText, TrendingUp, User, Users, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPpdb, setTotalPpdb] = useState(0);
  const [menungguCount, setMenungguCount] = useState(0);
  const [lulusCount, setLulusCount] = useState(0);
  const [tidakLulusCount, setTidakLulusCount] = useState(0);
  const [totalInfo, setTotalInfo] = useState(0);
  const [totalKelas, setTotalKelas] = useState(0);
  const [publishedInfo, setPublishedInfo] = useState(0);

  const { setDashboardInfo } = useDashboard();

  useEffect(() => {
    setDashboardInfo("Ringkasan Admin", "Kelola PPDB dan informasi sekolah");
  }, []);

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
      const [ppdbResponse, infoResponse, kelasResponse] = await Promise.all([
        listPpdbSiswa(),
        listInformasiSekolah(),
        listKelasAdmin(),
      ]);
      if (!ppdbResponse.success) setError(ppdbResponse.error || "Gagal memuat PPDB");
      if (!infoResponse.success) setError(infoResponse.error || "Gagal memuat informasi");
      const ppdbList = ppdbResponse.data || [];
      setTotalPpdb(ppdbList.length);
      setMenungguCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "menunggu").length);
      setLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "lulus").length);
      setTidakLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "tidak_lulus").length);
      const infoData = infoResponse.data || [];
      setTotalInfo(infoData.length);
      setPublishedInfo(infoData.filter((i) => i.status === "published").length);
      setTotalKelas(kelasResponse.data?.length || 0);
      setLoading(false);
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-2/3 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lulusPercentage = totalPpdb > 0 ? Math.round((lulusCount / totalPpdb) * 100) : 0;

  return (
    <>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-6">
          {error}
        </div>
      )}

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-6 sm:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold">Selamat Datang, Admin! 👋</h2>
          <p className="mt-1 text-emerald-100 text-sm sm:text-base max-w-lg">
            Pantau status PPDB, kelola konten website, dan atur data sekolah dari satu tempat.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/dashboard/admin/ppdb"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/25 transition-colors"
            >
              <Users size={16} />
              Kelola PPDB
            </Link>
            <Link
              href="/dashboard/admin/informasi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/25 transition-colors"
            >
              <FileText size={16} />
              Kelola Blog
            </Link>
          </div>
        </div>
      </motion.div>

      {/* PPDB Stats */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Statistik PPDB</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/ppdb" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{totalPpdb}</p>
                <p className="text-sm text-slate-500 mt-0.5">Total Pendaftar</p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/ppdb" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">Perlu Review</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{menungguCount}</p>
                <p className="text-sm text-slate-500 mt-0.5">Menunggu Verifikasi</p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/ppdb" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    {lulusPercentage}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{lulusCount}</p>
                <p className="text-sm text-slate-500 mt-0.5">Lulus / Diterima</p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/ppdb" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                    <XCircle size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{tidakLulusCount}</p>
                <p className="text-sm text-slate-500 mt-0.5">Tidak Lulus</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress Visual */}
      {totalPpdb > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-700">Progress Seleksi PPDB</h3>
          </div>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-100">
            {lulusCount > 0 && (
              <div
                className="bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${(lulusCount / totalPpdb) * 100}%` }}
                title={`Lulus: ${lulusCount}`}
              />
            )}
            {tidakLulusCount > 0 && (
              <div
                className="bg-red-400 rounded-full transition-all duration-700"
                style={{ width: `${(tidakLulusCount / totalPpdb) * 100}%` }}
                title={`Tidak Lulus: ${tidakLulusCount}`}
              />
            )}
            {menungguCount > 0 && (
              <div
                className="bg-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${(menungguCount / totalPpdb) * 100}%` }}
                title={`Menunggu: ${menungguCount}`}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Lulus ({lulusCount})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Tidak Lulus ({tidakLulusCount})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Menunggu ({menungguCount})</span>
          </div>
        </motion.div>
      )}

      {/* Quick Links */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Kelola Konten</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/informasi" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">Blog / Artikel</p>
                    <p className="text-sm text-slate-500">{publishedInfo} published · {totalInfo} total</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/kelas" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">Kelas</p>
                    <p className="text-sm text-slate-500">{totalKelas} kelas tersedia</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/dashboard/admin/profile" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <User size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">Profil Admin</p>
                    <p className="text-sm text-slate-500">Lihat & kelola akun</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
