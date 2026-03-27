import ProcessingMascot from "@/Components/Mascots/ProcessingMascot";
import RejectMascot from "@/Components/Mascots/RejectMascot";
import SuccessMascot from "@/Components/Mascots/SuccessMascot";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle, ClipboardList, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SiswaStatusSectionProps {
  status: { status_ppdb: string; catatan_ppdb: string | null } | null;
  requiredDocs?: string[];
}

export default function SiswaStatusSection({ status, requiredDocs = [] }: SiswaStatusSectionProps) {
  const router = useRouter();
  const statusKey = status?.status_ppdb?.toLowerCase() || "menunggu";
  const catatan = status?.catatan_ppdb;

  const renderStatusContent = () => {
    if (statusKey === "belum") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-8 md:p-12 shadow-2xl shadow-slate-200/50"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60" />
          
          <div className="relative flex flex-col md:flex-row gap-10 items-center">
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-slate-50 flex items-center justify-center shadow-inner border border-slate-100">
                <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                Status: Belum Lengkap
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Lengkapi Data Anda
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                  Kami belum bisa memverifikasi pendaftaran Anda karena ada data yang masih kosong. Selesaikan pengisian formulir dan upload berkas sekarang!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Data Calon Siswa", icon: "👤" },
                  { label: "Data Orang Tua", icon: "👨‍👩‍👧" },
                  { label: "Berkas Persyaratan", icon: "📄" },
                ].map((step, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-sm font-bold text-slate-700">{step.label}</span>
                  </div>
                ))}
              </div>

              {catatan && (
                <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100/50 text-slate-700 italic flex gap-3">
                  <span className="font-bold text-red-600 not-italic">Catatan:</span> {catatan}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    if (statusKey === "diterima" || statusKey === "lulus") {
      const docsToRender = requiredDocs.length > 0 
        ? requiredDocs 
        : ["Dokumen-dokumen validasi persyaratan Anda"];

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-emerald-600 to-teal-700 p-8 md:p-16 text-white text-center shadow-2xl shadow-emerald-200"
        >
          {/* Confetti-like decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px]" />
          
          <div className="relative flex flex-col items-center space-y-8">
            <div className="bg-white/20 backdrop-blur-xl rounded-full p-4 ring-8 ring-white/10">
              <SuccessMascot />
            </div>

            <div className="space-y-4 max-w-2xl">
              <div className="inline-block px-5 py-2 rounded-full bg-emerald-400/30 backdrop-blur-sm border border-emerald-400/50 text-[11px] font-black uppercase tracking-[0.3em]">
                Selamat! Hasil Seleksi
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                Siswa Berhasil Diterima
              </h1>
              <p className="text-xl text-emerald-50/80 font-medium">
                Kami sangat senang menyambut Anda sebagai bagian dari keluarga besar TK Azalia. Mari kita mulai perjalanan belajar yang menyenangkan bersama!
              </p>
            </div>

            {catatan && (
              <div className="w-full max-w-xl p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-emerald-50 font-medium italic">
                "{catatan}"
              </div>
            )}

            {/* Info Daftar Ulang */}
            <div className="w-full max-w-2xl bg-white/15 backdrop-blur-md rounded-3xl border border-white/20 p-6 md:p-8 text-left space-y-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-emerald-200" />
                <h3 className="text-lg font-black text-white">Langkah Selanjutnya: Daftar Ulang</h3>
              </div>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Silakan datang ke sekolah TK Azalia untuk melakukan <span className="font-black text-white">daftar ulang</span> dengan membawa dan menunjukkan file asli dokumen/berkas berikut:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {docsToRender.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 mt-4">
                <p className="text-[11px] font-bold text-emerald-200/70 uppercase tracking-widest">
                  Hubungi sekolah untuk informasi jadwal daftar ulang lebih lanjut.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => router.push('/dashboard/siswa')}
                className="px-8 py-3 rounded-2xl bg-white text-emerald-700 font-bold shadow-xl hover:bg-emerald-50 transition-all active:scale-95"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    if (statusKey === "ditolak" || statusKey === "tidak diterima" || statusKey === "tidak_lulus" || statusKey === "tidak lulus") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-slate-800 to-slate-900 p-8 md:p-16 text-white text-center shadow-2xl shadow-slate-200"
        >
          {/* Subtle background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[32px_32px]" />
          
          <div className="relative flex flex-col items-center space-y-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-full p-6 ring-8 ring-white/5 grayscale">
              <RejectMascot />
            </div>
 
            <div className="space-y-4 max-w-2xl">
              <div className="inline-block px-5 py-2 rounded-full bg-rose-500/20 backdrop-blur-sm border border-rose-500/30 text-[11px] font-black uppercase tracking-[0.3em] text-rose-300">
                Pengumuman Hasil Seleksi
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                Tetap Semangat!
              </h1>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">
                Terima kasih telah mendaftar di TK Azalia. Mohon maaf, pendaftaran Anda belum dapat kami terima saat ini. Teruslah melangkah maju, masih banyak kesempatan lain yang menanti Anda di depan!
              </p>
            </div>
 
            {catatan && (
              <div className="w-full max-w-xl p-8 bg-white/5 backdrop-blur-md rounded-4xl border border-white/10 text-slate-300 font-medium italic relative">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-slate-800 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 border border-white/10">
                  Pesan Dari Sekolah
                </div>
                "{catatan}"
              </div>
            )}
 
            <div className="pt-6 flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => router.push('/dashboard/siswa')}
                className="px-8 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10 backdrop-blur-sm"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Default: Menunggu / Diproses
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-8 md:p-16 text-center shadow-2xl shadow-slate-200/50"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="relative flex flex-col items-center space-y-10">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 animate-pulse" />
            <ProcessingMascot />
          </div>

          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] ring-1 ring-blue-100">
              Data Sedang Diverifikasi
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Sedang Dalam Proses
            </h1>
            
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Terima kasih! Kami telah menerima dokumen Anda. Saat ini tim admin sedang melakukan verifikasi data secara menyeluruh. Pengumuman akan muncul di halaman ini segera setelah proses selesai.
            </p>

            <div className="flex items-center justify-center gap-8 py-6">
              {[
                { label: "Data Diterima", active: true },
                { label: "Verifikasi", active: true, loading: true },
                { label: "Hasil Akhir", active: false },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.active 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-slate-100 text-slate-400"
                  } ${step.loading ? "animate-pulse" : ""}`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? "text-slate-900" : "text-slate-400"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
               <button 
                onClick={() => router.push('/dashboard/siswa')}
                className="px-8 py-3 rounded-2xl bg-[#01793B] hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-100"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>

          {catatan && (
            <div className="w-full max-w-xl p-6 bg-slate-50/50 rounded-2xl border border-slate-200/50 text-slate-600 text-sm italic">
               <span className="font-bold text-slate-900 not-italic">Catatan:</span> {catatan}
            </div>
          )}
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

