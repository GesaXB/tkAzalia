"use client";
import { Rocket } from "lucide-react";

export default function MissionCard() {
  return (
    <div className="group h-full bg-[#01793B] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden text-white">
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-tr-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-[50px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform duration-300">
            <Rocket className="text-white w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          MISI KAMI
          <span className="h-1 w-8 bg-white/50 rounded-full block"></span>
        </h2>

        <p className="text-white/90 text-base mb-6 font-medium">
          Memberikan pendidikan terbaik melalui:
        </p>

        <ul className="space-y-4">
          {[
            "Lingkungan belajar yang aman dan nyaman",
            "Kurikulum holistik berbasis permainan",
            "Pendampingan oleh guru yang berkompeten",
            "Kerjasama erat dengan orang tua"
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-white/90 group-hover:translate-x-1 transition-transform duration-300">
              <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}