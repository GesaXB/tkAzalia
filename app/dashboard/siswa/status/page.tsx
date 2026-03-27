"use client";

import { useEffect, useState } from "react";
import SiswaStatusSection from "@/Components/Dashboard/Siswa/SiswaStatusSection";
import { ensureSiswa, getSpmbStatus, listJenisBerkas } from "@/lib/client/spmb";

export default function SiswaStatusPage() {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ status_ppdb: string; catatan_ppdb: string | null } | null>(
    null,
  );
  const [dokumenReq, setDokumenReq] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      setError(null);
      await ensureSiswa();
      
      const [statusResponse, berkasResponse] = await Promise.all([
        getSpmbStatus(),
        listJenisBerkas()
      ]);

      if (!statusResponse.success) {
        setError(statusResponse.error || "Gagal memuat status SPMB");
      }
      setStatus(statusResponse.data || null);

      if (berkasResponse.success && berkasResponse.data) {
        setDokumenReq(berkasResponse.data.map(b => b.nama_berkas));
      }
    };
    load();
  }, []);

  return (
    <>
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <SiswaStatusSection status={status} requiredDocs={dokumenReq} />
    </>
  );
}

