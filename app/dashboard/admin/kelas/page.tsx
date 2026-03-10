"use client";

import ConfirmModal from "@/Components/Dashboard/ConfirmModal";
import { useDashboard } from "@/context/DashboardContext";
import {
  createKelasAdmin,
  deleteKelasAdmin,
  KelasItem,
  listKelasAdmin,
  updateKelasAdmin,
} from "@/lib/client/admin";
import { BookOpen, Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminKelasPage() {
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<KelasItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editUrutan, setEditUrutan] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newNama, setNewNama] = useState("");
  const [newDeskripsi, setNewDeskripsi] = useState("");
  const [newUrutan, setNewUrutan] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<KelasItem | null>(null);

  useEffect(() => {
    setDashboardInfo("Kelola Kelas", "Tambah atau ubah kelas PPDB (Kelompok A, B, dll.)");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const res = await listKelasAdmin();
      if (!res.success) setError(res.error || "Gagal memuat kelas");
      setList(res.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    setSaving(true);
    setError(null);
    const res = await createKelasAdmin({
      nama: newNama.trim(),
      deskripsi: newDeskripsi.trim() || undefined,
      urutan: newUrutan,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menambah kelas");
      return;
    }
    setList((prev) => [...prev, res.data!].sort((a, b) => a.urutan - b.urutan));
    setNewNama("");
    setNewDeskripsi("");
    setNewUrutan(list.length + 1);
    setShowForm(false);
  };

  const startEdit = (k: KelasItem) => {
    setEditingId(k.kelas_id);
    setEditNama(k.nama);
    setEditDeskripsi(k.deskripsi || "");
    setEditUrutan(k.urutan);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNama("");
    setEditDeskripsi("");
    setEditUrutan(0);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    setSaving(true);
    setError(null);
    const res = await updateKelasAdmin(editingId, {
      nama: editNama.trim(),
      deskripsi: editDeskripsi.trim() || undefined,
      urutan: editUrutan,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal memperbarui");
      return;
    }
    setList((prev) => prev.map((x) => (x.kelas_id === editingId ? res.data! : x)).sort((a, b) => a.urutan - b.urutan));
    cancelEdit();
  };

  const openDeleteModal = (kelas: KelasItem) => {
    setDeleteTarget(kelas);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setError(null);
    setSaving(true);
    const res = await deleteKelasAdmin(deleteTarget.kelas_id);
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menghapus");
      setDeleteModal(false);
      return;
    }
    setList((prev) => prev.filter((x) => x.kelas_id !== deleteTarget.kelas_id));
    setDeleteModal(false);
    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-outfit">
        Memuat kelas...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-emerald-50/30">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                <BookOpen size={20} className="text-[#01793B]" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Daftar Kelas</h2>
                <p className="text-xs text-gray-500 mt-0.5">Total {list.length} kelas</p>
              </div>
            </div>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                <Plus size={18} />
                Tambah Kelas
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleCreate} className="p-6 border-b border-gray-100 bg-emerald-50/40 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Nama Kelas</label>
                  <input
                    value={newNama}
                    onChange={(e) => setNewNama(e.target.value)}
                    placeholder="Contoh: Kelompok A"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Urutan Tampil</label>
                  <input
                    type="number"
                    value={newUrutan}
                    onChange={(e) => setNewUrutan(Number(e.target.value) || 0)}
                    placeholder="Contoh: 1"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-2">Deskripsi (Opsional)</label>
                  <textarea
                    value={newDeskripsi}
                    onChange={(e) => setNewDeskripsi(e.target.value)}
                    placeholder="Jelaskan detail kelas ini..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="rounded-lg bg-[#01793B] px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors">
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-200 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-gray-100">
            {list.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="flex justify-center mb-3">
                  <BookOpen size={32} className="text-gray-300" />
                </div>
                <p className="text-sm text-gray-500">Belum ada kelas</p>
                <p className="text-xs text-gray-400 mt-1">Klik &quot;Tambah Kelas&quot; untuk menambah kelas baru</p>
              </div>
            ) : (
              list.map((k) => (
                <div key={k.kelas_id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                  {editingId === k.kelas_id ? (
                    <form onSubmit={handleUpdate} className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Nama Kelas</label>
                          <input
                            value={editNama}
                            onChange={(e) => setEditNama(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Urutan</label>
                          <input
                            type="number"
                            value={editUrutan}
                            onChange={(e) => setEditUrutan(Number(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Deskripsi</label>
                          <textarea
                            value={editDeskripsi}
                            onChange={(e) => setEditDeskripsi(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button type="submit" disabled={saving} className="rounded-lg bg-[#01793B] px-3 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors inline-flex items-center gap-1">
                          <Check size={16} /> Simpan
                        </button>
                        <button type="button" onClick={cancelEdit} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                          <X size={16} /> Batal
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{k.nama}</h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                            Urutan: {k.urutan}
                          </span>
                        </div>
                        {k.deskripsi && (
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {k.deskripsi}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(k)}
                          className="p-2.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                          aria-label="Ubah"
                          title="Ubah kelas"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(k)}
                          className="p-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Hapus"
                          title="Hapus kelas"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={deleteModal}
        title="Hapus Kelas?"
        description={deleteTarget ? `Yakin ingin menghapus kelas "${deleteTarget.nama}"? Siswa yang memilih kelas ini akan direset pilihan kelasnya.` : ""}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        isDanger={true}
        isLoading={saving}
        onClose={() => {
          setDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
