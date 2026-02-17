"use client";
import { Send, User, Home, Phone, Calendar } from "lucide-react";

export default function PendaftaranForm() {
  return (
    <section id="form-daftar" className="py-10 px-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header Form */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#01793B]">Formulir Pendaftaran</h2>
          <p className="text-gray-500 mt-2">Mohon isi data dengan benar dan lengkap sesuai dokumen asli.</p>
        </div>

        <form className="p-8 md:p-12 space-y-10">
          
          {/* BAGIAN 1: DATA CALON SISWA */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2 border-gray-200">
              <User className="text-[#01793B]" /> A. Data Calon Siswa
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Nama Lengkap Anak" placeholder="Sesuai Akta Kelahiran" />
              <Input label="Nama Panggilan" placeholder="Nama Panggilan" />
              <Input label="Tempat Lahir" placeholder="Kota Kelahiran" />
              <Input label="Tanggal Lahir" type="date" placeholder="" />
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin</label>
                <div className="flex gap-4">
                  <Radio label="Laki-laki" name="gender" />
                  <Radio label="Perempuan" name="gender" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Anak Ke-</label>
                <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 transition-all" />
              </div>
            </div>
          </div>

          {/* BAGIAN 2: DATA ORANG TUA */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2 border-gray-200">
              <Home className="text-[#01793B]" /> B. Data Orang Tua / Wali
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Nama Ayah" placeholder="Nama Lengkap Ayah" />
              <Input label="Pekerjaan Ayah" placeholder="Pekerjaan saat ini" />
              <Input label="Nama Ibu" placeholder="Nama Lengkap Ibu" />
              <Input label="Pekerjaan Ibu" placeholder="Pekerjaan saat ini" />
              <Input label="No. WhatsApp Aktif" type="tel" placeholder="0812xxxx" icon={<Phone className="w-4 h-4 text-gray-400" />} />
              <Input label="Alamat Rumah" placeholder="Alamat Lengkap Domisili" />
            </div>
          </div>

          {/* TOMBOL SUBMIT */}
          <div className="pt-6">
            <button type="button" className="w-full bg-[#01793B] hover:bg-[#01602e] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex justify-center items-center gap-2">
              <Send className="w-5 h-5" />
              Kirim Formulir Pendaftaran
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              *Dengan mengirim formulir ini, saya menyatakan data yang diisi adalah benar.
            </p>
          </div>

        </form>
      </div>
    </section>
  );
}

// Komponen Input Kecil biar kodingan bersih
function Input({ label, placeholder, type = "text", icon }: any) {
  return (
    <div className="relative">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input 
          type={type} 
          placeholder={placeholder} 
          className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 transition-all placeholder:text-gray-400"
        />
        {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</div>}
      </div>
    </div>
  );
}

function Radio({ label, name }: any) {
  return (
    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#01793B] transition-all w-full">
      <input type="radio" name={name} className="accent-[#01793B] w-4 h-4" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}