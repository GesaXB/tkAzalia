"use client";

import { ensureSiswa, getPpdbStatus, listBerkas, getSiswaMe, getListKelas } from "@/lib/client/ppdb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion } from "framer-motion";
import { AlertCircle, FileCheck, Upload, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

interface SiswaData {
  kelas_id: number | null;
  nama_anak?: string | null;
  status_ppdb: string;
}

interface KelasData {
  kelas_id: number;
  nama: string;
}

export default function SiswaDashboard() {
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
        
        // Find selected class name
        if (siswaRes.data.kelas_id && kelasRes.success && kelasRes.data) {
          const selected = kelasRes.data.find(k => k.kelas_id === siswaRes.data.kelas_id);
          if (selected) {
            setSelectedKelas(selected);
          }
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  // Helper to check if decision is made
  const isDecisionMade = (status: string) => {
    const s = status.toLowerCase();
    return s === "lulus" || s === "tidak_lulus" || s === "diterima" || s === "ditolak" || s === "tidak diterima";
  };

  // Helper to format status
  const formatStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
      belum: { label: "Belum Lengkap", color: "text-slate-600", bgColor: "bg-slate-100" },
      menunggu: { label: "Menunggu Keputusan", color: "text-amber-600", bgColor: "bg-amber-100" },
      lulus: { label: "Diterima", color: "text-emerald-600", bgColor: "bg-emerald-100" },
      tidak_lulus: { label: "Ditolak", color: "text-red-600", bgColor: "bg-red-100" },
    };
    return statusMap[status.toLowerCase()] || { label: status, color: "text-gray-600", bgColor: "bg-gray-100" };
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Memuat dashboard...
      </div>
    );
  }

  const statusInfo = formatStatus(statusPpdb);

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
              Upload berkas dan perubahan data PPDB tidak tersedia. Anda hanya dapat melihat status dan berkas yang sudah diunggah.
            </p>
          </div>
        </div>
      )}

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-6 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-4">Ringkasan Pendaftaran</h2>
        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Status PPDB</span>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusInfo.color} ${statusInfo.bgColor}`}>
              {statusInfo.label}
            </span>
          </div>

          {/* Kelas */}
          {siswaData?.kelas_id ? (
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Kelas Terpilih</span>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-600 bg-emerald-100">
                {selectedKelas?.nama || "Kelas Terpilih"}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Kelas Terpilih</span>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100">
                Belum Dipilih
              </span>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Lengkapi data pendaftaran, upload berkas, dan pilih kelas di menu <strong>Data Pendaftaran</strong> untuk melanjutkan.
        </p>
      </motion.div>

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
              href="/dashboard/siswa/data-ppdb"
              className="block h-full"
            >
              <motion.div
                className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex items-center gap-4"
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Data Pendaftaran</p>
                  <p className="text-sm text-slate-500">Lengkapi formulir</p>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 flex items-center gap-4 opacity-80 h-full">
              <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-600">Data Pendaftaran</p>
                <p className="text-sm text-slate-500">Tidak tersedia — PPDB telah berakhir</p>
              </div>
            </div>
          )}
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
      </motion.div>
    </>
  );
}
