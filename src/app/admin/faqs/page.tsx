"use client";

import { useEffect, useState } from "react";
import {
  fetchFaqsAction,
  addFaqAction,
  updateFaqAction,
  deleteFaqAction,
  seedDefaultFaqsAction,
} from "../../actions/faqActions";
import { FAQItemData } from "../../constants/defaultFaqs";
import FaqTable from "../../components/admin/FaqTable";
import FaqFormModal from "../../components/admin/FaqFormModal";
import { HelpCircle, Plus, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDefaultData, setIsDefaultData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItemData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    const res = await fetchFaqsAction();
    if (res.success) {
      setFaqs(res.data);
      setIsDefaultData(res.isDefault || false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleOpenAddModal = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (faq: FAQItemData) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: Omit<FAQItemData, "id" | "created_at">) => {
    setIsSubmitting(true);
    setStatusMsg(null);

    let res;
    if (editingFaq && editingFaq.id) {
      res = await updateFaqAction(editingFaq.id, data);
    } else {
      res = await addFaqAction(data);
    }

    if (res.success) {
      setStatusMsg({
        type: "success",
        text: editingFaq ? "تم تعديل السؤال بنجاح" : "تمت إضافة السؤال بنجاح",
      });
      setIsModalOpen(false);
      setEditingFaq(null);
      await loadFaqs();
    } else {
      setStatusMsg({
        type: "error",
        text: res.error || "حدث خطأ أثناء تنفيذ العملية",
      });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا السؤال؟")) return;

    setStatusMsg(null);
    const res = await deleteFaqAction(id);
    if (res.success) {
      setStatusMsg({ type: "success", text: "تم حذف السؤال بنجاح" });
      await loadFaqs();
    } else {
      setStatusMsg({ type: "error", text: res.error || "فشل عملية الحذف" });
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("هل ترغب في حفظ الأسئلة الشائعة الافتراضية إلى قاعدة البيانات؟")) return;

    setIsSeeding(true);
    setStatusMsg(null);
    const res = await seedDefaultFaqsAction();
    if (res.success) {
      setStatusMsg({ type: "success", text: "تمت إضافة الأسئلة الافتراضية لقاعدة البيانات بنجاح!" });
      await loadFaqs();
    } else {
      setStatusMsg({ type: "error", text: res.error || "فشلت عملية استعادة الأسئلة الافتراضية." });
    }
    setIsSeeding(false);
  };

  return (
    <div className="admin-page space-y-6" dir="rtl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-main/10 text-main rounded-2xl">
            <HelpCircle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة الأسئلة الشائعة (FAQ)</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              إضافة وتعديل الأسئلة الشائعة مع دعم اللغتين (العربية والإنجليزية) والتصنيفات.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isDefaultData && (
            <button
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 font-medium text-sm transition cursor-pointer"
            >
              <RefreshCw size={16} className={isSeeding ? "animate-spin" : ""} />
              <span>حفظ البيانات الافتراضية لـ Supabase</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-main text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md cursor-pointer text-sm"
          >
            <Plus size={18} />
            <span>إضافة سؤال جديد</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl text-sm font-medium flex items-center justify-between ${
            statusMsg.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
      )}

      {/* Default Data Info Callout */}
      {isDefaultData && !loading && (
        <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-3 text-blue-900 text-sm">
          <AlertCircle size={20} className="text-main shrink-0 mt-0.5" />
          <div>
            <p className="font-bold mb-0.5">ملاحظة:</p>
            <p className="text-blue-800/90 leading-relaxed">
              الأسئلة الظاهرة حالياً هي الأسئلة الافتراضية للموقع. عند إضافة أي سؤال جديد أو الضغط على زر
              <strong> "حفظ البيانات الافتراضية لـ Supabase" </strong>
              سيتم تخزين الأسئلة بشكل دائم في جدول قاعدة البيانات (`faqs`).
            </p>
          </div>
        </div>
      )}

      {/* Content Table Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-main" />
            <p>جاري تحميل الأسئلة الشائعة...</p>
          </div>
        ) : (
          <FaqTable
            faqs={faqs}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Form Modal */}
      <FaqFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingFaq}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
