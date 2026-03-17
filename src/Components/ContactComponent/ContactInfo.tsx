import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactInfoItem from "./ContactInfoItem";

export default function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">

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
                Jl. Raya Gn. Tugel, Windusara, Karangklesem,<br />
                Kec. Purwokerto Sel., Kabupaten Banyumas,<br />
                Jawa Tengah 53144

              </>
            }
          />

          <ContactInfoItem
            icon={<Phone className="w-5 h-5" />}
            title="Telepon & WhatsApp"
            content={
              <>
                (0815) 15405099 <br />
                <span className="font-semibold text-green-600">+62-815-1540-5099</span>
              </>
            }
          />

          <ContactInfoItem
            icon={<Mail className="w-5 h-5" />}
            title="Email"
            content={
              <>
                @tkitazalia@gmail.com<br />
              </>
            }
          />

          <ContactInfoItem
            icon={<Clock className="w-5 h-5" />}
            title="Jam Operasional"
            content={
              <>
                Hari: Senin - Jumat<br />
                Jam: 07.30 - 13.00
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
