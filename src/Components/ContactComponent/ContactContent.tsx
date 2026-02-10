import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";

export default function ContactContent() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <ContactInfo />
          <ContactMap />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
