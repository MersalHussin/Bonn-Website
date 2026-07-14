"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { brands } from "../components/Navbar/navData";

export default function BrandsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            {isArabic ? "علاماتنا التجارية" : "Our Brands"}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {isArabic 
              ? "نفخر في مصنع بون للصناعات الطبية بامتلاك وتطوير مجموعة من العلامات التجارية الرائدة التي تقدم منتجات عالية الجودة تلبي احتياجات عملائنا في مختلف القطاعات."
              : "At Boon Medical Industries, we take pride in owning and developing a portfolio of leading brands that offer high-quality products meeting the needs of our customers across various sectors."}
          </p>
        </motion.div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group flex flex-col items-center text-center h-full"
              >
                <div className="w-40 h-40 relative mb-6 flex items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={brand.logo}
                    alt={isArabic ? brand.name_ar : brand.name_en}
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-main transition-colors">
                  {isArabic ? brand.name_ar : brand.name_en}
                </h3>
                <div className="mt-4 w-12 h-1 bg-main/20 group-hover:bg-main group-hover:w-20 transition-all duration-300 rounded-full"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
