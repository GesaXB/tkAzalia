"use client";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import { motion } from "framer-motion";

export default function ContactContent() {
  return (
    // Margin top negatif (-mt-20) membuat kotak konten naik ke atas banner, terlihat premium
    <section className="max-w-7xl mx-auto px-4 mb-24 relative z-20 -mt-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start"
      >
        {/* Sisi Kiri: Info & Map */}
        <div className="space-y-8">
          <ContactInfo />
          <ContactMap />
        </div>
        
        {/* Sisi Kanan: Form */}
        <ContactForm />
      </motion.div>
    </section>
  );
}