import Link from "next/link";

export default function LoginPage() {
  return (
    // PERUBAHAN:
    // 1. Hapus 'items-center' (biar gak naik-turun).
    // 2. Ganti 'pt-32' jadi 'pt-40' (biar turunnya pas enak dilihat).
    <div className="flex-grow flex justify-center bg-gray-50 px-4 pt-20 pb-20">
      
      {/* Kartu Login */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-fit">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#01793B] mb-2">Selamat Datang</h1>
          <p className="text-gray-500 text-sm">Masuk untuk mengakses akun Anda</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="contoh@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
            />
            <div className="text-right mt-2">
              <a href="/auth/forgotpassword" className="text-xs text-[#01793B] hover:underline">Lupa Password?</a>
            </div>
          </div>

          {/* Tombol Masuk */}
          <button className="w-full bg-[#01793B] hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Masuk Sekarang
          </button>

        </form>

        {/* Link ke Register */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="text-[#01793B] font-bold hover:underline">
            Daftar di sini
          </Link>
        </div>

      </div>
    </div>
  );
}