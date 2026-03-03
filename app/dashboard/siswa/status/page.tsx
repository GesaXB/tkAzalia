"use client";

import { useEffect, useState } from "react";
import SiswaStatusSection from "@/Components/Dashboard/Siswa/SiswaStatusSection";
import { ensureSiswa, getPpdbStatus } from "@/lib/client/ppdb";

export default function SiswaStatusPage() {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ status_ppdb: string; catatan_ppdb: string | null } | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      setError(null);
      await ensureSiswa();
      const statusResponse = await getPpdbStatus();
      if (!statusResponse.success) {
        setError(statusResponse.error || "Gagal memuat status PPDB");
      }
      setStatus(statusResponse.data || null);
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

      <SiswaStatusSection status={status} />
    </>
  );
}

