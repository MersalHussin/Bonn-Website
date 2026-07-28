import React from "react";
import { motion } from "framer-motion";
import { Smile, Droplets, Feather, Flower2, Sun, Layers } from "lucide-react";

export default function LeVisageCategories({ t }: { t: any }) {
  return (
    <section id="product-lines" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-lv-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t.categoriesTitle}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {t.categories.map((c: string, i: number) => {
            const catIcons = [Smile, Droplets, Feather, Flower2, Sun];
            const CatIcon = catIcons[i] || Layers;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group bg-white p-8 rounded-3xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center border border-gray-100 hover:border-lv-main/30 hover:shadow-[0_20px_40px_rgb(225,29,72,0.08)] transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-lv-main/10 to-lv-main/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CatIcon
                    size={36}
                    className="text-lv-main group-hover:text-[#FF4B7D] transition-colors"
                  />
                </div>
                <div className="font-bold text-gray-800 text-lg group-hover:text-lv-main transition-colors">
                  {c}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
