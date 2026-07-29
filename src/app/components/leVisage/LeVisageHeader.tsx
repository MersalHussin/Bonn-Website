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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    const sectionIds = ["who-we-are", "why-us", "product-lines", "achievements", "products", "product-journey"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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

  const navLinks = [
    { href: "/brands/leVisagePlus", label: isArabic ? "الرئيسية" : "Home" },
    { href: "#who-we-are", label: isArabic ? "من نحن" : "Who We Are" },
    { href: "#why-us", label: isArabic ? "لماذا نحن" : "Why Us" },
    { href: "#achievements", label: isArabic ? "الإنجازات" : "Achievements" },
    { href: "#product-lines", label: isArabic ? "خطوط المنتجات" : "Product Lines" },
    { href: "#products", label: isArabic ? "المنتجات" : "Products" },
    { href: "#product-journey", label: isArabic ? "رحلة المنتج" : "Product Journey" },
  ];

  return (
    <>
      <header
        className="w-full fixed top-0 left-0 z-[9999] bg-white/95 backdrop-blur-lg md:backdrop-blur-xl border-b border-lv-main/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
        dir="ltr"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between relative flex-row-reverse lg:flex-row">
          
          <Link href="/brands/leVisagePlus" className="shrink-0 flex items-center justify-center">
            <Image src="/images/Visage.png" alt="Le Visage Logo" width="100" height="50" className="object-contain" priority />
          </Link>

          {/* Centered Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-6" dir={isArabic ? "rtl" : "ltr"}>
            {navLinks.map((link, idx) => {
              const isActive = link.href.startsWith("#") ? activeSection === link.href.substring(1) : activeSection === "";
              return (
                <Link key={idx} href={link.href} className={`text-sm font-bold transition-colors ${isActive ? 'text-lv-main' : 'text-gray-700 hover:text-lv-main'}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 hover:bg-lv-main hover:text-white transition-all px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md cursor-pointer border border-slate-100 group"
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
              className="hidden sm:flex items-center justify-center gap-2 bg-lv-main text-white hover:bg-lv-main/90 transition-all px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
            >
              <span>{mounted ? (isArabic ? "تواصل معنا" : "Contact Us") : "Contact Us"}</span>
            </Link>

            {/* Mobile Burger Menu Button */}
            <button
              className="lg:hidden text-2xl text-gray-700 hover:text-lv-main transition-colors p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <IoCloseSharp /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[9980] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 right-0 z-[9990] bg-white shadow-2xl w-[85%] sm:w-[400px] lg:hidden flex flex-col h-[100vh] px-5"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Header inside mobile menu to look consistent */}
            <div className="flex items-center justify-between h-20 py-4 border-b border-gray-100 bg-gray-50/50">
              <Image src="/images/Visage.png" alt="Le Visage Logo" width={80} height={40} className="object-contain" />
              <button
                className="text-2xl text-gray-700 hover:text-lv-main transition-colors p-2"
                onClick={() => setIsOpen(false)}
              >
                <IoCloseSharp size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-20 pb-10 h-20 hide-scrollbar flex flex-col gap-6">
              
              {/* Language Selection inside mobile menu */}
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-gray-200 text-sm hover:bg-lv-main/5 transition font-medium"
                  >
                    <Image src={isArabic ? "/images/sa.svg" : "/images/gb.svg"} alt="lang" width={20} height={14} /> 
                    <span className="text-gray-800">{isArabic ? "العربية" : "English"}</span>
                  </button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                      >
                        <button onClick={() => handleLanguageChange("ar", "rtl")} className="flex items-center justify-center gap-3 py-3 hover:bg-gray-50 w-full text-sm border-b border-gray-50 font-medium text-gray-700 hover:text-lv-main transition">
                          <Image src="/images/sa.svg" alt="" width={18} height={12} /> العربية
                        </button>
                        <button onClick={() => handleLanguageChange("en", "ltr")} className="flex items-center justify-center gap-3 py-3 hover:bg-gray-50 w-full text-sm font-medium text-gray-700 hover:text-lv-main transition">
                          <Image src="/images/gb.svg" alt="" width={18} height={12} /> English
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col mt-4">
                {navLinks.map((link, idx) => {
                  const isActive = link.href.startsWith("#") ? activeSection === link.href.substring(1) : activeSection === "";
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.05 }} className="border-b border-gray-100 last:border-0 flex flex-col w-full">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 py-4 text-lg font-bold transition-colors w-full justify-start ${isActive ? 'text-lv-main' : 'text-gray-800 hover:text-lv-main'}`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Contact CTA */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="#contact-us"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-lv-main text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:bg-lv-main/90 transition-colors"
                  >
                    <span>{mounted ? (isArabic ? "تواصل معنا" : "Contact Us") : "Contact Us"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
