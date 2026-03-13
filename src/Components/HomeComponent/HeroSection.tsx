"use client";
import { clearToken, getToken } from '@/lib/client/session';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackgroundDecoration from '../shared/BackgroundDecoration';

export default function HeroSection() {
  const [hasToken, setHasToken] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  const handleLogout = () => {
    clearToken();
    setHasToken(false);
    setShowLogoutModal(false);
    router.push("/");
    router.refresh();
  };

  return (
    <section className="relative text-center flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-gradient-to-b from-white to-green-50/30">

      {/* Background Decoration tetap ada, tapi kita tambah blur sedikit biar fokus ke teks */}
      <div className="absolute inset-0 z-0 opacity-60">
        <BackgroundDecoration />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-2 text-center -mt-10 md:-mt-20">

        {/* Judul Utama */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
        >
          Selamat Datang di <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01793B] to-emerald-500">
            TK Azalia
          </span>
        </motion.h1>

        {/* Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-10 max-w-2xl mx-auto"
        >
          <p className="text-base md:text-xl text-gray-600 font-medium leading-relaxed">
            Rumah kedua bagi buah hati Anda untuk tumbuh <span className="text-[#01793B] font-bold">cerdas</span>, <span className="text-[#01793B] font-bold">kreatif</span>, dan berakhlak <span className="text-[#01793B] font-bold">mulia</span> dalam lingkungan yang penuh kasih sayang.
          </p>
        </motion.div>

        {/* Tombol CTA */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {hasToken ? (
              <>
                <Link
                  href="/dashboard"
                  className="group relative flex sm:inline-flex justify-center items-center gap-3 w-full sm:w-auto bg-[#01793B] text-white px-8 py-4 rounded-full text-base font-bold
                            shadow-[0_10px_20px_rgba(1,121,59,0.25)] hover:shadow-[0_15px_30px_rgba(1,121,59,0.4)]
                            transition-all duration-300 ease-out
                            hover:-translate-y-1 hover:bg-[#01602e]
                            active:scale-95"
                >
                  Ke Dashboard
                  <span className="bg-white/20 rounded-full p-1 group-hover:bg-white group-hover:text-[#01793B] transition-colors duration-300">
                    <LayoutDashboard className="w-5 h-5" />
                  </span>
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="group relative flex sm:inline-flex justify-center items-center gap-3 w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-full text-base font-bold
                            shadow-sm hover:shadow-md hover:border-red-100 hover:text-red-600
                            transition-all duration-300 ease-out
                            hover:-translate-y-1
                            active:scale-95"
                >
                  Keluar Akun
                  <span className="bg-gray-100 rounded-full p-1 group-hover:bg-red-50 group-hover:text-red-600 transition-colors duration-300">
                    <LogOut className="w-5 h-5" />
                  </span>
                </button>
              </>
            ) : (
              <Link
                href="/about"
                className="group relative flex sm:inline-flex justify-center items-center gap-3 w-full sm:w-auto bg-[#01793B] text-white px-8 py-4 rounded-full text-base font-bold
                          shadow-[0_10px_20px_rgba(1,121,59,0.25)] hover:shadow-[0_15px_30px_rgba(1,121,59,0.4)]
                          transition-all duration-300 ease-out
                          hover:-translate-y-1 hover:bg-[#01602e]
                          active:scale-95"
              >
                Pelajari Profil Kami
                <span className="bg-white/20 rounded-full p-1 group-hover:bg-white group-hover:text-[#01793B] transition-colors duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            )}
          </motion.div>

          {hasToken && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-emerald-800 text-sm font-medium">
                Sesi Anda aktif. Anda bisa langsung menuju dashboard atau keluar jika ingin berganti akun.
              </p>
            </motion.div>
          )}

          {/* MODAL KONFIRMASI LOGOUT */}
          <AnimatePresence>
            {showLogoutModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowLogoutModal(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                      <AlertCircle size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Konfirmasi Keluar
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-8">
                      Apakah Anda yakin ingin keluar dari akun Anda sekarang?
                    </p>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-6 py-3 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <LogOut size={18} />
                        Ya, Keluar
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
