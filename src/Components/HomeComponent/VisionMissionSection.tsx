import MissionCard from "./MissionCard";
import VisionCard from "./VisionCard";

export default function VisionMissionSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto w-full">
      <VisionCard />
      <MissionCard />
    </section>
  );
}
