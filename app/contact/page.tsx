export default function ContactPage() {
  return (
    <main className="min-h-screen pt-36 pb-20 bg-gray-50 font-sans">
      
      {/* --- HEADER --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#01793B] font-semibold text-sm mb-4">
          Hubungi Kami
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Kami Siap Membantu <br />
          <span className="text-[#01793B]">Ayah & Bunda</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Punya pertanyaan seputar pendaftaran, kurikulum, atau kegiatan sekolah? 
          Jangan ragu untuk menghubungi kami atau berkunjung langsung ke sekolah.
        </p>
      </section>

      {/* --- KONTEN UTAMA (Grid Kiri: Info, Kanan: Form) --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* KOLOM KIRI: Informasi & Peta */}
          <div className="space-y-8">
            
            {/* Kartu Informasi Kontak */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                {/* Alamat */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#01793B] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Alamat Sekolah</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Jl. Pendidikan No. 123, Purwokerto,<br />
                      Jawa Tengah, Indonesia 53123
                    </p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#01793B] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Telepon & WhatsApp</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      (0281) 1234567 <br />
                      +62 812-3456-7890 (Admin WA)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#01793B] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      info@tkazalia.sch.id<br />
                      admin@tkazalia.sch.id
                    </p>
                  </div>
                </div>

                 {/* Jam Operasional */}
                 <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#01793B] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Jam Operasional</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Senin - Jumat: 07.00 - 14.00 WIB<br />
                      Sabtu: 07.00 - 12.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PETA (Google Maps Embed) */}
            <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-lg h-64 border border-gray-100">
              {/* Ini iframe contoh ke Alun-Alun Purwokerto. Nanti bisa diganti koordinat asli TK */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2705056776!2d109.2366!3d-7.4124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e8f00000001%3A0x0!2zN8KwMjQnNDQuNiJTIDEwOcKwMTQnMTguMiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* KOLOM KANAN: Form Pesan */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-4 border-[#01793B]">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Kirim Pesan</h3>
            <p className="text-gray-500 mb-8 text-sm">Silakan isi formulir di bawah ini, kami akan membalas secepatnya.</p>
            
            <form className="space-y-5">
              
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Nama Ayah/Bunda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                />
              </div>

              {/* Email & No HP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="0812..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subjek */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perihal</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white">
                  <option>Info Pendaftaran (PPDB)</option>
                  <option>Pertanyaan Umum</option>
                  <option>Saran & Masukan</option>
                  <option>Lainnya</option>
                </select>
              </div>

              {/* Pesan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea 
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Tombol Kirim */}
              <button type="button" className="w-full bg-[#01793B] text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Kirim Pesan Sekarang
              </button>

            </form>
          </div>

        </div>
      </section>

    </main>
  );
}