export default function MissionCard() {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-gradient-to-br from-[#01793B]/5 to-emerald-600/5 rounded-full w-48 h-48 -top-20 -right-20"></div>
        <div className="absolute bg-gradient-to-tl from-[#01793B]/5 to-emerald-600/5 rounded-full w-40 h-40 -bottom-10 -left-10"></div>
      </div>

      <div className="relative p-5 md:p-6 z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-1 h-10 bg-gradient-to-b from-[#01793B] to-emerald-600 rounded-full flex-shrink-0"></div>
          <h2 className="text-xl font-bold text-gray-900">MISI</h2>
        </div>

        <p className="text-gray-700 text-base mb-4 font-medium">
          Memberikan pendidikan terbaik melalui:
        </p>

        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-[#01793B] font-bold flex-shrink-0">▸</span>
            <span>Lingkungan belajar yang <span className="text-[#01793B] font-semibold">aman</span> dan <span className="text-[#01793B] font-semibold">nyaman</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#01793B] font-bold flex-shrink-0">▸</span>
            <span>Kurikulum <span className="text-[#01793B] font-semibold">holistik</span> berbasis permainan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#01793B] font-bold flex-shrink-0">▸</span>
            <span>Pendampingan oleh guru yang <span className="text-[#01793B] font-semibold">berkompeten</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#01793B] font-bold flex-shrink-0">▸</span>
            <span>Kerjasama <span className="text-[#01793B] font-semibold">erat</span> dengan orang tua</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
