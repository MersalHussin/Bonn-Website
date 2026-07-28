import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LeVisageAbout({
  t,
  lang,
}: {
  t: any;
  lang: string;
}) {
  return (
    <section id="who-we-are" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              {t.whoTitle}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full" />
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium pt-2">
              {t.whoText}
            </p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative lg:h-[500px] flex items-center justify-center"
          >
            {/* Background Blob */}
            <div className="absolute inset-0 bg-lv-main/10 rounded-[3rem] rotate-3 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-white rounded-[3rem] -rotate-3 scale-105 shadow-xl" />

            <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] bg-white shadow-2xl z-10 border-lv-main border-4 hover:scale-[1.02] transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden">
              <Image
                src="/images/visageProducts.png"
                alt="Le Visage Products"
                width={800}
                height={800}
                className="w-[90%] h-[90%] object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
