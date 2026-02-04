export default function MissionCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border-b-[8px] border-green-700 h-full">
      <h2 className="text-3xl font-bold text-[#01793B] mb-6">MISI</h2>
      <p className="text-gray-700 font-medium mb-4">
        Memberikan pendidikan terbaik melalui:
      </p>
      <ul className="space-y-3 text-gray-700 font-medium text-lg">
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          <span>Lingkungan belajar yang <span className="text-[#01793B] font-bold">aman</span> dan <span className="text-[#01793B] font-bold">nyaman</span></span>
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          <span>Kurikulum <span className="text-[#01793B] font-bold">holistik</span> berbasis permainan</span>
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          <span> Pendampingan oleh guru yang <span className="text-[#01793B] font-bold">berkompeten</span> </span>
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          <span>Kerjasama <span className="text-[#01793B] font-bold">erat</span> dengan orang tua</span>
        </li>
      </ul>
    </div>
  );
}
