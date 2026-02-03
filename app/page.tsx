import Link from "next/link";

export default function Home() {
  return (
    // Container utama
    <main className="relative min-h-screen overflow-hidden font-sans">
      
      {/* --- BACKGROUND DECORATION (Lingkaran Hijau) --- */}
      {/* Lingkaran Kiri Atas */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-700/20 rounded-full blur-2xl -z-10 md:w-[600px] md:h-[600px] md:-top-80 md:-left-60"></div>
      
      {/* Lingkaran Kanan Bawah */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-700/20 rounded-full blur-2xl -z-10 md:w-[700px] md:h-[700px] md:-bottom-80 md:-right-60"></div>

      {/* --- KONTEN UTAMA --- */}
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* HERO SECTION (Selamat Datang) */}
        <section className="text-center flex flex-col items-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Selamat Datang di <br />
            TK <span className="text-green-700">Azalia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
            "Rumah kedua bagi buah hati Anda untuk tumbuh cerdas dan berakhlak mulia"
          </p>
          
          {/* Tombol Hijau */}
          <Link 
            href="/about" 
            className="group flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-all shadow-md"
          >
            Pelajari lebih...
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </section>

        {/* VISI & MISI CARDS */}
        <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* KARTU VISI */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-b-[8px] border-green-700 h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">VISI</h2>
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              "Menjadi taman kanak-kanak terdepan yang mencetak generasi unggul, berkarakter, dan siap menghadapi masa depan"
            </p>
          </div>

          {/* KARTU MISI */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-b-[8px] border-green-700 h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">MISI</h2>
            <p className="text-gray-700 font-medium mb-4">
              Memberikan pendidikan terbaik melalui:
            </p>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                <span>Lingkungan belajar yang aman dan <span className="text-green-700 font-bold">nyaman</span></span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                Kurikulum holistik berbasis permainan
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                Pendampingan oleh guru yang berkompeten
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-900">•</span>
                Kerjasama erat dengan orang tua
              </li>
            </ul>
          </div>

        </section>

      </div>
    </main>
  );
}