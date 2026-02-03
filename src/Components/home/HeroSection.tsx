import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center flex flex-col items-center mb-20">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
        Selamat Datang di <br />
        TK <span className="text-green-700">Azalia</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Rumah kedua bagi buah hati Anda untuk tumbuh cerdas dan berakhlak mulia
      </p>

      <Link
        href="/about"
        className="group flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-all shadow-md"
      >
        Pelajari lebih...
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </section>
  );
}
