import ContactInfoItem from "./ContactInfoItem";
import { MapPin, Phone, Mail, Clock } from "lucide-react"; // Kita ganti SVG manual dengan Lucide biar rapi

export default function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
      {/* Dekorasi Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full transition-transform duration-500 group-hover:scale-150 -z-0"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-[#01793B] pl-4">
          Informasi Kontak
        </h3>
        
        <div className="space-y-6">
          <ContactInfoItem
            icon={<MapPin className="w-5 h-5" />}
            title="Alamat Sekolah"
            content={
              <>
                Jl. Pendidikan No. 123, Purwokerto,<br />
                Jawa Tengah, Indonesia 53123
              </>
            }
          />

          <ContactInfoItem
            icon={<Phone className="w-5 h-5" />}
            title="Telepon & WhatsApp"
            content={
              <>
                (0281) 1234567 <br />
                <span className="font-semibold text-green-600">+62 812-3456-7890 (Admin WA)</span>
              </>
            }
          />

          <ContactInfoItem
            icon={<Mail className="w-5 h-5" />}
            title="Email"
            content={
              <>
                info@tkazalia.sch.id<br />
                admin@tkazalia.sch.id
              </>
            }
          />

          <ContactInfoItem
            icon={<Clock className="w-5 h-5" />}
            title="Jam Operasional"
            content={
              <>
                Senin - Jumat: 07.00 - 14.00 WIB<br />
                Sabtu: 07.00 - 12.00 WIB
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}