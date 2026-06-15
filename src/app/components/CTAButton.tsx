"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import i18n from "../../i18n";
import { Pencil, ArrowLeft, ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState(i18n.language); 

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 450);
    };

    const handleLangChange = () => {
      setLang(i18n.language);
    };

    window.addEventListener("scroll", handleScroll);
    i18n.on("languageChanged", handleLangChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  const isArabic = lang === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
      className={`
fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
      `}
    >
              <div
        className={`
        md:bottom-4
          ${isArabic ? "md:left-6" : "md:right-6"}
        `}
      >
<Link href="/registration">
        <motion.button
          whileHover={{
            boxShadow: "0px 6px 18px rgba(34,197,94,0.35)",
          }}
          whileTap={{ scale: 0.96 }}
          className="
            flex items-center gap-2 px-5 py-3 
            bg-green-600 text-white font-semibold
            rounded-full shadow-lg backdrop-blur-xl
            border border-white/20 transition-all duration-300
            hover:bg-green-700
            max-[375px]:px-3 max-[375px]:py-2 
            max-[375px]:text-sm max-[375px]:h-12 
            cursor-pointer
          "
        >
          <Pencil size={isArabic ? 16 : 16} className="max-[375px]:w-4 max-[375px]:h-4" />

          <span className="max-[375px]:text-sm">
            {isArabic ? "اطلب تصنيع علامتك" : "Start Manufacturing"}
          </span>

          {isArabic ? (
            <ArrowLeft size={16} className="max-[375px]:w-4 max-[375px]:h-4" />
          ) : (
            <ArrowRight size={16} className="max-[375px]:w-4 max-[375px]:h-4" />
          )}
        </motion.button>
      </Link>
      </div>
    </motion.div>
  );
}
