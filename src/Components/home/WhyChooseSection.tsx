import Image from "next/image";

const reasons = [
  {
    id: 1,
    title: "Guru Yang Berpengalaman",
    description: "Didukung oleh guru-guru yang berpengalaman dalam mendidik anak usia dini.",
  },
  {
    id: 2,
    title: "Fasilitas Sekolah",
    description: "Memiliki ruang belajar dan area bermain yang aman, nyaman, dan menyenangkan.",
  },
  {
    id: 3,
    title: "Metode Pembelajaran",
    description: "Menggunakan metode pembelajaran yang interaktif, dan sesuai tahap perkembangan anak.",
  },
];

export default function WhyChooseSection() {
  return (
    // UBAH 1: Ganti 'items-center' jadi 'items-start' agar kita bisa atur turunnya manual
    <section className="max-w-7xl mx-auto w-full px-4 md:px-0 grid md:grid-cols-2 gap-12 md:gap-20 items-start">
      
      {/* --- KOLOM KIRI: Teks & List --- */}
      <div>
        {/* JUDUL */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Mengapa Memilih Belajar di <br />
            <span className="text-[#01793B]">TK Azalia?</span>
          </h2>
        </div>

        {/* LIST ITEMS */}
        <div className="space-y-10">
          {reasons.map((item) => (
            <div key={item.id} className="flex gap-6 items-start">
              {/* Icon Kotak Hijau */}
              <div className="flex-shrink-0 w-16 h-16 bg-[#01793B] rounded-2xl shadow-sm"></div>
              <div>
                <h3 className="text-xl font-bold text-[#01793B] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- KOLOM KANAN: Gambar --- */}
      {/* UBAH 2: Saya ganti 'md:mt-16' menjadi 'md:mt-32' supaya gambarnya turun jauh ke bawah */}
      <div className="relative h-[300px] md:h-[350px] w-full max-w-lg mx-auto rounded-3xl overflow-hidden border-4 border-[#01793B] shadow-xl mt-12 md:mt-36 hidden md:block">
        <Image
          src="/7.jpeg" 
          alt="Suasana Belajar di TK Azalia"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay hijau tipis */}
        <div className="absolute inset-0 bg-[#01793B]/10 mix-blend-multiply"></div>
      </div>

    </section>
  );
}