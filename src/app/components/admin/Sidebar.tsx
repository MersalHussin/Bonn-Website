"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import {
  LogOut,
  FileText,
  ClipboardList,
  LayoutDashboard,
  Newspaper,
  Users,
  Briefcase,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role } = useAdminAuth();

  const isCustomerSectionActive =
    pathname.startsWith("/admin/clients") ||
    pathname.startsWith("/admin/messages") ||
    pathname.startsWith("/admin/faq-questions") ||
    pathname.startsWith("/admin/customers");

  const [isCustomersOpen, setIsCustomersOpen] = useState(isCustomerSectionActive);

  useEffect(() => {
    if (isCustomerSectionActive) {
      setIsCustomersOpen(true);
    }
  }, [pathname, isCustomerSectionActive]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("فشل تسجيل الخروج، حاول مرة أخرى.");
    }
  };

  const customerSubItems = [
    { name: "طلبات التصنيع", href: "/admin/clients", icon: ClipboardList },
    { name: "الرسائل الواردة", href: "/admin/messages", icon: MessageSquare },
    { name: "أسئلة الزوار", href: "/admin/faq-questions", icon: HelpCircle },
  ];

  const menuItems = [
    { name: "الرئيسية", href: "/admin", icon: LayoutDashboard },
    { name: "إدارة الأسئلة الشائعة", href: "/admin/faqs", icon: HelpCircle },
    { name: "المقالات", href: "/admin/blog", icon: FileText },
    { name: "الأخبار", href: "/admin/news", icon: Newspaper },
    { name: "الوظائف", href: "/admin/jobs", icon: Briefcase },
    { name: "الفريق", href: "/admin/team", icon: Users },
  ];

  return (
    <aside dir="rtl" className="admin-sidebar">
      {/* Logo */}
      <div className="admin-sidebar-header">
        <Link href="/">
          <Image
            src="/images/Logo.svg"
            alt="Boon"
            width={100}
            height={36}
            className="bg-white rounded-xl"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav space-y-1">
        {/* Dashboard Link */}
        <Link
          href="/admin"
          className={`admin-sidebar-link ${pathname === "/admin" ? "active" : ""}`}
        >
          <LayoutDashboard size={19} strokeWidth={pathname === "/admin" ? 2.2 : 1.8} />
          <span>الرئيسية</span>
        </Link>

        {/* Expandable "من العملاء" Accordion Item */}
        <div className="space-y-1">
          <button
            onClick={() => setIsCustomersOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              isCustomerSectionActive
                ? "bg-white/10 text-white font-bold"
                : "text-white/80 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={19} strokeWidth={isCustomerSectionActive ? 2.2 : 1.8} />
              <span>من العملاء</span>
            </div>
            {isCustomersOpen ? (
              <ChevronUp size={16} className="text-white/60" />
            ) : (
              <ChevronDown size={16} className="text-white/60" />
            )}
          </button>

          {/* Sub-menu Slider Accordion */}
          <AnimatePresence initial={false}>
            {isCustomersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden pr-4 space-y-1"
              >
                {customerSubItems.map((sub) => {
                  const isSubActive = pathname === sub.href;
                  const SubIcon = sub.icon;

                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        isSubActive
                          ? "bg-main text-white shadow-sm"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <SubIcon size={16} strokeWidth={isSubActive ? 2.2 : 1.8} />
                      <span>{sub.name}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Remaining Menu Items */}
        {menuItems.slice(1).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer (User Info & Logout) */}
      <div className="admin-sidebar-footer space-y-4">
        {user?.email && (
          <div className="text-center">
            <p className="text-xs text-white/60">تسجيل الدخول كـ</p>
            <p className="text-sm font-medium text-white/90 truncate px-2" title={user.email}>
              {user.email}
            </p>
            <p className="text-xs text-white/60">الصلاحية</p>
            <p className="text-sm font-medium text-white/90 truncate px-2">{role}</p>
          </div>
        )}
        <button onClick={handleLogout} className="admin-sidebar-logout cursor-pointer">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
