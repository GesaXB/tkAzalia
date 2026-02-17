"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    heading: "Sangat Membantu Perkembangan Anak",
    body: "Anak saya speech delay, tapi setelah masuk sini perkembangannya signifikan. Kosakatanya makin jelas dan jadi lebih percaya diri.",
    name: "Bunda Reina",
    role: "Wali Murid Kelompok A",
    imageSrc: "/reina.jpeg",
  },
  {
    id: 2,
    heading: "Anak Happy, Orang Tua Tenang",
    body: "Nana sempet ga mau sekolah di tempat lain. Pas coba trial di Azalia langsung betah. Gurunya ramah dan penyayang banget.",
    name: "Bunda Nana",
    role: "Wali Murid Kelompok A",
    imageSrc: "/nana.jpeg",
  },
  {
    id: 3,
    heading: "Sekolah Favorit Anak",
    body: "Dari pertama observasi anak saya langsung bilang 'mau sekolah disini bu'. Lingkungannya nyaman dan metodenya menyenangkan.",
    name: "Bunda Nazmi",
    role: "Wali Murid Kelompok B",
    imageSrc: "/nazmi.jpeg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#01793B_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Kata Mereka</h2>
            <p className="text-gray-600 text-lg">Apa kata orang tua murid tentang TK Azalia?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100 group-hover:text-green-50 transition-colors" />

              <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight relative z-10">
                "{item.heading}"
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow relative z-10">
                {item.body}
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={item.imageSrc}
                    alt={`Foto ${item.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-[#01793B] font-semibold">{item.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}