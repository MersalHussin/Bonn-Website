"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Hero() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";  

  return (
    <section className="relative w-full h-[80vh] max-[450px]:h-[75svh] overflow-hidden mt-[65px] bg-main" dir="ltr">
    

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0033a0]/90 via-[#0033a0]/70 to-[#07327b]/95" />

      {/* Content */}
      <Container className="relative z-20 h-full flex items-center justify-between">
        <Image src={'/images/bonnHero.jpeg'} alt="Bonn Industry" width={650} height={650} className="rounded-2xl hidden xl:flex"/>
        <div className="max-w-4xl text-center text-white">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl max-[450px]:text-3xl font-extrabold leading-tight mb-3"
          >
            {isArabic
              ? "نحوّل الأفكار الطبية إلـى منتجات تنافس عالمـــيًا"
              : "We Transform Medical Ideas Into Globally Competitive Products"}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-115 mx-auto mb-10 text-md md:text-xl"
          >
            {isArabic
              ? "شريكك في تصنيع مستحضرات التجميل الطبيـــــــــــــــــة والمستلزمات الصحية من الفكرة وحتى الســـــــــــــــــوق"
              : "Your trusted partner for manufacturing cosmetic, healthcare, and medical products — from concept to market."}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row-reverse gap-4 justify-center "
          >
            <Link
              href="/registration"
              className="group relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-main font-bold transition-all duration-300 hover:scale-[1.03]"
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
      </Container>
    </section>
  );
}
