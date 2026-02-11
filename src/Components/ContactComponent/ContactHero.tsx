import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative w-full pt-10 pb-28 md:pt-16 md:pb-28 flex items-center justify-center overflow-hidden mb-20 min-h-[500px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/fasilitas.jpeg" 
          alt="Fasilitas Sekolah"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#01793B] font-semibold text-sm mb-4">
          Hubungi Kami
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Kami Siap Membantu <br />
          <span className="text-green-400">Ayah & Bunda</span>
        </h1>
        <p className="text-gray-100 text-lg max-w-2xl mx-auto">
          Punya pertanyaan seputar pendaftaran, kurikulum, atau kegiatan sekolah?
          Jangan ragu untuk menghubungi kami atau berkunjung langsung ke sekolah.
        </p>        
      </div>
    </section>
  );
}