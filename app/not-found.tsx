'use client';

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-10">
          <div className="relative w-24 h-24">
            <Image
              src="/logotk.png"
              alt="Logo TK Azalia"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl font-bold text-[#01793B] mb-2">404</div>
          <div className="text-2xl font-semibold text-gray-800">Halaman Tidak Ditemukan</div>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-gray-600">
            Halaman yang Anda cari tidak tersedia.
            Silakan kembali ke halaman utama.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <div className="relative w-4 h-4">
              <Image
                src="/logotk.png"
                alt="Logo TK Azalia"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            ← Kembali ke halaman sebelumnya
          </button>
        </div>

        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-xs text-[#01793B]">TK Azalia</p>
        </div>
      </div>
    </div>
  );
}
