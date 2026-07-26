"use client";

import { useEffect, useState } from "react";
import FaqQuestionsTable, { FaqQuestion } from "../../components/admin/FaqQuestionsTable";
import { fetchFaqQuestionsAction, markFaqReadAction } from "../../actions/faqActions";
import { HelpCircle, X, Reply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFaqQuestionsPage() {
  const [questions, setQuestions] = useState<FaqQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<FaqQuestion | null>(null);

  const handleReplyClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const subjectLine = encodeURIComponent("رد على سؤالك بخصوص مصنع بون");
    if (isMobile) {
      window.location.href = `mailto:${email}?subject=${subjectLine}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subjectLine}`, '_blank');
    }
  };

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
    if (!q.is_read) {
      const { success, error } = await markFaqReadAction(q.id);
      if (success) {
        fetchQuestions();
      } else {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  return (
    <div className="admin-page space-y-6" dir="rtl">
      {/* ===== Header ===== */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-main/10 text-main rounded-2xl">
            <HelpCircle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">أسئلة الزوار (FAQ Questions)</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              متابعة وإدارة أسئلة واستفسارات الزوار غير الجاهزة في صفحة الأسئلة الشائعة
            </p>
          </div>
        </div>

        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
          إجمالي الأسئلة: {questions.length}
        </div>
      </div>

      {/* ===== Questions Table ===== */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        {loading ? (
          <p className="text-gray-500 py-8 text-center">جارِ التحميل...</p>
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
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              dir="rtl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">تفاصيل سؤال الزائر</h3>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">البريد الإلكتروني</p>
                    <p className="font-bold text-gray-900">{selectedQuestion.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">تاريخ الإرسال</p>
                    <p className="font-bold text-gray-900">
                      {new Date(selectedQuestion.created_at).toLocaleString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs font-semibold text-gray-500">محتوى السؤال</p>
                  <div className="bg-gray-50 p-4 rounded-2xl text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedQuestion.question}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <a
                  href={`mailto:${selectedQuestion.email}`}
                  onClick={(e) => handleReplyClick(e, selectedQuestion.email)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition cursor-pointer"
                >
                  <Reply size={18} /> الرد
                </a>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition cursor-pointer"
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
