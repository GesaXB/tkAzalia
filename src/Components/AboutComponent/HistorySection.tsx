import Image from "next/image";

export default function HistorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-gray-100">
          <Image
            src=""
            alt="Gedung TK Azalia"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Perjalanan Kami
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            Berdiri sejak tahun 20XX, TK Azalia hadir menjawab kebutuhan orang tua akan pendidikan
            yang seimbang antara ilmu pengetahuan umum dan penanaman nilai-nilai karakter.
            Kami percaya bahwa setiap anak adalah bintang yang memiliki potensi unik untuk bersinar.
          </p>
          <p className="text-gray-600 leading-relaxed text-justify">
            Dengan dukungan tenaga pengajar yang profesional dan lingkungan yang asri,
            kami terus berkomitmen untuk menjadi rumah kedua yang nyaman bagi buah hati Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
