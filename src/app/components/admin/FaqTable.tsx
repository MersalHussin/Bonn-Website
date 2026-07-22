"use client";

import React, { useState, useMemo } from "react";
import { FAQItemData } from "../../constants/defaultFaqs";
import { Search, Edit2, Trash2, Globe, Tag } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

interface FaqTableProps {
  faqs: FAQItemData[];
  onEdit: (faq: FAQItemData) => void;
  onDelete: (id: number | string) => void;
}

const CATEGORIES: Record<string, { ar: string; en: string; badge: string }> = {
  general: { ar: "عام", en: "General", badge: "bg-blue-100 text-blue-800 border-blue-200" },
  production: { ar: "الإنتاج والكميات", en: "Production & MOQ", badge: "bg-amber-100 text-amber-800 border-amber-200" },
  services: { ar: "الخدمات", en: "Services", badge: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  quality: { ar: "الجودة والترخيص", en: "Quality & SFDA", badge: "bg-purple-100 text-purple-800 border-purple-200" },
};

export default function FaqTable({ faqs, onEdit, onDelete }: FaqTableProps) {
  const { isSuperUser } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const qAr = item.question_ar?.toLowerCase() || "";
      const aAr = item.answer_ar?.toLowerCase() || "";
      const qEn = item.question_en?.toLowerCase() || "";
      const aEn = item.answer_en?.toLowerCase() || "";
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        !search ||
        qAr.includes(search) ||
        aAr.includes(search) ||
        qEn.includes(search) ||
        aEn.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const handleDeleteClick = (id: number | string) => {
    if (!isSuperUser) {
      alert("عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط.");
      return;
    }
    onDelete(id);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Controls Bar: Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باللغة العربية أو الإنجليزية..."
            className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-gray-800"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-main text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-200/60 border border-gray-200"
            }`}
          >
            الكل ({faqs.length})
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const count = faqs.filter((f) => f.category === key).length;
            const isActive = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-main text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-200/60 border border-gray-200"
                }`}
              >
                {cat.ar} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
              <th className="py-4 px-4 text-center w-12">#</th>
              <th className="py-4 px-4">التصنيف</th>
              <th className="py-4 px-4">السؤال والجواب (عربي)</th>
              <th className="py-4 px-4">Question & Answer (English)</th>
              <th className="py-4 px-4 text-center w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const catInfo = CATEGORIES[item.category] || {
                  ar: item.category,
                  en: item.category,
                  badge: "bg-gray-100 text-gray-800 border-gray-200",
                };

                return (
                  <tr key={item.id || index} className="hover:bg-blue-50/30 transition">
                    <td className="py-4 px-4 text-center font-bold text-gray-400">
                      {index + 1}
                    </td>

                    {/* Category Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${catInfo.badge}`}>
                        <Tag size={12} />
                        {catInfo.ar}
                      </span>
                    </td>

                    {/* Arabic Content */}
                    <td className="py-4 px-4 max-w-sm">
                      <p className="font-bold text-main mb-1 line-clamp-2" title={item.question_ar}>
                        {item.question_ar}
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed" title={item.answer_ar}>
                        {item.answer_ar}
                      </p>
                    </td>

                    {/* English Content */}
                    <td className="py-4 px-4 max-w-sm" dir="ltr">
                      <p className="font-bold text-gray-900 mb-1 line-clamp-2" title={item.question_en}>
                        {item.question_en}
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed" title={item.answer_en}>
                        {item.answer_en}
                      </p>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                          title="تعديل"
                        >
                          <Edit2 size={17} />
                        </button>
                        <button
                          onClick={() => item.id && handleDeleteClick(item.id)}
                          disabled={!isSuperUser}
                          className={`p-2 rounded-lg transition ${
                            isSuperUser
                              ? "text-red-600 hover:bg-red-100 cursor-pointer"
                              : "text-gray-300 cursor-not-allowed opacity-40"
                          }`}
                          title={
                            isSuperUser
                              ? "حذف"
                              : "عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط"
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  <Globe className="mx-auto text-gray-300 mb-2" size={32} />
                  <p className="font-bold text-gray-700">لا توجد أسئلة تطابق البحث أو التصنيف المحدد</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
