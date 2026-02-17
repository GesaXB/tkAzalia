import Image from "next/image";

const testimonials = [
  {
    id: 1,
    heading: "Lingkungan sekolahnya aman dan gurunya perhatian.",
    body: "Sebelum anak saya sekolah dia speech delay.Beberapa Blan sebelum memasuki usia sekolah saya cari2 info sekolah yg agamis,bagus ,baik , guru nya telaten.Dan teman saya menyarankan di TK Azalia.Alhamdulillah saya merasa tidak salah pilih karna perkembangan anak saya naik signifikan terutama dalam kosa kata yang kini semakin jelas.sekarang anak saya aktif & senang bernyanyi.",
    name: "Bunda Reina",
    role: "Orang Tua Murid Kelompok A",
    imageSrc: "/reina.jpeg",
  },
  {
    id: 2,
    heading: "Anak jadi lebih percaya diri dan senang sekolah.",
    body: "sebelumnya nana sudah terlebih dulu mendaftar di TK lain, kemudian ada bunda2 yg menyarakan untuk nana melihat TK Azalia Nana kemudian datang ke Azalia dan nana merasa happy “Nana ingin sekolah disini saja papah ibu” kata nana Akhirnya nana masuk di Azalia dari pertama sekolah sudah happy dan tidak mau ditungguin orangtuanya Sampai sekarang Alhamdulillah nana happy dan semangat sekolah 😇😇",
    name: "Bunda Nana",
    role: "Orang Tua Murid Kelompok A",
    imageSrc: "/nana.jpeg",
  },
  {
    id: 3,
    heading: "Belajarnya menyenangkan dan tidak membuat anak tertekan.",
    body: "Dari pertama berkunjung ke TK Azalia untuk observasi sekolah, anak saya langsung menyukai sekolah ini. Saya memilih TK Azalia karena anak saya langsung menyampaikan \"aku mau sekolah disini bu\", sebelum ini observasi di TK sebelumnya namun anak saya kurang nyaman. Dan Alhamdulillah, setelah anak saya belajar di sini, dia selalu happy dan tumbuh menjadi pribadi yang mandiri dan bertanggung jawab",
    name: "Bunda Nazmi",
    role: "Orang Tua Murid Kelompok B2",
    imageSrc: "/nazmi.jpeg",
  },
];

export default function TestimonialSection() {
  return (
    <section>
      <div className="max-w-6xl mx-auto w-full">

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-10 tracking-wide uppercase">
          Testimoni Orang Tua
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-5 md:p-6 rounded-xl flex flex-col h-full border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#01793B]/20"
            >

              <h3 className="text-base font-bold text-center text-gray-900 mb-3 leading-tight">
                {item.heading}
              </h3>

              <p className="text-sm text-gray-600 text-center italic mb-6 flex-grow leading-relaxed">
                {item.body}
              </p>

              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image
                    src={item.imageSrc}
                    alt={`Foto ${item.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="text-left min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 italic">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}