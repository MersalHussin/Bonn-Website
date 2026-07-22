"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Briefcase,
  HelpCircle,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Clock,
  Inbox,
  MailOpen,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAdminAuth } from "../context/AdminAuthContext";
import { fetchMessagesAction } from "../actions/messageActions";
import { fetchFaqQuestionsAction, fetchFaqsAction } from "../actions/faqActions";
import { ContactMessage } from "../components/admin/MessagesTable";
import { FaqQuestion } from "../components/admin/FaqQuestionsTable";

export default function AdminDashboard() {
  const { user, role, isSuperUser } = useAdminAuth();

  const [stats, setStats] = useState({
    clientsCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
    questionsCount: 0,
    unreadQuestionsCount: 0,
    faqsCount: 0,
  });

  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [recentQuestions, setRecentQuestions] = useState<FaqQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        // Fetch manufacturing requests count
        let clientsCount = 0;
        try {
          const res = await fetch("/api/getClients");
          const data = await res.json();
          if (Array.isArray(data)) clientsCount = data.length;
        } catch (e) {}

        // Fetch messages
        const msgRes = await fetchMessagesAction();
        const msgs = msgRes.success ? msgRes.data : [];
        const unreadMsgs = msgs.filter((m: ContactMessage) => !m.is_read).length;

        // Fetch visitor questions
        const qRes = await fetchFaqQuestionsAction();
        const qs = qRes.success ? qRes.data : [];
        const unreadQs = qs.filter((q: FaqQuestion) => !q.is_read).length;

        // Fetch FAQ items
        const faqRes = await fetchFaqsAction();
        const faqsCount = faqRes.success && faqRes.data ? faqRes.data.length : 0;

        setStats({
          clientsCount,
          messagesCount: msgs.length,
          unreadMessagesCount: unreadMsgs,
          questionsCount: qs.length,
          unreadQuestionsCount: unreadQs,
          faqsCount,
        });

        setRecentMessages(msgs.slice(0, 4));
        setRecentQuestions(qs.slice(0, 4));
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const adminModules = [
    {
      title: "إدارة الأسئلة الشائعة (FAQ)",
      desc: "إضافة وتعديل الأسئلة الشائعة بالعربي والإنجليزي",
      href: "/admin/faqs",
      icon: HelpCircle,
    },
    {
      title: "المقالات (Blog)",
      desc: "إدارة وإنشاء المقالات والمحتوى العلمي والتعليمي",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      title: "الوظائف (Careers)",
      desc: "إدارة فرص العمل والفرص المتاحة بالمصنع",
      href: "/admin/jobs",
      icon: Briefcase,
    },
    {
      title: "الفريق (Our Team)",
      desc: "إدارة الهيكل الإداري وفريق العمل بالمصنع",
      href: "/admin/team",
      icon: Users,
    },
  ];

  const statCards = [
    {
      label: "طلبات التصنيع",
      value: stats.clientsCount,
      icon: ClipboardList,
      sub: "طلبات مسجلة",
    },
    {
      label: "الرسائل الواردة",
      value: stats.messagesCount,
      icon: MessageSquare,
      sub: stats.unreadMessagesCount > 0
        ? `${stats.unreadMessagesCount} غير مقروءة`
        : "الكل مقروء",
      highlight: stats.unreadMessagesCount > 0,
    },
    {
      label: "أسئلة الزوار",
      value: stats.questionsCount,
      icon: HelpCircle,
      sub: stats.unreadQuestionsCount > 0
        ? `${stats.unreadQuestionsCount} بحاجة لرد`
        : "تم الاطلاع على الكل",
      highlight: stats.unreadQuestionsCount > 0,
    },
    {
      label: "الأسئلة الشائعة",
      value: stats.faqsCount,
      icon: Inbox,
      sub: "عربي / إنجليزي",
    },
  ];

  return (
    <div className="admin-page space-y-6" dir="rtl">
      {/* ===== Welcome Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-main text-white rounded-2xl">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              أهلاً، {user?.email?.split("@")[0] || "المشرف"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              نظرة عامة على كل شيء يحدث في لوحة التحكم
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          {isSuperUser ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-main font-medium border border-blue-200">
              <ShieldCheck size={15} className="text-main" />
              Super User
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-medium border border-blue-200">
              <ShieldAlert size={15} className="text-blue-400" />
              Admin
            </span>
          )}
        </div>
      </motion.div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{card.label}</span>
                <div className="p-2 bg-blue-50 text-main rounded-xl">
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <p className={`text-xs font-medium ${card.highlight ? "text-main" : "text-gray-400"}`}>
                {card.sub}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ===== Quick Access Modules ===== */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          الأقسام الرئيسية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {adminModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * idx }}
              >
                <Link
                  href={mod.href}
                  className="group block p-4 bg-white border border-gray-200/80 rounded-2xl hover:border-gray-300 hover:bg-gray-50/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 text-main rounded-xl group-hover:bg-main group-hover:text-white transition-colors">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">
                      {mod.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 pr-11">
                    {mod.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 pr-11 transition-colors">
                    <span>فتح</span>
                    <ChevronLeft size={14} className="group-hover:translate-x-[-2px] transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== Recent Activity ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-2xl border border-gray-200/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-gray-400" size={18} />
              <h3 className="font-semibold text-gray-800 text-sm">أحدث الرسائل</h3>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-medium text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              عرض الكل
              <ArrowLeft size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl bg-gray-50/80 flex items-start justify-between gap-3 hover:bg-gray-100/70 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm truncate">{msg.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-200 text-gray-600 shrink-0">
                        {msg.subject}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(msg.created_at).toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {msg.is_read ? (
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <MailOpen size={11} /> مقروءة
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-main bg-blue-50 px-2 py-0.5 rounded">
                        جديدة
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 py-8 text-center">لا توجد رسائل حديثة</p>
            )}
          </div>
        </motion.div>

        {/* Recent Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white p-5 rounded-2xl border border-gray-200/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-gray-400" size={18} />
              <h3 className="font-semibold text-gray-800 text-sm">أحدث أسئلة الزوار</h3>
            </div>
            <Link
              href="/admin/faq-questions"
              className="text-xs font-medium text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              عرض الكل
              <ArrowLeft size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {recentQuestions.length > 0 ? (
              recentQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-3 rounded-xl bg-gray-50/80 flex items-start justify-between gap-3 hover:bg-gray-100/70 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="font-semibold text-gray-800 text-xs block truncate">
                      {q.email}
                    </span>
                    <p className="text-xs text-gray-500 line-clamp-1">{q.question}</p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(q.created_at).toLocaleDateString("ar-SA")}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {q.is_read ? (
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <MailOpen size={11} /> مقروءة
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-main bg-blue-50 px-2 py-0.5 rounded">
                        جديدة
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 py-8 text-center">لا توجد أسئلة جديدة</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}