"use client";

import { ensureSiswa, getPpdbStatus, listBerkas, getSiswaMe, getListKelas } from "@/lib/client/ppdb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion } from "framer-motion";
import { AlertCircle, FileCheck, Upload, BookOpen, CheckCircle2, Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [showModal, setShowModal] = useState(false);

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
          const selected = kelasRes.data.find(k => k.kelas_id === siswaRes.data?.kelas_id);
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
    const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
      belum: { label: "Belum Lengkap", color: "text-slate-600", bgColor: "bg-slate-100" },
      menunggu: { label: "Menunggu Keputusan", color: "text-amber-600", bgColor: "bg-amber-100" },
      lulus: { label: "Diterima", color: "text-emerald-600", bgColor: "bg-emerald-100" },
      tidak_lulus: { label: "Ditolak", color: "text-red-600", bgColor: "bg-red-100" },
    };
    return statusMap[status.toLowerCase()] || { label: status, color: "text-gray-600", bgColor: "bg-gray-100" };
  };

  const getRequirementStatus = () => {
    if (!siswaData) return [];

    const requirements = [
      { field: "nama_anak", label: "Nama Anak", section: "Data Calon Siswa" },
      { field: "tempat_lahir", label: "Tempat Lahir", section: "Data Calon Siswa" },
      { field: "tanggal_lahir", label: "Tanggal Lahir", section: "Data Calon Siswa" },
      { field: "jenis_kelamin", label: "Jenis Kelamin", section: "Data Calon Siswa" },
      { field: "anak_ke", label: "Anak Ke", section: "Data Calon Siswa" },
      { field: "nama_ayah", label: "Nama Ayah", section: "Data Orang Tua" },
      { field: "pekerjaan_ayah", label: "Pekerjaan Ayah", section: "Data Orang Tua" },
      { field: "nama_ibu", label: "Nama Ibu", section: "Data Orang Tua" },
      { field: "pekerjaan_ibu", label: "Pekerjaan Ibu", section: "Data Orang Tua" },
      { field: "no_whatsapp", label: "No. WhatsApp", section: "Kontak" },
      { field: "alamat_rumah", label: "Alamat Rumah", section: "Kontak" },
      { field: "kelas_id", label: "Pilih Kelas", section: "Kelas" },
    ];

    return requirements.map(req => ({
      ...req,
      completed: req.field === "kelas_id"
        ? siswaData.kelas_id !== null && siswaData.kelas_id !== undefined
        : siswaData[req.field as keyof SiswaData] !== null && siswaData[req.field as keyof SiswaData] !== undefined && siswaData[req.field as keyof SiswaData] !== ""
    }));
  };

  const getCompletionPercentage = () => {
    const requirements = getRequirementStatus();
    const completed = requirements.filter(r => r.completed).length;
    return Math.round((completed / requirements.length) * 100);
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Kelengkapan Data</h2>
            <p className="text-xs text-slate-500 mt-0.5">Lengkapi semua data pendaftaran</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{getCompletionPercentage()}%</span>
          </div>
        </div>

        {getCompletionPercentage() < 100 && (
          <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
            <p className="font-medium mb-2">Data yang belum diisi:</p>
            <div className="flex flex-wrap gap-2">
              {getRequirementStatus()
                .filter(r => !r.completed)
                .map((req) => (
                  <span key={req.field} className="px-2 py-1 rounded bg-red-50 text-red-700 text-xs">
                    {req.label}
                  </span>
                ))}
            </div>
          </div>
        )}
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
            <button
              onClick={() => setShowModal(true)}
              className="block w-full h-full"
            >
              <motion.div
                className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex items-center gap-4 text-left hover:border-blue-300 hover:shadow-md transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
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
            </button>
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

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Kelengkapan Data Pendaftaran</h2>
              <p className="text-sm text-slate-500 mt-1">Pastikan semua data sudah diisi sebelum melanjutkan</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                {Object.entries(Object.groupBy(getRequirementStatus(), (item) => item.section) || {}).map(([section, items]) => (
                  <div key={section}>
                    <h3 className="text-xs font-semibold text-slate-600 uppercase mb-2">{section}</h3>
                    <div className="space-y-2">
                      {items?.map((req: any) => (
                        <div key={req.field} className="flex items-center gap-2 text-sm">
                          {req.completed ? (
                            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 shrink-0" />
                          )}
                          <span className={req.completed ? "text-slate-700" : "text-slate-400"}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {getCompletionPercentage() < 100 && (
                <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                  <p className="text-sm text-amber-800">
                    <strong>Catatan:</strong> {12 - getRequirementStatus().filter(r => r.completed).length} data masih perlu dilengkapi.
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/dashboard/siswa/data-ppdb");
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Lanjut ke Form
              </button>
            </div>
          </motion.div>
        </div>
      )}    </>
  );
}
