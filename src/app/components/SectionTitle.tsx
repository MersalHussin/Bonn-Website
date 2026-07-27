"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SectionTitleProps = {
  /** The main heading text (already translated or a raw string) */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** "center" = always centered, "auto" = aligned based on language direction (start) */
  align?: "center" | "auto";
  /** Text color theme: "dark" for dark text on light bg, "light" for white text on dark bg */
  theme?: "dark" | "light";
  /** Additional className for the wrapper */
  className?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  align = "auto",
  theme = "dark",
  className = "",
}: SectionTitleProps) {
  const { i18n } = useTranslation();

  const isCenter = align === "center";

  const titleColor = theme === "dark" ? "text-main" : "text-white";
  const subtitleColor =
    theme === "dark" ? "text-gray-500" : "text-white/70";
  const accentBg =
    theme === "dark"
      ? "bg-gradient-to-r from-main to-main/60"
      : "bg-gradient-to-r from-white to-white/50";

        const [mount , setMount] = useState(false);
            useEffect(() => {
          setMount(true);
        }, []);
  return mount ? (

       <div
       className={`${className} mb-10 md:mb-14 ${isCenter ? "text-center" : ""} `}
       dir={align === "auto" ? (i18n.language === "ar" ? "rtl" : "ltr") : undefined}
       >
       
       
       {/* Title */}
       <motion.h2
       initial={{ opacity: 0, y: 16 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: 0.1 }}
       className={`text-3xl md:text-4xl font-extrabold leading-tight ${titleColor}`}
       >
       {title}
       </motion.h2>
       
       {/* Subtitle */}
       {subtitle && (
         <motion.p
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.4, delay: 0.2 }}
         className={`mt-3 text-base md:text-lg max-w-2xl ${subtitleColor} ${
           isCenter ? "mx-auto" : ""
           }`}
           >
           {subtitle}
           </motion.p>
          )}
          
          {/* Accent line */}
          <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-1 w-14 rounded-full mt-2 ${accentBg} ${
            isCenter ? "mx-auto origin-center" : "origin-left rtl:origin-right"
            }`}
            />
            </div>
          ) : "Loading";
        }
