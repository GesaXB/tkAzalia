"use client";

import { clearToken, getToken } from "@/lib/client/session";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, BookOpen, FileText, Home, Info, LayoutDashboard, LogOut, Mail, Menu, UserPlus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setHasToken(!!getToken());
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleLogout = () => {
    clearToken();
    setHasToken(false);
    setShowLogoutModal(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/about", label: "Tentang", icon: Info },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/program", label: "Program", icon: BookOpen },
    { href: "/pendaftaran", label: "Pendaftaran", icon: UserPlus },
    { href: "/contact", label: "Kontak", icon: Mail },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logotk.png"
                  alt="Logo TK Azalia"
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#01793B] to-emerald-600 bg-clip-text text-transparent tracking-tight">
                  TK AZALIA
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Masa Depan Cemerlang
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                      ? "bg-emerald-50 text-[#01793B]"
                      : "text-gray-600 hover:text-[#01793B] hover:bg-emerald-50/50"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {hasToken ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-5 py-2 rounded-lg font-medium border transition-all duration-300 hover:scale-105 ${pathname.startsWith("/dashboard")
                      ? "bg-transparent text-[#01793B] border-[#01793B]"
                      : "bg-transparent text-[#01793B] border-[#01793B] hover:bg-emerald-50"
                      }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="px-5 py-2 rounded-lg font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={`px-5 py-2 rounded-lg font-medium border transition-all duration-300 hover:scale-105 ${pathname === "/auth/login"
                      ? "bg-transparent text-[#01793B] border-[#01793B]"
                      : "bg-transparent text-[#01793B] border-[#01793B] hover:bg-emerald-50"
                      }`}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    className={`px-5 py-2 rounded-lg font-medium border shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${pathname === "/auth/register"
                      ? "bg-emerald-800 text-white border-emerald-800"
                      : "bg-[#01793B] text-white border-[#01793B] hover:bg-emerald-700"
                      }`}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative z-[60]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[51] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[52] md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <div className="relative w-9 h-9">
                    <Image src="/logotk.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <span className="text-lg font-bold text-[#01793B]">TK AZALIA</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    const IconComp = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${isActive
                            ? "bg-emerald-50 text-[#01793B]"
                            : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                            }`}
                        >
                          <IconComp size={20} className={isActive ? "text-[#01793B]" : "text-gray-400"} />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="px-4 py-5 border-t border-gray-100 bg-gray-50/50 space-y-2.5">
                {hasToken ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold border-2 border-[#01793B] text-[#01793B] hover:bg-emerald-50 transition-all active:scale-[0.98]"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                      <LogOut size={18} />
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold border-2 border-[#01793B] text-[#01793B] hover:bg-emerald-50 transition-all active:scale-[0.98]"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold bg-[#01793B] text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
                    >
                      Daftar Sekarang
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
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
    </>
  );
}
