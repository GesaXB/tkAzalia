"use client";

import { useState, useMemo } from "react";
import { BerkasSiswaItem, CreateBerkasPayload } from "@/lib/client/spmb";
import { Eye, RefreshCw, Trash2, FileText, X } from "lucide-react";

interface SiswaBerkasSectionProps {
  berkasList: BerkasSiswaItem[];
  onDelete?: (berkasSiswaId: number) => void;
  onUpdate?: (berkasSiswaId: number, payload: Partial<CreateBerkasPayload>, newFile?: File) => Promise<void>;
  uploadDisabled?: boolean;
}

function formatDate(s: string) {
  try {
    const d = new Date(s);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch { return "-"; }
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    menunggu: { label: "Menunggu", cls: "bg-amber-50 text-amber-700 border-amber-100" },
    valid: { label: "Valid", cls: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    tidak_valid: { label: "Tidak Valid", cls: "bg-red-50 text-red-600 border-red-100" },
  };
  const { label, cls } = map[status] ?? { label: status, cls: "bg-gray-50 text-gray-600 border-gray-100" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all";

export default function SiswaBerkasSection({
  berkasList,
  onDelete,
  onUpdate,
  uploadDisabled = false,
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
      (b) => b.nama_file.toLowerCase().includes(q) || (b.jenisBerkas?.nama_berkas ?? "").toLowerCase().includes(q)
    );
  }, [berkasList, search]);

  const openEdit = (b: BerkasSiswaItem) => {
    setEditing(b);
    setEditForm({ nama_file: b.nama_file, path_file: b.path_file, ukuran_file: b.ukuran_file, tipe_file: b.tipe_file });
    setReplaceFile(null);
  };
  const closeEdit = () => { setEditing(null); setEditForm({}); setReplaceFile(null); };

  const handleSaveEdit = async () => {
    if (!editing || !onUpdate) return;
    setSaving(true);
    try { await onUpdate(editing.berkas_siswa_id, editForm, replaceFile ?? undefined); closeEdit(); }
    finally { setSaving(false); }
  };

  const viewUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <FileText size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Daftar Berkas</h2>
            <p className="text-xs text-gray-400 mt-0.5">{berkasList.length} berkas diunggah</p>
          </div>
        </div>
        {berkasList.length > 0 && (
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berkas..."
            className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-300 outline-none transition-all"
          />
        )}
      </div>

      <div className="p-6">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-slate-50 border border-slate-100">
            <FileText size={28} className="mx-auto text-gray-200 mb-3" />
            <p className="text-sm font-medium text-gray-400">
              {berkasList.length === 0 ? "Belum ada berkas diunggah" : "Tidak ada yang cocok"}
            </p>
            {berkasList.length === 0 && (
              <p className="text-xs text-gray-300 mt-1">Gunakan form di atas untuk mengunggah</p>
            )}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredList.map((berkas) => (
              <div
                key={berkas.berkas_siswa_id}
                className="rounded-2xl border border-gray-100 bg-slate-50/50 p-4 hover:border-gray-200 hover:bg-white transition-all"
              >
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#01793B]">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-sm truncate">{berkas.nama_file}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {berkas.jenisBerkas?.nama_berkas ?? `Jenis #${berkas.jenis_berkas_id}`}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <StatusBadge status={berkas.status_validasi} />
                      <span className="text-[10px] text-gray-400">{berkas.ukuran_file} KB · {formatDate(berkas.tanggal_unggah)}</span>
                    </div>
                    {berkas.catatan_validasi && (
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
                        {berkas.catatan_validasi}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                  {viewUrl(berkas.path_file) && (
                    <button
                      onClick={() => setViewTarget(berkas)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <Eye size={13} /> Lihat
                    </button>
                  )}
                  {onUpdate && !uploadDisabled && (
                    <button
                      onClick={() => openEdit(berkas)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <RefreshCw size={13} /> Ganti
                    </button>
                  )}
                  {onDelete && !uploadDisabled && (
                    <button
                      onClick={() => setDeleteTarget(berkas)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-white px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={closeEdit}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900">Ganti Berkas</h3>
                <p className="text-xs text-gray-400 mt-0.5">{editing.jenisBerkas?.nama_berkas}</p>
              </div>
              <button onClick={closeEdit} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Ganti File (opsional)</label>
                <input
                  type="file"
                  onChange={(e) => setReplaceFile(e.target.files?.[0] ?? null)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#01793B]"
                />
                {replaceFile && <p className="mt-1 text-xs text-gray-400">File baru: {replaceFile.name}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama File</label>
                <input value={editForm.nama_file ?? ""} onChange={(e) => setEditForm(f => ({ ...f, nama_file: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={closeEdit} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
              <button onClick={handleSaveEdit} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#01793B] text-sm font-bold text-white hover:bg-emerald-700 transition-all disabled:opacity-60">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewTarget && viewUrl(viewTarget.path_file) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setViewTarget(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{viewTarget.nama_file}</h3>
                <p className="text-xs text-gray-400">{viewTarget.jenisBerkas?.nama_berkas}</p>
              </div>
              <button onClick={() => setViewTarget(null)} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 ml-3 transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 min-h-0 p-4 overflow-auto bg-slate-50">
              {viewTarget.tipe_file.startsWith("image/") ? (
                <img src={viewUrl(viewTarget.path_file)!} alt={viewTarget.nama_file} className="max-w-full max-h-[70vh] w-auto mx-auto object-contain rounded-xl" />
              ) : viewTarget.tipe_file === "application/pdf" || viewTarget.nama_file.toLowerCase().endsWith(".pdf") ? (
                <iframe src={viewUrl(viewTarget.path_file)!} title={viewTarget.nama_file} className="w-full h-[70vh] rounded-xl border border-gray-200 bg-white" />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText size={40} className="text-gray-200 mb-4" />
                  <p className="text-sm text-gray-500 mb-4">Preview tidak tersedia untuk tipe file ini.</p>
                  <a href={viewUrl(viewTarget.path_file)!} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01793B] text-sm font-bold text-white hover:bg-emerald-700 transition-all">
                    Buka di tab baru
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setDeleteTarget(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-4">
              <Trash2 size={20} />
            </div>
            <h3 className="text-center font-bold text-gray-900">Hapus Berkas?</h3>
            <p className="text-center text-sm text-gray-400 mt-1 truncate">{deleteTarget.nama_file}</p>
            <p className="text-center text-xs text-gray-300 mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Batal</button>
              <button onClick={async () => { if (onDelete) { await onDelete(deleteTarget.berkas_siswa_id); setDeleteTarget(null); } }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-bold text-white hover:bg-red-600 transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
