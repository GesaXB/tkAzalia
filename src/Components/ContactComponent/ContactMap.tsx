export default function ContactMap() {
  return (
    <div className="bg-white p-2 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
      <div className="rounded-2xl overflow-hidden h-72 w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2705056776!2d109.2366!3d-7.4124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e8f00000001%3A0x0!2zN8KwMjQnNDQuNiJTIDEwOcKwMTQnMTguMiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          // Class grayscale dihapus agar map tetap berwarna
          className="transition-all duration-500"
        ></iframe>
        
        {/* Label di atas Map */}
        <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full text-xs font-bold shadow-md text-gray-800 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Lokasi TK Azalia
        </div>
      </div>
    </div>
  );
}