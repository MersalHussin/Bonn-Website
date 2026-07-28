import React from "react";
import { motion } from "framer-motion";
import { iconMap, Feature } from "../../brands/leVisagePlus/types";
import { Globe } from "lucide-react";

export default function LeVisageFeatures({ t }: { t: any }) {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#fff1f4]/60">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lv-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lv-main/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t.featuresTitle}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((f: Feature, i: number) => {
            const Icon = iconMap[f.icon] || Globe;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-8 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] border border-gray-100 hover:border-lv-main/30 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Floating accent blob behind icon */}
                <div className="absolute top-8 rtl:right-8 ltr:left-8 w-16 h-16 bg-lv-main/10 rounded-full blur-xl group-hover:bg-lv-main/20 transition-all duration-300 pointer-events-none" />

                <div className="relative w-16 h-16 flex items-center justify-center mb-6 rounded-2xl bg-gradient-to-br from-lv-main/10 to-lv-main/5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} className="text-lv-main" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-lv-main transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
