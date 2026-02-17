import PendaftaranHero from "@/Components/PendaftaranComponent/PendaftaranHero";
import PendaftaranSteps from "@/Components/PendaftaranComponent/PendaftaranSteps";
import PendaftaranInfo from "@/Components/PendaftaranComponent/PendaftaranInfo";
import PendaftaranForm from "@/Components/PendaftaranComponent/PendaftaranForm";
import PendaftaranFAQ from "@/Components/PendaftaranComponent/PendaftaranFAQ";

export default function PendaftaranPage() {
  return (
    <main className="min-h-screen bg-white">
      <PendaftaranHero />
      <PendaftaranSteps />
      <PendaftaranInfo />
      <PendaftaranForm />
      <PendaftaranFAQ />
    </main>
  );
}