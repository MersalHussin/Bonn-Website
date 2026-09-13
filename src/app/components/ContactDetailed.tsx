"use client";

import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaHeadset, FaGlobe, FaHandshake } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Container from "./Container";
import { supabase } from "../lib/supabaseClient";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ContactDetailed() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: t("options.general"),
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<any>(null);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      toast.error(i18n.language === "ar" ? "يرجى إكمال التحقق الأمني أولاً" : "Please complete the security check first");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to submit");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: t("options.general"),
        message: "",
      });
      setTurnstileToken("");
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(i18n.language === "ar" ? "حدث خطأ أثناء الإرسال" : "An error occurred while sending");
    } finally {
      setIsSubmitting(false);
      turnstileRef.current?.reset();
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const isRTL = i18n.language === "ar";

  return (
    <Container id="contact-detailed" className="py-20 space-y-16">
      
      {/* 2. Contact Info & Form Side by Side */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        {/* Left: Contact Info */}
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

            {/* General Support */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaHeadset className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{isRTL ? "خدمة العملاء والإدارة" : "Customer Service & Admin"}</h4>
                <div className="mt-2 space-y-2">
                  <a href="mailto:marketing@bonnmed.com" onClick={(e) => handleEmailClick(e, "marketing@bonnmed.com")} className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm">
                    <FaEnvelope className="text-main/70 shrink-0" /> marketing@bonnmed.com
                  </a>
                  <a href="tel:+966580347173" className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm" dir="ltr">
                    <FaPhone className="text-main/70 shrink-0" /> +966 5803 47173
                  </a>
                </div>
              </div>
            </div>

    <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaHandshake className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{isRTL ? "المبيعات الحكومية ( نوبكو )" : "Government Sales (NUPCO)"}</h4>
           <a href="mailto:Omar.nabil@bonnmed.com" onClick={(e) => handleEmailClick(e, "Omar.nabil@bonnmed.com")} className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm">
                    <FaEnvelope className="text-main/70 shrink-0" /> Omar.nabil@bonnmed.com
                  </a>
              </div>
            </div>

            {/* Export & Private Label */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaGlobe className="text-xl text-main" />
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{isRTL ? "التصدير و التصنيع" : "Export & Private Label"}</h4>
                <div className="mt-2 space-y-2">
                  <a href="mailto:Export@bonnmed.com" onClick={(e) => handleEmailClick(e, "Export@bonnmed.com")} className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm">
                    <FaEnvelope className="text-main/70 shrink-0" /> Export@bonnmed.com
                  </a>
                  <a href="mailto:Omar.nabil@bonnmed.com" onClick={(e) => handleEmailClick(e, "Omar.nabil@bonnmed.com")} className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm">
                    <FaEnvelope className="text-main/70 shrink-0" /> Omar.nabil@bonnmed.com
                  </a>
                  <a href="tel:+966565034247" className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm" dir="ltr">
                    <FaPhone className="text-main/70 shrink-0" /> +966 565 034 247
                  </a>
                </div>
              </div>
            </div>
            

            {/* Sales */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-main/10 rounded-full flex items-center justify-center shrink-0">
                <FaHandshake className="text-xl text-main" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{isRTL ? "المبيعات" : "Sales"}</h4>
                <div className="mt-2 space-y-2">
                  <a href="mailto:noureldeen@bonnmed.com" onClick={(e) => handleEmailClick(e, "noureldeen@bonnmed.com")} className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm">
                    <FaEnvelope className="text-main/70 shrink-0" /> noureldeen@bonnmed.com
                  </a>
                  <a href="tel:+966547341532" className="flex items-center gap-3 text-gray-600 hover:text-main transition-colors text-sm" dir="ltr">
                    <FaPhone className="text-main/70 shrink-0" /> +966 547 341 532
                  </a>
                </div>
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
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-gray-100 p-8 md:p-10" dir={isRTL ? "rtl" : "ltr"}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-main">{t("ctaBanner.contactBtn")}</h3>
            <p className="text-gray-500 mt-2 text-sm">
              {isRTL ? "أرسل لنا رسالة وسنقوم بالرد عليك في أقرب وقت ممكن." : "Send us a message and we'll reply as soon as possible."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder={t("fullName")}
              required
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-gray-50/50"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder={t("emailAddress")}
              required
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-gray-50/50"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder={t("optionalPhone")}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition bg-gray-50/50"
            />
            <label htmlFor="subject" className="sr-only">{t("subject")}</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition appearance-none bg-gray-50/50"
            >
              <option>{t("options.general")}</option>
              <option>{t("options.support")}</option>
              <option>{t("options.partner")}</option>
              <option>{t("options.other")}</option>
            </select>
            <textarea
              name="message"
              value={formData.message}
              placeholder={t("message")}
              rows={5}
              required
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition resize-none bg-gray-50/50"
            ></textarea>
            
            {/* ويدجت الكابتشا المخفية */}
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              onExpire={() => setTurnstileToken("")}
              options={{ size: 'invisible' }}
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-main text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-main/20"
            >
              {isSubmitting ? (isRTL ? "جاري الإرسال..." : "Sending...") : t("send")}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
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
            <AnimatePresence>
              {submitted && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="text-green-600 text-center font-medium pt-2 bg-green-50 p-3 rounded-xl mt-4"
                >
                  {t("submit.success")}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>

      {/* Google Map (Full Width) */}
      <motion.div 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full h-[450px]"
      >
        <iframe
          className="w-full h-full rounded-3xl shadow-sm border border-gray-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.877538141653!2d46.8650137!3d24.5934222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2fa6d811694f33%3A0x80ba3dbcf1f625f7!2z2YXYtdmG2Lkg2KjZiNmGINmE2YTYtdmG2KfYudin2Kog2KfZhNi32KjZitipIEJvbm4gTWVkaWNhbCBJbmR1c3RyaWVz!5e0!3m2!1sen!2seg!4v1753894716909!5m2!1sen!2seg"
          allowFullScreen
          title="Bonn Medical Industries location on Google Maps"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
        ></iframe>
      </motion.div>
    </Container>
  );
}
