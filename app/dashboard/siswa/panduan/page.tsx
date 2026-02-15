"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import SectionCard from "@/Components/Dashboard/SectionCard";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { listInformasiPublik, PublicInformasiSekolahItem } from "@/lib/client/public";

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
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat panduan PPDB...
      </div>
    );
  }

  const syaratItems = informasi.filter((i) => i.tipe === "syarat_pendaftaran");

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
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2 mb-4">
          {error}
        </div>
      ) : null}

      <div className="space-y-6">
        <SectionCard
          title="Alur PPDB Online"
          description="Ikuti langkah-langkah berikut untuk mendaftar PPDB TK Azalia."
        >
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
            <li>
              <span className="font-semibold">Cek jadwal dan syarat pendaftaran.</span> Pastikan
              jadwal PPDB sudah dibuka dan usia anak sesuai ketentuan.
            </li>
            <li>
              <span className="font-semibold">Siapkan dokumen yang dibutuhkan.</span> Akte
              kelahiran, KK, pas foto anak, dan dokumen lain sesuai syarat.
            </li>
            <li>
              <span className="font-semibold">Buat akun / login ke sistem.</span> Gunakan menu
              registrasi di halaman utama, lalu login sebagai orang tua/siswa.
            </li>
            <li>
              <span className="font-semibold">Lengkapi data dan upload berkas.</span> Isi formulir
              data siswa dengan benar, lalu upload dokumen yang diminta.
            </li>
            <li>
              <span className="font-semibold">Tunggu verifikasi.</span> Admin akan memeriksa
              kelengkapan berkas. Status bisa dipantau di menu &quot;Status PPDB&quot;.
            </li>
            <li>
              <span className="font-semibold">Cek pengumuman hasil.</span> Jika dinyatakan
              diterima, ikuti instruksi lanjutan seperti daftar ulang / menyerahkan berkas asli.
            </li>
          </ol>
        </SectionCard>

        {syaratItems.length > 0 && (
          <SectionCard
            title="Jadwal, Syarat, dan Dokumen"
            description="Informasi resmi yang diisi oleh admin sekolah."
          >
            <div className="space-y-3 text-sm text-gray-700">
              {syaratItems.map((item) => (
                <div key={item.info_id} className="border border-gray-100 rounded-xl p-3">
                  <p className="font-semibold text-gray-900">{item.judul}</p>
                  <p className="text-xs text-gray-400 mb-1">{item.slug}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{item.konten}</p>
                </div>
              ))}
              {syaratItems.length === 0 && (
                <p className="text-sm text-gray-500">
                  Belum ada jadwal atau syarat yang diinput admin. Silakan hubungi pihak sekolah.
                </p>
              )}
            </div>
          </SectionCard>
        )}
      </div>
    </DashboardShell>
  );
}

