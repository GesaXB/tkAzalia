import Link from 'next/link';
import BackgroundDecoration from '../shared/BackgroundDecoration';

export default function HeroSection() {
  return (
    <section className="relative text-center flex flex-col items-center justify-center min-h-[65vh] px-4 pt-6 md:pt-10">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-3xl mx-auto px-2 text-center -mt-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
          Selamat Datang di <br />
          <span className="text-[#01793B]">TK Azalia</span>
        </h1>

        <div className="relative mb-6 max-w-xl mx-auto">
          <p className="text-sm md:text-base text-gray-700 italic font-medium leading-relaxed">
          Rumah kedua bagi buah hati Anda untuk tumbuh <span className="text-[#01793B] font-semibold not-italic">cerdas</span> dan berakhlak <span className="text-[#01793B] font-semibold not-italic">mulia</span>
          </p>
        </div>

        <Link
          href="/about"
          className="group inline-flex items-center gap-2 bg-[#01793B] text-white px-5 py-2.5 rounded-full text-sm font-semibold
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 ease-out
                    hover:scale-105 hover:bg-green-700
                    active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Pelajari lebih ...
          <div className="bg-white rounded-xl p-1 transition-transform duration-300 group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#01793B]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </Link>
      </div>

    </section>
  );
}
