"use client";

import React, { useState, useEffect } from "react";
import { X, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItemData } from "../../constants/defaultFaqs";

interface FaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<FAQItemData, "id" | "created_at">) => Promise<void>;
  initialData?: FAQItemData | null;
  isSubmitting: boolean;
}

const CATEGORY_OPTIONS = [
  { id: "general", labelAr: "عام", labelEn: "General" },
  { id: "production", labelAr: "الإنتاج والكميات", labelEn: "Production & MOQ" },
  { id: "services", labelAr: "الخدمات", labelEn: "Services" },
  { id: "quality", labelAr: "الجودة والترخيص", labelEn: "Quality & SFDA" },
];

export default function FaqFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: FaqFormModalProps) {
  const [formData, setFormData] = useState({
    question_ar: "",
    answer_ar: "",
    question_en: "",
    answer_en: "",
    category: "general",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        question_ar: initialData.question_ar || "",
        answer_ar: initialData.answer_ar || "",
        question_en: initialData.question_en || "",
        answer_en: initialData.answer_en || "",
        category: initialData.category || "general",
      });
    } else {
      setFormData({
        question_ar: "",
        answer_ar: "",
        question_en: "",
        answer_en: "",
        category: "general",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-main/10 text-main rounded-xl">
                <HelpCircle size={22} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {initialData ? "تعديل السؤال الشائع" : "إضافة سؤال شائع جديد"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmitForm} className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                التصنيف (Category) <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main bg-white text-gray-800"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.labelAr} ({cat.labelEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Arabic Section */}
            <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl space-y-4">
              <h4 className="font-bold text-main text-sm flex items-center gap-2">
                <span>🇸🇦</span> المحتوى باللغة العربية
              </h4>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  السؤال (بالعربية) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="question_ar"
                  value={formData.question_ar}
                  onChange={handleChange}
                  placeholder="مثال: ما هو الحد الأدنى لكمية الطلب (MOQ)؟"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-gray-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  الإجابة (بالعربية) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="answer_ar"
                  value={formData.answer_ar}
                  onChange={handleChange}
                  rows={4}
                  placeholder="اكتب الإجابة المفصلة هنا..."
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-gray-800 bg-white resize-y"
                />
              </div>
            </div>

            {/* English Section */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-4" dir="ltr">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <span>🇬🇧</span> Content in English
              </h4>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Question (in English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="question_en"
                  value={formData.question_en}
                  onChange={handleChange}
                  placeholder="e.g. What is the Minimum Order Quantity (MOQ)?"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-gray-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Answer (in English) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="answer_en"
                  value={formData.answer_en}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write the detailed answer in English here..."
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-gray-800 bg-white resize-y"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 font-medium transition cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-main text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-70 cursor-pointer shadow-md"
              >
                {isSubmitting
                  ? "جاري الحفظ..."
                  : initialData
                  ? "حفظ التعديلات"
                  : "إضافة السؤال"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
