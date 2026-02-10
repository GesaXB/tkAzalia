export default function MissionCard() {
  return (
    <div className="bg-white p-7 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">
          MISI
        </h2>
      </div>

      <p className="text-gray-700 mb-4 pl-4">
        Memberikan pendidikan terbaik melalui:
      </p>

      <ul className="space-y-3 text-gray-700 pl-4 border-l-2 border-green-100">
        <li className="flex items-start">
          <span className="mr-2 text-green-600 font-bold">▸</span>
          <span>Lingkungan belajar yang <span className="text-green-600 font-semibold">aman</span> dan <span className="text-green-600 font-semibold">nyaman</span></span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-600 font-bold">▸</span>
          <span>Kurikulum <span className="text-green-600 font-semibold">holistik</span> berbasis permainan</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-600 font-bold">▸</span>
          <span>Pendampingan oleh guru yang <span className="text-green-600 font-semibold">berkompeten</span></span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-600 font-bold">▸</span>
          <span>Kerjasama <span className="text-green-600 font-semibold">erat</span> dengan orang tua</span>
        </li>
      </ul>
    </div>
  );
}
