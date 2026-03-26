"use client";

import { getJadwalPpdb } from "@/lib/client/public";
import { ensureSiswa, getListKelas, getSiswaMe, listBerkas } from "@/lib/client/spmb";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, BookOpen, Check, CheckCircle2, FileText, Upload, X, UserCircle, Users, FileStack, School } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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


export default function SiswaDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [berkasCount, setBerkasCount] = useState(0);
  const [spmbInfo, setSpmbInfo] = useState<{ opened: boolean; tanggalSelesai: string }>({ opened: true, tanggalSelesai: "" });
  const [siswaData, setSiswaData] = useState<SiswaData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      await ensureSiswa();
      const [berkasRes, jadwalRes, siswaRes, kelasRes] = await Promise.all([
        listBerkas(),
        getJadwalPpdb(),
        getSiswaMe(),
        getListKelas(),
      ]);
      if (!berkasRes.success) setError(berkasRes.error || "Gagal memuat berkas");
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

      {/* Small Summary Grid */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Completion Card - Modern Progress Card */}
        <button
          onClick={() => setShowModal(true)}
          className="group relative overflow-hidden bg-white rounded-[2.5rem] border border-gray-100 p-6 flex items-center gap-6 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 text-left"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100/50 transition-colors" />
          
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle 
                cx="32" cy="32" r="28" fill="none" 
                stroke={completionPct === 100 ? "#10b981" : "#3b82f6"} 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeDasharray={`${(completionPct / 100) * 175.9} 175.9`} 
                className="transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-black transition-colors ${completionPct === 100 ? "text-emerald-600" : "text-blue-600"}`}>
                {completionPct}%
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 relative">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[9px] font-black text-blue-600 uppercase tracking-widest mb-2">
              Status Data
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">Kelengkapan Profil</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Lengkapi data pendaftaran Anda sekarang</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <ArrowRight size={18} />
          </div>
        </button>
      </div>

      {/* Status SPMB Card - Generic without revealing status */}
      <Link
        href="/dashboard/siswa/status"
        className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 shadow-inner">
          <FileText size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Informasi SPMB</p>
          <p className="text-sm font-bold text-gray-700">Lihat informasi terbaru mengenai status pendaftaran Anda</p>
        </div>
        <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
      </Link>

      {/* Broad Info Message */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#01793B] shrink-0">
           <CheckCircle2 size={18} />
        </div>
        <div className="flex-1">
           <h4 className="text-sm font-black text-slate-900 tracking-tight">Pusat Informasi SPMB</h4>
           <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
             Sistem sedang melakukan sinkronisasi data Anda dengan panitia pusat. Silakan pantau pendaftaran Anda secara berkala melalui menu yang tersedia.
           </p>
        </div>
      </div>

      {/* Quick action cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
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

        {/* Isi Data / Pusat Dokumen */}
        {spmbInfo.opened ? (
          <button
            onClick={() => setShowModal(true)}
            className="group relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left w-full"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50/50 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-emerald-100/50 transition-colors" />
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#01793B] shadow-inner relative">
              <BookOpen size={28} />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>
            <div className="flex-1 relative">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Pendaftaran Aktif</p>
              <h3 className="text-xl font-black text-slate-900">Data Pendaftaran</h3>
              <p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">Kelola formulir & berkas persyaratan siswa</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} />
            </div>
          </button>
        ) : (
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 flex items-center gap-6 opacity-60">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="font-bold text-slate-600 text-lg leading-tight">Data Pendaftaran</p>
              <p className="text-sm text-slate-400 mt-1">Sistem pendaftaran saat ini telah ditutup</p>
            </div>
          </div>
        )}
      </div>

      {/* Checklist Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with progress ring */}
            <div className="relative bg-linear-to-br from-slate-50 to-white px-6 pt-8 pb-6 border-b border-slate-100">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
              <div className="flex items-center gap-5">
                {/* Circular Progress */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={completionPct === 100 ? "#10b981" : "#3b82f6"} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(completionPct / 100) * 175.9} 175.9`} className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-black ${completionPct === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>{completionPct}%</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Kelengkapan Data SPMB</h2>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {completionPct === 100 ? 'Semua data sudah lengkap!' : `${getRequirementStatus().filter(r => r.completed).length} dari ${requirements.length} data terisi`}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist grouped by section */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {Object.entries(
                getRequirementStatus().reduce((acc: Record<string, ReturnType<typeof getRequirementStatus>>, item) => {
                  if (!acc[item.section]) acc[item.section] = [];
                  acc[item.section].push(item);
                  return acc;
                }, {})
              ).map(([section, items]) => {
                const sectionComplete = items.every(i => i.completed);
                return (
                  <div key={section} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{section}</h3>
                      {sectionComplete && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Lengkap</span>
                      )}
                    </div>
                    <div className="bg-slate-50/60 rounded-2xl border border-slate-100 divide-y divide-slate-100">
                      {items.map((req) => (
                        <div key={req.field} className="flex items-center gap-3 px-4 py-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            req.completed 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-slate-200 text-slate-400'
                          }`}>
                            {req.completed 
                              ? <Check size={12} strokeWidth={3} /> 
                              : <X size={10} strokeWidth={3} />
                            }
                          </div>
                          <span className={`text-sm font-medium ${req.completed ? 'text-slate-700' : 'text-slate-400'}`}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {completionPct < 100 && (
                <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3.5">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 font-medium">
                    {getRequirementStatus().filter(r => !r.completed).length} data masih perlu dilengkapi untuk menyelesaikan pendaftaran.
                  </p>
                </div>
              )}
            </div>

            {/* Quick actions footer */}
            <div className="border-t border-slate-100 px-6 py-4 space-y-3 bg-slate-50/50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Lengkapi Data</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard/siswa/data-siswa"
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                >
                  <UserCircle size={18} className="text-emerald-500" /> Data Siswa
                </Link>
                <Link
                  href="/dashboard/siswa/data-ortu"
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all"
                >
                  <Users size={18} className="text-blue-500" /> Data Orang Tua
                </Link>
                <Link
                  href="/dashboard/siswa/berkas"
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition-all"
                >
                  <FileStack size={18} className="text-amber-500" /> Upload Berkas
                </Link>
                <Link
                  href="/dashboard/siswa/kelas"
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 transition-all"
                >
                  <School size={18} className="text-violet-500" /> Pilih Kelas
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
