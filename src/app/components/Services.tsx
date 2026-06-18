"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

const services = [
  {
    key: "ideation",
    slug: "product-ideation",
    icon: <Brain size={80} className="text-white" />,
  },
  {
    key: "formulation",
    slug: "custom-formulation",
    icon: <FlaskConical size={80} className="text-white" />,
  },
  {
    key: "ready",
    slug: "ready-formulas",
    icon: <PackageCheck size={80} className="text-white" />,
  },
  {
    key: "packaging",
    slug: "packaging-design",
    icon: <Palette size={80} className="text-white" />,
  },
  {
    key: "production",
    slug: "production",
    icon: <Factory size={80} className="text-white" />,
  },
  {
    key: "registration",
    slug: "registration",
    icon: <FileCheck2 size={80} className="text-white" />,
  },
];


export default function Services() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Services */}
        <div className="text-center mb-16 text-main" >
        <SectionTitle title={t("our_services")} subtitle={t("we_build_brands")} align="center" theme="dark" className="mb-0" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, index) => (
<Link
  key={service.key}
  href={`/services/${service.slug}`}
  className="block group"
>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="rounded-3xl p-10 bg-main border border-second/20 backdrop-blur h-full group-hover:bg-main-hover transition-colors duration-300"
  >
      <div className="flex justify-center mb-6">{service.icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-3 text-center">
        {t(`services.${service.key}.title`)}
      </h3>
      <p className="text-gray-200 text-center mb-4">
        {t(`services.${service.key}.desc`)}
      </p>

      {/* Learn more link */}
      <div className="flex items-center justify-center gap-1 text-white/60 group-hover:text-white transition-colors duration-300 text-sm font-medium">
        <span>{t("learn_more")}</span>
        {isRTL ? (
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        ) : (
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        )}
      </div>
  </motion.div>
</Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
