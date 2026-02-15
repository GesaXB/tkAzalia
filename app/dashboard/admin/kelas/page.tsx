"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import {
  KelasItem,
  listKelasAdmin,
  createKelasAdmin,
  updateKelasAdmin,
  deleteKelasAdmin,
} from "@/lib/client/admin";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

export default function AdminKelasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<KelasItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editUrutan, setEditUrutan] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newNama, setNewNama] = useState("");
  const [newUrutan, setNewUrutan] = useState(0);
  const [saving, setSaving] = useState(false);

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

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    setSaving(true);
    setError(null);
    const res = await createKelasAdmin({ nama: newNama.trim(), urutan: newUrutan });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menambah kelas");
      return;
    }
    setList((prev) => [...prev, res.data!].sort((a, b) => a.urutan - b.urutan));
    setNewNama("");
    setNewUrutan(list.length);
    setShowForm(false);
  };

  const startEdit = (k: KelasItem) => {
    setEditingId(k.kelas_id);
    setEditNama(k.nama);
    setEditUrutan(k.urutan);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNama("");
    setEditUrutan(0);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    setSaving(true);
    setError(null);
    const res = await updateKelasAdmin(editingId, { nama: editNama.trim(), urutan: editUrutan });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal memperbarui");
      return;
    }
    setList((prev) => prev.map((x) => (x.kelas_id === editingId ? res.data! : x)).sort((a, b) => a.urutan - b.urutan));
    cancelEdit();
  };

  const handleDelete = async (kelasId: number) => {
    if (!confirm("Hapus kelas ini? Siswa yang memilih kelas ini akan direset pilihan kelasnya.")) return;
    setError(null);
    const res = await deleteKelasAdmin(kelasId);
    if (!res.success) {
      setError(res.error || "Gagal menghapus");
      return;
    }
    setList((prev) => prev.filter((x) => x.kelas_id !== kelasId));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat kelas...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Kelola Kelas"
      subtitle="Tambah atau ubah kelas PPDB (Kelompok A, B, dll.)"
      sidebarTitle="Admin Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/admin" },
        { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
        { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
        { label: "PPDB", href: "/dashboard/admin/ppdb" },
        { label: "Blog", href: "/dashboard/admin/informasi" },
        { label: "Profil", href: "/dashboard/admin/profile" },
      ]}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Daftar Kelas</h2>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                <Plus size={18} />
                Tambah Kelas
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleCreate} className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-3">
              <input
                value={newNama}
                onChange={(e) => setNewNama(e.target.value)}
                placeholder="Nama kelas (contoh: Kelompok A)"
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1 min-w-[200px]"
                required
              />
              <input
                type="number"
                value={newUrutan}
                onChange={(e) => setNewUrutan(Number(e.target.value) || 0)}
                placeholder="Urutan"
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <button type="submit" disabled={saving} className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Batal
              </button>
            </form>
          )}

          <div className="divide-y divide-gray-50">
            {list.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                Belum ada kelas. Klik &quot;Tambah Kelas&quot; untuk menambah.
              </div>
            ) : (
              list.map((k) => (
                <div key={k.kelas_id} className="px-5 py-4 flex items-center justify-between gap-4">
                  {editingId === k.kelas_id ? (
                    <form onSubmit={handleUpdate} className="flex flex-wrap gap-2 flex-1">
                      <input
                        value={editNama}
                        onChange={(e) => setEditNama(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1 min-w-[180px]"
                        required
                      />
                      <input
                        type="number"
                        value={editUrutan}
                        onChange={(e) => setEditUrutan(Number(e.target.value) || 0)}
                        className="w-16 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                      <button type="submit" disabled={saving} className="rounded-lg bg-[#01793B] px-3 py-2 text-sm text-white hover:bg-emerald-700">
                        <Check size={18} />
                      </button>
                      <button type="button" onClick={cancelEdit} className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
                        <X size={18} />
                      </button>
                    </form>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium text-gray-900">{k.nama}</p>
                        <p className="text-xs text-gray-500">Urutan: {k.urutan}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(k)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                          aria-label="Ubah"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(k.kelas_id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          aria-label="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
