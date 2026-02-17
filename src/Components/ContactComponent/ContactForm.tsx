"use client";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col relative overflow-hidden">
      
      {/* Aksen atas hijau */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#01793B] to-emerald-500"></div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h3>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">
        Silakan isi formulir di bawah ini, admin kami akan membalas secepatnya via WhatsApp atau Email.
      </p>

      <form className="space-y-5 flex-grow flex flex-col">
        <FormInput
          label="Nama Lengkap"
          type="text"
          placeholder="Nama Ayah/Bunda"
          fullWidth
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="email@contoh.com"
          />
          <FormInput
            label="No. WhatsApp"
            type="tel"
            placeholder="0812..."
          />
        </div>

        <FormSelect
          label="Perihal"
          options={[
            "Info Pendaftaran (PPDB)",
            "Pertanyaan Umum",
            "Saran & Masukan",
            "Lainnya"
          ]}
        />

        <FormTextarea
          label="Pesan"
          rows={4}
          placeholder="Tulis pesan Anda di sini..."
        />

        <SubmitButton />
      </form>
    </div>
  );
}

// Styling Input Modern
function FormInput({
  label,
  type,
  placeholder,
  fullWidth = false
}: {
  label: string;
  type: string;
  placeholder: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? '' : ''}>
      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#01793B] focus:ring-4 focus:ring-[#01793B]/10 outline-none transition-all duration-300 placeholder-gray-400 text-gray-900"
      />
    </div>
  );
}

function FormSelect({
  label,
  options
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</label>
      <div className="relative">
        <select className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#01793B] focus:ring-4 focus:ring-[#01793B]/10 outline-none transition-all duration-300 appearance-none cursor-pointer text-gray-900">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        {/* Custom Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function FormTextarea({
  label,
  rows,
  placeholder
}: {
  label: string;
  rows: number;
  placeholder: string;
}) {
  return (
    <div className="flex-grow flex flex-col">
      <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#01793B] focus:ring-4 focus:ring-[#01793B]/10 outline-none transition-all duration-300 placeholder-gray-400 text-gray-900 resize-none h-full"
      ></textarea>
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      type="button"
      className="w-full bg-gradient-to-r from-[#01793B] to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition-all duration-300 mt-auto flex items-center justify-center gap-2 group"
    >
      Kirim Pesan Sekarang
      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}