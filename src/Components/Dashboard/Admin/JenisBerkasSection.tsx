"use client";

import { createJenisBerkas, deleteJenisBerkas, JenisBerkasItem, listJenisBerkas, updateJenisBerkas } from "@/lib/client/admin";
import { Check, FileCheck, FileText, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";

export default function JenisBerkasSection() {
  const [items, setItems] = useState<JenisBerkasItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // For Add/Edit
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [namaBerkas, setNamaBerkas] = useState("");

  // For Delete
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await listJenisBerkas();
    if (res.success) {
      setItems(res.data || []);
    } else {
      setError(res.error || "Gagal memuat data");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setNamaBerkas("");
    setShowForm(true);
    setError(null);
  };

  const handleEdit = (item: JenisBerkasItem) => {
    setEditingId(item.jenis_berkas_id);
    setNamaBerkas(item.nama_berkas);
    setShowForm(true);
    setError(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaBerkas.trim()) return;

    setSaving(true);
    setError(null);

    let res;
    if (editingId) {
      res = await updateJenisBerkas(editingId, { nama_berkas: namaBerkas });
    } else {
      res = await createJenisBerkas({ nama_berkas: namaBerkas });
    }

    setSaving(false);
    if (res.success) {
      setShowForm(false);
      setNamaBerkas("");
      setEditingId(null);
      loadData();
    } else {
      setError(res.error || "Gagal menyimpan");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    const res = await deleteJenisBerkas(deleteId);
    setSaving(false);
    if (res.success) {
      setShowDeleteModal(false);
      setDeleteId(null);
      loadData();
    } else {
      setError(res.error || "Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 flex items-center gap-2">
          <X size={16} />
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg">Daftar Jenis Berkas</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Total {items.length} Entri</p>
            </div>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-all uppercase tracking-wider active:scale-95 shadow-sm"
            >
              <Plus size={16} />
              Tambah Data
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-8 border-b border-slate-100 bg-slate-50/30 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nama Jenis Berkas</label>
              <input
                value={namaBerkas}
                onChange={(e) => setNamaBerkas(e.target.value)}
                placeholder="Contoh: Akte Kelahiran"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                required
                autoFocus
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-slate-900 px-8 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60 transition-all uppercase tracking-wider inline-flex items-center gap-2 active:scale-95 shadow-sm"
                >
                  {saving ? (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                  {editingId ? "Perbarui" : "Simpan Berkas"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-200 px-8 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider active:scale-95"
                >
                  Batal
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-6 py-8 animate-pulse">
                <div className="h-5 bg-slate-100 rounded w-1/3 mb-2" />
                <div className="h-3 bg-slate-50 rounded w-1/4" />
              </div>
            ))
          ) : items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200">
                  <FileText size={32} />
                </div>
              </div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Belum ada jenis berkas</p>
              <p className="text-xs text-slate-400 mt-2">Klik &quot;Tambah Berkas&quot; untuk memulai</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.jenis_berkas_id} className="px-6 py-5 hover:bg-slate-50/50 transition-all duration-300 group">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300">
                        <FileCheck size={20} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.nama_berkas}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-1">
                        Persyaratan PPDB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all shadow-sm shadow-amber-500/10 active:scale-95 border border-amber-100 hover:border-transparent"
                      title="Ubah"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.jenis_berkas_id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm shadow-rose-500/10 active:scale-95 border border-rose-100 hover:border-transparent"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Hapus Jenis Berkas?"
        description={`Anda akan menghapus "${items.find((i) => i.jenis_berkas_id === deleteId)?.nama_berkas}". Tindakan ini akan mempengaruhi persyaratan pendaftaran siswa.`}
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        isDanger={true}
        isLoading={saving}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

