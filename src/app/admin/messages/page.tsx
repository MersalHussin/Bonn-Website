"use client";

import { useEffect, useState } from "react";
import MessagesTable, { ContactMessage } from "../../components/admin/MessagesTable";
import { fetchMessagesAction, markMessageReadAction } from "../../actions/messageActions";
import { MessageSquare, X, Reply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

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

  const fetchMessages = async () => {
    setLoading(true);
    const { success, data, error } = await fetchMessagesAction();

    if (!success) console.error("Error fetching messages:", error);
    else setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleViewMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      const { success, error } = await markMessageReadAction(msg.id);
      if (success) {
        fetchMessages();
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
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">الرسائل الواردة</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              إدارة رسائل تواصل معنا واستفسارات العملاء والرد عليها
            </p>
          </div>
        </div>

        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
          إجمالي الرسائل: {messages.length}
        </div>
      </div>

      {/* ===== Messages Table ===== */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        {loading ? (
          <p className="text-gray-500 py-8 text-center">جارِ التحميل...</p>
        ) : (
          <MessagesTable
            messages={messages}
            onRefresh={fetchMessages}
            onView={handleViewMessage}
          />
        )}
      </div>

      {/* ===== View Message Modal ===== */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
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
                <h3 className="text-xl font-bold text-gray-900">تفاصيل الرسالة</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">الاسم</p>
                    <p className="font-bold text-gray-900">{selectedMessage.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">نوع الطلب</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {selectedMessage.subject}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">البريد الإلكتروني</p>
                    <p className="font-bold text-gray-900">{selectedMessage.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500">رقم الهاتف</p>
                    <p className="font-bold text-gray-900" dir="ltr">
                      {selectedMessage.phone || "غير متوفر"}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs font-semibold text-gray-500">تاريخ الإرسال</p>
                    <p className="font-bold text-gray-900">
                      {new Date(selectedMessage.created_at).toLocaleString("ar-SA", {
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
                  <p className="text-xs font-semibold text-gray-500">محتوى الرسالة</p>
                  <div className="bg-gray-50 p-4 rounded-2xl text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  onClick={(e) => handleReplyClick(e, selectedMessage.email, selectedMessage.subject)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition cursor-pointer"
                >
                  <Reply size={18} /> الرد
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
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
