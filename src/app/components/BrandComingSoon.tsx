"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

interface BrandComingSoonProps {
  brandNameAr: string;
  brandNameEn: string;
  logo: string;
  categoryAr?: string;
  categoryEn?: string;
  taglineAr?: string;
  taglineEn?: string;
  descAr?: string;
  descEn?: string;
}

export default function BrandComingSoon({
  brandNameAr,
  brandNameEn,
  logo,
  categoryAr = "علامة تجارية تابعة لمصنع بون للصناعات الطبية",
  categoryEn = "A Brand by Bonn Medical Industries",
  descAr = "نعمل بكل شغف على تحضير منتجات متميزة ومبتكرة تلبي أعلى معايير الجودة والفعالية. ترقبوا الإطلاق الرسمي والتشكيلة الكاملة قريبًا!",
  descEn = "We are passionately developing an exceptional line of innovative products adhering to the highest quality and efficacy standards. Stay tuned for the official launch soon!",
}: BrandComingSoonProps) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const brandName = isAr ? brandNameAr : brandNameEn;
  const category = isAr ? categoryAr : categoryEn;
  const description = isAr ? descAr : descEn;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 flex flex-col justify-center items-center" dir={isAr ? "rtl" : "ltr"}>
      
      <div className="max-w-3xl w-full mx-auto text-center">
        
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 flex justify-center"
        >
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-center">
            <Image
              src={logo}
              alt={brandName}
              width={180}
              height={180}
              priority
              className="object-contain max-h-40 max-w-40"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 font-medium text-sm mb-6">
            {category}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            {isAr ? "قريباً" : "Coming Soon"}
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
            {description}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/brands"
            className="w-full sm:w-auto bg-main hover:bg-main-hover text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            {isAr ? "جميع العلامات التجارية" : "All Brands"}
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-700 font-medium px-8 py-3 rounded-lg border border-slate-300 transition-colors"
          >
            {isAr ? "الرئيسية" : "Home"}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
