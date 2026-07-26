"use client";


import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch, FaHome, FaHandshake, FaCertificate, FaQuestionCircle, FaBuilding, FaBullhorn, FaStar, FaBox, FaBook, FaRegNewspaper, FaUserCircle, FaFile, FaSitemap } from "react-icons/fa";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import SearchModal from "./SearchModal";
import AboutMenu from "./Navbar/AboutMenu";
import EventsMenu from "./Navbar/EventsMenu";
import BrandsMenu from "./Navbar/BrandsMenu";
import ServicesMenu from "./Navbar/ServicesMenu";
import { aboutMenuLinks, eventsMenuLinks, servicesMenuLinks, brands } from "./Navbar/navData";
import { departmentsData } from "../constants/departmentsData";





export default function FactoryHeader() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (lang: string, dir: string) => {
    setLangOpen(false);
    i18n.changeLanguage(lang);
    document.documentElement.dir = dir;
    try {
      localStorage.setItem('i18nextLng', lang);
      document.cookie = `i18nextLng=${lang}; path=/; max-age=31536000`;
    } catch (e) {}
    startTransition(() => {
      router.refresh();
    });
  };
  const { t ,i18n} = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const [mount , setMount] = useState(false);

  const closeMenus = () => {
    setAboutOpen(false);
    setEventsOpen(false);
    setBrandsOpen(false);
    setServicesOpen(false);
    setIsOpen(false);
  };


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowIntro(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);


const navItems = [
  { key: "home", path: "/", icon: FaHome },
  { key: "about_boon", path: "/about", icon: FaBuilding },
  { key: "services.title", type: "dropdown_services", icon: FaHandshake },
  { key: "brands", type: "dropdown", icon: FaStar },
  { key: "events", type: "dropdown_events", icon: FaBullhorn },
  // { key: "departments", path: "/about/departments", icon: FaSitemap },
  { key: "certifications", path: "/certifications", icon: FaCertificate },
  { key: "faq_nav", path: "/faq", icon: FaQuestionCircle },
];





    useEffect(() => {
    setMount(true);
  }, []);



