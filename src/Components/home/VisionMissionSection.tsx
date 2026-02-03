import MissionCard from "./MissionCard";
import VisionCard from "./VisionCard";

export default function VisionMissionSection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <VisionCard />
      <MissionCard />
    </section>
  );
}
