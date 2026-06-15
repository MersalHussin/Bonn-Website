"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";
import Link from "next/link";

export default function Hero() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section className="relative w-full h-[65vh] max-[450px]:h-[75svh] overflow-hidden mt-[65px]">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-112 m-0 p-0"
        src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1768245923/Promo_-_V2-2-2_xa4zoc.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050b18]/90 via-[#050b18]/70 to-[#050b18]/95" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-4 py-1 rounded-full border border-[#4ca1ff]/40 text-[#4ca1ff] text-xs md:text-sm tracking-wide"
          >
            {isArabic
              ? "تصنيع طبي معتمد في السعودية"
              : "Certified Medical Manufacturing – Saudi Arabia"}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl max-[450px]:text-3xl font-extrabold leading-tight mb-6"
          >
            {isArabic
              ? "نحوّل الأفكار الطبية إلى منتجات تنافس عالميًا"
              : "We Transform Medical Ideas Into Globally Competitive Products"}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto mb-10 text-sm md:text-lg"
          >
            {isArabic
              ? "شريكك في تصنيع مستحضرات التجميل الطبية والمستلزمات الصحية من الفكرة وحتى السوق."
              : "Your trusted partner for manufacturing cosmetic, healthcare, and medical products — from concept to market."}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/registration"
              className="group relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#4ca1ff] text-black font-semibold transition-all duration-300 hover:scale-[1.03]"
            >
              {isArabic ? "ابدأ مشروعك" : "Start Your Project"}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
            >
              {isArabic ? "استكشف خدماتنا" : "Explore Services"}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
