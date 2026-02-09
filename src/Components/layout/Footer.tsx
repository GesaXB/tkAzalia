import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-[#01793B]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* --- BAGIAN ATAS (GRID 4 KOLOM) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* KOLOM 1: IDENTITAS SEKOLAH */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 relative inline-block">
              TK AZALIA
              {/* Garis Bawah Putih Pendek */}
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white rounded-full"></span>
            </h3>
            
            <div className="flex items-center gap-3 mt-4">
               {/* Logo Sekolah */}
              <div className="relative w-12 h-12 bg-white rounded-full p-1">
                <Image 
                    src="/logotk.png" 
                    alt="Logo TK Azalia" 
                    fill 
                    className="object-contain p-1" 
                />
              </div>
              <span className="font-bold text-xl tracking-wide">TK AZALIA</span>
            </div>
          </div>

          {/* KOLOM 2: TENTANG KAMI */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Tentang Kami
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white rounded-full"></span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              TK Azalia adalah lembaga pendidikan anak usia dini yang berfokus pada pembentukan karakter, kemandirian, dan kecerdasan anak melalui metode belajar sambil bermain yang menyenangkan.
            </p>
          </div>

          {/* KOLOM 3: LINK PENTING */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Link Penting
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#01793B] flex items-center gap-2 transition-colors">
                  <span>›</span> Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#01793B] flex items-center gap-2 transition-colors">
                  <span>›</span> Profil Sekolah
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="hover:text-[#01793B] flex items-center gap-2 transition-colors">
                  <span>›</span> Info Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#01793B] flex items-center gap-2 transition-colors">
                  <span>›</span> Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: INFORMASI KONTAK */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Informasi Kontak
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                {/* Icon Map */}
                <svg className="w-5 h-5 text-[#01793B] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Jl. Pendidikan No. 123, Purwokerto, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Icon Phone */}
                <svg className="w-5 h-5 text-[#01793B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>(0281) 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Icon Mail */}
                <svg className="w-5 h-5 text-[#01793B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>info@tkazalia.sch.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BAGIAN BAWAH (COPYRIGHT) --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 TK Azalia. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">
            Website developed by <span className="text-white font-medium">SMK Telkom Purwokerto</span>
          </p>
        </div>

      </div>
    </footer>
  );
}