"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutVisionMission() {
  return (
    <section className="max-w-6xl mx-auto px-6">

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}

        className="bg-white rounded-lg shadow-md border-t-[8px] border-[#108043] px-8 py-12 md:px-12"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          

          <div className="flex flex-col items-center justify-start md:border-r md:border-gray-200 md:pr-10 pb-10 md:pb-0 border-b md:border-b-0 border-gray-200">
            <h3 className="text-3xl font-bold mb-6 text-black text-center">
              Visi TK Azalia
            </h3>
            <p className="text-center text-lg leading-relaxed text-black max-w-md font-medium">
              "Menjadi taman kanak-kanak terdepan yang mencetak generasi unggul,
              berkarakter, dan siap menghadapi masa depan"
            </p>
          </div>


          <div className="flex flex-col justify-start md:pl-10 pt-10 md:pt-0">
            <h3 className="text-3xl font-bold mb-6 text-black text-center">
              Misi TK Azalia
            </h3>
            <div className="text-lg text-black">
              <p className="mb-2 font-medium">Memberikan pendidikan terbaik melalui:</p>

              <ul className="list-disc list-outside ml-5 space-y-2 marker:text-black">
                <li>Lingkungan belajar yang aman dan nyaman</li>
                <li>Kurikulum holistik berbasis permainan</li>
                <li>Pendampingan oleh guru yang berkompeten</li>
                <li>Kerjasama erat dengan orang tua</li>
              </ul>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}