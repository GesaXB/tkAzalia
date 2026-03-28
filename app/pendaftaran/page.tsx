import type { Metadata } from "next";
import PendaftaranSection from "@/Components/sections/PendaftaranPage";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pendaftaran PPDB - TK Azalia",
  description: "Daftar sekarang di TK Azalia! Penerimaan Peserta Didik Baru (PPDB) masih terbuka. Temukan informasi syarat pendaftaran, jadwal PPDB, dan dokumen yang diperlukan.",
  keywords: ["PPDB TK Azalia", "pendaftaran TK Azalia", "SPMB TK Azalia", "daftar TK Azalia", "pendaftaran PAUD"],
  alternates: { canonical: '/pendaftaran' },
  openGraph: {
    title: "Pendaftaran PPDB - TK Azalia",
    description: "Daftarkan putra-putri Anda di TK Azalia. Informasi lengkap syarat dan jadwal PPDB tersedia di sini.",
    url: '/pendaftaran',
  },
};



// Paksa halaman ini selalu SSR (tidak di-cache) agar data jadwal selalu fresh
export const dynamic = 'force-dynamic';

export default async function Page() {
  const [jenisBerkas, jadwalPpdb] = await Promise.all([
    prisma.jenisBerkas.findMany({ select: { nama_berkas: true } }),
    prisma.ppdbSetting.findFirst()
  ]);

  const dokumenList = jenisBerkas.map(b => b.nama_berkas);

  let jadwalData = null;
  if (jadwalPpdb) {
    jadwalData = {
      tanggal_mulai: jadwalPpdb.tanggal_mulai.toISOString(),
      tanggal_selesai: jadwalPpdb.tanggal_selesai.toISOString()
    };
  }

  return <PendaftaranSection dokumen={dokumenList} jadwal={jadwalData} />;
}