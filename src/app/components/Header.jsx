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
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";


function highlightText(text, matches, key) {
  if (!matches) return text;

  const match = matches.find((m) => m.key === key);
  if (!match) return text;

  let result = [];
  let lastIndex = 0;

  match.indices.forEach(([start, end], i) => {
    // normal text
    if (start > lastIndex) {
      result.push(text.slice(lastIndex, start));
    }

    // highlighted text
    result.push(
      <mark
        key={i}
        className="bg-yellow-200 text-black px-[1px] rounded"
      >
        {text.slice(start, end + 1)}
      </mark>
    );

    lastIndex = end + 1;
  });

  // remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}


export default function FactoryHeader() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (lang, dir) => {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [products, setProducts] = useState([]);
  const [langOpen, setLangOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
      const [mount , setMount] = useState(false);

  useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (!error && data) {
      setProducts(data);
    }
  };

  fetchProducts();
}, []);

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
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services.title", path: "/services" },
  { key: "brands", type: "dropdown" },
  { key: "news", path: "/news" },
  { key: "certifications", path: "/certifications" },
  { key: "blog", path: "/blog" },
  // { key: "contact", path: "/#contact" },
  { key: "faq_nav", path: "/faq" },
];

const brands = [
  {
    name_en: "Covix Care",
    name_ar: "كوفيكس كير",
    slug: "covix-care",
    logo: "/images/covix.png",
  },
  {
    name_en: "Le Visage Plus",
    name_ar: "لو فيزاج بلس",
    slug: "leVisagePlus",
    logo: "/images/Visage.png",
  },
  {
    name_en: "B1Care",
    name_ar: "بي 1 كير",
    slug: "b1care",
    logo: "/images/B1.png",
  },
  {
    name_en: "PuCare",
    name_ar: "بو كير",
    slug: "pucare",
    logo: "/images/PUCare.png",
  },
  {
    name_en: "Vert",
    name_ar: "فيرت",
    slug: "vert",
    logo: "/images/Vert.png",
  },
  {
    name_en: "Rubin",
    name_ar: "روبين",
    slug: "rubin",
    logo: "/images/Rubin.png",
  }
];





    useEffect(() => {
    setMount(true);
  }, []);


  // ✅ Fuse Search Logic
  useEffect(() => {
    if (!searchTerm.trim() || products.length === 0) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

 const fuse = new Fuse(products, {
  keys: ["name_en", "name_ar"],
  threshold: 0.3,
  includeMatches: true,
});


    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results.map((r) => r.item));
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(t("productNotFound"));
    }
  }, [searchTerm, products]);

  const handleSearchAction = () => {
    if (!searchTerm.trim()) return;
    const fuse = new Fuse(products, {
      keys: ["name_en", "name_ar"],
      threshold: 0.3,
    });
    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results.map((r) => r.item));
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(t("productNotFound"));
    }
  };
