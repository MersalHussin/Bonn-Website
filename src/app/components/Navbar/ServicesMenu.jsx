"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaHandshake } from "react-icons/fa";
import { servicesMenuLinks } from "./navData";

export default function ServicesMenu({ isOpen, closeMenus, mounted, t, i18n }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.985, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
          style={{ originY: 0, transform: "translateZ(0)" }}
          className="absolute top-[100%] mt-6 bg-white shadow-2xl border border-gray-100 z-50 rounded-3xl overflow-hidden w-[800px] ltr:-left-48 rtl:-right-48 flex"
        >
          {/* Sidebar Info */}
          <div className="w-1/3 bg-gradient-to-br from-main to-[#001a57] p-8 text-white flex flex-col justify-between  relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <FaHandshake size={150} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">{mounted ? t("services.title") : "Services"}</h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {mounted && i18n.language === "ar" 
                  ? "نوفر لك كل ما تحتاجه من الرعاية والعناية وخدمات التصنيع للغير المتميزة." 
                  : "We provide comprehensive care and exceptional third-party manufacturing services."}
              </p>
            </div>
            <Link href="/services" onClick={closeMenus} className="relative z-10 mt-6 inline-flex items-center text-sm font-bold text-white hover:text-white/80 transition group w-fit bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              {mounted && i18n.language === "ar" ? "كل الخدمات" : "All Services"} 
              <span className="ltr:ml-2 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          {/* Links Grid */}
          <div className="w-2/3 p-4 grid grid-cols-2 gap-2  bg-white content-center">
            {servicesMenuLinks.map((link) => {
              const Icon = link.icon;
              const desc = mounted && i18n.language === "ar" ? link.descAr : link.descEn;
              return (
                <Link
                  key={link.key}
                  href={link.path}
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  onClick={closeMenus}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition group border border-transparent hover:border-slate-100"
                >
                  <div className="bg-slate-50 w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center text-main group-hover:scale-110 group-hover:bg-main group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-main transition text-[14px] mb-0.5">{mounted ? t(link.key) : link.key}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">{desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
