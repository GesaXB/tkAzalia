"use client";

import { useState, useMemo } from "react";
import { AdminPpdbSiswa } from "@/lib/client/admin";
import SectionCard from "../SectionCard";

interface StatusDraft {
  status_ppdb: "menunggu" | "lulus" | "tidak_lulus";
  catatan_ppdb: string;
}

interface AdminPpdbSectionProps {
  ppdbList: AdminPpdbSiswa[];
  drafts: Record<number, StatusDraft>;
  statusOptions: string[];
  onDraftChange: (siswaId: number, field: keyof StatusDraft, value: string) => void;
  onUpdateStatus: (siswaId: number) => void;
}

export default function AdminPpdbSection({
  ppdbList,
  drafts,
  statusOptions,
  onDraftChange,
  onUpdateStatus,
}: AdminPpdbSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [detailSiswa, setDetailSiswa] = useState<AdminPpdbSiswa | null>(null);

  const filteredList = useMemo(() => {
    let list = ppdbList;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.user.nama_lengkap.toLowerCase().includes(q) ||
          item.user.email.toLowerCase().includes(q) ||
          (item.user.no_telp || "").toLowerCase().includes(q)
      );
    }
    if (filterStatus) {
      list = list.filter((item) => (item.status_ppdb || "menunggu") === filterStatus);
    }
    return list;
  }, [ppdbList, searchQuery, filterStatus]);

  return (
    <SectionCard title="Daftar PPDB" description="Konfirmasi status PPDB calon siswa.">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, no. telepon..."
            className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white w-full sm:w-auto"
          >
            <option value="">Semua status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {filteredList.length === 0 ? (
          <p className="text-sm text-gray-500">
            {ppdbList.length === 0 ? "Belum ada data PPDB." : "Tidak ada peserta yang cocok dengan filter."}
          </p>
        ) : (
          <div className="space-y-3">
            {filteredList.map((item) => {
              const draft = drafts[item.siswa_id];
              const currentStatus = draft?.status_ppdb || item.status_ppdb || "menunggu";
              const currentCatatan = draft?.catatan_ppdb ?? item.catatan_ppdb ?? "";
              return (
                <div key={item.siswa_id} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{item.user.nama_lengkap}</p>
                      <p className="text-xs text-gray-500">{item.user.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500">Berkas: {item.berkas.length}</span>
                      <button
                        type="button"
                        onClick={() => setDetailSiswa(item)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        Lihat detail
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <select
                      value={currentStatus}
                      onChange={(event) => onDraftChange(item.siswa_id, "status_ppdb", event.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={currentCatatan}
                      onChange={(event) => onDraftChange(item.siswa_id, "catatan_ppdb", event.target.value)}
                      placeholder="Catatan keputusan"
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                    <button
                      onClick={() => onUpdateStatus(item.siswa_id)}
                      className="px-4 py-2 rounded-lg bg-[#01793B] text-white text-sm font-medium hover:bg-emerald-700"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {detailSiswa && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setDetailSiswa(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Detail peserta"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">Detail Peserta</h3>
                <button
                  type="button"
                  onClick={() => setDetailSiswa(null)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                  aria-label="Tutup"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-2 text-sm">
                <p><span className="text-gray-500">Nama:</span> {detailSiswa.user.nama_lengkap}</p>
                <p><span className="text-gray-500">Email:</span> {detailSiswa.user.email}</p>
                <p><span className="text-gray-500">No. Telepon:</span> {detailSiswa.user.no_telp}</p>
                <p><span className="text-gray-500">Status PPDB:</span> {detailSiswa.status_ppdb ?? "menunggu"}</p>
                {detailSiswa.catatan_ppdb && (
                  <p><span className="text-gray-500">Catatan:</span> {detailSiswa.catatan_ppdb}</p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Berkas ({detailSiswa.berkas.length})</h4>
                {detailSiswa.berkas.length === 0 ? (
                  <p className="text-sm text-gray-500">Belum ada berkas.</p>
                ) : (
                  <ul className="space-y-2">
                    {detailSiswa.berkas.map((b) => (
                      <li key={b.berkas_siswa_id} className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-800">{b.nama_file}</span>
                        <span className="text-xs text-gray-500">{b.jenisBerkas?.nama_berkas ?? "-"} · {b.status_validasi}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
