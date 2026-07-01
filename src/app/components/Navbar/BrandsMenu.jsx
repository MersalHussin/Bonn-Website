"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { brands } from "./navData";

export default function BrandsMenu({ isOpen, closeMenus, mounted, t, i18n }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.985, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
          style={{ originY: 0, transform: "translateZ(0)" }}
          className="absolute top-[100%] mt-6 bg-white shadow-2xl border border-gray-100 z-50 rounded-3xl overflow-hidden w-[550px] ltr:-left-24 rtl:-right-24 flex"
        >
          {/* Sidebar Info */}
          <div className="w-1/3 bg-gradient-to-br from-main to-[#001a57] p-6 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="120" width="120" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">{mounted ? t("ourbrands") : "Our Brands"}</h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                {mounted && i18n.language === "ar" 
                  ? "اكتشف مجموعة علاماتنا التجارية الرائدة." 
                  : "Discover our leading premium brands."}
              </p>
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="w-2/3 p-4 grid grid-cols-2 gap-3 bg-white">
            {brands.map((brand) => {
              const brandName = mounted && i18n.language === "ar" ? brand.name_ar : brand.name_en;
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  onClick={closeMenus}
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="h-10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300  w-full rounded-xl p-1 ">
                    <Image src={brand.logo} alt={brandName} width={60} height={35} className="object-contain" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-main transition-colors text-center line-clamp-1">{brandName}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
