export default function ContactMap() {
  return (
    <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-lg h-64 border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2705056776!2d109.2366!3d-7.4124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e8f00000001%3A0x0!2zN8KwMjQnNDQuNiJTIDEwOcKwMTQnMTguMiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>
  );
}
