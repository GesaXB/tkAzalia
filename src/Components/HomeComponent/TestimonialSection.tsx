"use client";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  {
    id: 4,
    heading: "Lebih Mandiri dan Disiplin",
    body: "Alhamdulillah sebelumnya Hadif sudah pernah KB/PAUD karena anaknya aktif luar biasa. Semenjak di Azalia luar biasa banyak perubahan, lebih mandiri, disiplin, dan terkontrol aktifnya.",
    name: "Bunda Ami",
    role: "Wali Murid TK Azalia",
    imageSrc: "/ami.jpeg",
  },
];

export default function TestimonialSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // STATE BARU: Untuk menyimpan posisi scroll (0 sampai 100)
  const [scrollProgress, setScrollProgress] = useState(0);

  // FUNGSI BARU: Menghitung persentase scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const totalScroll = scrollWidth - clientWidth;
      
      // Hindari pembagian dengan nol
      if (totalScroll > 0) {
        const progress = (scrollLeft / totalScroll) * 100;
        setScrollProgress(progress);
      }
    }
  };

  // Efek Auto-Scroll
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 3500); 

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#01793B_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Kata Mereka</h2>
            <div className="w-20 h-1.5 bg-[#01793B] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Apa kata orang tua murid tentang TK Azalia?</p>
        </div>

        {/* Container Carousel */}
        <div 
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onScroll={handleScroll} // <--- Event listener dipasang di sini
          className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="min-w-[300px] md:min-w-[400px] snap-center bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col relative group cursor-grab active:cursor-grabbing"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-green-50 group-hover:text-green-100 transition-colors -z-0" />

              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight relative z-10 pr-8">
                "{item.heading}"
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 flex-grow relative z-10">
                {item.body}
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50 relative z-10">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100">
                  <Image
                    src={item.imageSrc}
                    alt={`Foto ${item.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-[#01793B] font-semibold mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* INDIKATOR GESER DINAMIS (PERBAIKAN) */}
        <div className="flex justify-center mt-2">
            <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 bottom-0 bg-[#01793B] rounded-full w-1/2 transition-all duration-150 ease-out"
                  style={{ 
                    left: `${scrollProgress}%`, 
                    transform: `translateX(-${scrollProgress}%)` 
                  }}
                ></div>
            </div>
        </div>

      </div>
    </section>
  );
}