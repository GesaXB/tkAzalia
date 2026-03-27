import PendaftaranHero from "@/Components/PendaftaranComponent/PendaftaranHero";
import PendaftaranInfo from "@/Components/PendaftaranComponent/PendaftaranInfo";
import PendaftaranSteps from "@/Components/PendaftaranComponent/PendaftaranSteps";

interface PendaftaranSectionProps {
  dokumen: string[];
  jadwal: { tanggal_mulai: string; tanggal_selesai: string } | null;
}

export default function PendaftaranSection({ dokumen, jadwal }: PendaftaranSectionProps) {
  return (
    <main className="min-h-screen bg-white">
      <PendaftaranHero />
      <PendaftaranSteps />
      <PendaftaranInfo dokumenFetch={dokumen} jadwalFetch={jadwal} />
    </main>
  );
}