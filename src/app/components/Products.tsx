"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
} from "lucide-react";

const services = [
  {
    title: "Product Ideation & Selection",
    description:
      "We help identify market trends and select suitable product concepts that match your brand vision and market needs.",
    icon: <Brain size={80} className="text-white" />,
  },
  {
    title: "Custom Formulation",
    description:
      "Our R&D team develops tailor-made formulations using active ingredients to achieve targeted cosmetic benefits.",
    icon: <FlaskConical size={80} className="text-white" />,
  },
  {
    title: "Ready-to-Use Formulations",
    description:
      "Choose from our standard, pre-approved, high-quality formulas ready for fast market deployment.",
    icon: <PackageCheck size={80} className="text-white" />,
  },
  {
    title: "Packaging Development & Design",
    description:
      "We design and source creative, brand-aligned packaging tailored to regulatory and aesthetic standards.",
    icon: <Palette size={80} className="text-white" />,
  },
  {
    title: "End-to-End Production",
    description:
      "From raw material sourcing to filling and labeling, we handle full-scale production under GMP standards.",
    icon: <Factory size={80} className="text-white" />,
  },
  {
    title: "Documentation & Registration",
    description:
      "We prepare regulatory documentation and assist in registering products in local and international markets.",
    icon: <FileCheck2 size={80} className=" text-white" />,
  },
];


export default function ServicesAndBrands() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#032e6a] via-[#0046b0] to-[#00265a] text-white">
      {/* Services */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-200 mb-2">
          {t("our_services")}
        </h2>
        <p className="text-gray-200 text-xl max-w-2xl mx-auto">
          {t("we_build_brands")}
        </p>
      </div>

<div className="background grid md:grid-cols-3 gap-5 md:ml-0 md:mr-0">
  {services.map((service, index) => (
<motion.div
  key={service.title}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
  className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur "
>

      <div className="flex justify-center mb-6">{service.icon}</div>
      <h3 className="text-2xl font-semibold text-gray-200 mb-3 text-center">
        {t(service.title)}
      </h3>
      <p className="text-gray-1000 text-center mb-4">{t(service.description)}</p>
    </motion.div>
  ))}
</div>
    </section>
  );
}
