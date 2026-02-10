export default function ContactForm() {
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-4 border-[#01793B]">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Kirim Pesan</h3>
      <p className="text-gray-500 mb-8 text-sm">Silakan isi formulir di bawah ini, kami akan membalas secepatnya.</p>

      <form className="space-y-5">
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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all"
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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white">
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
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
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all resize-none"
      ></textarea>
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      type="button"
      className="w-full bg-[#01793B] text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
    >
      Kirim Pesan Sekarang
    </button>
  );
}
