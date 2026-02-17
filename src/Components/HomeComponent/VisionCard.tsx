"use client";
import { Target } from "lucide-react";

export default function VisionCard() {
  return (
    <div className="group h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110"></div>
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-[#01793B] rounded-2xl flex items-center justify-center mb-6 shadow-green-200 shadow-lg group-hover:rotate-6 transition-transform duration-300">
            <Target className="text-white w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          VISI KAMI
          <span className="h-1 w-8 bg-[#01793B] rounded-full block"></span>
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed font-medium">
          "Menjadi taman kanak-kanak terdepan yang mencetak generasi <span className="text-[#01793B] font-bold">unggul</span>, <span className="text-[#01793B] font-bold">berkarakter</span>, dan siap menghadapi masa depan."
        </p>
      </div>
    </div>
  );
}