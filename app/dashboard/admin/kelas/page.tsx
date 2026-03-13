"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/Components/Dashboard/ConfirmModal";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import {
  KelasItem,
  listKelasAdmin,
  createKelasAdmin,
  updateKelasAdmin,
  deleteKelasAdmin,
} from "@/lib/client/admin";
import { Plus, Pencil, Trash2, X, Check, BookOpen } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function AdminKelasPage() {
  const router = useRouter();
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<KelasItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editDeskripsi, setEditDeskripsi] = useState("");
  const [editUrutan, setEditUrutan] = useState(0);
  const [editKuota, setEditKuota] = useState(0);
  
  const [showForm, setShowForm] = useState(false);
  const [newNama, setNewNama] = useState("");
  const [newDeskripsi, setNewDeskripsi] = useState("");
  const [newUrutan, setNewUrutan] = useState(0);
  const [newKuota, setNewKuota] = useState(0);
  
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<KelasItem | null>(null);

  useEffect(() => {
    setDashboardInfo("Kelola Kelas", "Tambah atau ubah kelas PPDB (Kelompok A, B, dll.)");
  }, [setDashboardInfo]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }
      const res = await listKelasAdmin();
      if (!res.success) setError(res.error || "Gagal memuat kelas");
      setList(res.data || []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    setSaving(true);
    setError(null);
    const res = await createKelasAdmin({ 
      nama: newNama.trim(), 
      deskripsi: newDeskripsi.trim() || undefined,
      urutan: newUrutan,
      kuota: newKuota
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
    setNewKuota(0);
    setShowForm(false);
  };

  const startEdit = (k: KelasItem) => {
    setEditingId(k.kelas_id);
    setEditNama(k.nama);
    setEditDeskripsi(k.deskripsi || "");
    setEditUrutan(k.urutan);
    setEditKuota(k.kuota || 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNama("");
    setEditDeskripsi("");
    setEditUrutan(0);
    setEditKuota(0);
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
      kuota: editKuota
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
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat kelas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Daftar Kelas</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Total {list.length} Entri</p>
              </div>
            </div>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-all uppercase tracking-wider active:scale-95 shadow-sm"
              >
                <Plus size={16} />
                Tambah Kelas
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleCreate} className="p-8 border-b border-slate-100 bg-slate-50/30 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nama Kelas</label>
                    <input
                      value={newNama}
                      onChange={(e) => setNewNama(e.target.value)}
                      placeholder="Contoh: Kelompok A"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Deskripsi (Opsional)</label>
                    <textarea
                      value={newDeskripsi}
                      onChange={(e) => setNewDeskripsi(e.target.value)}
                      placeholder="Contoh: Kelas untuk usia 4-5 tahun"
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Kuota PPDB</label>
                    <input
                      type="number"
                      value={newKuota}
                      onChange={(e) => setNewKuota(Number(e.target.value) || 0)}
                      placeholder="Contoh: 30"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Urutan Tampil</label>
                    <input
                      type="number"
                      value={newUrutan}
                      onChange={(e) => setNewUrutan(Number(e.target.value) || 0)}
                      placeholder="Contoh: 1"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="submit" disabled={saving} className="rounded-xl bg-slate-900 px-8 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60 transition-all uppercase tracking-wider active:scale-95 shadow-sm">
                    {saving ? "..." : "Simpan Kelas"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-8 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider active:scale-95">
                    Batal
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="divide-y divide-gray-100">
            {list.length === 0 ? (
              <div className="px-6 py-16 text-center bg-slate-50/30">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200">
                    <BookOpen size={32} />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Belum ada kelas</p>
                <p className="text-xs text-slate-300 mt-2 italic">Klik &quot;Tambah Kelas&quot; untuk memulai</p>
              </div>
            ) : (
              list.map((k) => (
                <div key={k.kelas_id} className="px-6 py-5 hover:bg-slate-50/50 transition-all duration-300 group">
                  {editingId === k.kelas_id ? (
                    <form onSubmit={handleUpdate} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Nama Kelas</label>
                          <input
                            value={editNama}
                            onChange={(e) => setEditNama(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold bg-white"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Deskripsi (Opsional)</label>
                          <textarea
                            value={editDeskripsi}
                            onChange={(e) => setEditDeskripsi(e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium bg-white resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Kuota PPDB</label>
                          <input
                            type="number"
                            value={editKuota}
                            onChange={(e) => setEditKuota(Number(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Urutan</label>
                          <input
                            type="number"
                            value={editUrutan}
                            onChange={(e) => setEditUrutan(Number(e.target.value) || 0)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold bg-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button type="submit" disabled={saving} className="rounded-xl bg-slate-900 px-6 py-2 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60 transition-all uppercase tracking-wider shadow-sm active:scale-95 inline-flex items-center gap-2">
                          <Check size={14} /> Perbarui
                        </button>
                        <button type="button" onClick={cancelEdit} className="rounded-xl border border-slate-200 px-6 py-2 text-xs font-bold text-slate-600 hover:bg-white transition-all uppercase tracking-wider active:scale-95">
                          Batal
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-300 self-start mt-1">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {k.nama}
                          </h4>
                          {k.deskripsi && (
                            <p className="text-[11px] text-slate-500 mt-1 font-medium">{k.deskripsi}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                              Kuota: <span className="text-emerald-600">{k.kuota || 0} Siswa</span>
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                              Urutan: {k.urutan}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button
                          type="button"
                          onClick={() => startEdit(k)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all border border-slate-100 hover:border-amber-100 active:scale-95"
                          title="Ubah"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(k)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 hover:border-rose-100 active:scale-95"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
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
    </div>
  );
}

