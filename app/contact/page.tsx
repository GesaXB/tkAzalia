import ContactContent from "@/Components/ContactComponent/ContactContent";
import ContactHero from "@/Components/ContactComponent/ContactHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-0.5 bg-white">
      
      <ContactHero />
      
      <ContactContent />
      
    </main>
  );
}