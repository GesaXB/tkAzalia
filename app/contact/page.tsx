import ContactContent from "@/Components/ContactComponent/ContactContent";
import ContactHero from "@/Components/ContactComponent/ContactHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-hidden">
      <ContactHero />
      <ContactContent />
    </main>
  );
}