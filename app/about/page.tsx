import Image from "next/image";

export default function AboutPage() {
  return (
    // 'pt-36': Memberi jarak agar tidak tertutup Navbar (Fixed)
    <main className="min-h-screen pt-36 pb-20 bg-white font-sans">
      
      {/* --- SECTION 1: HEADER & INTRO --- */}
      <section className="max-w-7xl mx-auto px-4 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#01793B] mb-6">
          Tentang TK Azalia
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          TK Azalia adalah lembaga pendidikan anak usia dini yang berdedikasi untuk 
          mencetak generasi yang tidak hanya <span className="font-bold text-[#01793B]">cerdas secara akademis</span>, 
          tetapi juga memiliki <span className="font-bold text-[#01793B]">akhlak mulia</span> dan kepribadian yang mandiri.
        </p>
      </section>

      {/* --- SECTION 2: FOTO & SEJARAH SINGKAT --- */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Gambar Sekolah / Kegiatan */}
          <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100">
             {/* Pastikan file '7.jpeg' ada di folder public */}
             <Image 
               src="" 
               alt="Gedung TK Azalia" 
               fill 
               className="object-cover"
             />
          </div>
          
          {/* Teks Sejarah */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Perjalanan Kami
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              Berdiri sejak tahun 20XX, TK Azalia hadir menjawab kebutuhan orang tua akan pendidikan 
              yang seimbang antara ilmu pengetahuan umum dan penanaman nilai-nilai karakter. 
              Kami percaya bahwa setiap anak adalah bintang yang memiliki potensi unik untuk bersinar.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Dengan dukungan tenaga pengajar yang profesional dan lingkungan yang asri, 
              kami terus berkomitmen untuk menjadi rumah kedua yang nyaman bagi buah hati Anda.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: VISI & MISI (Kartu Hijau & Putih) --- */}
      <section className="bg-gray-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#01793B]">DEMO PAGE</h2>
            <p className="text-gray-500 mt-2">Arah dan tujuan pendidikan kami</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* KARTU VISI (Hijau Full) */}
            <div className="bg-[#01793B] rounded-3xl p-10 text-white shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  {/* Icon Mata/Visi */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">DEMO PAGE</h3>
              </div>
              <p className="text-lg leading-relaxed opacity-90">
                "DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE."
              </p>
            </div>

            {/* KARTU MISI (Putih Border Hijau) */}
            <div className="bg-white rounded-3xl p-10 text-gray-800 shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-green-50 rounded-xl text-[#01793B]">
                  {/* Icon List/Misi */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#01793B]">DEMO PAGE</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#01793B] font-bold">•</span>
                  <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01793B] font-bold">•</span>
                  <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#01793B] font-bold">•</span>
                  <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 4: KEPALA SEKOLAH --- */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Sambutan Kepala Sekolah</h2>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative">
          
          {/* Foto Profil Bulat */}
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden relative border-4 border-white shadow-md -mt-12">
             {/* Placeholder Foto KS */}
             <div className="w-full h-full bg-[#01793B] flex items-center justify-center text-white text-2xl font-bold">
               KS
             </div>
          </div>
          
          <blockquote className="text-gray-600 italic text-lg mb-6">
            "Pendidikan anak usia dini adalah fondasi masa depan bangsa. Kami di TK Azalia berkomitmen penuh untuk memberikan layanan pendidikan terbaik dengan sepenuh hati."
          </blockquote>
          
          <div>
            <h4 className="text-xl font-bold text-[#01793B]">Ibu Kepala Sekolah, S.Pd.</h4>
            <p className="text-sm text-gray-500">Kepala TK Azalia</p>
          </div>
        </div>
      </section>

    </main>
  );
}