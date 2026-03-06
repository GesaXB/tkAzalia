import ContactContent from "../ContactComponent/ContactContent";
import ContactHero from "../ContactComponent/ContactHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] overflow-hidden">
      <ContactHero />
      <ContactContent />
    </main>
  );
}
