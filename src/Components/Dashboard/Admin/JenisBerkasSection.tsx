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

      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-emerald-50/30">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
              <FileText size={20} className="text-[#01793B]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Daftar Jenis Berkas</h2>
              <p className="text-xs text-gray-500 mt-0.5">Total {items.length} jenis berkas</p>
            </div>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <Plus size={18} />
              Tambah Berkas
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border-b border-gray-100 bg-emerald-50/40 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Nama Jenis Berkas</label>
              <input
                value={namaBerkas}
                onChange={(e) => setNamaBerkas(e.target.value)}
                placeholder="Contoh: Akte Kelahiran"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
                autoFocus
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#01793B] px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors inline-flex items-center gap-2"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check size={18} />
                )}
                {editingId ? "Perbarui" : "Simpan"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-200 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="px-6 py-8 animate-pulse">
                <div className="h-5 bg-gray-100 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-50 rounded w-1/4" />
              </div>
            ))
          ) : items.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="flex justify-center mb-3">
                <FileText size={32} className="text-gray-300" />
              </div>
              <p className="text-sm text-gray-500">Belum ada jenis berkas</p>
              <p className="text-xs text-gray-400 mt-1">Klik "Tambah Berkas" untuk menambah data baru</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.jenis_berkas_id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">
                        {item.nama_berkas}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">SYARAT PENDAFTARAN</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="p-2.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                      title="Ubah"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.jenis_berkas_id)}
                      className="p-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
