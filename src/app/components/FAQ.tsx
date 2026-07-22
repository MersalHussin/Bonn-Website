"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, MessageSquare, Mail, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Container from "./Container";
import { fetchFaqsAction } from "../actions/faqActions";
import { FAQItemData } from "../constants/defaultFaqs";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export default function FAQComponent() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [dbFaqs, setDbFaqs] = useState<FAQItemData[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: t("options.general") || "عام",
    message: "",
  });

  useEffect(() => {
    async function loadFaqs() {
      setLoadingFaqs(true);
      const res = await fetchFaqsAction();
      if (res.success && res.data && res.data.length > 0) {
        setDbFaqs(res.data);
      }
      setLoadingFaqs(false);
    }
    loadFaqs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const { error } = await supabase
        .from("faq_questions")
        .insert([{ email: formData.email, question: formData.message }]);

      if (error) throw error;
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: "", email: "", phone: "", subject: t("options.general") || "عام", message: "" });
      }, 2000);
    } catch (err: any) {
      console.error("Error submitting question:", err);
      setErrorMsg(isAr ? "حدث خطأ أثناء الإرسال. الرجاء المحاولة مرة أخرى." : "Error submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Process items from DB or fallback to i18n
  const faqItems = useMemo<FAQItem[]>(() => {
    if (dbFaqs.length > 0) {
      return dbFaqs.map((item) => ({
        q: isAr ? item.question_ar : item.question_en || item.question_ar,
        a: isAr ? item.answer_ar : item.answer_en || item.answer_ar,
        category: item.category || "general",
      }));
    }

    const items = t("faq.items", { returnObjects: true });
    return Array.isArray(items) ? items : [];
  }, [dbFaqs, isAr, t]);

  // Categories definition
  const categories = useMemo(() => [
    { id: "all", label: t("faq.categories.all", "All Questions") },
    { id: "general", label: t("faq.categories.general", "General") },
    { id: "services", label: t("faq.categories.services", "Services") },
    { id: "quality", label: t("faq.categories.quality", "Quality & SFDA") },
    { id: "production", label: t("faq.categories.production", "Production & MOQ") },
  ], [t]);

  // Filtered items based on search and selected category
  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqItems, activeCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      dir={isAr ? "rtl" : "ltr"} 
      className="w-full bg-gradient-to-br from-white to-[#F1F6FD] py-16 min-h-[70vh]"
    >
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-main/5 text-main text-sm font-semibold mb-4"
          >
            <HelpCircle size={16} />
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-main leading-tight mb-4"
          >
            {t("faq.title", "Frequently Asked Questions")}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#1A3351]/80"
          >
            {t("faq.subtitle", "Everything you need to know about our services.")}
          </motion.p>
        </div>

        {/* Search & Filter Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-main/50">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder={t("faq.searchPlaceholder", "Search questions...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 ps-12 pe-4 bg-white border border-[#2563eb]/10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-[#1A3351] placeholder-[#1A3351]/40 transition-all duration-300"
            />
          </motion.div>

          {/* Categories Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center flex-nowrap"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-main text-white shadow-md shadow-main/20 scale-[1.02]"
                      : "bg-white text-main/80 border border-main/10 hover:bg-main/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white border border-[#2563eb]/10 rounded-2xl shadow-sm overflow-hidden hover:border-[#2563eb]/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-5 px-6 flex items-center justify-between text-start gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className="text-base md:text-lg font-bold text-main">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-main/60 shrink-0"
                      >
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed text-[#1A3351]/80 border-t border-gray-50">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4 rounded-3xl bg-white border border-main/5 max-w-md mx-auto"
            >
              <div className="w-12 h-12 bg-main/5 text-main flex items-center justify-center rounded-full mx-auto mb-4">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-main mb-1">
                {t("faq.noResults", "No questions match your search.")}
              </h3>
              <p className="text-sm text-gray-500">
                {isAr ? "جرّب البحث بكلمات مختلفة أو تصفح الأقسام الأخرى." : "Try using different keywords or browse other categories."}
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-xl mx-auto mt-16 p-8 rounded-3xl bg-main text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full mx-auto mb-4">
            <MessageSquare size={22} />
          </div>
          <h3 className="text-xl font-bold mb-2">
            {isAr ? "هل لديك أسئلة أخرى؟" : "Still have questions?"}
          </h3>
          <p className="text-white/80 text-sm mb-6">
            {isAr 
              ? "إذا لم تجد الإجابة التي تبحث عنها، يمكنك الاتصال بنا مباشرة وسيسعد فريقنا بمساعدتك."
              : "If you cannot find the answer to your question in our FAQ, you can contact us directly."}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-8 py-3 bg-white text-main font-bold rounded-xl hover:scale-[1.03] transition-all duration-300 shadow-md cursor-pointer"
          >
            {isAr ? "لم أجد سؤالي!" : "I didn't find my question!"}
          </button>
        </motion.div>
      </Container>

      {/* Popup Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden"
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-main" />

              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-500 cursor-pointer z-10`}
              >
                <X size={18} />
              </button>

              {/* Mail Icon/Header */}
              <div className="flex flex-col items-center text-center mt-4 mb-6">
                <div className="w-16 h-16 bg-main/5 rounded-full flex items-center justify-center mb-3 border border-main/10">
                  <Mail className="text-2xl text-main" />
                </div>
                <h3 className="text-2xl font-bold text-main">
                  {isAr ? "طرح سؤال جديد" : "Ask a New Question"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isAr ? "أرسل لنا سؤالك وسنقوم بالرد عليك على بريدك الإلكتروني بالسرعة الممكنة." : "Send us your question and we will reply to your email as soon as possible."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-start">
                <input
                  type="email"
                  name="email"
                  placeholder={isAr ? "بريدك الإلكتروني" : "Your email"}
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition text-gray-800"
                />
                <textarea
                  name="message"
                  placeholder={isAr ? "اكتب السؤال الذي تبحث عن إجابته هنا..." : "Write the question you need an answer for here..."}
                  rows={5}
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition resize-none text-gray-800"
                ></textarea>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-main text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال السؤال" : "Send Question")}
                </button>

                {errorMsg && (
                  <p className="text-red-500 text-center text-sm font-medium pt-2">
                    {errorMsg}
                  </p>
                )}

                {submitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-green-600 text-center font-medium pt-2"
                  >
                    {isAr ? "تم إرسال سؤالك بنجاح!" : "Your question has been sent successfully!"}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
