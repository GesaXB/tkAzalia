"use client";

import SectionCard from "@/Components/Dashboard/SectionCard";
import { useDashboard } from "@/context/DashboardContext";
import { AuthUser, fetchProfile, updateProfile } from "@/lib/client/auth";
import { useEffect, useState } from "react";

export default function AdminProfilePage() {
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ nama_lengkap: "", email: "", no_telp: "" });

  useEffect(() => {
    setDashboardInfo("Profil Admin", "Detail akun administrator");
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (profile.success && profile.data) {
        setUser(profile.data);
        setForm({
          nama_lengkap: profile.data.nama_lengkap,
          email: profile.data.email,
          no_telp: profile.data.no_telp,
        });
      }
      setLoading(false);
    };
    load();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-outfit">
        Memuat profil...
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2 mb-4" >
          {error}
        </div>
      ) : null}

      <SectionCard title="Informasi Akun" description="Data dasar akun admin. Ubah lalu simpan.">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4 font-outfit">
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Peran</label>
              <input
                type="text"
                value={user.role}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 capitalize"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={form.nama_lengkap}
                onChange={(e) => setForm((f) => ({ ...f, nama_lengkap: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nomor Telepon</label>
              <input
                type="text"
                value={form.no_telp}
                onChange={(e) => setForm((f) => ({ ...f, no_telp: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B] outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
            >
              {saving ? "Menyimpan…" : "Simpan perubahan"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-500">Data profil tidak tersedia.</p>
        )}
      </SectionCard>
    </>
  );
}
