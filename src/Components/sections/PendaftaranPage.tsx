import PendaftaranHero from "@/Components/PendaftaranComponent/PendaftaranHero";
import PendaftaranInfo from "@/Components/PendaftaranComponent/PendaftaranInfo";
import PendaftaranSteps from "@/Components/PendaftaranComponent/PendaftaranSteps";

export default function PendaftaranSection() {
  return (
    <main className="min-h-screen bg-white">
      <PendaftaranHero />
      <PendaftaranSteps />
      <PendaftaranInfo />
    </main>
  );
}