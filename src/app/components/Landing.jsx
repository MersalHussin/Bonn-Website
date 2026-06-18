"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Hero() {
  const { t, i18n } = useTranslation();  

  return (
    <section className="relative w-full h-[80vh] -  bg-no-repeat  mx-auto max-[450px]:h-[75svh] overflow-hidden mt-[65px] bg-main" dir="ltr">
    

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b bg-main opacity-10 bg-center  bg-[url('/images/bonnHero.jpeg')]  bg-blend-luminosity bg-cover  from-[#0033a0]/90 via-[#0033a0]/70 to-[#07327b]/95" />

      {/* Content */}
      <Container className="relative z-20 h-full mx-auto px-0 flex  items-center justify-center xl :justify-between gap-2">
        <Image src={'/images/bonnHero.jpeg'} alt="Bonn Industry" width={650} height={650} className="rounded-2xl hidden xl:flex p-2"/>
        <div className="max-w-3xl min-w-lg sm:min-w-xl   flex flex-col items-center md:flex text-center text-white scale-70  md:scale-100 ">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-[500px] text-5xl   font-extrabold leading-tight mb-3"
          >
            {t("hero.headline")}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-115 mx-auto mb-2 text-xl"
          >
            {t("hero.description")}
          </motion.p>

      

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 md:gap-12 flex-wrap scale-90"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-1"
              >
                +500
              </motion.div>
              <p className="text-xs md:text-sm text-white/80 font-medium">
                {t("stats.products")}
              </p>
            </div>

            <div className="w-px h-12 bg-white/30 hidden sm:block"></div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-1"
              >
                25
              </motion.div>
              <p className="text-xs md:text-sm text-white/80 font-medium">
                {t("stats.tonsPerDay")}
              </p>
            </div>

            <div className="w-px h-12 bg-white/30 hidden sm:block"></div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="text-3xl md:text-4xl font-extrabold text-white mb-1"
              >
                +9
              </motion.div>
              <p className="text-xs md:text-sm text-white/80 font-medium">
                {t("stats.countries")}
              </p>
            </div>
          </motion.div>
              {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row-reverse gap-4 justify-center mt-5 w-full max-w-md sm:max-w-lg"
          >
            <Link
              href="/registration"
              className="group relative inline-flex items-center flex-1 justify-center px-8 py-3 rounded-xl bg-white text-main font-bold transition-all duration-300 hover:scale-[1.03]"
            >
              {t("hero.startProject")}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                {i18n.language === "ar" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center flex-1 justify-center px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
            >
              {t("hero.exploreServices")}
            </Link>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
