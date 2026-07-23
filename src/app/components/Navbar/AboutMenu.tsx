"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { departmentsData } from "@/app/constants/departmentsData";
import { Info, Layers, ArrowLeft, ArrowRight } from "lucide-react";

interface IProps {
  isOpen: boolean;
  closeMenus: () => void;
  mounted: boolean;
  t: (key: string) => string;
  i18n: any;
  setAboutOpen?: (open: boolean) => void;
}

export default function AboutMenu({ isOpen, closeMenus, mounted, t, i18n, setAboutOpen }: IProps) {
  const isAr = i18n.language === "ar";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
          onMouseEnter={() => setAboutOpen && setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen && setAboutOpen(false)}
          style={{ originY: 0, transform: "translateZ(0)" }}
          className="fixed top-[72px] left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] border border-slate-100 z-[9999] rounded-2xl p-4 sm:p-5 w-[92vw] max-w-[960px] overflow-hidden"
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Simple Top Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-main animate-pulse"></span>
              <h5 className="font-bold text-slate-800 text-sm">
                {isAr ? "إدارات وأقسام المصنع" : "Factory Departments"}
              </h5>
              <span className="text-xs text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                17
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href="/about"
                onClick={closeMenus}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-main/10 text-main hover:bg-main hover:text-white transition-all text-xs font-bold"
              >
                <Info size={13} />
                <span>{isAr ? "صفحة من نحن" : "About Us Page"}</span>
                {isAr ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
              </Link>
              <Link
                href="/departments"
                onClick={closeMenus}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-xs font-bold"
              >
                <Layers size={13} />
                <span>{isAr ? "عرض كل الإدارات" : "View All Departments"}</span>
              </Link>
            </div>
          </div>

          {/* 6 Columns Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {departmentsData.map((dept) => {
              const Icon = dept.icon;
              return (
                <Link
                  key={dept.id}
                  href={`/about/${dept.id}`}
                  onClick={closeMenus}
                  className="group flex items-center gap-2 px-2.5 py-2 rounded-lg bg-slate-50/80 hover:bg-main hover:text-white transition-all duration-200 border border-slate-100 hover:border-transparent shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-md bg-main/10 text-main group-hover:bg-white/20 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={12} strokeWidth={2} />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-700 group-hover:text-white transition-colors truncate">
                    {isAr ? dept.nameAr : dept.nameEn}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
