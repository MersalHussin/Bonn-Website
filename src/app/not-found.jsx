"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t, i18n } = useTranslation();

  const isAr = i18n.language === "ar";

  return (
    <div
      className="h-180 mt-15 flex flex-col items-center justify-center px-2 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #eaf1ff 100%)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Main Text */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-4 text-[#0056D2]"
      >
        {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-700 text-lg max-w-md leading-relaxed mb-10"
      >
        {isAr
          ? "يبدو أننا مش قادرين نلاقي الصفحة اللي بتدور عليها. ممكن الرابط يكون غير صحيح أو الصفحة اتنقلت."
          : "It seems we can't find the page you're looking for. The link may be incorrect or the page has been moved."}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="flex gap-4 max-sm:flex-col"
      >
        <Link
          href="/"
          className="px-7 py-3 bg-[#0056D2] text-white rounded-xl text-lg font-medium hover:bg-[#0049b8] transition shadow-md"
        >
          {isAr ? "الصفحة الرئيسية" : "Home"}
        </Link>

        <Link
          href="/services"
          className="px-7 py-3 border-2 border-[#0056D2] text-[#0056D2] rounded-xl text-lg font-medium hover:bg-[#0056D2] hover:text-white transition shadow-md"
        >
          {isAr ? "مشاهدة المنتجات" : "Browse Products"}
        </Link>
      </motion.div>
    </div>
  );
}
