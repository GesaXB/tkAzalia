import Image from "next/image";
import HistoryImage from '../../../public/History.png';

export default function HistorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="space-y-20">
        <h2 className="text-center text-4xl md:text-5xl font-bold">
          Mengenal <span className="text-[#01793B]">Sekolah</span> kami
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
          <div className="flex-1 space-y-8">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="border-l-4 border-[#01793B] pl-6">
                TK AZALIA merupakan sekolah taman kanak-kanak swasta yang berlokasi di
                Purwokerto Selatan, Banyumas. Berdiri sejak{' '}
                <span className="text-[#01793B] font-semibold">1 Juli 2019</span> di bawah naungan{' '}
                <span className="text-[#01793B] font-semibold">Kementerian Pendidikan dan Kebudayaan</span>,
                kami berkomitmen menghadirkan lingkungan belajar yang{' '}
                <span className="text-[#01793B] font-semibold">aman, nyaman, dan menyenangkan</span>{' '}
                bagi anak usia dini.
              </p>
              <p className="pl-6">
                Melalui pendidikan yang berfokus pada{' '}
                <span className="text-[#01793B] font-semibold">karakter, kreativitas, dan kemandirian</span>,
                TK AZALIA hadir untuk mendukung{' '}
                <span className="text-[#01793B] font-semibold">tumbuh kembang generasi masa depan</span>.
              </p>
            </div>

            <div className="flex gap-4 pl-6">
              <div className="w-12 h-12 bg-[#01793B]/10 rounded-2xl flex items-center justify-center">
                <div className="w-2 h-8 bg-[#01793B] rounded-full"></div>
              </div>
              <div className="w-12 h-12 bg-[#01793B]/10 rounded-2xl flex items-center justify-center">
                <div className="w-2 h-8 bg-[#01793B] rounded-full rotate-45"></div>
              </div>
              <div className="w-12 h-12 bg-[#01793B]/10 rounded-2xl flex items-center justify-center">
                <div className="w-2 h-8 bg-[#01793B] rounded-full -rotate-45"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[380px] h-[380px]">
                <div className="absolute inset-0 bg-[#01793B] rounded-[32px] rotate-6 opacity-10"></div>
                <div className="absolute inset-0 bg-[#01793B] rounded-[32px] -rotate-3 opacity-20"></div>
                <div className="absolute inset-0 bg-white rounded-[32px] rotate-12 border border-[#01793B]/10"></div>

                <div className="absolute inset-3 bg-white rounded-[28px] shadow-lg overflow-hidden border-2 pr-2 border-white">
                  <Image
                    src={HistoryImage}
                    alt="TK Azalia"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#01793B] rounded-full border-2 border-white shadow-md opacity-90"></div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#01793B] rounded-full border-2 border-white shadow-md opacity-90"></div>
                <div className="absolute top-16 -left-4 w-10 h-10 bg-[#01793B]/80 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute bottom-16 -right-4 w-10 h-10 bg-[#01793B]/80 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute top-32 -right-5 w-8 h-8 bg-[#01793B]/70 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute bottom-32 -left-5 w-8 h-8 bg-[#01793B]/70 rounded-full border-2 border-white shadow-md"></div>

                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-5 py-1.5 rounded-full border border-[#01793B] shadow-sm">
                  <span className="text-xs font-semibold text-[#01793B] tracking-wider">TK AZALIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
