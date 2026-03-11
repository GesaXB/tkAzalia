"use client";

import { ensureSiswa, getListKelas, getPpdbStatus, getSiswaMe, listBerkas } from "@/lib/client/ppdb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, BookOpen, CheckCircle2, Circle, FileCheck, Upload, User, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface SiswaData {
  siswa_id: number;
  kelas_id: number | null;
  nama_anak?: string | null;
  status_ppdb: string;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  jenis_kelamin?: string | null;
  anak_ke?: number | null;
  nama_ayah?: string | null;
  pekerjaan_ayah?: string | null;
  nama_ibu?: string | null;
  pekerjaan_ibu?: string | null;
  no_whatsapp?: string | null;
  alamat_rumah?: string | null;
}

interface KelasData {
  kelas_id: number;
  nama: string;
}

export default function SiswaDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusPpdb, setStatusPpdb] = useState<string>("—");
  const [berkasCount, setBerkasCount] = useState(0);
  const [ppdbDibuka, setPpdbDibuka] = useState(true);
  const [siswaData, setSiswaData] = useState<SiswaData | null>(null);
  const [selectedKelas, setSelectedKelas] = useState<KelasData | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      await ensureSiswa();
      const [statusRes, berkasRes, jadwalRes, siswaRes, kelasRes] = await Promise.all([
        getPpdbStatus(),
        listBerkas(),
        getJadwalPpdb(),
        getSiswaMe(),
        getListKelas(),
      ]);
      if (!statusRes.success) setError(statusRes.error || "Gagal memuat status");
      if (!berkasRes.success) setError(berkasRes.error || "Gagal memuat berkas");

      setStatusPpdb(statusRes.data?.status_ppdb ?? "—");
      setBerkasCount((berkasRes.data || []).length);
      setPpdbDibuka(jadwalRes.success && jadwalRes.data?.dibuka === true);

      if (siswaRes.success && siswaRes.data) {
        setSiswaData(siswaRes.data);

        if (siswaRes.data.kelas_id && kelasRes.success && kelasRes.data) {
          const selected = kelasRes.data.find((k) => k.kelas_id === siswaRes.data?.kelas_id);
          if (selected) {
            setSelectedKelas(selected);
          }
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const isDecisionMade = (status: string) => {
    const s = status.toLowerCase();
    return s === "lulus" || s === "tidak_lulus" || s === "diterima" || s === "ditolak" || s === "tidak diterima";
  };

  const formatStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
      belum: { label: "Belum Lengkap", color: "text-slate-600", bgColor: "bg-slate-100", icon: Circle },
      menunggu: { label: "Menunggu Keputusan", color: "text-amber-600", bgColor: "bg-amber-100", icon: AlertCircle },
      lulus: { label: "Diterima", color: "text-emerald-600", bgColor: "bg-emerald-100", icon: CheckCircle2 },
      tidak_lulus: { label: "Ditolak", color: "text-red-600", bgColor: "bg-red-100", icon: XCircle },
    };
    return statusMap[status.toLowerCase()] || { label: status, color: "text-gray-600", bgColor: "bg-gray-100", icon: Circle };
  };

  const getRequirementStatus = () => {
    if (!siswaData) return [];

    const requirements = [
      { field: "nama_anak", label: "Nama Anak", section: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { field: "tempat_lahir", label: "Tempat Lahir", section: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { field: "tanggal_lahir", label: "Tanggal Lahir", section: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { field: "jenis_kelamin", label: "Jenis Kelamin", section: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { field: "anak_ke", label: "Anak Ke", section: "Data Calon Siswa", href: "/dashboard/siswa/data-siswa" },
      { field: "nama_ayah", label: "Nama Ayah", section: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { field: "pekerjaan_ayah", label: "Pekerjaan Ayah", section: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { field: "nama_ibu", label: "Nama Ibu", section: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { field: "pekerjaan_ibu", label: "Pekerjaan Ibu", section: "Data Orang Tua", href: "/dashboard/siswa/data-ortu" },
      { field: "no_whatsapp", label: "No. WhatsApp", section: "Kontak", href: "/dashboard/siswa/data-ortu" },
      { field: "alamat_rumah", label: "Alamat Rumah", section: "Kontak", href: "/dashboard/siswa/data-ortu" },
      { field: "kelas_id", label: "Pilih Kelas", section: "Kelas", href: "/dashboard/siswa/kelas" },
    ];

    return requirements.map((req) => ({
      ...req,
      completed:
        req.field === "kelas_id"
          ? siswaData.kelas_id !== null && siswaData.kelas_id !== undefined
          : siswaData[req.field as keyof SiswaData] !== null &&
          siswaData[req.field as keyof SiswaData] !== undefined &&
          siswaData[req.field as keyof SiswaData] !== "",
    }));
  };

  const getCompletionPercentage = () => {
    const requirements = getRequirementStatus();
    const completed = requirements.filter((r) => r.completed).length;
    return Math.round((completed / requirements.length) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-slate-100 animate-pulse h-32" />
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

  const statusInfo = formatStatus(statusPpdb);
  const StatusIcon = statusInfo.icon;
  const completionPct = getCompletionPercentage();
  const incompleteItems = getRequirementStatus().filter((r) => !r.completed);

  return (
    <>
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
              Upload berkas dan perubahan data tidak tersedia. Anda hanya dapat melihat status.
            </p>
          </div>
        </div>
      )}

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`mb-6 rounded-2xl p-5 sm:p-6 border relative overflow-hidden ${isDecisionMade(statusPpdb)
            ? statusPpdb === "lulus"
              ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
              : "bg-gradient-to-br from-red-50 to-rose-50 border-red-200"
            : "bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200"
          }`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${statusInfo.bgColor} ${statusInfo.color}`}>
            <StatusIcon size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Status Pendaftaran PPDB</p>
            <p className={`text-xl font-bold ${statusInfo.color}`}>{statusInfo.label}</p>
            {selectedKelas && (
              <p className="text-sm text-slate-500 mt-0.5">
                Kelas: <span className="font-semibold text-slate-700">{selectedKelas.nama}</span>
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Completion Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Kelengkapan Data</h2>
            <p className="text-xs text-slate-500 mt-0.5">Lengkapi semua data untuk proses verifikasi</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${completionPct === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
            <span className={`text-sm font-bold whitespace-nowrap ${completionPct === 100 ? "text-emerald-600" : "text-slate-900"}`}>
              {completionPct}%
            </span>
          </div>
        </div>

        {completionPct < 100 && incompleteItems.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">Data yang belum diisi:</p>
            <div className="flex flex-wrap gap-2">
              {incompleteItems.map((req) => (
                <Link
                  key={req.field}
                  href={ppdbDibuka ? req.href : "#"}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${ppdbDibuka
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-slate-50 text-slate-500 cursor-default"
                    }`}
                >
                  <Circle size={8} />
                  {req.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {completionPct === 100 && (
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-emerald-600">
            <CheckCircle2 size={16} />
            <span className="text-sm font-semibold">Semua data sudah lengkap!</span>
          </div>
        )}
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Menu Cepat</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Status Card */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/siswa/status" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <FileCheck size={20} />
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="font-semibold text-slate-900">Status PPDB</p>
                <p className="text-sm text-slate-500 mt-0.5">Lihat keputusan</p>
              </div>
            </Link>
          </motion.div>

          {/* Berkas Card */}
          <motion.div variants={itemVariants}>
            <Link href="/dashboard/siswa/berkas" className="block group">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Upload size={20} />
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{berkasCount} file</span>
                </div>
                <p className="font-semibold text-slate-900">Berkas</p>
                <p className="text-sm text-slate-500 mt-0.5">Dokumen PPDB</p>
              </div>
            </Link>
          </motion.div>

          {/* Data Siswa Card */}
          <motion.div variants={itemVariants}>
            {ppdbDibuka ? (
              <Link href="/dashboard/siswa/data-siswa" className="block group">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="font-semibold text-slate-900">Data Siswa</p>
                  <p className="text-sm text-slate-500 mt-0.5">Pribadi peserta</p>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 opacity-60 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                    <User size={20} />
                  </div>
                </div>
                <p className="font-semibold text-slate-600">Data Siswa</p>
                <p className="text-sm text-slate-500 mt-0.5">Tidak tersedia</p>
              </div>
            )}
          </motion.div>

          {/* Data Ortu Card */}
          <motion.div variants={itemVariants}>
            {ppdbDibuka ? (
              <Link href="/dashboard/siswa/data-ortu" className="block group">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="font-semibold text-slate-900">Data Ortu</p>
                  <p className="text-sm text-slate-500 mt-0.5">Orang Tua / Wali</p>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 opacity-60 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                </div>
                <p className="font-semibold text-slate-600">Data Ortu</p>
                <p className="text-sm text-slate-500 mt-0.5">Tidak tersedia</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
