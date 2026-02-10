export default function RequirementsCard() {
  const requirements = [
    'Scan Akta Kelahiran',
    'Scan Kartu Keluarga (KK)',
    'Pas Foto Warna (3x4)',
    'Usia minimal 4 tahun (TK A)'
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-[#01793B] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📂 Syarat Pendaftaran
      </h3>
      <ul className="space-y-4">
        {requirements.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-gray-600">
            <svg className="w-5 h-5 text-[#01793B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
