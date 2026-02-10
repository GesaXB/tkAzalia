export default function PrincipalSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Sambutan Kepala Sekolah</h2>
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden relative border-4 border-white shadow-md -mt-12">
          <div className="w-full h-full bg-[#01793B] flex items-center justify-center text-white text-2xl font-bold">
            KS
          </div>
        </div>

        <blockquote className="text-gray-600 italic text-lg mb-6">
          Pendidikan anak usia dini adalah fondasi masa depan bangsa. Kami di TK Azalia berkomitmen penuh untuk memberikan layanan pendidikan terbaik dengan sepenuh hati.
        </blockquote>

        <div>
          <h4 className="text-xl font-bold text-[#01793B]">Ibu Kepala Sekolah, S.Pd.</h4>
          <p className="text-sm text-gray-500">Kepala TK Azalia</p>
        </div>
      </div>
    </section>
  );
}