useEffect(() => {
  const handleScroll = () => {
    if (isOpen) {
      setIsOpen(false);
      setBrandsOpen(false);
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
    {/* Search Popup */}
    <AnimatePresence>
      {searchPopupOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchPopupOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[80vh] z-[9999] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-main">{mounted ? t("searchProduct") : "Search Product"}</h2>
                <button
                  onClick={() => setSearchPopupOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <IoCloseSharp size={28} />
                </button>
              </div>
              
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-main" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                  placeholder={mounted ? t("searchProduct") : "Search Product"}
                  className="w-full pl-10 pr-4 py-3 border-2 border-main/20 rounded-xl outline-none focus:border-main transition text-lg"
                  autoFocus
                />
              </div>
              
              <div className="overflow-y-auto max-h-[50vh]">
                {searchTerm && (
                  <>
                    {searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((res) => {
                          const product = res?.item || res;
                          const matches = res?.matches || [];
                          if (!product) return null;
                          
                          const highlightText = (text, key) => {
                            if (!text || !matches.length) return text;
                            const match = matches.find((m) => m.key === key);
                            if (!match) return text;
                            let parts = [];
                            let lastIndex = 0;
                            match.indices.forEach(([start, end], i) => {
                              if (start > lastIndex) parts.push(text.slice(lastIndex, start));
                              parts.push(<mark key={i} className="bg-yellow-200 text-black px-[1px] rounded">{text.slice(start, end + 1)}</mark>);
                              lastIndex = end + 1;
                            });
                            if (lastIndex < text.length) parts.push(text.slice(lastIndex));
                            return parts;
                          };

                          const nameKey = i18n.language === "ar" ? "name_ar" : "name_en";
                          const descKey = i18n.language === "ar" ? "description_ar" : "description_en";
                          const nameText = i18n.language === "ar" ? product?.name_ar || "" : product?.name_en || "";
                          const descText = i18n.language === "ar" ? product?.description_ar || "" : product?.description_en || "";

                          return (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              dir={i18n.language === "ar" ? "rtl" : "ltr"}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition rounded-xl border border-gray-100"
                              onClick={() => {
                                setSearchTerm("");
                                setSearchResults([]);
                                setSearchPopupOpen(false);
                              }}
                            >
                              <Image src={product?.images?.[0] || "/placeholder.png"} alt={nameText} className="rounded-lg object-cover" width={80} height={80} />
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-lg mb-1">{highlightText(nameText, nameKey)}</div>
                                <div className="text-gray-500 text-sm line-clamp-2">{highlightText(descText, descKey)}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">{searchError}</div>
                    )}
                  </>
                )}
                {!searchTerm && (
                  <div className="p-8 text-center text-gray-400">{mounted ? (i18n.language === "ar" ? "ابدأ الكتابة للبحث..." : "Start typing to search...") : "Start typing to search..."}</div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {showIntro && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="fixed inset-0 bg-white z-[9999] flex flex-col justify-center items-center"
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
                  className="relative"
                >
                  {item.type === "dropdown" ? (
                    <>
                      {/* Brands Button */}
                      <button
                        onClick={() => setBrandsOpen(!brandsOpen)}
                        className={`flex items-center gap-1 font-bold text-[17px] transition ${
                          brandsOpen
                            ? "text-main cursor-pointer"
                            : "text-gray-800 hover:text-main cursor-pointer"
                        }`}
                      >
                        {mounted ? t("ourbrands") : "Our Brands"}
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                      {brandsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -15, scale: 0.985, filter: "blur(4px)" }}
                          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
                          style={{ originY: 0, transform: "translateZ(0)" }}
                          className="fixed left-0 top-[100%] w-screen bg-white shadow-xl border-t border-main/10 z-20 will-change-transform"
                        >
                          <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                            {brands.map((brand) => {
                              const brandName = i18n.language === "ar" ? brand.name_ar : brand.name_en;
                              return (
                                <Link
                                  key={brand.slug}
                                  href={`/brands/${brand.slug}`}
                                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                                  onClick={() => { setBrandsOpen(false); setIsOpen(false); }}
                                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-main/5 transition group"
                                >
                                  <Image src={brand.logo} alt={brandName} width={60} height={40} className="object-contain" />
                                  <div>
                                    <h3 className="font-semibold text-gray-800 group-hover:text-main transition">{brandName}</h3>
                                    <p className="text-sm text-gray-500">{t("viewBrandProducts")}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => { setIsOpen(false); setBrandsOpen(false); }}
                      className={`relative font-bold text-[17px] transition-colors ${
                        pathname === item.path
                          ? "text-main after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-main"
                          : "text-gray-800 hover:text-main"
                      } group`}
                    >
                      <span className="relative z-10">{mounted ? t(item.key) : item.key}</span>
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-main group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  )}
                </motion.div>
              ))}
          </nav>
        </div>

        {/* Desktop Action Icons (Search & Lang) */}
        <div className="hidden min-[916px]:flex items-center gap-6">
              <button
                onClick={() => setSearchPopupOpen(true)}
                className="flex flex-col items-center justify-center text-[#1d358f] hover:text-main transition-colors group cursor-pointer"
              >
                <FaSearch className="text-3xl mb-1 stroke-current stroke-2" />
                <span className="text-[16px] font-bold leading-none">{mounted ? (i18n.language === "ar" ? "ابحث" : "Search") : "Search"}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex flex-col items-center justify-center text-[#1d358f] hover:text-main transition-colors group cursor-pointer"
                >
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                  <span className="text-[16px] font-bold leading-none">{mounted ? (i18n.language === "ar" ? "العربية" : "English") : "English"}</span>
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
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                    placeholder={mounted ? t("searchProduct") : "Search Product"}
                    className="w-full pl-10 text-sm px-3 h-11 border border-gray-200 rounded-lg outline-none focus:border-main focus:ring-1 focus:ring-main/20 transition bg-gray-50"
                  />
                  {searchTerm && (
                    <div className="absolute z-50 bg-white border border-gray-100 rounded-lg shadow-xl mt-2 w-full max-h-64 overflow-auto">
                      {searchResults.length > 0 ? searchResults.map((product) => (
                        <Link dir={i18n.language === "ar" ? "rtl" : "ltr"} key={product.slug} href={`/products/${product.slug}`} onClick={() => setIsOpen(false)} className="flex items-center p-3 hover:bg-main/5 transition border-b border-gray-50 last:border-0">
                          <Image src={product.images?.[0] || "/placeholder.png"} alt="Product" className="w-10 h-10 rounded-md object-cover flex-shrink-0" width={40} height={40} />
                          <div className="text-sm px-3">
                            <div className="font-semibold text-gray-800">{i18n.language === "ar" ? product.name_ar : product.name_en}</div>
                            <div className="text-gray-500 text-xs line-clamp-1">{i18n.language === "ar" ? product.description_ar : product.description_en}</div>
                          </div>
                        </Link>
                      )) : (
                        <div className="p-4 text-sm text-gray-500 text-center">{searchError}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col mt-4">
              {navItems.map((item, index) => (
                <motion.div key={item.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="border-b border-gray-100 last:border-0">
                  {item.type === "dropdown" ? (
                    <div className="flex flex-col">
                      <button onClick={() => setBrandsOpen(!brandsOpen)} className="flex items-center justify-between w-full py-4 text-left font-bold text-gray-800 hover:text-main transition">
                        <span className="text-lg">{mounted ? t("ourbrands") : "Our Brands"}</span>
                        <motion.span animate={{ rotate: brandsOpen ? 180 : 0 }} className="text-gray-400">▼</motion.span>
                      </button>
                      <AnimatePresence>
                        {brandsOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-2 pb-4 pl-4 rtl:pr-4 rtl:pl-0 border-l-2 rtl:border-l-0 rtl:border-r-2 border-main/20 ml-2 rtl:mr-2 rtl:ml-0">
                              {brands.map((brand) => {
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
                    <Link onClick={() => setIsOpen(false)} href={item.path} className={`block py-4 text-lg font-bold transition-colors ${pathname === item.path ? "text-main" : "text-gray-800 hover:text-main"}`}>
                      {mounted ? t(item.key) : item.key}
                    </Link>
                  )}
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}