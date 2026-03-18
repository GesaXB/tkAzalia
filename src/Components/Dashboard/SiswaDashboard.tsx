"use client";

import { ensureSiswa, getSpmbStatus, listBerkas, getSiswaMe, getListKelas } from "@/lib/client/spmb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion } from "framer-motion";
import { FileCheck, Upload, BookOpen, Check, X, ArrowRight, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SpmbCountdown from "./Siswa/SpmbCountdown";

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

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  menunggu: { label: "Menunggu", color: "text-amber-700", bg: "bg-amber-50 border-amber-100", dot: "bg-amber-400" },
  lulus: { label: "Diterima", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100", dot: "bg-emerald-500" },
  tidak_lulus: { label: "Tidak Diterima", color: "text-rose-700", bg: "bg-rose-50 border-rose-100", dot: "bg-rose-500" },
};

export default function SiswaDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusPpdb, setStatusPpdb] = useState<string>("menunggu");
  const [berkasCount, setBerkasCount] = useState(0);
  const [spmbInfo, setSpmbInfo] = useState<{ opened: boolean; tanggalSelesai: string }>({ opened: true, tanggalSelesai: "" });
  const [siswaData, setSiswaData] = useState<SiswaData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      await ensureSiswa();
      const [statusRes, berkasRes, jadwalRes, siswaRes, kelasRes] = await Promise.all([
        getSpmbStatus(),
        listBerkas(),
        getJadwalPpdb(),
        getSiswaMe(),
        getListKelas(),
      ]);
      if (!statusRes.success) setError(statusRes.error || "Gagal memuat status");
      if (!berkasRes.success) setError(berkasRes.error || "Gagal memuat berkas");
      setStatusPpdb(statusRes.data?.status_ppdb ?? "menunggu");
      setBerkasCount((berkasRes.data || []).length);
      setSpmbInfo({
        opened: jadwalRes.success && jadwalRes.data?.dibuka === true,
        tanggalSelesai: jadwalRes.success && jadwalRes.data ? (jadwalRes.data as any).tanggal_selesai : "",
      });
      if (siswaRes.success && siswaRes.data) {
        setSiswaData(siswaRes.data);
      }
      setLoading(false);
    };
    load();
  }, []);

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

  const getRequirementStatus = () => requirements.map(req => ({
    ...req,
    completed: req.field === "kelas_id"
      ? siswaData?.kelas_id !== null && siswaData?.kelas_id !== undefined
      : !!(siswaData?.[req.field as keyof SiswaData]),
  }));

  const completionPct = siswaData
    ? Math.round(getRequirementStatus().filter(r => r.completed).length / requirements.length * 100)
    : 0;

  const isDecisionMade = ["lulus", "tidak_lulus", "diterima", "ditolak"].includes(statusPpdb?.toLowerCase());
  const statusInfo = STATUS_MAP[statusPpdb] ?? STATUS_MAP["menunggu"];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin" />
          <span className="text-sm font-medium">Memuat dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* SPMB Countdown */}
      <SpmbCountdown tanggalSelesai={spmbInfo.tanggalSelesai} isOpened={spmbInfo.opened} />

      {/* Status + Progress row */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Status SPMB */}
        <Link
          href="/dashboard/siswa/status"
          className={`group rounded-2xl border p-6 flex items-center gap-4 hover:-translate-y-0.5 transition-all shadow-sm ${statusInfo.bg}`}
        >
          <div className="relative shrink-0">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white`}>
              <FileCheck size={22} className={statusInfo.color} />
            </div>
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusInfo.dot} ${isDecisionMade ? "" : "animate-pulse"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status SPMB</p>
            <p className={`text-lg font-black mt-0.5 ${statusInfo.color}`}>{statusInfo.label}</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-current transition-colors shrink-0" />
        </Link>

        {/* Kelengkapan Data */}
        <button
          onClick={() => setShowModal(true)}
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-left w-full"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <span className="text-xl font-black">{completionPct}%</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kelengkapan Data</p>
            <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${completionPct === 100 ? "bg-emerald-500" : "bg-blue-400"}`}
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors shrink-0" />
        </button>
      </div>

      {/* Quick action cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Berkas */}
        <Link
          href="/dashboard/siswa/berkas"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
            <Upload size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Berkas Diunggah</p>
            <p className="text-3xl font-black text-gray-900 mt-0.5">{berkasCount}</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </Link>

        {/* Isi Data */}
        {spmbInfo.opened ? (
          <button
            onClick={() => setShowDataModal(true)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-left w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <BookOpen size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">Data Pendaftaran</p>
              <p className="text-xs text-gray-400 mt-0.5">Isi formulir &amp; upload berkas</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
          </button>
        ) : (
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center gap-4 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-600 text-sm">Data Pendaftaran</p>
              <p className="text-xs text-slate-400 mt-0.5">SPMB telah berakhir</p>
            </div>
          </div>
        )}

        {/* Status */}
        <Link
          href="/dashboard/siswa/status"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Clock size={20} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">Status Pendaftaran</p>
            <p className="text-xs text-gray-400 mt-0.5">Lihat hasil &amp; keputusan</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
        </Link>
      </div>

      {/* Checklist Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Kelengkapan Data</h2>
              <p className="text-sm text-gray-400 mt-0.5">{completionPct}% sudah diisi</p>
            </div>

            <div className="p-6 space-y-5">
              {Object.entries(
                getRequirementStatus().reduce((acc: Record<string, ReturnType<typeof getRequirementStatus>>, item) => {
                  if (!acc[item.section]) acc[item.section] = [];
                  acc[item.section].push(item);
                  return acc;
                }, {})
              ).map(([section, items]) => (
                <div key={section}>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{section}</h3>
                  <div className="space-y-1.5">
                    {items.map((req) => (
                      <div key={req.field} className="flex items-center gap-2.5 text-sm">
                        {req.completed ? (
                          <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-red-400 shrink-0" />
                        )}
                        <span className={req.completed ? "text-gray-700" : "text-gray-400"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {completionPct < 100 && (
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-700">
                  {getRequirementStatus().filter(r => !r.completed).length} data masih perlu dilengkapi.
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => { setShowModal(false); router.push("/dashboard/siswa/data-spmb"); }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#01793B] text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                Isi Formulir
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Data Pendaftaran Modal */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full"
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Data Pendaftaran</h2>
              <p className="text-sm text-gray-400 mt-0.5">Pilih bagian yang ingin dilengkapi</p>
            </div>

            <div className="p-4 space-y-2">
              <Link
                href="/dashboard/siswa/data-siswa"
                onClick={() => setShowDataModal(false)}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-emerald-50 border border-gray-100 hover:border-emerald-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B] shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">Data Calon Siswa</p>
                  <p className="text-xs text-gray-400">Nama, lahir, jenis kelamin, dll.</p>
                </div>
                <ArrowRight size={15} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
              </Link>

              <Link
                href="/dashboard/siswa/data-ortu"
                onClick={() => setShowDataModal(false)}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">Data Orang Tua</p>
                  <p className="text-xs text-gray-400">Nama ayah, ibu, pekerjaan, kontak.</p>
                </div>
                <ArrowRight size={15} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link
                href="/dashboard/siswa/berkas"
                onClick={() => setShowDataModal(false)}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-amber-50 border border-gray-100 hover:border-amber-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <Upload size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">Upload Berkas</p>
                  <p className="text-xs text-gray-400">Akta, KK, KTP, pas foto, dll.</p>
                </div>
                <ArrowRight size={15} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
              </Link>
            </div>

            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowDataModal(false)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
