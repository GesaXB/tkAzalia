export default function ProgramSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 w-full mb-16">
      
      {/* JUDUL SECTION */}
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide uppercase">
          Program Kami
        </h2>
      </div>

      {/* GRID KARTU PROGRAM */}
      <div className="grid md:grid-cols-2 gap-20">
        
        {/* KARTU KELOMPOK A */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-default">
          <div className="p-8 flex-grow text-center">
            <h3 className="text-3xl font-medium text-[#01793B] mb-2 group-hover:text-green-600 transition-colors">
              Kelompok A
            </h3>
            <p className="text-[#01793B] font-medium text-sm mb-8">
              Usia 4-5
            </p>
            <p className="text-gray-800 leading-relaxed text-justify">
              Pada tahap ini, anak mulai dikenalkan dengan kegiatan belajar yang menyenangkan, seperti mengenal huruf, angka, warna, dan bentuk, serta melatih kemandirian dan kemampuan sosial.
            </p>
          </div>
          {/* Footer Hijau */}
          <div className="h-6 bg-[#01793B] w-full group-hover:bg-green-600 transition-colors"></div>
        </div>

        {/* KARTU KELOMPOK B */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full 
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-default">
          <div className="p-8 flex-grow text-center">
            <h3 className="text-3xl font-medium text-[#01793B] mb-2 group-hover:text-green-600 transition-colors">
              Kelompok B
            </h3>
            <p className="text-[#01793B] font-medium text-sm mb-8">
              Usia 5-6
            </p>
            <p className="text-gray-800 leading-relaxed text-justify">
              Di kelas ini, anak dibiasakan belajar membaca, menulis, dan berhitung dasar, serta dilatih mengikuti aturan dan bekerja sama, sehingga siap melanjutkan ke Sekolah Dasar.
            </p>
          </div>
          {/* Footer Hijau */}
          <div className="h-6 bg-[#01793B] w-full group-hover:bg-green-600 transition-colors"></div>
        </div>

      </div>
    </section>
  );
}