"use client";

import { useState } from "react";
import { Trash2, Mail, MailOpen, FileText, Reply, MessageCircle } from "lucide-react";
import { toggleMessageReadAction, deleteMessageAction } from "../../actions/messageActions";
import { useAdminAuth } from "../../context/AdminAuthContext";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Props = {
  messages: ContactMessage[];
  onRefresh: () => void;
  onView: (msg: ContactMessage) => void;
};

export default function MessagesTable({ messages, onRefresh, onView }: Props) {
  const { isSuperUser } = useAdminAuth();
  const [filterSubject, setFilterSubject] = useState("الكل");
  const [filterStatus, setFilterStatus] = useState("الكل");

  const handleReplyClick = (e: React.MouseEvent<HTMLAnchorElement>, email: string, subject: string) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const subjectLine = encodeURIComponent(`رد على: ${subject}`);
    if (isMobile) {
      window.location.href = `mailto:${email}?subject=${subjectLine}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subjectLine}`, '_blank');
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { success, error } = await toggleMessageReadAction(id, currentStatus);

      if (!success) throw new Error(error);
      onRefresh();
    } catch (err) {
      console.error("Error toggling read status:", err);
      alert("حدث خطأ أثناء تحديث حالة الرسالة.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSuperUser) {
      alert("عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط.");
      return;
    }

    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;

    try {
      const { success, error } = await deleteMessageAction(id);

      if (!success) throw new Error(error);
      onRefresh();
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("حدث خطأ أثناء حذف الرسالة.");
    }
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        لا توجد رسائل حالياً.
      </div>
    );
  }

  const subjects = ["الكل", ...Array.from(new Set(messages.map((m) => m.subject)))];

  const filteredMessages = messages.filter((msg) => {
    const matchSubject = filterSubject === "الكل" || msg.subject === filterSubject;
    const matchStatus =
      filterStatus === "الكل"
        ? true
        : filterStatus === "مقروءة"
        ? msg.is_read
        : !msg.is_read;
    return matchSubject && matchStatus;
  });

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">نوع الطلب:</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-main/20 bg-white"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
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
          العدد: {filteredMessages.length} رسالة
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">الاسم</th>
              <th className="p-4 font-semibold text-gray-600">تواصل</th>
              <th className="p-4 font-semibold text-gray-600">نوع الطلب</th>
              <th className="p-4 font-semibold text-gray-600">الرسالة</th>
              <th className="p-4 font-semibold text-gray-600">التاريخ</th>
              <th className="p-4 font-semibold text-gray-600">الحالة</th>
              <th className="p-4 font-semibold text-gray-600 text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMessages.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  لا توجد رسائل تطابق الفرز الحالي.
                </td>
              </tr>
            ) : (
              filteredMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-gray-50/50 transition ${
                    !msg.is_read ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="p-4">
                    <div
                      className={`font-medium ${
                        !msg.is_read ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {msg.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">{msg.email}</div>
                    {msg.phone && (
                      <div className="text-sm text-gray-500 mt-1" dir="ltr">
                        {msg.phone}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {msg.subject}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs cursor-pointer" onClick={() => onView(msg)}>
                    <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    <div dir="ltr" className="text-right">
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="p-4">
                    {msg.is_read ? (
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
                        onClick={() => onView(msg)}
                        className="p-1.5 cursor-pointer text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                        title="عرض الرسالة"
                      >
                        <FileText size={18} />
                      </button>
                      <a
                        href={`mailto:${msg.email}`}
                        onClick={(e) => handleReplyClick(e, msg.email, msg.subject)}
                        className="p-1.5 cursor-pointer text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition inline-flex"
                        title="الرد"
                      >
                        <Reply size={18} />
                      </a>
                      {msg.phone && (
                        <a
                          href={`https://wa.me/${msg.phone.replace(/[^0-9+]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 cursor-pointer text-gray-500 hover:text-green-500 hover:bg-green-50 rounded transition inline-flex"
                          title="التواصل عبر واتساب"
                        >
                          <MessageCircle size={18} />
                        </a>
                      )}
                      <button
                        onClick={() => toggleReadStatus(msg.id, msg.is_read)}
                        className="p-1.5 cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        title={msg.is_read ? "تحديد كغير مقروءة" : "تحديد كمقروءة"}
                      >
                        {msg.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={!isSuperUser}
                        className={`p-1.5 rounded transition ${
                          isSuperUser
                            ? "text-gray-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed opacity-40"
                        }`}
                        title={
                          isSuperUser
                            ? "حذف الرسالة"
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
