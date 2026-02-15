export default function VisionCard() {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-br from-[#01793B]/5 to-emerald-600/5 rounded-full w-48 h-48 -top-20 -right-20"></div>
        <div className="absolute bg-gradient-to-tl from-[#01793B]/5 to-emerald-600/5 rounded-full w-40 h-40 -bottom-10 -left-10"></div>
      </div>

      <div className="relative p-5 md:p-6 z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-1 h-10 bg-gradient-to-b from-[#01793B] to-emerald-600 rounded-full flex-shrink-0"></div>
          <h2 className="text-xl font-bold text-gray-900">VISI</h2>
        </div>

        <p className="text-base text-gray-700 leading-relaxed font-medium">
          Menjadi taman kanak-kanak terdepan yang mencetak generasi unggul, berkarakter, dan siap menghadapi masa depan.
        </p>
      </div>
    </div>
  );
}
