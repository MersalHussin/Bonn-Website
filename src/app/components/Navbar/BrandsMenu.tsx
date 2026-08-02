"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { brands } from "./navData";

interface IProps {
  isOpen: boolean,
  closeMenus: () => void,
  mounted: boolean,
  t: (key: string) => string,
  i18n: any 
}

export default function BrandsMenu({ isOpen, closeMenus, mounted, t, i18n }: IProps) {
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
          {brands.map((brand: any) => {
            const brandName = mounted && i18n.language === "ar" ? brand.name_ar : brand.name_en;
            return (
              <Link
                key={brand.slug}
                href={brand.externalLink ? brand.externalLink : `/brands/${brand.slug}`}
                target={brand.externalLink ? "_blank" : undefined}
                rel={brand.externalLink ? "noopener noreferrer" : undefined}
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                onClick={closeMenus}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group border border-transparent hover:border-slate-100"
              >
                <div className="bg-slate-50 w-10 h-8 rounded-md flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-100 overflow-hidden">
                  <Image src={brand.logo} alt={brandName} width={30} height={20} className="object-contain" />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-main transition text-[14px]">
                  {brandName}
                </span>
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
