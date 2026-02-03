export default function MissionCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border-b-[8px] border-green-700 h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">MISI</h2>
      <p className="text-gray-700 font-medium mb-4">
        Memberikan pendidikan terbaik melalui:
      </p>
      <ul className="space-y-3 text-gray-700 font-medium">
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          <span>Lingkungan belajar yang aman dan <span className="text-green-700 font-bold">nyaman</span></span>
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          Kurikulum holistik berbasis permainan
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          Pendampingan oleh guru yang berkompeten
        </li>
        <li className="flex items-start">
          <span className="mr-3 text-gray-900">•</span>
          Kerjasama erat dengan orang tua
        </li>
      </ul>
    </div>
  );
}
