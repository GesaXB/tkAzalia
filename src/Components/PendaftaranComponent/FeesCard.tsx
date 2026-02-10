export default function FeesCard() {
  return (
    <div className="bg-[#01793B] p-8 rounded-3xl shadow-lg text-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          💰 Informasi Biaya
        </h3>
        <p className="opacity-90 mb-6">
          Untuk rincian biaya pendaftaran, SPP bulanan, dan uang gedung, silakan unduh brosur digital kami atau hubungi admin.
        </p>
      </div>
      <button className="bg-white text-[#01793B] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors w-fit">
        Hubungi via WhatsApp
      </button>
    </div>
  );
}
