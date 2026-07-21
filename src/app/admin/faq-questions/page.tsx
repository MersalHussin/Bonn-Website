"use client";

import { useEffect, useState } from "react";
import FaqQuestionsTable, { FaqQuestion } from "../../components/admin/FaqQuestionsTable";
import { fetchFaqQuestionsAction, markFaqReadAction } from "../../actions/faqActions";
import { HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFaqQuestionsPage() {
  const [questions, setQuestions] = useState<FaqQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<FaqQuestion | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    const { success, data, error } = await fetchFaqQuestionsAction();
      
    if (!success) console.error("Error fetching FAQ questions:", error);
    else setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleViewQuestion = async (q: FaqQuestion) => {
    setSelectedQuestion(q);
    // If it's unread, mark it as read automatically when opened
    if (!q.is_read) {
      const { success, error } = await markFaqReadAction(q.id);
      if (success) {
        fetchQuestions(); // refresh background list
      } else {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  return (
    <div className="admin-page space-y-6" dir="rtl">
      {/* ===== Header ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div className="admin-page-header" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-main/10 text-main rounded-xl">
              <HelpCircle size={28} />
            </div>
            <div>
              <h1>أسئلة الزوار (FAQ)</h1>
              <p>إدارة الأسئلة غير الموجودة في صفحة الأسئلة الشائعة</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Questions Table ===== */}
      <div className="admin-content-card" style={{ padding: 16 }}>
        {loading ? (
          <p style={{ color: "#64748b", padding: 20 }}>جارِ التحميل...</p>
        ) : (
          <FaqQuestionsTable
            questions={questions}
            onRefresh={fetchQuestions}
            onView={handleViewQuestion}
          />
        )}
      </div>

      {/* ===== View Question Modal ===== */}
      <AnimatePresence>
        {selectedQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuestion(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
              dir="rtl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">تفاصيل السؤال</h3>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium text-gray-900">{selectedQuestion.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">تاريخ الإرسال</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedQuestion.created_at).toLocaleString("ar-SA", {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-sm font-medium text-gray-500">محتوى السؤال</p>
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedQuestion.question}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
