"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { useEffect, useState } from "react";

export default function Hero() {
  const { t, i18n } = useTranslation();  
    const [mount , setMount] = useState(false);
      useEffect(() => {
    setMount(true);
  }, []);

  return (
    <section className="relative w-full h-[80vh] -  bg-no-repeat  mx-auto max-[450px]:h-[75svh] overflow-hidden mt-[65px] bg-main" dir="ltr">
    
    {mount && (
      <>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b bg-main opacity-10 bg-center  bg-[url('/images/bonnHero.jpeg')]  bg-blend-luminosity bg-cover  from-[#0033a0]/90 via-[#0033a0]/70 to-[#07327b]/95" />

      {/* Content */}
      <Container className="relative z-20 h-full mx-auto px-4 sm:px-6 flex items-center justify-center xl:justify-between gap-8 lg:gap-12">
        
        {/* Hero Image - Simple & Non-traditional */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden xl:flex relative w-[600px] h-[400px] xl:w-[650px] xl:h-[450px] group mt-8"
        >
          {/* Minimalist offset outline */}
          <div className="absolute -top-3 -bottom-3 -left-3 -right-3 border-[1.5px] border-white/30 rounded-tl-[120px] rounded-br-[120px] rounded-tr-3xl rounded-bl-3xl z-0 transition-transform duration-700 group-hover:-rotate-2 group-hover:scale-[1.02]"></div>
          
          {/* Main Image */}
          <div className="relative z-10 w-full h-full overflow-hidden rounded-tl-[110px] rounded-br-[110px] rounded-tr-2xl rounded-bl-2xl shadow-2xl">
            <Image 
              src={'/images/bonnHero.jpeg'} 
              alt="Bonn Industry" 
              fill
              priority
              className="object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
          </div>
          
          {/* Simple floating dot accent */}
          <div className="absolute top-10 -right-5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 animate-pulse"></div>
        </motion.div>

        <div className="max-w-3xl min-w-lg sm:min-w-xl flex flex-col items-center text-center text-white scale-70 md:scale-100 z-20">
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
      </>
    )}
    </section>
  );
}
