import { BookOpen, Lightbulb } from "lucide-react";

export default function ProgramSection() {
  const programs = [
    {
      id: 1,
      icon: BookOpen,
      title: "Kelompok A - PAUD",
      subtitle: "Usia 4-5 Tahun",
      description: "Program pendidikan anak usia dini interaktif di TK Azalia untuk kelompok A. Anak-anak belajar mengenal huruf, angka, warna, dan bentuk melalui permainan edukatif yang menyenangkan. Kami fokus mengembangkan kemandirian dan keterampilan sosial mereka dalam lingkungan belajar yang aman dan mendukung.",
    },
    {
      id: 2,
      icon: Lightbulb,
      title: "Kelompok B - Persiapan SD",
      subtitle: "Usia 5-6 Tahun",
      description: "Program pra-sekolah dasar di TK Azalia untuk kelompok B dengan fokus pembelajaran akademik dan pengembangan karakter. Anak-anak belajar membaca, menulis, dan berhitung dengan metode pembelajaran terpadu. Kami mempersiapkan anak dengan disiplin, tanggung jawab, dan kemampuan kerja sama untuk melanjutkan ke Sekolah Dasar.",
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 w-full py-16 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Program Pendidikan Kami
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#01793B] to-emerald-600 rounded-full mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          TK Azalia menawarkan program pendidikan anak usia dini yang komprehensif dengan kurikulum interaktif dan metode pembelajaran berbasis bermain untuk perkembangan optimal setiap anak.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {programs.map((program) => {
          const IconComponent = program.icon;
          return (
            <article
              key={program.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-50"
            >
              <div className="relative p-8 md:p-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#01793B]/5 to-emerald-600/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-start gap-4 mb-6">
                  <div className="p-3.5 bg-gradient-to-br from-[#01793B]/15 to-emerald-600/10 rounded-2xl group-hover:from-[#01793B]/25 group-hover:to-emerald-600/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[#01793B]" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#01793B] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm text-[#01793B] font-semibold mt-2">
                      {program.subtitle}
                    </p>
                  </div>
                </div>

                <p className="relative text-gray-700 leading-relaxed text-base">
                  {program.description}
                </p>

                <div className="relative mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-[#01793B] font-semibold group-hover:translate-x-1 transition-transform cursor-pointer">
                  <span>Ketahui detail program</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
