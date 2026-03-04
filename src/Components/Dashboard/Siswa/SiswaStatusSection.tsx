import ProcessingMascot from "@/Components/Mascots/ProcessingMascot";
import RejectMascot from "@/Components/Mascots/RejectMascot";
import SuccessMascot from "@/Components/Mascots/SuccessMascot";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle, XCircle } from "lucide-react";

interface SiswaStatusSectionProps {
  status: { status_ppdb: string; catatan_ppdb: string | null } | null;
}

export default function SiswaStatusSection({ status }: SiswaStatusSectionProps) {
  const statusKey = status?.status_ppdb?.toLowerCase() || "menunggu";
  const catatan = status?.catatan_ppdb;

  const renderStatusContent = () => {
    if (statusKey === "belum") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 border border-slate-300 p-6 shadow-sm"
        >
          <div className="relative flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-slate-600" />
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 text-xs font-bold uppercase tracking-wide shadow-sm ring-1 ring-slate-200">
                Belum Lengkap
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  Data Pendaftaran Belum Lengkap
                </h3>
                <p className="mt-2 text-slate-700 font-medium leading-relaxed max-w-xl">
                  Ayo segera selesaikan pengisian data pendaftaran dan upload berkas persyaratan.
                  Semakin cepat data lengkap, semakin cepat kami bisa memverifikasi!
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-slate-700">Yang perlu Anda lakukan:</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Lengkapi semua data di form Data Pendaftaran
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Pilih kelas yang Anda inginkan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Upload semua dokumen persyaratan
                  </li>
                </ul>
              </div>

              {catatan && (
                <div className="mt-4 p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-700">
                  <span className="font-bold mr-1">Catatan:</span> {catatan}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    if (statusKey === "diterima" || statusKey === "lulus") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-200 p-6 shadow-md"
        >
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="shrink-0 relative">
              <SuccessMascot />
            </div>

            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-emerald-800 text-xs font-bold uppercase tracking-wide shadow-sm ring-1 ring-emerald-100">
                <CheckCircle className="w-3.5 h-3.5" />
                Diterima / Lulus
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-700">
                  Selamat! Kamu Lulus!
                </h3>
                <p className="mt-2 text-emerald-800/80 font-medium leading-relaxed max-w-xl">
                  Yeay! Selamat bergabung menjadi keluarga besar TK Azalia.
                  Siapkan senyum terbaikmu untuk hari pertama sekolah nanti ya!
                </p>
              </div>

              {catatan && (
                <div className="mt-4 p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-emerald-100 shadow-sm text-sm text-emerald-900">
                  <span className="font-bold mr-1">Pesan dari Sekolah:</span> {catatan}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    if (statusKey === "ditolak" || statusKey === "tidak diterima" || statusKey === "tidak_lulus" || statusKey === "tidak lulus") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-orange-50 to-rose-100 border border-rose-200 p-6 shadow-md"
        >
          <div className="relative flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <div className="shrink-0 relative">
              <RejectMascot />
            </div>

            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-rose-800 text-xs font-bold uppercase tracking-wide shadow-sm ring-1 ring-rose-100">
                <XCircle className="w-3.5 h-3.5" />
                Belum Diterima
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-orange-700">
                  Tetap Semangat Ya!
                </h3>
                <p className="mt-2 text-rose-800/80 font-medium leading-relaxed max-w-xl">
                  Jangan berkecil hati. Kamu tetap hebat dan istimewa!
                  Mungkin saat ini belum berjodoh, tapi masa depan cerah menantimu. Teruslah belajar dan bermain!
                </p>
              </div>

              {catatan && (
                <div className="mt-4 p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-rose-100 shadow-sm text-sm text-rose-900">
                  <span className="font-bold mr-1">📝 Catatan:</span> {catatan}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    // Default: Menunggu / Diproses - Data sudah lengkap
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 shadow-sm group hover:shadow-md transition-all duration-300"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50" />

        <div className="relative flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
          <div className="shrink-0 relative">
            <ProcessingMascot />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100 uppercase tracking-wider flex items-center gap-1.5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full"
                />
                Menunggu Hasil
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Verifikasi Admin
              </span>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                Data Anda Sedang Diverifikasi...
              </h3>
              <p className="mt-2 text-slate-500 font-medium leading-relaxed max-w-lg">
                Terima kasih telah melengkapi semua data pendaftaran! Tim admin kami sedang memeriksa kelengkapan berkas dan data Anda.
                Pengumuman hasil akan diumumkan sesuai jadwal yang telah ditentukan. 🔍
              </p>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <p className="text-xs font-semibold text-amber-900 mb-2">💡 Tips:</p>
              <p className="text-sm text-amber-800">
                Pastikan nomor WhatsApp Anda aktif untuk menerima notifikasi pengumuman hasil PPDB.
              </p>
            </div>

            {catatan && (
              <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Catatan:</span>
                  {catatan}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full transform transition-all">
      {renderStatusContent()}
    </div>
  );
}

