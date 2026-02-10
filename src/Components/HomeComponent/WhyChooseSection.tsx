import { Building2, Lightbulb, Users } from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    id: 1,
    icon: Users,
    title: "Guru Yang Berpengalaman",
    description: "Didukung oleh guru-guru yang berpengalaman dalam mendidik anak usia dini.",
  },
  {
    id: 2,
    icon: Building2,
    title: "Fasilitas Sekolah",
    description: "Memiliki ruang belajar dan area bermain yang aman, nyaman, dan menyenangkan.",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Metode Pembelajaran",
    description: "Menggunakan metode pembelajaran yang interaktif, dan sesuai tahap perkembangan anak.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 md:px-0 grid md:grid-cols-2 gap-12 md:gap-20 items-center py-8 md:py-12">
      <div>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Mengapa Memilih Belajar di <br />
            <span className="bg-gradient-to-r from-[#01793B] to-emerald-600 bg-clip-text text-transparent">TK Azalia?</span>
          </h2>
        </div>

        <div className="space-y-8">
          {reasons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#01793B] to-emerald-600 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#01793B] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative h-[300px] md:h-[400px] w-full max-w-lg mx-auto hidden md:flex items-center justify-center">
        <div className="absolute w-full h-full bg-[#01793B]/15 rounded-3xl transform -rotate-3 -z-10"></div>

        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/7.jpeg"
              alt="Suasana Belajar di TK Azalia"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#01793B]/5 mix-blend-multiply"></div>
          </div>

          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-3 border-l-3 border-[#01793B] rounded-tl-lg"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-3 border-r-3 border-[#01793B] rounded-tr-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-3 border-l-3 border-[#01793B] rounded-bl-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-3 border-r-3 border-[#01793B] rounded-br-lg"></div>
        </div>
      </div>
    </section>
  );
}
