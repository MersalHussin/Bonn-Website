"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ServicesGallery() {
  const { t } = useTranslation();

  return (
    <section className="relative py-28 bg-[#F6F9FF] overflow-hidden">

      {/* subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#E2E8FF_0%,transparent_55%)] -z-10" />

      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* ===== Header ===== */}
        <div className="max-w-3xl">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-[#003A8C]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("gallery.title") || "Our Manufacturing Process"}
          </motion.h2>

          <motion.div
            className="mt-5 w-28 h-[3px] bg-gradient-to-r from-[#0056D2] to-[#7BA7FF] rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
          />

          <motion.p
            className="mt-8 text-lg text-[#4B4B4B]/80 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("gallery.subtitle") ||
              "A closer look at our facilities, processes, and production standards."}
          </motion.p>
        </div>

        {/* ===== Videos ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Video 1 */}
          <motion.div
            className="relative rounded-xl overflow-hidden border border-[#0056D2]/20 bg-white"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#0056D2]/10 mix-blend-multiply z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1761160485/whiteboard_final_v_1_nujzk5.webm"
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="relative rounded-xl overflow-hidden border border-[#0056D2]/20 bg-white"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#0056D2]/10 mix-blend-multiply z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1770045989/finesh_1_1_1_owz1uo.webm"
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
