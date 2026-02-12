"use client";

import { useState, useMemo } from "react";
import SectionCard from "../SectionCard";
import {
  BerkasSiswaItem,
  CreateBerkasPayload,
} from "@/lib/client/ppdb";

interface SiswaBerkasSectionProps {
  berkasList: BerkasSiswaItem[];
  onDelete?: (berkasSiswaId: number) => void;
  onUpdate?: (
    berkasSiswaId: number,
    payload: Partial<CreateBerkasPayload>,
    newFile?: File
  ) => Promise<void>;
}

function formatDate(s: string) {
  try {
    const d = new Date(s);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "-";
  }
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    menunggu: "bg-amber-50 text-amber-700 border-amber-200",
    valid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tidak_valid: "bg-red-50 text-red-600 border-red-200",
  };
  const style = map[status] || "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
      {status}
    </span>
  );
}

export default function SiswaBerkasSection({
  berkasList,
  onDelete,
  onUpdate,
}: SiswaBerkasSectionProps) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<BerkasSiswaItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<CreateBerkasPayload>>({});
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BerkasSiswaItem | null>(null);
  const [viewTarget, setViewTarget] = useState<BerkasSiswaItem | null>(null);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return berkasList;
    return berkasList.filter(
      (b) =>
        b.nama_file.toLowerCase().includes(q) ||
        (b.jenisBerkas?.nama_berkas ?? "").toLowerCase().includes(q)
    );
  }, [berkasList, search]);

  const openEdit = (b: BerkasSiswaItem) => {
    setEditing(b);
    setEditForm({
      nama_file: b.nama_file,
      path_file: b.path_file,
      ukuran_file: b.ukuran_file,
      tipe_file: b.tipe_file,
    });
    setReplaceFile(null);
  };

  const closeEdit = () => {
    setEditing(null);
    setEditForm({});
    setReplaceFile(null);
  };

  const handleSaveEdit = async () => {
    if (!editing || !onUpdate) return;
    setSaving(true);
    try {
      await onUpdate(editing.berkas_siswa_id, editForm, replaceFile ?? undefined);
      closeEdit();
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget || !onDelete) return;
    await onDelete(deleteTarget.berkas_siswa_id);
    setDeleteTarget(null);
  };

  const viewUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <SectionCard
      title="Daftar Berkas"
      description="Berkas yang sudah diunggah. Lihat file, ubah (ganti file), atau hapus."
    >
      {berkasList.length > 0 && (
        <div className="mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama file atau jenis berkas..."
            className="w-full max-w-sm rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-emerald-300 focus:bg-white focus:outline-none"
          />
        </div>
      )}

      {filteredList.length === 0 ? (
        <div className="text-center py-10 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-gray-500 text-sm">
            {berkasList.length === 0 ? "Belum ada berkas." : "Tidak ada yang cocok dengan pencarian."}
          </p>
          {berkasList.length === 0 && (
            <p className="text-gray-400 text-xs mt-1">Gunakan form di atas untuk mengunggah.</p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredList.map((berkas) => (
            <div
              key={berkas.berkas_siswa_id}
              className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm hover:border-gray-200 transition-colors"
            >
              <div className="flex gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{berkas.nama_file}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {berkas.jenisBerkas?.nama_berkas ?? `Jenis #${berkas.jenis_berkas_id}`}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {statusBadge(berkas.status_validasi)}
                    <span className="text-xs text-gray-400">
                      {berkas.ukuran_file} KB · {formatDate(berkas.tanggal_unggah)}
                    </span>
                  </div>
                  {berkas.catatan_validasi ? (
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
                      Catatan: {berkas.catatan_validasi}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {viewUrl(berkas.path_file) && (
                  <button
                    type="button"
                    onClick={() => setViewTarget(berkas)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat
                  </button>
                )}
                {onUpdate && (
                  <button
                    type="button"
                    onClick={() => openEdit(berkas)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Ubah
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(berkas)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Ubah: ganti file / edit metadata */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={closeEdit}
          role="dialog"
          aria-modal="true"
          aria-label="Ubah berkas"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">Ubah Berkas</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {editing.jenisBerkas?.nama_berkas ?? `Jenis #${editing.jenis_berkas_id}`}
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ganti file (opsional)</label>
                <input
                  type="file"
                  onChange={(e) => setReplaceFile(e.target.files?.[0] ?? null)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm file:mr-2 file:rounded file:border-0 file:bg-emerald-50 file:px-2 file:py-1 file:text-xs file:text-emerald-700"
                />
                {replaceFile && (
                  <p className="mt-1 text-xs text-gray-500">File baru: {replaceFile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Nama file</label>
                <input
                  value={editForm.nama_file ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, nama_file: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="Nama file"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">Path / URL</label>
                <input
                  value={editForm.path_file ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, path_file: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="/uploads/..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600">Ukuran (KB)</label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.ukuran_file ?? 0}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, ukuran_file: Number(e.target.value) }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">Tipe</label>
                  <input
                    value={editForm.tipe_file ?? ""}
                    onChange={(e) => setEditForm((f) => ({ ...f, tipe_file: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="application/pdf"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2 justify-end">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Lihat berkas - tampil di halaman sama, container seperti profile */}
      {viewTarget && viewUrl(viewTarget.path_file) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setViewTarget(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Lihat berkas"
        >
          <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{viewTarget.nama_file}</h3>
                <p className="text-xs text-gray-500">
                  {viewTarget.jenisBerkas?.nama_berkas ?? `Jenis #${viewTarget.jenis_berkas_id}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewTarget(null)}
                className="shrink-0 ml-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Tutup"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-h-0 p-6 overflow-auto bg-gray-50">
              {viewTarget.tipe_file.startsWith("image/") ? (
                <img
                  src={viewUrl(viewTarget.path_file)!}
                  alt={viewTarget.nama_file}
                  className="max-w-full max-h-[70vh] w-auto mx-auto object-contain rounded-lg"
                />
              ) : viewTarget.tipe_file === "application/pdf" || viewTarget.nama_file.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={viewUrl(viewTarget.path_file)!}
                  title={viewTarget.nama_file}
                  className="w-full h-[70vh] rounded-lg border border-gray-200 bg-white"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-gray-500">Preview tidak tersedia untuk tipe file ini.</p>
                  <a
                    href={viewUrl(viewTarget.path_file)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Buka di tab baru
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal konfirmasi hapus */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setDeleteTarget(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Konfirmasi hapus"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-900 font-medium">Hapus berkas?</p>
            <p className="text-sm text-gray-500 mt-1 truncate">{deleteTarget.nama_file}</p>
            <p className="text-xs text-gray-400 mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="mt-6 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}