useEffect(() => {
  const handleScroll = () => {
    if (isOpen || brandsOpen || aboutOpen || eventsOpen || langOpen) {
      setIsOpen(false);
      setBrandsOpen(false);
      setAboutOpen(false);
      setEventsOpen(false);
      setLangOpen(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [isOpen]);


  const isBlogPost = pathname?.startsWith('/blog/') && pathname.length > 6;
  const isNewsPost = pathname?.startsWith('/news/') && pathname.length > 6;
  if (pathname?.startsWith('/admin') || isBlogPost || isNewsPost) return null;

  return (
    
    <>
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-4 border-gray-200 border-t-main rounded-full animate-spin mb-4"></div>
            <p className="text-main font-semibold text-lg">{i18n.language === "ar" ? "جاري التحديث..." : "Updating..."}</p>
          </motion.div>
        )}
      </AnimatePresence>
    {/* Search Popup Modal */}
    <SearchModal isOpen={searchPopupOpen} onClose={() => setSearchPopupOpen(false)} mounted={mounted} i18n={i18n} />

    {showIntro && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="fixed inset-0 h-[100dvh] w-full bg-white z-[9999] flex flex-col justify-center items-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-60"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Pulse Ring Behind Logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-main/10 rounded-full blur-xl"
            />
            
            <Image
              src="/images/Logo.svg"
              alt="Bonn Medical Logo"
              width="140"
              height="140"
              className="object-contain drop-shadow-xl relative z-10"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center mt-8"
          >
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1/2 h-full bg-main rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[9980]"
      onClick={() => setIsOpen(false)}
    />
  )}
</AnimatePresence>
<motion.header
  layout
  style={{ transform: "translateZ(0)" }}
  className="
    w-full fixed top-0 left-0 z-[9999]
    bg-white
    backdrop-blur-lg md:backdrop-blur-xl
    border-b border-main/10
    shadow-[0_4px_30px_rgba(0,0,0,0.06)]
    after:content-[''] after:absolute after:bottom-0 after:left-0
    after:w-full after:h-px
    after:bg-gradient-to-r after:from-transparent after:via-[main]/40 after:to-transparent
    
  "
  dir="ltr"
>

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center flex-row-reverse justify-between relative min-[916px]:flex-row bg-white">
        {/* Mobile Burger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="min-[916px]:hidden text-[#1d358f] rounded-lg bg-main/5 p-2 transition-colors hover:bg-main/10 cursor-pointer z-[999]"
          aria-label="Toggle Menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <IoCloseSharp size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </motion.div>
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-main shrink-0">
          <Image src="/images/Logo.svg" className="min-w-[70px]" alt="Bonn Medical Industries Logo" width="70" height="70" />
        </Link>

        {/* Desktop Navigation (Centered) */}
        <div className={`hidden min-[916px]:flex flex-1 justify-center`}                                   
        dir={i18n.language === "ar" ? "ltr" : "rtl"}>
          <nav className="flex items-center lg:gap-6 md:gap-3 ">
              {[...navItems].reverse().map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                  className="relative group/navitem"
                  onMouseEnter={() => {
                    if (item.type === "dropdown_about") { setAboutOpen(true); setBrandsOpen(false); setEventsOpen(false); setServicesOpen(false); }
                    else if (item.type === "dropdown_events") { setEventsOpen(true); setBrandsOpen(false); setAboutOpen(false); setServicesOpen(false); }
                    else if (item.type === "dropdown") { setBrandsOpen(true); setAboutOpen(false); setEventsOpen(false); setServicesOpen(false); }
                    else if (item.type === "dropdown_services") { setServicesOpen(true); setAboutOpen(false); setBrandsOpen(false); setEventsOpen(false); }
                  }}
                  onMouseLeave={() => {
                    if (item.type === "dropdown_about") setAboutOpen(false);
                    else if (item.type === "dropdown_events") setEventsOpen(false);
                    else if (item.type === "dropdown") setBrandsOpen(false);
                    else if (item.type === "dropdown_services") setServicesOpen(false);
                  }}
                >
                  {item.type === "dropdown_about" ? (
                    <>
                      <Link
                        href="/about"
                        onClick={() => closeMenus()}
                        className={`relative flex items-center gap-1 font-bold text-[17px] transition group ${
                          aboutOpen || pathname.startsWith("/about")
                            ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main cursor-pointer"
                            : "text-gray-800 hover:text-main cursor-pointer"
                        }`}
                      >
                        {mounted ? t(item.key) : "About Us"}
                      </Link>

                      <AboutMenu isOpen={aboutOpen} closeMenus={closeMenus} mounted={mounted} t={t} i18n={i18n} setAboutOpen={setAboutOpen} />
                    </>
                  ) : item.type === "dropdown_events" ? (
                    <>
                      <button
                        onClick={() => { setEventsOpen(!eventsOpen); setBrandsOpen(false); setAboutOpen(false); }}
                        className={`relative flex items-center gap-1 font-bold text-[17px] transition group ${
                          eventsOpen || pathname.startsWith("/events") || pathname.startsWith("/news") || pathname.startsWith("/blog")
                            ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main cursor-pointer"
                            : "text-gray-800 hover:text-main cursor-pointer"
                        }`}
                      >
                        {mounted ? t("events") : "Events"}
                        {/* {item.icon && <item.icon size={13} className={`transition-colors ${eventsOpen || pathname.startsWith("/events") || pathname.startsWith("/news") || pathname.startsWith("/blog") ? "text-main" : "text-gray-400 group-hover:text-main"}`} />} */}
                      </button>

                      <EventsMenu isOpen={eventsOpen} closeMenus={closeMenus} mounted={mounted} t={t} i18n={i18n} />
                    </>
                  ) : item.type === "dropdown_services" ? (
                    <>
                      <button
                        onClick={() => { setServicesOpen(!servicesOpen); setBrandsOpen(false); setAboutOpen(false); setEventsOpen(false); }}
                        className={`relative flex items-center gap-1 font-bold text-[17px] transition group ${
                          servicesOpen || pathname.startsWith("/services")
                            ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main cursor-pointer"
                            : "text-gray-800 hover:text-main cursor-pointer"
                        }`}
                      >
                        {mounted ? t(item.key) : "Services"}
                        {/* {item.icon && <item.icon size={13} className={`transition-colors ${servicesOpen || pathname.startsWith("/services") ? "text-main" : "text-gray-400 group-hover:text-main"}`} />} */}
                      </button>
                      <ServicesMenu isOpen={servicesOpen} closeMenus={closeMenus} mounted={mounted} t={t} i18n={i18n} />
                    </>
                  ) : item.type === "dropdown" ? (
                    <>
                      {/* Brands Button */}
                      <button
                        onClick={() => { setBrandsOpen(!brandsOpen); setAboutOpen(false); setEventsOpen(false); }}
                        className={`relative flex items-center gap-1 font-bold text-[17px] transition group ${
                          brandsOpen || pathname.startsWith("/brands")
                            ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main cursor-pointer"
                            : "text-gray-800 hover:text-main cursor-pointer"
                        }`}
                      >
                        {mounted ? t("ourbrands") : "Our Brands"}
                        {/* {item.icon && <item.icon size={13} className={`transition-colors ${brandsOpen || pathname.startsWith("/brands") ? "text-main" : "text-gray-400 group-hover:text-main"}`} />} */}
                      </button>

                      {/* Dropdown */}
                      <BrandsMenu isOpen={brandsOpen} closeMenus={closeMenus} mounted={mounted} t={t} i18n={i18n} />
                    </>
                  ) : (
                    <Link
                      href={item.path || "/"}
                      onClick={() => { setIsOpen(false); setBrandsOpen(false); }}
                      className={`relative font-bold text-[17px] transition-colors flex items-center gap-1 ${
                        pathname === item.path
                          ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main"
                          : "text-gray-800 hover:text-main"
                      } group`}
                    >
                      <span className="relative z-10">{mounted ? t(item.key) : item.key}</span>
                      {/* {item.icon && <item.icon size={13} className={`group-hover:text-main transition-colors ${pathname === item.path ? "text-main" : "text-gray-400"}`} />} */}
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-main group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </motion.div>
              ))}
          </nav>
        </div>

        {/* Desktop Action Icons (Search, Lang & Contact) */}
        <div className="hidden min-[916px]:flex items-center gap-3">
              <button
                onClick={() => setSearchPopupOpen(true)}
                className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 hover:bg-main hover:text-white transition-all px-4 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md cursor-pointer border border-slate-100 group"
              >
                <FaSearch size={16} className="group-hover:scale-110 transition-transform" />
                {/* <span>{mounted ? (i18n.language === "ar" ? "ابحث" : "Search") : "Search"}</span> */}
              </button>
            

              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center justify-center gap-2 bg-slate-50 text-slate-700 hover:bg-main hover:text-white transition-all px-4 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md cursor-pointer border border-slate-100 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                  {/* <span>{mounted ? (i18n.language === "ar" ? "العربية" : "English") : "English"}</span> */}
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
                        className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 w-full text-sm hover:cursor-pointer text-gray-700 hover:text-main transition font-medium border-b border-gray-50"
                      >
                        <Image src="/images/sa.svg" alt="Arabic" width={20} height={14} className="rounded-sm shadow-sm" />
                        العربية
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en", "ltr")}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-main/5 w-full text-sm hover:cursor-pointer text-gray-700 hover:text-main transition font-medium"
                      >
                        <Image src="/images/gb.svg" alt="English" width={20} height={14} className="rounded-sm shadow-sm" />
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
                <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-main text-white hover:bg-main/90 transition-all px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              >
                <span>{mounted ? (i18n.language === "ar" ? "تواصل معنا" : "Contact Us") : "Contact Us"}</span>
              </Link>
        </div>
      </div>

 {/* Mobile Menu */}
      <AnimatePresence>        
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 bottom-0 right-0 z-[990] bg-white shadow-2xl w-[85%] sm:w-[400px] min-[916px]:hidden flex  flex-col h-[100vh] px-5"
          >
            {/* Header inside mobile menu to look consistent */}
            <div className="flex items-center justify-between h-20 py-4 border-b border-gray-100 bg-gray-50/50">
              <Image src="/images/Logo.svg" alt="Bonn Medical Industries Logo" width={50} height={50} className="object-contain" />
              <div className="w-[44px]"></div> {/* Spacer to balance the close button */}
            </div>

            <div className="flex-1 overflow-y-auto pt-6 pb-10 h-20 hide-scrollbar flex flex-col gap-6">
              {/* Language & Search Top Section */}
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center justify-center gap-3 w-full h-11 rounded-lg border border-gray-200 text-sm hover:bg-main/5 transition font-medium"
                  >
                     <Image src={mounted ? (i18n.language === "ar" ? "/images/sa.svg" : "/images/gb.svg") : "/images/gb.svg"} alt="lang" width={20} height={14} /> 
                    <span className="text-gray-800">{mounted ? (i18n.language === "ar" ? "العربية" : "English") : "English"}</span>
                  </button>

                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                      >
                        <button onClick={() => handleLanguageChange("ar", "rtl")} className="flex items-center justify-center gap-3 py-3 hover:bg-gray-50 w-full text-sm border-b border-gray-50 font-medium">
                          <Image src="/images/sa.svg" alt="" width={18} height={12} /> العربية
                        </button>
                        <button onClick={() => handleLanguageChange("en", "ltr")} className="flex items-center justify-center gap-3 py-3 hover:bg-gray-50 w-full text-sm font-medium">

                          <Image src="/images/gb.svg" alt="" width={18} height={12} /> English
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <button
                    onClick={() => { setIsOpen(false); setSearchPopupOpen(true); }}
                    className="flex items-center gap-3 w-full h-11 px-4 rounded-lg border border-gray-200 text-sm hover:bg-main/5 transition font-medium text-gray-500 bg-gray-50"
                  >
                    <FaSearch className="text-gray-400" />
                    <span>{mounted ? (i18n.language === "ar" ? "ابحث على ما تريد" : "Search what you want") : "Search..."}</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col mt-4" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
              {navItems.map((item, index) => (
                <motion.div key={item.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className={`border-b border-gray-100 last:border-0 flex flex-col w-full ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
                  {item.type === "dropdown_about" ? (
                    <div className="flex flex-col">
                      <button onClick={() => setAboutOpen(!aboutOpen)} className="flex items-center justify-between w-full py-4 text-start font-bold text-gray-800 hover:text-main transition">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{mounted ? t("about") : "About Us"}</span>
                          {item.icon && <item.icon size={18} className="text-gray-400" />}
                        </div>
                        <motion.span animate={{ rotate: aboutOpen ? 180 : 0 }} className="text-gray-400">▼</motion.span>
                      </button>
                    




                    </div>
                  ) : item.type === "dropdown_events" ? (
                    <div className="flex flex-col">
                      <button onClick={() => setEventsOpen(!eventsOpen)} className="flex items-center justify-between w-full py-4 text-start font-bold text-gray-800 hover:text-main transition">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{mounted ? t("events") : "Events"}</span>
                          {item.icon && <item.icon size={18} className="text-gray-400" />}
                        </div>
                        <motion.span animate={{ rotate: eventsOpen ? 180 : 0 }} className="text-gray-400">▼</motion.span>
                      </button>
                      <AnimatePresence>
                        {eventsOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-3 pb-4 pt-2">
                              {eventsMenuLinks.map((link: any) => {
                                const Icon = link.icon;
                                const desc = mounted && i18n.language === "ar" ? link.descAr : link.descEn;
                                return (
                                  <Link key={link.key} href={link.path} dir={i18n.language === "ar" ? "rtl" : "ltr"} target={link.target} download={link.download} onClick={() => { setEventsOpen(false); setIsOpen(false); }} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-main/5 transition border border-transparent hover:border-main/10 shadow-sm">
                                    <div className="min-w-[48px] h-[48px] flex justify-center items-center text-main bg-white rounded-xl shadow-sm border border-gray-100">
                                      <Icon size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-bold text-gray-800 mb-1">{mounted ? t(link.key) : link.key}</span>
                                      <span className="text-[13px] text-gray-500 leading-snug">{desc}</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.type === "dropdown_services" ? (
                    <div className="flex flex-col">
                      <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-4 text-start font-bold text-gray-800 hover:text-main transition">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{mounted ? t(item.key) : item.key}</span>
                          {item.icon && <item.icon size={18} className="text-gray-400" />}
                        </div>
                        <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} className="text-gray-400">▼</motion.span>
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-3 pb-4 pt-2">
                              {servicesMenuLinks.map((link: any) => {
                                const Icon = link.icon;
                                const desc = mounted && i18n.language === "ar" ? link.descAr : link.descEn;
                                return (
                                  <Link key={link.key} href={link.path} dir={i18n.language === "ar" ? "rtl" : "ltr"} onClick={() => { setServicesOpen(false); setIsOpen(false); }} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-main/5 transition border border-transparent hover:border-main/10 shadow-sm">
                                    <div className="min-w-[48px] h-[48px] flex justify-center items-center text-main bg-white rounded-xl shadow-sm border border-gray-100">
                                      <Icon size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-bold text-gray-800 mb-1">{mounted ? t(link.key) : link.key}</span>
                                      <span className="text-[13px] text-gray-500 leading-snug">{desc}</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.type === "dropdown" ? (
                    <div className="flex flex-col">
                      <button onClick={() => setBrandsOpen(!brandsOpen)} className="flex items-center justify-between w-full py-4 text-start font-bold text-gray-800 hover:text-main transition">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{mounted ? t("ourbrands") : "Our Brands"}</span>
                          {item.icon && <item.icon size={18} className="text-gray-400" />}
                        </div>
                        <motion.span animate={{ rotate: brandsOpen ? 180 : 0 }} className="text-gray-400">▼</motion.span>
                      </button>
                      <AnimatePresence>
                        {brandsOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-2 pb-4 pl-4 rtl:pr-4 rtl:pl-0 border-l-2 rtl:border-l-0 rtl:border-r-2 border-main/20 ml-2 rtl:mr-2 rtl:ml-0">
                              {brands.map((brand: any) => {
                                const brandName = i18n.language === "ar" ? brand.name_ar : brand.name_en;
                                return (
                                  <Link key={brand.slug} href={`/brands/${brand.slug}`} dir={i18n.language === "ar" ? "rtl" : "ltr"} onClick={() => { setBrandsOpen(false); setIsOpen(false); }} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-main/5 transition">
                                    <div className="min-w-[40px] flex justify-center bg-white p-1 rounded-md shadow-sm border border-gray-100">
                                      <Image src={brand.logo} alt={brandName} width={36} height={20} className="object-contain" />
                                    </div>
                                    <span className="text-[15px] font-semibold text-gray-700">{brandName}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link onClick={() => setIsOpen(false)} href={item.path || "/"} className={`flex items-center gap-2 py-4 text-lg font-bold transition-colors w-full justify-start ${pathname === item.path ? "text-main" : "text-gray-800 hover:text-main"}`}>
                      {mounted ? t(item.key) : item.key}
                      {item.icon && <item.icon size={18} className={pathname === item.path ? "text-main" : "text-gray-400"} />}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Mobile Contact CTA */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-main text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:bg-main/90 transition-colors"
                >
                  {mounted ? (i18n.language === "ar" ? "تواصل معنا" : "Contact Us") : "Contact Us"}
                </Link>
              </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}