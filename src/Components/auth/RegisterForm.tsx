"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { login, register } from "@/lib/client/auth";
import { setToken } from "@/lib/client/session";

export default function RegisterForm() {
  const router = useRouter();
  const [namaLengkap, setNamaLengkap] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    const registerResponse = await register({
      username,
      password,
      nama_lengkap: namaLengkap,
      email,
      no_telepon: noTelepon,
    });

    if (!registerResponse.success) {
      setLoading(false);
      setError(registerResponse.error || "Registrasi gagal");
      return;
    }

    const loginResponse = await login(username, password);
    setLoading(false);

    if (!loginResponse.success || !loginResponse.data) {
      setError(loginResponse.error || "Registrasi berhasil, silakan login");
      router.push("/auth/login");
      return;
    }

    setToken(loginResponse.data.token);
    router.push("/dashboard/siswa");
  };

  return (
    <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4 py-8">
      <motion.div
        className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="md:w-2/5 flex flex-col items-center justify-center p-8 md:p-10 bg-[#01793B] text-white">
          <div className="rounded-2xl bg-white p-3 shadow-lg mb-4">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <Image
                src="/logotk.png"
                alt="TK Azalia"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-center">TK Azalia</h2>
          <p className="text-emerald-100 text-sm text-center mt-1">Bergabung dengan kami</p>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center overflow-auto max-h-[calc(100vh-6rem)]">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Buat Akun Baru</h1>
          <p className="text-slate-500 text-sm mb-6">Lengkapi data untuk mendaftar PPDB</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nomor Telepon</label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Konfirmasi Password</label>
                <input
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 sm:col-span-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#01793B] hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Daftar Akun"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-[#01793B] font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
