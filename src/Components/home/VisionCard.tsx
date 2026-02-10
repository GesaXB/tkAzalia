export default function VisionCard() {
  return (
    <div className="bg-white p-7 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-4">
          VISI
        </h2>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed pl-4 border-l-2 border-green-100">
        Menjadi taman kanak-kanak terdepan yang mencetak generasi unggul, berkarakter, dan siap menghadapi masa depan.
      </p>
    </div>
  );
}
