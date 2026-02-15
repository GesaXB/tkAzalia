"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import SectionCard from "@/Components/Dashboard/SectionCard";
import { clearToken } from "@/lib/client/session";
import { fetchProfile, updateProfile, AuthUser } from "@/lib/client/auth";
import { getListKelas, getSiswaMe, updateSiswaKelas, type KelasItem } from "@/lib/client/ppdb";

export default function SiswaProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingKelas, setSavingKelas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ nama_lengkap: "", email: "", no_telp: "" });
  const [kelasList, setKelasList] = useState<KelasItem[]>([]);
  const [kelasId, setKelasId] = useState<number | "">("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }
      setUser(profile.data);
      setForm({
        nama_lengkap: profile.data.nama_lengkap,
        email: profile.data.email,
        no_telp: profile.data.no_telp,
      });
      const [kelasRes, siswaRes] = await Promise.all([getListKelas(), getSiswaMe()]);
      if (kelasRes.success && kelasRes.data) setKelasList(kelasRes.data);
      if (siswaRes.success && siswaRes.data) setKelasId(siswaRes.data.kelas_id ?? "");
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const res = await updateProfile({
      nama_lengkap: form.nama_lengkap,
      email: form.email,
      no_telp: form.no_telp,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal memperbarui profil");
      return;
    }
    if (res.data) setUser(res.data);
  };

  const handleSaveKelas = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSavingKelas(true);
    const res = await updateSiswaKelas(kelasId === "" ? null : kelasId);
    setSavingKelas(false);
    if (!res.success) {
      setError(res.error || "Gagal menyimpan pilihan kelas");
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat profil...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Profil Siswa"
      subtitle={user ? `Halo, ${user.nama_lengkap}` : "Profil siswa"}
      sidebarTitle="Siswa Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/siswa" },
        { label: "Panduan PPDB", href: "/dashboard/siswa/panduan" },
        { label: "Status PPDB", href: "/dashboard/siswa/status" },
        { label: "Upload Berkas", href: "/dashboard/siswa/berkas" },
        { label: "Profil", href: "/dashboard/siswa/profile" },
      ]}
      onLogout={handleLogout}
    >
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <SectionCard title="Informasi Akun" description="Data dasar akun siswa. Ubah lalu simpan.">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={user.username}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
              <p className="text-xs text-gray-400 mt-0.5">Username tidak dapat diubah.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={form.nama_lengkap}
                onChange={(e) => setForm((f) => ({ ...f, nama_lengkap: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nomor Telepon</label>
              <input
                type="text"
                value={form.no_telp}
                onChange={(e) => setForm((f) => ({ ...f, no_telp: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Menyimpan…" : "Simpan perubahan"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-500">Data profil tidak tersedia.</p>
        )}
      </SectionCard>

      <SectionCard
        title="Pilihan Kelas PPDB"
        description="Pilih kelas yang diinginkan (Kelompok A atau B). Bisa diubah kapan saja selama periode PPDB."
      >
        <form onSubmit={handleSaveKelas} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Kelas</label>
            <select
              value={kelasId}
              onChange={(e) => setKelasId(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
            >
              <option value="">— Pilih kelas —</option>
              {kelasList.map((k) => (
                <option key={k.kelas_id} value={k.kelas_id}>
                  {k.nama}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={savingKelas}
            className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {savingKelas ? "Menyimpan…" : "Simpan pilihan kelas"}
          </button>
        </form>
      </SectionCard>
    </DashboardShell>
  );
}
