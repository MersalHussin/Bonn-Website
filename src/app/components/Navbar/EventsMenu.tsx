"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { eventsMenuLinks } from "./navData";
interface IProps {
  isOpen: boolean,
  closeMenus: () => void,
  mounted: boolean,
  t: (key: string) => string,
  i18n: any 
}
export default function EventsMenu({ isOpen, closeMenus, mounted, t, i18n }: IProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.985, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
          style={{ originY: 0, transform: "translateZ(0)" }}
          className="absolute top-[100%] mt-6 bg-white shadow-2xl border border-gray-100 z-50 rounded-3xl overflow-hidden w-[450px] ltr:-left-24 rtl:-right-24 flex"
        >
          {/* Sidebar Info */}
          <div className="w-1/3 bg-gradient-to-br from-main to-[#001a57] p-6 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <FaCalendarAlt size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">{mounted ? t("events") : "Media Center"}</h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">
                {mounted && i18n.language === "ar" 
                  ? "تابع آخر أخبارنا ومقالاتنا الطبية المتجددة." 
                  : "Follow our latest news and medical articles."}
              </p>
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="w-2/3 p-4 flex flex-col gap-2 bg-white justify-center">
            {eventsMenuLinks.map((link) => {
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
                    <Icon size={18} />
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
