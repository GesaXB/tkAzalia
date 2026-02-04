import MissionCard from "./MissionCard";
import VisionCard from "./VisionCard";

export default function VisionMissionSection() {
  return (
    <section className="grid md:grid-cols-2 gap-20 max-w-7xl mx-auto w-full px-4 md:px-0">
      <VisionCard />
      <MissionCard />
    </section>
  );
}
