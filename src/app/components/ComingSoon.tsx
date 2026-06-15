"use client";

import { motion } from "framer-motion";
import { FaTools, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ComingSoonPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E0ECFF] via-white to-[#F9FBFF] text-center px-6">
      
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center justify-center w-28 h-28 bg-[#0056D2] text-white rounded-full shadow-xl mb-8"
      >
        <FaTools className="text-5xl animate-pulse" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold text-[#003D99] mb-6"
      >
        {t("underDevelopment")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed mb-10"
      >
        {t("comingSoonDescription")}
      </motion.p>

      {/* Extra Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex items-center gap-3 text-gray-600"
      >
        <FaClock className="text-xl text-[#0056D2]" />
        <span>{t("expectedLaunch")}</span>
      </motion.div>
    </div>
  );
}
