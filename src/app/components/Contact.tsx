"use client";

import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaYoutube, FaLinkedin, FaTiktok, FaCheckCircle, FaHeadset, FaGlobe, FaHandshake } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Turnstile } from "@marsidev/react-turnstile";
export default function ContactUs() {
  const { t, i18n } = useTranslation();

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<any>(null);

  const handleNewsletterSubmit = async () => {
    setNewsletterError("");
    
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterError(i18n.language === "ar" ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email");
      return;
    }
    
    if (!turnstileToken) {
      setNewsletterError(i18n.language === "ar" ? "يرجى إكمال التحقق الأمني أولاً" : "Please complete the security check first");
      return;
    }

    setIsSubscribing(true);
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, turnstileToken }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Subscription failed");
      }
      
      setIsNewsletterModalOpen(true);
      setNewsletterEmail("");
      setTurnstileToken("");
    } catch (error: any) {
      setNewsletterError(error.message || (i18n.language === "ar" ? "حدث خطأ ما، يرجى المحاولة لاحقاً" : "An error occurred, please try again"));
    } finally {
      setIsSubscribing(false);
      turnstileRef.current?.reset();
    }
  };



  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const isRTL = i18n.language === "ar";

  return (
    <Container id="contact" className="py-20 space-y-16">
      
      {/* 1. CTA Banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        dir={isRTL ? "rtl" : "ltr"}
        className="w-full bg-main rounded-3xl p-10 md:p-16 text-center text-white shadow-xl shadow-blue-500/10"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          {t("ctaBanner.title")}
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("ctaBanner.subtitle")}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-main font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105"
          >
            {t("ctaBanner.contactBtn")}
          </Link>
          <a
            href="/registration"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#3b87f3] text-white font-semibold rounded-xl border border-white/20 hover:bg-[#4b91f5] transition-all hover:scale-105"
          >
            {t("ctaBanner.exploreBtn")}
          </a>
        </div>
      </motion.div>

      {/* 2. Contact Info & Map Side by Side */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        {/* Contact Info */}
        <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <h3 className="text-3xl font-bold text-main mb-2">{t("title")}</h3>
            <p className="text-gray-500">{t("subtitle")}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{t("address")}</h4>
                <p className="text-gray-600 mt-1">{t("theAddress")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaEnvelope className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{t("email")}</h4>
                <a 
                  href={`mailto:marketing@bonnmed.com`}
                  onClick={(e) => handleEmailClick(e, "marketing@bonnmed.com")}
                  className="text-gray-600 mt-1 block hover:text-main transition-colors"
                >
                  marketing@bonnmed.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaPhone className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{t("phone")}</h4>
                <p className="text-gray-600 mt-1" dir="ltr">+966 5803 47173</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaClock className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{t("hours")}</h4>
                <p className="text-gray-600 mt-1">{t("workingHours")}</p>
              </div>
            </div>
          </div>

          {/* Newsletter (Replaced Social Media) */}
          <div className="pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">
              {t("newsletter.title")}
            </h4>
            <div className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterError) setNewsletterError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNewsletterSubmit()}
                placeholder={t("newsletter.placeholder")}
                disabled={isSubscribing}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 transition disabled:opacity-50 ${newsletterError ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-main"}`}
              />
              <button
                type="button"
                onClick={handleNewsletterSubmit}
                disabled={isSubscribing}
                className={`absolute top-1 bottom-1 ${isRTL ? 'left-1' : 'right-1'} px-6 bg-main text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-70`}
              >
                {isSubscribing ? (i18n.language === "ar" ? "جاري الاشتراك..." : "Subscribing...") : t("newsletter.button")}
              </button>
            </div>
            {newsletterError && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-2 font-medium px-1">
                {newsletterError}
              </motion.p>
            )}

            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              onExpire={() => setTurnstileToken("")}
              options={{ size: 'invisible' }}
            />

            <p className="text-xs text-gray-400 mt-3 px-1">
              {isRTL ? (
                <>
                  هذا الموقع محمي بواسطة Cloudflare Turnstile وتطبق عليه 
                  <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-main hover:underline mx-1">سياسة الخصوصية</a>
                  و
                  <a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noopener noreferrer" className="text-main hover:underline mx-1">شروط الخدمة</a>.
                </>
              ) : (
                <>
                  This site is protected by Cloudflare Turnstile and the Cloudflare 
                  <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-main hover:underline mx-1">Privacy Policy</a>
                  and
                  <a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noopener noreferrer" className="text-main hover:underline mx-1">Terms of Service</a> apply.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-[400px] lg:h-full min-h-[400px]">
          <iframe
            className="w-full h-full rounded-3xl shadow-sm border border-gray-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.877538141653!2d46.8650137!3d24.5934222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2fa6d811694f33%3A0x80ba3dbcf1f625f7!2z2YXYtdmG2Lkg2KjZiNmGINmE2YTYtdmG2KfYudin2Kog2KfZhNi32KjZitipIEJvbm4gTWVkaWNhbCBJbmR1c3RyaWVz!5e0!3m2!1sen!2seg!4v1753894716909!5m2!1sen!2seg"
            allowFullScreen
            title="Bonn Medical Industries location on Google Maps"
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>



      {/* 4. Newsletter Success Modal */}
      <AnimatePresence>
        {isNewsletterModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewsletterModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden text-center"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                  <FaCheckCircle className="text-4xl text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isRTL ? "تم بنجاح!" : "Success!"}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {isRTL 
                  ? "لقد تم اشتراكك في النشرة الإخبارية بنجاح. سنبقيك على إطلاع بكل جديد!" 
                  : "You have successfully subscribed to our newsletter. We'll keep you updated!"}
              </p>
              <button
                onClick={() => setIsNewsletterModalOpen(false)}
                className="w-full bg-main text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                {isRTL ? "حسناً" : "OK"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Container>
  );
}

