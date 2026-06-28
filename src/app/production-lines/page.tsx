"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactUs from "../components/Contact";

export default function ProductionLinesPage() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <main className="w-full text-[#0F2451] pt-24" dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="pt-10 relative overflow-hidden bg-main text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {isAr ? "خطوط الإنتاج" : "Production Lines"}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl mx-auto text-white/90 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isAr 
              ? "نمتلك خطوط إنتاج متطورة ومجهزة بأحدث التقنيات لتلبية كافة احتياجاتكم في مختلف القطاعات الطبية والتجميلية بدقة عالية ومعايير عالمية." 
              : "We have advanced production lines equipped with the latest technologies to meet all your needs across medical and cosmetic sectors with high precision and global standards."}
          </motion.p>
        </div>
      </section>

      {/* Production Lines Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: isAr ? "مستحضرات التجميل" : "Cosmetic Products",
                desc: isAr ? "كريمات، لوشن، سيروم، منتجات العناية بالبشرة والشعر." : "Creams, lotions, serums, skin and hair care products.",
                icon: "✨"
              },
              { 
                title: isAr ? "منتجات الرعاية الصحية" : "Health Care Products",
                desc: isAr ? "مطهرات، غسول طبي، العناية الشخصية." : "Antiseptics, medical washes, personal care.",
                icon: "🌿"
              },
              { 
                title: isAr ? "المكملات الغذائية" : "Food Supplements",
                desc: isAr ? "فيتامينات، مكملات صحية بمعايير غذائية دقيقة." : "Vitamins and health supplements with strict food standards.",
                icon: "💊"
              },
              { 
                title: isAr ? "المستلزمات الطبية" : "Medical Devices",
                desc: isAr ? "(كحول - سرنجات - خيوط جراحية إلخ...)" : "(Alcohol, Syringes, Surgical Threads, etc...)",
                icon: "🏥"
              }
            ].map((line, idx) => (
              <motion.div
                key={idx}
                className="bg-[#F0F6FF] rounded-3xl p-8 border border-[#E6EEFF] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md mb-8 group-hover:scale-110 group-hover:-translate-y-2 transition-all text-main">
                  {line.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0F2451] mb-4">
                  {line.title}
                </h3>
                <p className="text-[#334766] leading-relaxed text-base">
                  {line.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />
    </main>
  );
}
