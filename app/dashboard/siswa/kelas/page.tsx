"use client";

import ClassSelection from "@/Components/Dashboard/ClassSelection";

export default function SiswaKelasPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Pilih Kelas SPMB</h1>
        <p className="text-sm text-gray-400 mt-0.5">Pilih kelas yang sesuai dengan usia putra/putri Anda</p>
      </div>
      <ClassSelection />
    </div>
  );
}
