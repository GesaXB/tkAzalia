"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionCard from "@/Components/Dashboard/SectionCard";
import { fetchProfile, updateProfile, AuthUser } from "@/lib/client/auth";
import { Lock, User as UserIcon } from "lucide-react";

type TabType = "profil" | "sandi";

export default function SiswaProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("profil");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ nama_lengkap: "", email: "", no_telp: "" });
  const [passwordForm, setPasswordForm] = useState({
    password_lama: "",
    password_baru: "",
    konfirmasi_sandi: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {

    const tab = searchParams?.get("tab") as TabType;
    if (tab === "sandi") {
      setActiveTab("sandi");
    }
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
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
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
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
    if (res.data) {
      setUser(res.data);
      setSuccessMessage("Profil berhasil diperbarui");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);


    if (!passwordForm.password_lama || !passwordForm.password_baru || !passwordForm.konfirmasi_sandi) {
      setPasswordError("Semua field wajib diisi");
      return;
    }

    if (passwordForm.password_baru !== passwordForm.konfirmasi_sandi) {
      setPasswordError("Password baru dan konfirmasi tidak cocok");
      return;
    }

    if (passwordForm.password_baru.length < 6) {
      setPasswordError("Password baru minimal 6 karakter");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password_lama: passwordForm.password_lama,
          password_baru: passwordForm.password_baru,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setPasswordError(data.error || "Gagal mengubah password");
        return;
      }

      setPasswordSuccess("Password berhasil diubah");
      setPasswordForm({
        password_lama: "",
        password_baru: "",
        konfirmasi_sandi: "",
      });
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setPasswordLoading(false);
    }
  };

  const tabs = [
    { id: "profil", label: "Edit Profil", icon: <UserIcon className="w-4 h-4" /> },
    { id: "sandi", label: "Ubah Sandi", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Tab Navigation */}
      <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-1 shadow-sm">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#01793B] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Edit Profil */}
        {activeTab === "profil" && (
          <SectionCard 
            title="Edit Profil" 
            description="Perbarui informasi akun pribadi Anda"
          >
            {error ? (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                {error}
              </div>
            ) : null}

            {successMessage ? (
              <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-2">
                {successMessage}
              </div>
            ) : null}

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
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nomor Telepon</label>
                  <input
                    type="text"
                    value={form.no_telp}
                    onChange={(e) => setForm((f) => ({ ...f, no_telp: e.target.value }))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-all"
                >
                  {saving ? "Menyimpan…" : "Simpan perubahan"}
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-500">Data profil tidak tersedia.</p>
            )}
          </SectionCard>
        )}

        {/* Ubah Sandi */}
        {activeTab === "sandi" && (
          <SectionCard 
            title="Ubah Sandi" 
            description="Ganti password akun Anda untuk keamanan lebih baik"
          >
            {passwordError ? (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
                {passwordError}
              </div>
            ) : null}

            {passwordSuccess ? (
              <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-2">
                {passwordSuccess}
              </div>
            ) : null}

            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Password Lama</label>
                <input
                  type="password"
                  value={passwordForm.password_lama}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, password_lama: e.target.value }))}
                  placeholder="Masukkan password lama Anda"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.password_baru}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, password_baru: e.target.value }))}
                  placeholder="Masukkan password baru (min 6 karakter)"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.konfirmasi_sandi}
                  onChange={(e) => setPasswordForm((f) => ({ ...f, konfirmasi_sandi: e.target.value }))}
                  placeholder="Ulangi password baru"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={passwordLoading}
                className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition-all"
              >
                {passwordLoading ? "Mengubah…" : "Ubah Password"}
              </button>

              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-900 font-medium">⚠️ Tips Keamanan:</p>
                <ul className="text-xs text-blue-800 mt-2 space-y-1 list-disc list-inside">
                  <li>Gunakan password yang kuat (kombinasi huruf, angka, simbol)</li>
                  <li>Jangan bagikan password dengan orang lain</li>
                  <li>Gunakan password yang berbeda untuk setiap akun</li>
                  <li>Ganti password secara berkala untuk keamanan maksimal</li>
                </ul>
              </div>
            </form>
          </SectionCard>
        )}
      </motion.div>
    </>
  );
}

