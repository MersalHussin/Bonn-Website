"use client";

import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import Container from "../../components/ui/Container";
import Breadcrumb from "../../components/ui/Breadcrumb";

/* ================= SERVICE CONFIG ================= */
type ServiceConfig = {
  key: string;
  slug: string;
  icon: LucideIcon;
};

const SERVICES: ServiceConfig[] = [
  { key: "ideation", slug: "product-ideation", icon: Brain },
  { key: "formulation", slug: "custom-formulation", icon: FlaskConical },
  { key: "ready", slug: "ready-formulas", icon: PackageCheck },
  { key: "packaging", slug: "packaging-design", icon: Palette },
  { key: "production", slug: "production", icon: Factory },
  { key: "registration", slug: "registration", icon: FileCheck2 },
];

export default function ServicePage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const slug = params?.slug as string;
  const isRTL = i18n.language === "ar";

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center mt-[65px]">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-main">404</h1>
          <p className="text-gray-500">Service not found</p>
          <Link href="/services" className="text-main hover:underline">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const Icon = service.icon;
  const title = t(`services.${service.key}.title`);
  const desc = t(`services.${service.key}.desc`);
  const details = t(`services.${service.key}.details`);
  const features = t(`services.${service.key}.features`, { returnObjects: true }) as string[];

  // Find adjacent services for navigation
  const currentIndex = SERVICES.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? SERVICES[currentIndex - 1] : null;
  const nextService = currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : null;

  return (
    <main className="mt-[65px]">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: t("breadcrumb.services"), href: "/services" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section
        dir={isRTL ? "rtl" : "ltr"}
        className="relative bg-gradient-to-br from-main via-[#0046b0] to-[#003a8c] py-20 md:py-28 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <Container>
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 rotate-6" />
              <div className="absolute inset-[3px] rounded-3xl bg-main/60 backdrop-blur flex items-center justify-center">
                <Icon size={56} className="text-white" strokeWidth={1.4} />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center md:text-start">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/70 max-w-2xl"
              >
                {desc}
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section dir={isRTL ? "rtl" : "ltr"} className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                {details}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-main mb-6">
                  {t("servicePage.keyFeatures")}
                </h3>
                <ul className="space-y-4">
                  {Array.isArray(features) &&
                    features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-main flex-shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section dir={isRTL ? "rtl" : "ltr"} className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-main">
              {t("servicePage.ctaTitle")}
            </h2>
            <p className="text-gray-500 text-lg">
              {t("servicePage.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/registration"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-main text-white font-bold hover:bg-main-hover transition-all duration-300 hover:scale-[1.03]"
              >
                {t("servicePage.ctaPrimary")}
                <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-main/20 text-main font-semibold hover:bg-main/5 transition"
              >
                {t("servicePage.ctaSecondary")}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Navigation between services */}
      <section dir={isRTL ? "rtl" : "ltr"} className="border-t border-gray-100">
        <Container>
          <div className="flex justify-between py-6">
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-main transition-colors group"
              >
                {isRTL ? (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                )}
                <span className="text-sm font-medium">
                  {t(`services.${prevService.key}.title`)}
                </span>
              </Link>
            ) : <div />}

            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="flex items-center gap-2 text-gray-400 hover:text-main transition-colors group"
              >
                <span className="text-sm font-medium">
                  {t(`services.${nextService.key}.title`)}
                </span>
                {isRTL ? (
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            ) : <div />}
          </div>
        </Container>
      </section>
    </main>
  );
}
