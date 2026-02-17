"use client";
import { motion } from "framer-motion";
import MissionCard from "./MissionCard";
import VisionCard from "./VisionCard";

export default function VisionMissionSection() {
  return (
    <section className="py-16 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <VisionCard />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MissionCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}