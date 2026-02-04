export default function WhyChooseSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 md:px-0">
      
      {/* JUDUL SECTION */}
      <div className="mb-12 text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          Mengapa Memilih Belajar di <br />
          <span className="text-[#01793B]">TK Azalia?</span>
        </h2>
      </div>

      {/* LIST ITEMS */}
      <div className="space-y-10">
        
        {/* 1: Guru Berpengalaman  */}
        <div className="flex gap-6 items-start">
          {/* Icon Kotak Hijau */}
          <div className="flex-shrink-0 w-16 h-16 bg-[#01793B] rounded-2xl"></div>
          
          <div>
            <h3 className="text-xl font-bold text-[#01793B] mb-2">
              Guru Yang Berpengalaman
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Didukung oleh guru-guru yang berpengalaman dalam mendidik anak usia dini.
            </p>
          </div>
        </div>

        {/* 2: Fasilitas Sekolah */}
        <div className="flex gap-6 items-start">
          {/* Icon Kotak Hijau Polos */}
          <div className="flex-shrink-0 w-16 h-16 bg-[#01793B] rounded-2xl shadow-sm"></div>
          
          <div>
            <h3 className="text-xl font-bold text-[#01793B] mb-2">
              Fasilitas Sekolah
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Memiliki ruang belajar dan area bermain yang aman, nyaman, dan menyenangkan.
            </p>
          </div>
        </div>

        {/* 3: Metode Pembelajaran */}
        <div className="flex gap-6 items-start">
          {/* Icon Kotak Hijau Polos */}
          <div className="flex-shrink-0 w-16 h-16 bg-[#01793B] rounded-2xl shadow-sm"></div>
          
          <div>
            <h3 className="text-xl font-bold text-[#01793B] mb-2">
              Metode Pembelajaran
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Menggunakan metode pembelajaran yang interaktif, dan sesuai tahap perkembangan anak.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}