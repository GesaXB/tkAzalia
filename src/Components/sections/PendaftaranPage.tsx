import PendaftaranCTA from "../PendaftaranComponent/PendaftaranCta";
import PendaftaranHero from "../PendaftaranComponent/PendaftaranHero";
import PendaftaranSteps from "../PendaftaranComponent/PendaftaranSteps";
import RequirementsAndFees from "../PendaftaranComponent/RequirementsAndFees";

export default function PendaftaranPage() {
  return (
    <main className="min-h-screen pt-36 pb-20 bg-gray-50 font-sans">
      <PendaftaranHero />
      <PendaftaranSteps />
      <RequirementsAndFees />
      <PendaftaranCTA />
    </main>
  );
}
