"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProfile, updateProfile, AuthUser } from "@/lib/client/auth";
import { Lock, User as UserIcon, Mail, Phone, Shield, CheckCircle2, Save, Key, UserCog } from "lucide-react";
import { toast } from "react-hot-toast";

type TabType = "profil" | "sandi";

export default function SiswaProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("profil");
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ nama_lengkap: "", email: "", no_telp: "" });
  const [passwordForm, setPasswordForm] = useState({
    password_lama: "",
    password_baru: "",
    konfirmasi_sandi: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const tab = searchParams?.get("tab") as TabType;
    if (tab === "sandi") setActiveTab("sandi");
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
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
    setSaving(true);
    const res = await updateProfile(form);
    setSaving(false);
    if (res.success && res.data) {
      setUser(res.data);
      toast.success("Profil berhasil diperbarui");
    } else {
      toast.error(res.error || "Gagal memperbarui profil");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.password_baru !== passwordForm.konfirmasi_sandi) {
      toast.error("Konfirmasi password tidak cocok");
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
        toast.error(data.error || "Gagal mengubah password");
      } else {
        toast.success("Password berhasil diubah");
        setPasswordForm({ password_lama: "", password_baru: "", konfirmasi_sandi: "" });
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tab Navigation - Clean Segmented Control */}
      <div className="bg-slate-100/50 p-1.5 rounded-2xl flex max-w-md mx-auto sm:mx-0">
        <button
          onClick={() => setActiveTab("profil")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "profil" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <UserCog size={14} /> Profil Saya
        </button>
        <button
          onClick={() => setActiveTab("sandi")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "sandi" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Shield size={14} /> Keamanan
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Brief Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <UserIcon size={32} strokeWidth={1.5} />
            </div>
            <h2 className="font-bold text-slate-900 leading-tight">{user.nama_lengkap}</h2>
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            <div className="mt-6 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              <CheckCircle2 size={12} /> Akun Terverifikasi
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative group hidden lg:block">
            <Shield className="absolute -right-4 -bottom-4 opacity-10 rotate-12" size={80} />
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3">Tips Keamanan</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Gunakan kombinasi huruf kapital, angka, dan simbol untuk password yang lebih kuat.
            </p>
          </div>
        </aside>

        {/* Form Content Area */}
        <main className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 px-6 py-8 md:px-10 shadow-sm"
            >
              {activeTab === "profil" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                      <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 font-bold text-sm cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={form.nama_lengkap}
                        onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                        placeholder="Nama Lengkap"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                          placeholder="email@anda.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">No. Telp</label>
                        <input
                          type="text"
                          value={form.no_telp}
                          onChange={(e) => setForm({ ...form, no_telp: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-50 flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-8 py-3 rounded-2xl bg-[#01793B] text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50"
                    >
                      {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sandi Lama</label>
                      <input
                        type="password"
                        value={passwordForm.password_lama}
                        onChange={(e) => setPasswordForm({ ...passwordForm, password_lama: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sandi Baru</label>
                        <input
                          type="password"
                          value={passwordForm.password_baru}
                          onChange={(e) => setPasswordForm({ ...passwordForm, password_baru: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                          placeholder="Sandi Baru"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Konfirmasi Sandi</label>
                        <input
                          type="password"
                          value={passwordForm.konfirmasi_sandi}
                          onChange={(e) => setPasswordForm({ ...passwordForm, konfirmasi_sandi: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-white font-bold text-sm outline-none focus:border-emerald-500 transition-all"
                          placeholder="Ulangi Sandi"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-50 flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50"
                    >
                      {passwordLoading ? "Memproses..." : "Ganti Kata Sandi"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
