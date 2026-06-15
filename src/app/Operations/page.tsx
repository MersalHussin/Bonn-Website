"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RandDPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <main className="w-full text-[#0F2451]">
      {/* Hero */}
      <section className="pt-10 relative overflow-hidden bg-gradient-to-r from-[#0B5BD3] to-[#1F7AF1] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t("operations.title")}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-3xl mx-auto text-white/90 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("operations.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Quality Management */}
      <section id="qms" className="bg-gradient-to-b from-[#F0F6FF] to-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B5BD3] to-[#1F7AF1] mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t("operations.qms.title")}
          </motion.h2>

          {/* Vision */}
          <motion.div
            className="rounded-2xl bg-white border border-[#E6EEFF] shadow-md p-8 mb-10 hover:shadow-2xl hover:-translate-y-1 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-3 text-[#0F2451]">
              {t("operations.qms.vision.title")}
            </h3>
            <p className="text-[#334766] leading-relaxed text-lg">
              {t("operations.qms.vision.desc")}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="rounded-2xl bg-white border border-[#E6EEFF] shadow-md p-8 mb-12 hover:shadow-2xl hover:-translate-y-1 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#0F2451]">
              {t("operations.qms.mission.title")}
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-[#334766] leading-relaxed text-lg">
              {(t("operations.qms.mission.points", { returnObjects: true }) as string[]).map(
                (point: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {point}
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-2">
            {(t("operations.qms.steps", {
              returnObjects: true,
            }) as { title: string; desc: string }[]).map((step, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-gradient-to-br from-white to-[#F9FBFF] border border-[#DDEBFF] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#0B5BD3] font-extrabold text-xl">
                    {idx + 1}.
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F2451]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#334766] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Section */}
      <section id="process" className="bg-[#F6F9FF] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-[#0F2451] mb-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {t("rnd.process.title")}
          </motion.h2>

          <motion.p
            className="text-[#1A3351] leading-relaxed text-lg text-center max-w-3xl mx-auto mb-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("rnd.intro")}
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2">
            {(t("rnd.process.steps", {
              returnObjects: true,
            }) as { title: string; desc: string }[]).map((step, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-white border border-[#E6EEFF] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#0B5BD3] font-extrabold text-xl">
                    {idx + 1}.
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F2451]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#334766] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <motion.div
            className="rounded-3xl bg-gradient-to-r from-[#0B5BD3] to-[#1F7AF1] p-10 text-white shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              {t("rnd.cta.title")}
            </h3>
            <p className="mb-6 text-lg">{t("rnd.cta.subtitle")}</p>
            <div className="flex justify-center gap-4 md:flex-row flex-col gap-y-3">
              <Link
                href="/#contact"
                className="bg-white text-[rgb(11,91,211)] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition shadow-md"
              >
                {t("rnd.cta.primary")}
              </Link>
              <Link
                href="/services"
                className="bg-white/10 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition shadow-md"
              >
                {t("rnd.cta.secondary")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
