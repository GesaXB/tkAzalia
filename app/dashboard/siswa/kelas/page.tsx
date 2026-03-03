"use client";

import ClassSelection from "@/Components/Dashboard/ClassSelection";

export default function SiswaKelasPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 bg-linear-to-r from-[#01793B]/5 to-[#01793B]/10 rounded-2xl p-6 border border-[#01793B]/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#01793B]/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#01793B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m-6-8a2 2 0 100 4m0-4a2 2 0 110 4" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Pilih Kelas PPDB</h1>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Pilih kelas yang sesuai dengan usia dan kebutuhan anak Anda. Pastikan pilihan Anda tepat karena kelas tidak dapat diubah setelah disimpan. Hubungi pihak sekolah jika ada pertanyaan tentang kriteria kelas.
              </p>
            </div>
          </div>
        </div>

        {/* Class Selection Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <ClassSelection />
        </div>
      </div>
    </>
  );
}
