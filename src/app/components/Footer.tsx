"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-main text-white/80 border-t border-white/10 mt-0" dir={isAr ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Logo & About */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <div className="bg-white p-3 rounded-2xl w-fit">
            <Image src="/images/Logo.svg" alt="Bonn Medical Industries" width={100} height={100} className="object-contain" />
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            {isAr 
              ? "شريكك الموثوق في تصنيع منتجات الرعاية الصحية ومستحضرات التجميل بأعلى معايير الجودة العالمية."
              : t("footer.description", "Your trusted partner in quality healthcare and cosmetics manufacturing.")}
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-5">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "معلومات التواصل" : "Contact Info"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#2563eb] rounded-full"></span>
          </h3>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <p>{isAr ? "المشاعل، الرياض، المملكة العربية السعودية" : "Al Mashael, Riyadh, Saudi Arabia"}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Mail className="w-5 h-5 text-white/70 shrink-0" />
            <a href="mailto:marketing@bonnmed.com" className="hover:text-white transition">marketing@bonnmed.com</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Phone className="w-5 h-5 text-white/70 shrink-0" />
            <a href="tel:+966110000000" className="hover:text-white transition" dir="ltr">+966 5803 47173</a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {t("footer.links", "Quick Links")}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#2563eb] rounded-full"></span>
          </h3>
          <Link href="/" className="hover:text-white hover:translate-x-1 transition-all w-fit">{t("home")}</Link>
          <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all w-fit">{t("about")}</Link>
          <Link href="/services" className="hover:text-white hover:translate-x-1 transition-all w-fit">{t("services.title")}</Link>
          <Link href="/certifications" className="hover:text-white hover:translate-x-1 transition-all w-fit">{t("certifications")}</Link>
        </div>

        {/* Legal & Social */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "روابط هامة" : "Legal"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#2563eb] rounded-full"></span>
          </h3>
          <Link href="/privacy-policy" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="hover:text-white hover:translate-x-1 transition-all w-fit">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </Link>

          <h3 className="text-white font-bold text-lg mt-4 mb-2">
            {t("footer.followUs", "Follow Us")}
          </h3>
          <div className="flex gap-3 text-white">
            <Link href="https://www.facebook.com/bonnmedical" aria-label="Visit Our Facebook" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-[#2563eb] transition-colors">
              <FaFacebookF size={16} />
            </Link>
            <Link href="https://instagram.com/bonnmedical" aria-label="Visit Our Instagram" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-[#e1306c] transition-colors">
              <FaInstagram size={16} />
            </Link>
            <Link href="https://www.linkedin.com/company/bonnmedical" aria-label="Visit Our Linkedin" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-[#0077b5] transition-colors">
              <FaLinkedinIn size={16} />
            </Link>
            <Link href="https://www.youtube.com/@BonnMedical" aria-label="Visit Our Youtube" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-[#ff0000] transition-colors">
              <FaYoutube size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-main-hover text-center text-sm text-white/50 py-5 mt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Bonn Medical Industries. {t("footer.rights", "All rights reserved.")}</p>
          <p className="text-xs opacity-75">
            {isAr ? "صُنع بكل فخر في المملكة العربية السعودية 🇸🇦" : "Proudly made in Saudi Arabia 🇸🇦"}
          </p>
        </div>
      </div>
    </footer>
  );
}
