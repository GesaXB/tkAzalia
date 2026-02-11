import Link from "next/link";

export default function RegisterPage() {
  return (
    // PERUBAHAN SAMA:
    // Gunakan 'pt-40' yang sama persis dengan Login agar sejajar.
    <div className="flex-grow flex justify-center bg-gray-50 px-4 pt-20 pb-20">
      
      {/* Kartu Register */}
      {/* 'h-fit' memastikan kotak hanya setinggi isinya, tapi start dari atas */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-fit">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#01793B] mb-2">Buat Akun Baru</h1>
          <p className="text-gray-500 text-sm">Bergabunglah dengan keluarga besar TK Azalia</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Input Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Nama Anda"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
            />
          </div>

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
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
            <input 
              type="password" 
              placeholder="Ulangi password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
            />
          </div>

          {/* Tombol Daftar */}
          <button className="w-full bg-[#01793B] hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 mt-2">
            Daftar Akun
          </button>

        </form>

        {/* Link ke Login */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-[#01793B] font-bold hover:underline">
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  );
}