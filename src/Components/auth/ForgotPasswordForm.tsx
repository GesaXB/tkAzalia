"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Reset link dikirim ke:", email);
    setIsSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      {/* Bagian Kanan - Form */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="max-w-md w-full ml-auto">
          {/* Logo untuk mobile */}
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

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Lupa Password?</h1>
                <p className="text-slate-500 text-sm mb-8">
                  Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset kata sandi.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Alamat Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#01793B] hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </>
                    ) : "Kirim Link Reset"}
                  </button>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href="/auth/login"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-[#01793B] transition-colors group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      Kembali ke halaman masuk
                    </Link>
                  </div>

                  <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
                    <Link href="/terms-and-conditions" className="hover:text-[#01793B] transition-colors">Syarat & Ketentuan</Link>
                    <Link href="/privacy-policy" className="hover:text-[#01793B] transition-colors">Kebijakan Privasi</Link>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100 ring-4 ring-emerald-50/50">
                  <Mail size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Cek Email Anda</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Kami telah mengirimkan tautan pemulihan kata sandi ke <br />
                  <span className="font-bold text-slate-900">{email}</span>
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all"
                  >
                    Kirim Ulang Email
                  </button>
                  <Link
                    href="/auth/login"
                    className="block w-full text-sm font-bold text-[#01793B] hover:text-emerald-700"
                  >
                    Kembali ke Halaman Masuk
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bagian Kiri - Branding */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#01793B] to-emerald-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
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

        <div className="absolute top-0 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md mx-auto text-center">
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
            <h2 className="text-4xl font-bold mb-3 text-white drop-shadow-lg text-center w-full">Keamanan Akun</h2>
            <p className="text-emerald-100 text-lg mb-8 font-light">Kami membantu memulihkan akses Anda dengan mudah dan aman.</p>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <div className="flex items-start gap-4 text-left">
                <div className="bg-emerald-400/20 p-2 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Privasi Terjamin</h4>
                  <p className="text-emerald-50/70 text-sm">Privasi data Anda adalah prioritas utama kami dengan enkripsi terbaik.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
