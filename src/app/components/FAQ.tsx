"use client";

import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Container from "./Container";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export default function FAQComponent() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Safely retrieve items from i18n
  const faqItems = useMemo<FAQItem[]>(() => {
    const items = t("faq.items", { returnObjects: true });
    return Array.isArray(items) ? items : [];
  }, [t]);

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
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
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
                      className="w-full py-5 px-6 flex items-center justify-between text-start gap-4 focus:outline-none"
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
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-white text-main font-bold rounded-xl hover:scale-[1.03] transition-all duration-300 shadow-md"
          >
            {t("contact", "Contact Us")}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
