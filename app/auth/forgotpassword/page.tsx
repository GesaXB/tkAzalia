"use client";

import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini nanti logika kirim email reset password
    console.log("Reset link dikirim ke:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-12 pb-12 bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8 font-sans">
      
      {/* HEADER: LOGO & JUDUL */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block relative w-16 h-16 mb-4 hover:scale-105 transition-transform">
          <Image
            src="/logotk.png"
            alt="Logo TK Azalia"
            fill
            className="object-contain drop-shadow-sm"
            priority
          />
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Lupa Kata Sandi?
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-xs mx-auto">
          Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi untuk mereset kata sandi.
        </p>
      </div>

      {/* CARD FORM */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {!isSubmitted ? (
            /* TAMPILAN FORMULIR */
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* INPUT EMAIL */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] sm:text-sm transition-all"
                  />
                </div>
              </div>

              {/* TOMBOL KIRIM */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#01793B] hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#01793B] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Kirim Link Reset
              </button>
            </form>
          ) : (
            /* TAMPILAN SUKSES (Jika sudah submit) */
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 text-[#01793B] rounded-full flex items-center justify-center mx-auto mb-4">
                 <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Cek Email Anda</h3>
              <p className="text-sm text-gray-600">
                Kami telah mengirimkan link reset password ke <strong>{email}</strong>.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-[#01793B] hover:text-emerald-700 hover:underline mt-4 block mx-auto"
              >
                Kirim ulang email
              </button>
            </div>
          )}

          {/* LINK KEMBALI KE LOGIN */}
          <div className="mt-8 pt-6 border-t border-gray-100">
             <Link 
               href="/auth/login" 
               className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01793B] transition-colors group"
             >
               <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               Kembali ke halaman masuk
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}