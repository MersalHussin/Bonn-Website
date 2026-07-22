"use client";

import { useState } from "react";
import { Trash2, Mail, MailOpen, FileText, Reply } from "lucide-react";
import { toggleFaqReadAction, deleteFaqQuestionAction } from "../../actions/faqActions";
import { useAdminAuth } from "../../context/AdminAuthContext";

export type FaqQuestion = {
  id: string;
  email: string;
  question: string;
  is_read: boolean;
  created_at: string;
};

type Props = {
  questions: FaqQuestion[];
  onRefresh: () => void;
  onView: (q: FaqQuestion) => void;
};

export default function FaqQuestionsTable({ questions, onRefresh, onView }: Props) {
  const { isSuperUser } = useAdminAuth();
  const [filterStatus, setFilterStatus] = useState("الكل");

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { success, error } = await toggleFaqReadAction(id, currentStatus);
      if (!success) throw new Error(error);
      onRefresh();
    } catch (err) {
      console.error("Error toggling read status:", err);
      alert("حدث خطأ أثناء تحديث الحالة.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSuperUser) {
      alert("عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط.");
      return;
    }

    if (!confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;

    try {
      const { success, error } = await deleteFaqQuestionAction(id);
      if (!success) throw new Error(error);
      onRefresh();
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("حدث خطأ أثناء الحذف.");
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        لا توجد أسئلة حالياً.
      </div>
    );
  }

  const filteredQuestions = questions.filter((q) => {
    const matchStatus =
      filterStatus === "الكل"
        ? true
        : filterStatus === "مقروءة"
        ? q.is_read
        : !q.is_read;
    return matchStatus;
  });

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">الحالة:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 bg-white"
          >
            <option value="الكل">الكل</option>
            <option value="جديدة">جديدة (غير مقروءة)</option>
            <option value="مقروءة">مقروءة</option>
          </select>
        </div>
        <div className="text-sm text-gray-500 mr-auto">
          العدد: {filteredQuestions.length} سؤال
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">البريد الإلكتروني</th>
              <th className="p-4 font-semibold text-gray-600">السؤال</th>
              <th className="p-4 font-semibold text-gray-600">التاريخ</th>
              <th className="p-4 font-semibold text-gray-600">الحالة</th>
              <th className="p-4 font-semibold text-gray-600 text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQuestions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  لا توجد أسئلة تطابق الفرز الحالي.
                </td>
              </tr>
            ) : (
              filteredQuestions.map((q) => (
                <tr
                  key={q.id}
                  className={`hover:bg-gray-50/50 transition ${
                    !q.is_read ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="text-sm text-gray-600 font-medium">{q.email}</div>
                  </td>
                  <td className="p-4 max-w-xs cursor-pointer" onClick={() => onView(q)}>
                    <p className="text-sm text-gray-600 truncate">{q.question}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    <div dir="ltr" className="text-right">
                      {new Date(q.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="p-4">
                    {q.is_read ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                        <MailOpen size={14} /> مقروءة
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Mail size={14} /> جديدة
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(q)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                        title="عرض السؤال"
                      >
                        <FileText size={18} />
                      </button>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                          q.email
                        )}&su=${encodeURIComponent("رد على سؤالك بخصوص مصنع بون")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition inline-flex"
                        title="الرد عبر Gmail"
                      >
                        <Reply size={18} />
                      </a>
                      <button
                        onClick={() => toggleReadStatus(q.id, q.is_read)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title={q.is_read ? "تحديد كغير مقروءة" : "تحديد كمقروءة"}
                      >
                        {q.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        disabled={!isSuperUser}
                        className={`p-1.5 rounded transition ${
                          isSuperUser
                            ? "text-gray-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed opacity-40"
                        }`}
                        title={
                          isSuperUser
                            ? "حذف السؤال"
                            : "عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط"
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
