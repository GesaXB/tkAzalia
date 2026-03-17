"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import SectionCard from "@/Components/Dashboard/SectionCard";
import { changePassword } from "@/lib/client/auth";
import { ArrowLeft, KeyRound, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminPasswordPage() {
  const router = useRouter();
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    password_lama: "",
    password_baru: "",
    konfirmasi_password: "",
  });

  useEffect(() => {
    setDashboardInfo("Keamanan Akun", "Update kata sandi administrator");
  }, [setDashboardInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password_baru !== form.konfirmasi_password) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    if (form.password_baru.length < 6) {
      setError("Password baru minimal 6 karakter");
      return;
    }

    setLoading(true);
    const res = await changePassword({
      password_lama: form.password_lama,
      password_baru: form.password_baru,
    });
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Gagal mengubah password");
      return;
    }

    setSuccess("Password berhasil diperbarui");
    setForm({ password_lama: "", password_baru: "", konfirmasi_password: "" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/admin/profile"
          className="p-2 rounded-xl border border-gray-100 bg-white shadow-sm hover:bg-gray-50 transition-colors text-gray-600"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Ubah Password</h1>
          <p className="text-sm text-gray-500">Ganti kata sandi akun Anda secara berkala</p>
        </div>
      </div>

      <SectionCard
        title="Form Ganti Password"
        description="Pastikan password baru Anda kuat dan sulit menebak."
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-3">
              <Lock size={18} />
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm flex items-center gap-3">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Password Lama</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={form.password_lama}
                onChange={(e) => setForm((f) => ({ ...f, password_lama: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Password Baru</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <KeyRound size={18} />
              </div>
              <input
                type="password"
                value={form.password_baru}
                onChange={(e) => setForm((f) => ({ ...f, password_baru: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Konfirmasi Password Baru</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ShieldCheck size={18} />
              </div>
              <input
                type="password"
                value={form.konfirmasi_password}
                onChange={(e) => setForm((f) => ({ ...f, konfirmasi_password: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-fit px-8 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Perbarui Password"}
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
