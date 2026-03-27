"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import ConfirmModal from "@/Components/Dashboard/ConfirmModal";
import { fetchProfile } from "@/lib/client/auth";
import {
  KelasItem,
  listKelasAdmin,
  createKelasAdmin,
  updateKelasAdmin,
  deleteKelasAdmin,
} from "@/lib/client/admin";
import { Plus, Pencil, Trash2, X, Check, BookOpen, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

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
  const [editKuota, setEditKuota] = useState(20);
  const [showForm, setShowForm] = useState(false);
  const [newNama, setNewNama] = useState("");
  const [newDeskripsi, setNewDeskripsi] = useState("");
  const [newUrutan, setNewUrutan] = useState(0);
  const [newKuota, setNewKuota] = useState(20);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<KelasItem | null>(null);

  useEffect(() => {
    setDashboardInfo("Kelola Kelas", "Tambah atau ubah kelas SPMB (Kelompok A, B, dll.)");
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
  }, [router, setDashboardInfo]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    setSaving(true);
    setError(null);
    const res = await createKelasAdmin({
      nama: newNama.trim(),
      deskripsi: newDeskripsi.trim(),
      urutan: newUrutan,
      kuota: newKuota,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menambah kelas");
      return;
    }
    setList((prev) => [...prev, res.data!].sort((a, b) => a.urutan - b.urutan));
    setNewNama("");
    setNewDeskripsi("");
    setNewUrutan(list.length);
    setNewKuota(20);
    setShowForm(false);
  };

  const startEdit = (k: KelasItem) => {
    setEditingId(k.kelas_id);
    setEditNama(k.nama);
    setEditDeskripsi(k.deskripsi || "");
    setEditUrutan(k.urutan);
    setEditKuota(k.kuota || 20);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNama("");
    setEditDeskripsi("");
    setEditUrutan(0);
    setEditKuota(20);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    setSaving(true);
    setError(null);
    const res = await updateKelasAdmin(editingId, {
      nama: editNama.trim(),
      deskripsi: editDeskripsi.trim(),
      urutan: editUrutan,
      kuota: editKuota,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal memperbarui");
      return;
    }
    setList((prev) =>
      prev.map((x) => (x.kelas_id === editingId ? res.data! : x)).sort((a, b) => a.urutan - b.urutan)
    );
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
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin"></div>
          <span>Memuat data kelas...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {error && (
          <div className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 flex items-center gap-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0"></span>
            {error}
          </div>
        )}

        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-white to-emerald-50/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-[#01793B]">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Daftar Kelas</h2>
                <p className="text-xs text-gray-500 mt-0.5">Total {list.length} kelas tersedia</p>
              </div>
            </div>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#01793B] px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95 uppercase tracking-wider"
              >
                <Plus size={16} />
                Tambah
              </button>
            )}
          </div>

          {/* Add Form */}
          {showForm && (
            <form onSubmit={handleCreate} className="p-6 border-b border-gray-100 bg-emerald-50/20 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Nama Kelas</label>
                  <input
                    value={newNama}
                    onChange={(e) => setNewNama(e.target.value)}
                    placeholder="Contoh: Kelompok A"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Deskripsi</label>
                  <input
                    value={newDeskripsi}
                    onChange={(e) => setNewDeskripsi(e.target.value)}
                    placeholder="Deskripsi singkat..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Urutan</label>
                  <input
                    type="number"
                    value={newUrutan}
                    onChange={(e) => setNewUrutan(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Kuota</label>
                  <input
                    type="number"
                    value={newKuota}
                    onChange={(e) => setNewKuota(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#01793B] px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60 transition-all uppercase tracking-wider shadow-md active:scale-95"
                >
                  {saving ? "Menyimpan..." : "Simpan Kelas"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-6 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-wider active:scale-95"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* List */}
          {list.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                  <BookOpen size={28} className="text-slate-200" />
                </div>
              </div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Belum ada data kelas</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Klik &quot;Tambah&quot; untuk memulai</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-16 text-center">No</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kelas</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Kuota</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {list.map((k) =>
                      editingId === k.kelas_id ? (
                        <tr key={k.kelas_id}>
                          <td colSpan={5} className="px-6 py-5 bg-emerald-50/10">
                            <form onSubmit={handleUpdate} className="space-y-4">
                              <div className="grid gap-4 sm:grid-cols-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nama</label>
                                  <input value={editNama} onChange={(e) => setEditNama(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500" required />
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">Deskripsi</label>
                                  <input value={editDeskripsi} onChange={(e) => setEditDeskripsi(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase">Kuota</label>
                                  <input type="number" value={editKuota} onChange={(e) => setEditKuota(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500" />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#01793B] text-white text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-700 active:scale-95 transition-all">
                                  <Check size={14} /> Simpan
                                </button>
                                <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all">
                                  <X size={14} /> Batal
                                </button>
                              </div>
                            </form>
                          </td>
                        </tr>
                      ) : (
                        <tr key={k.kelas_id} className="hover:bg-slate-50/30 transition-colors group">
                          <td className="px-6 py-5 text-center">
                            <span className="inline-flex px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                              {k.urutan}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-bold text-slate-800">{k.nama}</td>
                          <td className="px-6 py-5 text-slate-500 font-medium truncate max-w-[200px]">{k.deskripsi || "-"}</td>
                          <td className="px-6 py-5 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ring-1 ${
                              k.kuota && k.filled !== undefined && k.filled >= k.kuota
                                ? 'bg-red-50 text-red-600 ring-red-200'
                                : 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                            }`}>
                              {k.filled || 0} / {k.kuota || 0}
                              {k.kuota && k.filled !== undefined && k.filled >= k.kuota && (
                                <AlertCircle size={12} className="text-red-500" />
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                              <Link href={`/dashboard/admin/kelas/${k.kelas_id}`} className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors" title="Lihat Siswa">
                                <Users size={16} />
                              </Link>
                              <button onClick={() => startEdit(k)} className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors" title="Edit">
                                <Pencil size={16} />
                              </button>
                              <button onClick={() => openDeleteModal(k)} className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors" title="Hapus">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-slate-100">
                {list.map((k) => (
                  <div key={k.kelas_id} className="p-5 bg-white space-y-4 active:bg-slate-50/50 transition-colors">
                    {editingId === k.kelas_id ? (
                      <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Nama Kelas</label>
                            <input value={editNama} onChange={(e) => setEditNama(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-500" required />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Deskripsi</label>
                            <input value={editDeskripsi} onChange={(e) => setEditDeskripsi(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Urutan</label>
                              <input type="number" value={editUrutan} onChange={(e) => setEditUrutan(Number(e.target.value) || 0)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-500" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1 block">Kuota</label>
                              <input type="number" value={editKuota} onChange={(e) => setEditKuota(Number(e.target.value) || 0)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm outline-none focus:border-emerald-500" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="submit" disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#01793B] text-white text-[11px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all disabled:opacity-60">
                            <Check size={14} /> Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all">
                            <X size={14} /> Batal
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="font-bold text-slate-900">{k.nama}</h3>
                              <span className="inline-flex px-2 py-0.5 rounded-lg text-[9px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-widest">
                                #{k.urutan}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                              Kuota: <span className={`text-slate-700 px-1.5 py-0.5 rounded ${k.kuota && k.filled !== undefined && k.filled >= k.kuota ? 'bg-red-50 text-red-600' : ''}`}>{k.filled || 0} / {k.kuota || 0}</span>
                              {k.kuota && k.filled !== undefined && k.filled >= k.kuota && (
                                <span className="text-red-500 text-[9px] font-bold">(PENUH)</span>
                              )}
                            </p>
                            {k.deskripsi && (
                              <p className="text-sm text-slate-500 font-medium line-clamp-2">{k.deskripsi}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/admin/kelas/${k.kelas_id}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                          >
                            <Users size={14} /> Siswa
                          </Link>
                          <button
                            type="button"
                            onClick={() => startEdit(k)}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                          >
                            <Pencil size={14} /> Ubah
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(k)}
                            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        open={deleteModal}
        title="Hapus Kelas?"
        description={
          deleteTarget
            ? `Yakin ingin menghapus kelas "${deleteTarget.nama}"? Siswa yang memilih kelas ini akan direset pilihan kelasnya.`
            : ""
        }
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
