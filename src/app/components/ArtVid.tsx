"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "./Container";
import { MyPlayer } from "./Player";
import i18n from "@/i18n";

export default function ServicesGallery() {
  const { t , i18n } = useTranslation();

  return (
    <section className={`relative py-28 bg-[#F6F9FF] overflow-hidden`} dir={i18n.language === "ar" ? "rtl" : "ltr"} >

      {/* subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#E2E8FF_0%,transparent_55%)] -z-10" />

      <Container className="space-y-24">

        {/* ===== Header ===== */}
        <div className="max-w-3xl">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-[#003A8C]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("videos.section_title")}
          </motion.h2>

          <motion.div
            className="mt-5 w-28 h-[3px] bg-gradient-to-r from-main to-[#7BA7FF] rounded-full"
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
            {t("videos.section_subtitle")}
          </motion.p>
        </div>

        {/* ===== Videos ===== */}
        <div className="flex flex-col gap-24 mt-8">

          {/* Video 1: Case Study */}
          <motion.div 
            className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-full lg:w-1/2 rounded-[30px] overflow-hidden shadow-2xl">
              <MyPlayer src="https://res.cloudinary.com/dzgztrsa0/video/upload/q_auto/f_auto/v1782016492/CaseStudy_lhqend.mp4" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-[#E2E8FF] text-[#003A8C] font-semibold rounded-full text-sm">
                {t("videos.badge_1")}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#003A8C] leading-tight">
                {t("videos.case_study_title")}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("videos.case_study_desc")}
              </p>
            </div>
          </motion.div>

          {/* Video 2: Awareness */}
          <motion.div 
            className="flex flex-col-reverse lg:flex-row-reverse items-center gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-full lg:w-1/2 rounded-[30px] overflow-hidden shadow-2xl">
              <MyPlayer src="https://res.cloudinary.com/dzgztrsa0/video/upload/q_auto/f_auto/v1782016577/BonnArt_mvkuxs.mp4" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-[#E2E8FF] text-[#003A8C] font-semibold rounded-full text-sm">
                {t("videos.badge_2")}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#003A8C] leading-tight">
                {t("videos.awareness_title")}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("videos.awareness_desc")}
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
