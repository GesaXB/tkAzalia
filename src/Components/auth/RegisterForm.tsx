"use client";

import { validateRegisterForm } from "@/lib/auth-validation";
import { register } from "@/lib/client/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "./FormInput";
import {
    IconEmail,
    IconError,
    IconEye,
    IconEyeOff,
    IconLock,
    IconPhone,
    IconShield,
    IconSpinner,
    IconUser,
    IconUsername,
} from "./icons";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    username: "",
    email: "",
    noTelepon: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const validationError = validateRegisterForm(formData);
    if (validationError) {
      setError(validationError.message);
      return;
    }

    setLoading(true);
    const registerResponse = await register({
      username: formData.username,
      password: formData.password,
      nama_lengkap: formData.namaLengkap,
      email: formData.email,
      no_telepon: formData.noTelepon,
    });

    if (!registerResponse.success) {
      setLoading(false);
      setError(registerResponse.error || "Registrasi gagal");
      return;
    }

    setLoading(false);
    router.push("/auth/login?registered=true");
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-100">
      {/* Bagian Kanan - Form Register */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="max-w-2xl w-full ml-auto">
          {/* Logo untuk mobile dengan background putih */}
          <div className="lg:hidden flex justify-center mb-6">
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

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru</h1>
            <p className="text-slate-500 text-sm">Lengkapi data diri Anda untuk mendaftar PPDB</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Nama Lengkap"
                type="text"
                placeholder="Nama lengkap Anda"
                value={formData.namaLengkap}
                onChange={(value) => handleInputChange("namaLengkap", value)}
                icon={IconUser}
              />
              <FormInput
                label="Username"
                type="text"
                placeholder="username123"
                value={formData.username}
                onChange={(value) => handleInputChange("username", value)}
                icon={IconUsername}
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                icon={IconEmail}
              />
              <FormInput
                label="Nomor Telepon"
                type="tel"
                placeholder="081234567890"
                value={formData.noTelepon}
                onChange={(value) => handleInputChange("noTelepon", value)}
                icon={IconPhone}
              />
              <FormInput
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                icon={IconLock}
                toggleIcon={showPassword ? IconEyeOff : IconEye}
                onToggleVisibility={() => setShowPassword(!showPassword)}
                error={formData.password && formData.password.length < 8 && formData.password.length > 0 ? "Password minimal 8 karakter" : undefined}
              />
              <FormInput
                label="Konfirmasi Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange("confirmPassword", value)}
                icon={IconShield}
                toggleIcon={showConfirmPassword ? IconEyeOff : IconEye}
                onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                error={formData.confirmPassword && formData.password !== formData.confirmPassword ? "Password tidak cocok" : undefined}
              />
            </div>

            {/* Syarat & Ketentuan */}
            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#01793B] focus:ring-[#01793B]"
                required
              />
              <label htmlFor="terms" className="text-xs text-slate-600">
                Saya menyetujui{" "}
                <Link href="/syarat-ketentuan" className="text-[#01793B] hover:underline">
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link href="/kebijakan-privasi" className="text-[#01793B] hover:underline">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2"
              >
                {IconError}
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#01793B] hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200 mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  {IconSpinner}
                  Memproses...
                </span>
              ) : (
                "Daftar Akun"
              )}
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

      {/* Bagian Kiri - Branding dengan background putih untuk logo */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#01793B] to-emerald-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles-register" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="3" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles-register)" />
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
            <p className="text-emerald-100 text-lg mb-4 font-light">Bergabung dengan Kami</p>

            {/* Dekoratif divider */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-0.5 bg-white/40 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-12 h-0.5 bg-white/40 rounded-full"></div>
            </div>

            {/* Keuntungan mendaftar */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">PPDB Online Mudah</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17h.37c.84 0 1.61-.65 1.872-1.547a4.882 4.882 0 00-2.396-5.096A6.978 6.978 0 0114 12.999c0 .735-.12 1.442-.34 2.101.162.332.27.689.27 1.066 0 .322-.07.628-.195.902a2 2 0 01-.805-.002zM3 12.999c0-.735.12-1.442.34-2.101A4.978 4.978 0 011 9.622V8a2 2 0 012-2h2.17A6.978 6.978 0 005 10.999c0 .735.12 1.442.34 2.101A4.978 4.978 0 013 14.378v-1.379z" />
                </svg>
                <span className="font-medium">Informasi Lengkap</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-emerald-50 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Biaya Terjangkau</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
