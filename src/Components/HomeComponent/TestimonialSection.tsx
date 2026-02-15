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