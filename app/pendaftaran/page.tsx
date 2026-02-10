import Link from "next/link";

export default function PendaftaranPage() {
  return (
    <main className="min-h-screen pt-36 pb-20 bg-gray-50 font-sans">
      
      {/* --- HEADER (Tidak ada perubahan) --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#01793B] font-semibold text-sm mb-4">
          Tahun Ajaran 2025/2026
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Penerimaan Peserta Didik Baru <br />
          <span className="text-[#01793B]">(PPDB) Online</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Bergabunglah bersama keluarga besar TK Azalia. Kami siap membimbing buah hati Anda 
          menuju masa depan yang cerah dengan landasan iman dan karakter mulia.
        </p>
      </section>

      {/* --- ALUR PENDAFTARAN (Tidak ada perubahan) --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Alur Pendaftaran</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Langkah 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#01793B] text-white flex items-center justify-center rounded-full text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Buat Akun</h3>
            <p className="text-gray-500 text-sm">Lakukan pendaftaran akun orang tua melalui website ini.</p>
          </div>
          {/* Langkah 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#01793B] text-white flex items-center justify-center rounded-full text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Isi Formulir</h3>
            <p className="text-gray-500 text-sm">Lengkapi data diri anak dan orang tua serta upload dokumen.</p>
          </div>
          {/* Langkah 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#01793B] text-white flex items-center justify-center rounded-full text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Observasi</h3>
            <p className="text-gray-500 text-sm">Jadwal observasi/wawancara akan diinformasikan via WhatsApp/Email.</p>
          </div>
          {/* Langkah 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#01793B] text-white flex items-center justify-center rounded-full text-xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Pengumuman</h3>
            <p className="text-gray-500 text-sm">Hasil seleksi akan diumumkan melalui akun Anda.</p>
          </div>
        </div>
      </section>

      {/* --- PERSYARATAN & BIAYA --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Persyaratan */}
          {/* UPDATE 1: Menambahkan animasi hover naik dan bayangan */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-[#01793B] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📂 Syarat Pendaftaran
            </h3>
            <ul className="space-y-4">
              {['Scan Akta Kelahiran', 'Scan Kartu Keluarga (KK)', 'Pas Foto Warna (3x4)', 'Usia minimal 4 tahun (TK A)'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-[#01793B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Info Biaya */}
          {/* UPDATE 2: Menambahkan animasi hover naik dan bayangan yang sama */}
          <div className="bg-[#01793B] p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                💰 Informasi Biaya
              </h3>
              <p className="opacity-90 mb-6">
                Untuk rincian biaya pendaftaran, SPP bulanan, dan uang gedung, silakan unduh brosur digital kami atau hubungi admin.
              </p>
            </div>
            <button className="bg-white text-[#01793B] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors w-fit">
              Hubungi via WhatsApp
            </button>
          </div>

        </div>
      </section>

      {/* --- CTA (Call to Action) --- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#01793B] to-green-600 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Sudah Siap Mendaftar?</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto relative z-10">
            Kuota terbatas! Segera daftarkan putra-putri Anda sekarang juga melalui sistem online kami.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            {/* Tombol Daftar Sekarang */}
            {/* UPDATE 3: Menghapus 'hover:scale-105' agar tidak membesar, hanya bayangan saja */}
            <Link 
              href="/register" 
              className="px-8 py-3 bg-white text-[#01793B] font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Daftar Sekarang
            </Link>
            {/* Tombol Tanya Dulu (Tidak diubah, efeknya sudah sederhana) */}
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Tanya Dulu
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}