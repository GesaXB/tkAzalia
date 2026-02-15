export default function HeroSection() {
  return (
    <section className="text-center bg-[#01793B] px-6 py-20">
      <h1 className="text-white text-4xl font-bold space-x-3 tracking-wider">Kenali kami lebih dekat</h1>
      <p className="text-white pt-2 text-xl tracking-wide">“Membentuk generasi ceria,  kreatif, dan penuh rasa  ingin tahu sejak dini”</p>
      <div className="pt-10 flex justify-center space-x-6">
        <button className="bg-white rounded-2xl px-8 py-3 font-bold text-[#01793B]">Daftar Sekarang</button>
        <button className="border-white border rounded-2xl px-8 py-3 font-bold text-white">Lihat Program</button>
      </div>
    </section>
  );
}
