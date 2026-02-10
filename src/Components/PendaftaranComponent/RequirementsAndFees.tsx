import FeesCard from "./FeesCard";
import RequirementsCard from "./RequieretmentCard";

export default function RequirementsAndFees() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="grid md:grid-cols-2 gap-8">
        <RequirementsCard />
        <FeesCard />
      </div>
    </section>
  );
}
