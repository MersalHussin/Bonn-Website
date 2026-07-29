"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LeVisageFooter() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const pathname = usePathname();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  return (
    <footer className="bg-lv-main text-white/90 border-t border-white/10 mt-0" dir={isAr ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12"
      >
        {/* Logo & About */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-2xl w-fit flex justify-start bg-white/10 p-4 w-fit items-center">
            <Image src="/images/Visage.png" alt="Le Visage" width={150} height={100} className="object-contain brightness-0 invert" />
          </div>
          <p className="text-sm leading-relaxed text-white/80 max-w-sm">
            {isAr 
              ? "علامة سعودية متخصصة في العناية المتقدمة بالبشرة، جزء من مصنع بون للصناعات الطبية."
              : "Saudi brand specializing in advanced skincare, part of Bonn Medical Industries."}
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "معلومات التواصل" : "Contact Info"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white/30 rounded-full"></span>
          </h3>
          <div className="flex items-start gap-3 text-sm text-white/80">
            <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <p>{isAr ? "المشاعل، الرياض، المملكة العربية السعودية" : "Al Mashael, Riyadh, Saudi Arabia"}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <Mail className="w-5 h-5 text-white/80 shrink-0" />
            <a 
              href="mailto:Relation@bonnmed.com" 
              onClick={(e) => handleEmailClick(e, "Relation@bonnmed.com")}
              className="hover:text-white transition"
            >
              Relation@bonnmed.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80">
            <Phone className="w-5 h-5 text-white/80 shrink-0" />
            <a href="tel:+966580347173" className="hover:text-white transition" dir="ltr">+966 5803 47173</a>
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "الشركة" : "Company"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white/30 rounded-full"></span>
          </h3>
          <Link href="#who-we-are" className="hover:text-white hover:translate-x-1 transition-all w-fit">{isAr ? "من نحن" : "Who We Are"}</Link>
          <Link href="#why-us" className="hover:text-white hover:translate-x-1 transition-all w-fit">{isAr ? "لماذا نحن" : "Why Us"}</Link>
          <Link href="/" className="hover:text-white hover:translate-x-1 transition-all w-fit font-semibold text-white/90">{isAr ? "بون للصناعات الطبية" : "Bonn Medical Industries"}</Link>
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "استكشف" : "Explore"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white/30 rounded-full"></span>
          </h3>
          <Link href="#products" className="hover:text-white hover:translate-x-1 transition-all w-fit">{isAr ? "المنتجات" : "Products"}</Link>
          <Link href="#product-journey" className="hover:text-white hover:translate-x-1 transition-all w-fit">{isAr ? "رحلة المنتج" : "Product Journey"}</Link>
          <Link href="#contact-us" className="hover:text-white hover:translate-x-1 transition-all w-fit">{isAr ? "تواصل معنا" : "Contact Us"}</Link>
        </div>

        {/* Legal & Social */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h3 className="text-white font-bold text-lg mb-2 relative inline-block w-fit">
            {isAr ? "روابط هامة" : "Legal"}
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-white/30 rounded-full"></span>
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
          <div className="flex flex-wrap gap-2 text-white">
            <Link href="https://www.facebook.com/bonnmedical" aria-label="Visit Our Facebook" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-lv-main transition-colors">
              <FaFacebookF size={14} />
            </Link>
            <Link href="https://instagram.com/bonnmedical" aria-label="Visit Our Instagram" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-lv-main transition-colors">
              <FaInstagram size={14} />
            </Link>
            <Link href="https://www.linkedin.com/company/bonnmedical" aria-label="Visit Our Linkedin" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-lv-main transition-colors">
              <FaLinkedinIn size={14} />
            </Link>
            <Link href="https://www.youtube.com/@BonnMedical" aria-label="Visit Our Youtube" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-lv-main transition-colors">
              <FaYoutube size={14} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-rose-800 text-center text-sm text-white/70 py-5 mt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Le Visage Plus. {t("footer.rights", "All rights reserved.")}</p>
          <p className="text-xs opacity-80">
            {isAr ? "صُنع بكل فخر في المملكة العربية السعودية 🇸🇦" : "Proudly made in Saudi Arabia 🇸🇦"}
          </p>
        </div>
      </div>
    </footer>
  );
}
