import Image from "next/image";

const testimonials = [
  {
    id: 1,
    heading: "Lingkungan sekolahnya aman dan gurunya perhatian.",
    body: "Kami merasa tenang karena anak belajar di lingkungan yang bersih, aman, dan selalu dalam pengawasan guru.",
    name: "Siti Aminah",
    role: "Orang Tua Murid Kelompok B",
    imageSrc: "/siti.jpeg", 
  },
  {
    id: 2,
    heading: "Anak jadi lebih percaya diri dan senang sekolah.",
    body: "Perkembangan anak terlihat dari cara berbicara, bersosialisasi, dan antusias berangkat sekolah setiap pagi.",
    name: "Rani Wulandari",
    role: "Orang Tua Murid Kelompok A",
    imageSrc: "/rani.jpeg",
  },
  {
    id: 3,
    heading: "Belajarnya menyenangkan dan tidak membuat anak tertekan.",
    body: "Metode belajar sambil bermain membuat anak tetap fokus, aktif, dan menikmati setiap kegiatan di sekolah.",
    name: "Sunarudin",
    role: "Orang Tua Murid Kelompok B",
    imageSrc: "/sunar.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="mb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* JUDUL SECTION */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-24 tracking-wide uppercase">
          TESTIMONI ORANG TUA
        </h2>

        {/* GRID KARTU TESTIMONI */}
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((item) => (
            // Kartu dengan Border Hijau
            <div key={item.id} className="border-2 border-[#01793B] p-8 flex flex-col h-full bg-white">
              
              {/* Heading Kutipan (Bold) */}
              <h3 className="text-lg font-bold text-center text-gray-900 mb-4 leading-tight">
                {item.heading}
              </h3>
              
              {/* Isi Kutipan (Italic & Gray) */}
              <p className="text-sm text-gray-600 text-center italic mb-8 flex-grow leading-relaxed">
                {item.body}
              </p>

              {/* Bagian Profil (Foto & Nama) */}
              <div className="flex items-center gap-4 mt-auto pt-4">
                {/* Pembungkus Gambar Lingkaran */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image 
                    src={item.imageSrc} 
                    alt={`Foto ${item.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {/* Teks Nama & Role */}
                <div className="text-left">
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