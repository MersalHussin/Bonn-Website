import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LeVisageHero({ t, lang }: { t: any; lang: string }) {
  return (
    <section className="relative flex items-center justify-center min-h-[95vh] overflow-hidden">
      <Image
        src="/images/visageProducts.png"
        alt="Le Visage Hero Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-lv-main/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-lv-main/40 via-transparent to-lv-main/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-lv-main/60 via-transparent to-lv-main/20" />

      {/* Curved Bottom Divider */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10 transform">
        <svg
          className="block w-full h-[60px] md:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="#ffffff"
        >
          <path d="M0,0 V46.29 C150,80.5 300,100 600,100 C900,100 1050,80.5 1200,46.29 V120 H0 Z" />
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 mt-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl relative md:text-6xl lg:text-7xl font-extrabold mb-6 text-white tracking-tight leading-tight max-w-3xl drop-shadow-md"
        >
          <Image
            src="/images/Visage.png"
            alt="Le Visage"
            width={150}
            height={100}
            className="object-contain brightness-0 invert absolute top-[-3rem] w-24 left-[50%] translate-[-50%] "
          />
          {t.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mb-12 text-lg md:text-2xl text-white/95 font-normal leading-relaxed drop-shadow-sm"
        >
          {t.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link
            href="#products"
            className="flex items-center justify-center gap-3 bg-white text-lv-main shadow-xl shadow-black/10 hover:shadow-black/15 hover:scale-[1.03] px-10 py-4 rounded-full font-extrabold text-lg transition-all"
          >
            {t.ctaBtn}
            {lang === "ar" ? (
              <ArrowLeft size={22} className="stroke-[3px]" />
            ) : (
              <ArrowRight size={22} className="stroke-[3px]" />
            )}
          </Link>
          <Link
            href="#contact-us"
            className="flex items-center justify-center gap-3 bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10 shadow-sm hover:scale-[1.03] px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
          >
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
