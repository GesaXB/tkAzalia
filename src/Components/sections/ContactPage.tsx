import ContactContent from "../ContactComponent/ContactContent";
import ContactHero from "../ContactComponent/ContactHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-36 pb-20 bg-gray-50 font-sans">
      <ContactHero />
      <ContactContent />
    </main>
  );
}
