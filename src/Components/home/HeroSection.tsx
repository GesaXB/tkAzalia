import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="text-center flex flex-col items-center mb-20 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
        Selamat Datang di <br />
        <span className="text-[#01793B]">TK Azalia</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Rumah kedua bagi buah hati Anda untuk tumbuh <span className='text-[#01793B] font-medium'>cerdas</span> dan berakhlak <span className='text-[#01793B] font-medium'>mulia</span>
      </p>

      <Link
        href="/about"
        className="group flex items-center gap-2 bg-[#01793B] text-white px-8 py-3 rounded-full font-semibold
                  shadow-lg hover:shadow-xl
                  transition-all duration-300 ease-out
                  hover:scale-105 hover:bg-green-700
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Pelajari lebih
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
    </section>
  );
}
