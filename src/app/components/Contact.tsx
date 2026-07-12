"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: t("options.general"),
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Add real submit logic here if needed
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-main font-bold rounded-xl hover:bg-gray-50 transition-all hover:scale-105"
          >
            {t("ctaBanner.contactBtn")}
          </button>
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
                <p className="text-gray-600 mt-1">marketing@bonnmed.com</p>
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
                placeholder={t("newsletter.placeholder")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
              />
              <button
                type="button"
                className={`absolute top-1 bottom-1 ${isRTL ? 'left-1' : 'right-1'} px-6 bg-main text-white font-medium rounded-lg hover:bg-blue-700 transition`}
              >
                {t("newsletter.button")}
              </button>
            </div>
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

      {/* 3. Popup Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Decorative top bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-main" />

            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-500 cursor-pointer z-10`}
            >
              ✕
            </button>

            {/* Mail Icon/Header */}
            <div className="flex flex-col items-center text-center mt-4 mb-6">
              <div className="w-16 h-16 bg-main/5 rounded-full flex items-center justify-center mb-3 border border-main/10">
                <FaEnvelope className="text-2xl text-main" />
              </div>
              <h3 className="text-2xl font-bold text-main">
                {t("ctaBanner.contactBtn")}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isRTL ? "يسعدنا تواصلك معنا، وسنقوم بالرد عليك في أقرب وقت." : "We'd love to hear from you. We'll get back to you shortly."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={t("fullName")}
                required
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
              />
              <input
                type="email"
                name="email"
                placeholder={t("emailAddress")}
                required
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("optionalPhone")}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
              />
              <label htmlFor="subject" className="sr-only">{t("subject")}</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition appearance-none bg-transparent"
              >
                <option>{t("options.general")}</option>
                <option>{t("options.support")}</option>
                <option>{t("options.partner")}</option>
                <option>{t("options.other")}</option>
              </select>
              <textarea
                name="message"
                placeholder={t("message")}
                rows={4}
                required
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition resize-none"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-main text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                {t("send")}
              </button>

              {submitted && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-green-600 text-center font-medium pt-2"
                >
                  {t("submit.success")}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </Container>
  );
}
