"use client";

import { login } from "@/lib/client/auth";
import { setToken } from "@/lib/client/session";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const response = await login(username, password);
    setLoading(false);

    if (!response.success || !response.data) {
      setError(response.error || "Login gagal");
      return;
    }

    setToken(response.data.token);
    if (response.data.user.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }
    router.push("/dashboard/siswa");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      {/* Bagian Kanan - Form Login */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="max-w-md w-full ml-auto">
          {/* Logo untuk mobile dengan background putih */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="rounded-2xl bg-white p-4 shadow-lg border border-gray-100">
              <div className="relative w-20 h-20">
                <Image
                  src="/logotk.png"
                  alt="TK Azalia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h1>
          <p className="text-slate-500 text-sm mb-8">Masuk menggunakan username untuk mengakses dashboard</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white shadow-sm"
                  required
                />
              </div>
              <div className="text-right mt-2">
                <Link href="/auth/forgotpassword" className="text-sm text-[#01793B] hover:underline font-medium">
                  Lupa Password?
                </Link>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#01793B] hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : "Masuk Sekarang"}
            </button>

            <p className="mt-8 text-center text-sm text-slate-600">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-[#01793B] font-semibold hover:underline">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </motion.div>

      {/* Bagian Kiri - Branding dengan background putih untuk logo */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#01793B] to-emerald-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="3" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        {/* Blur effects */}
        <div className="absolute top-0 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md mx-auto text-center">
            {/* Logo dengan background putih agar terlihat */}
            <div className="bg-white rounded-3xl p-4 inline-block mb-6 shadow-2xl ring-4 ring-white/30">
              <div className="relative w-36 h-36">
                <Image
                  src="/logotk.png"
                  alt="TK Azalia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Teks dengan efek glow */}
            <h2 className="text-4xl font-bold mb-3 text-white drop-shadow-lg">TK Azalia</h2>
            <p className="text-emerald-100 text-lg mb-4 font-light">Masa Depan Cemerlang</p>

            {/* Dekoratif divider */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-0.5 bg-white/40 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-12 h-0.5 bg-white/40 rounded-full"></div>
            </div>

            {/* Fitur-fitur dengan ikon */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Pendidikan Berkualitas</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="font-medium">Guru Profesional</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 15.07 15.07 0 003 10.898V16a2 2 0 002 2h10a2 2 0 002-2v-5.102c0-1.323-.236-2.614-.688-3.836a1 1 0 00-1.86.724c.15.388.266.799.344 1.223.078.425.125.851.137 1.272.009.259-.074.513-.227.712-.172.223-.432.357-.714.357-.269 0-.519-.124-.684-.324a2.652 2.652 0 01-.421-.809 1 1 0 00-1.915.388c.077.3.174.598.291.89.23.578.575 1.088.995 1.484A1 1 0 0112 15h-4a1 1 0 01-.751-1.253c.209-.672.507-1.305.881-1.866.371-.555.822-1.031 1.292-1.422.456-.378.887-.627 1.206-.749.297-.113.488-.389.488-.71v-1.8c0-.41.157-.803.44-1.098.281-.294.668-.46 1.078-.46.227 0 .445.055.645.16.15.078.292.18.421.299.286.263.491.61.577.998.109.495.143 1.006.102 1.513-.043.543-.154 1.082-.315 1.604.26.146.504.32.726.52.545.493.95 1.15 1.06 1.913.057.365.041.735-.013 1.097-.059.405-.169.8-.326 1.176h5.396A1 1 0 0020 12v-1.102c0-1.96-.532-3.84-1.508-5.445z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Lingkungan Nyaman</span>
              </div>
            </div>


          </div>
        </div>
      </motion.div>
    </div>
  );
}
