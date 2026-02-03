import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* BAGIAN KIRI: Logo & Nama Sekolah */}
      <div className="flex items-center gap-3">
        {/* Ganti '/logo.png' dengan path gambarmu nanti */}
        <div className="relative w-10 h-10">
            {/* Placeholder logo jika belum ada gambar */}
            <div className="w-10 h-10">
              <Image src="/logotk.png" alt="Logo TK Azalia" fill className="object-contain" />
            </div>
             {/* Jika sudah ada gambar logo, uncomment baris bawah ini dan hapus div placeholder di atas */}
             {/* <Image src="/logo.png" alt="Logo TK Azalia" fill className="object-contain" /> */}
        </div>
        
        <div className="flex flex-col">
            <span className="text-xl font-bold text-green-800 tracking-wide">TK AZALIA</span>
            {/* Teks kecil di bawah logo jika perlu */}
            {/* <span className="text-[10px] text-green-600 font-medium tracking-widest">PURWOKERTO</span> */}
        </div>
      </div>

      {/* BAGIAN TENGAH: Menu Navigasi */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {/* Link "Tentang" dibuat aktif (hijau dan tebal) sesuai gambar */}
        <Link href="/about" className="text-white font px-4 py-1 rounded-full bg-green-700 transition-colors">
          Tentang
        </Link>
        <Link href="/pendaftaran" className="text-gray-500 hover:text-green-700 transition-colors">
          Pendaftaran
        </Link>
        <Link href="/contact" className="text-gray-500 hover:text-green-700 transition-colors">
          Contact
        </Link>
      </div>

      {/* BAGIAN KANAN: Tombol Masuk & Daftar */}
      <div className="flex items-center gap-3">
        <Link 
          href="/login" 
          className="px-6 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition-colors"
        >
          Masuk
        </Link>
        <Link 
          href="/register" 
          className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors"
        >
          Daftar
        </Link>
      </div>
    </nav>
  );
}