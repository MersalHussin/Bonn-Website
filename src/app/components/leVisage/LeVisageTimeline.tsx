import React from "react";
import { motion } from "framer-motion";
import {
  Microscope,
  Blend,
  ClipboardCheck,
  FileBadge,
  Rocket,
  Globe,
} from "lucide-react";

export default function LeVisageTimeline({ t }: { t: any }) {
  return (
    <section id="product-journey" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t.timelineTitle}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full" />
        </div>
        <div className="relative md:flex md:items-center md:gap-12">
          {/* Vertical line for mobile */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-100 md:hidden transform -translate-x-1/2"></div>
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200"></div>
          {t.timeline.map((step: string, i: number) => {
            const icons = [Microscope, Blend, ClipboardCheck, FileBadge, Rocket];
            const Icon = icons[i] || Globe;

            return (
              <motion.div
                key={i}
                className="group relative z-10 mb-16 md:mb-0 md:flex-1 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {/* ELEMENTS (centered on mobile) */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div className="relative w-20 h-20 flex items-center justify-center rounded-3xl bg-white shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-gray-100 mb-6 group-hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] group-hover:scale-110 group-hover:border-lv-main/30 transition-all duration-300">
                    <Icon
                      size={32}
                      className="text-lv-main group-hover:scale-110 transition-transform"
                    />

                    {/* Number Badge */}
                    <div className="absolute -top-3 rtl:-left-3 ltr:-right-3 w-8 h-8 flex items-center justify-center rounded-full bg-lv-main text-white font-black text-sm shadow-lg border-2 border-white pointer-events-none">
                      {i + 1}
                    </div>
                  </div>
                  {/* Title/text */}
                  <span className="font-bold text-gray-800 text-lg group-hover:text-lv-main transition-colors">
                    {step}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
