"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
          initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
          style={{ originY: 0, transform: "translateZ(0)" }}
          className="absolute top-[100%] mt-4 bg-white shadow-xl border border-gray-100 z-50 rounded-2xl overflow-hidden w-[260px] ltr:left-0 rtl:right-0 flex flex-col p-2"
        >
          {eventsMenuLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.key}
                href={link.path}
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                onClick={closeMenus}
                target={(link as any).target}
                download={(link as any).download}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group border border-transparent hover:border-slate-100"
              >
                <div className="bg-slate-50 w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center text-main group-hover:scale-110 group-hover:bg-main group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon size={14} />
                </div>
                <h3 className="font-semibold text-slate-700 group-hover:text-main transition text-[14px]">
                  {mounted ? t(link.key) : link.key}
                </h3>
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
