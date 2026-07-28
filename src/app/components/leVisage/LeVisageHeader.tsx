"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

export default function LeVisageHeader() {
  const { t, i18n: i18nInstance } = useTranslation();
  const isArabic = i18nInstance.language === "ar";
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (lang: string, dir: string) => {
    setLangOpen(false);
    i18nInstance.changeLanguage(lang);
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("i18nextLng", lang);
      document.cookie = `i18nextLng=${lang}; path=/; max-age=31536000`;
    } catch (e) {}
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <header
        className="w-full fixed top-0 left-0 z-[9999] bg-white backdrop-blur-lg md:backdrop-blur-xl border-b border-lv-main/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
        dir="ltr"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative bg-white flex-row-reverse min-[916px]:flex-row">
          
          {/* <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0 flex items-center gap-2 text-sm text-gray-500 hover:text-lv-main transition">
              <span className="hidden sm:inline">{isArabic ? "العودة للرئيسية" : "Back to Home"}</span>
            </Link>
          </div> */}

          <Link href="/brands/leVisagePlus" className="shrink-0 flex items-center justify-center">
            <Image src="/images/Visage.png" alt="Le Visage Logo" width="100" height="50" className="object-contain" priority />
          </Link>

          {/* Centered Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-6" dir={isArabic ? "rtl" : "ltr"}>
            <Link href="#who-we-are" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "من نحن" : "Who We Are"}
            </Link>
            <Link href="#why-us" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "لماذا نحن" : "Why Us"}
            </Link>
            <Link href="#product-lines" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "خطوط المنتجات" : "Product Lines"}
            </Link>
            <Link href="#achievements" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "الإنجازات" : "Achievements"}
            </Link>
            <Link href="#products" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "المنتجات" : "Products"}
            </Link>
            <Link href="#product-journey" className="text-sm font-semibold text-gray-700 hover:text-lv-main transition">
              {isArabic ? "رحلة المنتج" : "Product Journey"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 hover:bg-lv-main hover:text-white transition-all px-4 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md cursor-pointer border border-slate-100 group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-4 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] w-40 overflow-hidden z-50 border border-gray-100"
                  >
                    <button
                      onClick={() => handleLanguageChange("ar", "rtl")}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-lv-main/5 w-full text-sm hover:cursor-pointer text-gray-700 hover:text-lv-main transition font-medium border-b border-gray-50"
                    >
                      <Image src="/images/sa.svg" alt="Arabic" width={20} height={14} className="rounded-sm shadow-sm" />
                      العربية
                    </button>
                    <button
                      onClick={() => handleLanguageChange("en", "ltr")}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-lv-main/5 w-full text-sm hover:cursor-pointer text-gray-700 hover:text-lv-main transition font-medium"
                    >
                      <Image src="/images/gb.svg" alt="English" width={20} height={14} className="rounded-sm shadow-sm" />
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link
              href="#contact-us"
              className="flex items-center justify-center gap-2 bg-lv-main text-white hover:bg-lv-main/90 transition-all px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
            >
              <span>{mounted ? (isArabic ? "تواصل معنا" : "Contact Us") : "Contact Us"}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
