"use client";

import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { fetchProfile } from "@/lib/client/auth";
import { listInformasiPublik, PublicInformasiSekolahItem } from "@/lib/client/public";
import { clearToken } from "@/lib/client/session";
import { motion } from "framer-motion";
import { CheckCircle, FileCheck, FileText, HelpCircle, Info, School, Upload, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiswaPanduanPpdbPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [informasi, setInformasi] = useState<PublicInformasiSekolahItem[]>([]);

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
      const infoRes = await listInformasiPublik();
      if (!infoRes.success) {
        setError(infoRes.error || "Gagal memuat informasi PPDB");
      } else {
        setInformasi(infoRes.data || []);
      }
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
        Memuat panduan PPDB...
      </div>
    );
  }

  const steps = [
    {
      title: "1. Registrasi Akun",
      desc: "Buat akun menggunakan email dan password. Pastikan email aktif untuk menerima notifikasi.",
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "2. Lengkapi Data Diri",
      desc: "Isi formulir pendaftaran dengan data siswa dan orang tua yang valid sesuai dokumen resmi.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "3. Upload Berkas",
      desc: "Unggah scan/foto Akte Kelahiran, Kartu Keluarga, dan Pas Foto terbaru. Pastikan tulisan terbaca jelas.",
      icon: <Upload className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "4. Pilih Kelas",
      desc: "Pilih kelas sesuai usia anak (Kelompok A: 4-5 th, Kelompok B: 5-6 th). Pilihan hanya dapat dilakukan satu kali.",
      icon: <School className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "5. Verifikasi Admin",
      desc: "Admin sekolah akan memeriksa kelengkapan data dan berkas Anda. Pantau status secara berkala.",
      icon: <FileCheck className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "6. Pengumuman Kelulusan",
      desc: "Cek hasil seleksi di menu 'Status PPDB'. Jika diterima, ikuti petunjuk daftar ulang dari sekolah.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <DashboardShell
      title="Panduan PPDB TK Azalia"
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
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Alur Pendaftaran</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${step.color}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {informasi.some(i => i.tipe === "syarat_pendaftaran") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-500" />
              Informasi Tambahan
            </h3>
            <div className="grid gap-4">
              {informasi.filter(i => i.tipe === "syarat_pendaftaran").map((item) => (
                <div key={item.info_id} className="border border-slate-200/80 bg-slate-50/50 rounded-2xl p-5">
                  <h4 className="font-semibold text-slate-900 mb-2">{item.judul}</h4>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{item.konten}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  );
}

