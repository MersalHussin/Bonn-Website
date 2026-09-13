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
  Menu,
  X
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
  const [activeMobileSheet, setActiveMobileSheet] = useState<"customers" | "content" | "menu" | null>(null);

  useEffect(() => {
    if (isCustomerSectionActive) {
      setIsCustomersOpen(true);
    }
  }, [pathname, isCustomerSectionActive]);

  useEffect(() => {
    // Close mobile sheets on route change
    setActiveMobileSheet(null);
  }, [pathname]);

  // Lock body scroll when a mobile sheet is open
  useEffect(() => {
    if (activeMobileSheet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeMobileSheet]);

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

  const contentSubItems = [
    { name: "إدارة الأسئلة الشائعة", href: "/admin/faqs", icon: HelpCircle },
    { name: "المقالات", href: "/admin/blog", icon: FileText },
    { name: "الأخبار", href: "/admin/news", icon: Newspaper },
  ];

  const moreSubItems = [
    { name: "الوظائف", href: "/admin/jobs", icon: Briefcase },
    { name: "الفريق", href: "/admin/team", icon: Users },
  ];

  return (
    <>
      <aside dir="rtl" className="admin-sidebar">
        {/* Logo */}
        <div className="admin-sidebar-header">
          <Link href="/">
            <Image
              src="/images/Logo-White.svg"
              alt="Boon"
              width={100}
              height={36}
              className="rounded-xl"
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

      {/* Mobile Bottom Navigation (Native App Style) */}
      <nav 
        dir="rtl" 
        className="md:hidden flex items-center justify-around bg-[#ffffff] border-t border-gray-200 text-gray-500 fixed bottom-0 left-0 right-0 z-[2147483647] h-[75px] pb-[env(safe-area-inset-bottom)] px-2 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]"
      >
        {/* 1. Dashboard Tab */}
        <Link
          href="/admin"
          onClick={() => setActiveMobileSheet(null)}
          className={`flex flex-col items-center justify-center w-[70px] h-full gap-1 transition-all ${
            pathname === "/admin" && !activeMobileSheet ? "text-[#04349C]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <LayoutDashboard size={22} strokeWidth={pathname === "/admin" && !activeMobileSheet ? 2.5 : 2} />
          <span className={`text-[11px] whitespace-nowrap ${pathname === "/admin" && !activeMobileSheet ? "font-bold" : "font-medium"}`}>
            الرئيسية
          </span>
        </Link>

        {/* 2. Customers Tab */}
        <button
          onClick={() => setActiveMobileSheet(activeMobileSheet === "customers" ? null : "customers")}
          className={`flex flex-col items-center justify-center w-[70px] h-full gap-1 transition-all ${
            activeMobileSheet === "customers" || (isCustomerSectionActive && !activeMobileSheet) ? "text-[#04349C]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Users size={22} strokeWidth={activeMobileSheet === "customers" || (isCustomerSectionActive && !activeMobileSheet) ? 2.5 : 2} />
          <span className={`text-[11px] whitespace-nowrap ${activeMobileSheet === "customers" || (isCustomerSectionActive && !activeMobileSheet) ? "font-bold" : "font-medium"}`}>
            العملاء
          </span>
        </button>

        {/* 3. Content Tab */}
        <button
          onClick={() => setActiveMobileSheet(activeMobileSheet === "content" ? null : "content")}
          className={`flex flex-col items-center justify-center w-[70px] h-full gap-1 transition-all ${
            activeMobileSheet === "content" || (contentSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? "text-[#04349C]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <FileText size={22} strokeWidth={activeMobileSheet === "content" || (contentSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? 2.5 : 2} />
          <span className={`text-[11px] whitespace-nowrap ${activeMobileSheet === "content" || (contentSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? "font-bold" : "font-medium"}`}>
            المحتوى
          </span>
        </button>

        {/* 4. Menu Tab */}
        <button
          onClick={() => setActiveMobileSheet(activeMobileSheet === "menu" ? null : "menu")}
          className={`flex flex-col items-center justify-center w-[70px] h-full gap-1 transition-all ${
            activeMobileSheet === "menu" || (moreSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? "text-[#04349C]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Menu size={22} strokeWidth={activeMobileSheet === "menu" || (moreSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? 2.5 : 2} />
          <span className={`text-[11px] whitespace-nowrap ${activeMobileSheet === "menu" || (moreSubItems.some(i => pathname === i.href) && !activeMobileSheet) ? "font-bold" : "font-medium"}`}>
            القائمة
          </span>
        </button>
      </nav>

      {/* Mobile Bottom Sheets */}
      <AnimatePresence>
        {activeMobileSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mobile-sheet-overlay"
              onClick={() => setActiveMobileSheet(null)}
            />

            {/* Sheet Content */}
            <motion.div
              dir="rtl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden mobile-sheet-container"
            >
              {/* Handle bar for visual cue */}
              <div className="w-full flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              </div>

              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-800">
                  {activeMobileSheet === "customers" && "من العملاء"}
                  {activeMobileSheet === "content" && "إدارة المحتوى"}
                  {activeMobileSheet === "menu" && "المزيد"}
                </h3>
                <button
                  onClick={() => setActiveMobileSheet(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sheet Links */}
              <div className="p-4 space-y-2">
                {activeMobileSheet === "customers" && customerSubItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveMobileSheet(null)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      pathname === item.href ? "bg-[#04349C]/10 text-[#04349C] font-bold" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${pathname === item.href ? "bg-[#04349C] text-white" : "bg-white text-gray-500 shadow-sm"}`}>
                      <item.icon size={20} strokeWidth={pathname === item.href ? 2.5 : 2} />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                ))}

                {activeMobileSheet === "content" && contentSubItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveMobileSheet(null)}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      pathname === item.href ? "bg-[#04349C]/10 text-[#04349C] font-bold" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${pathname === item.href ? "bg-[#04349C] text-white" : "bg-white text-gray-500 shadow-sm"}`}>
                      <item.icon size={20} strokeWidth={pathname === item.href ? 2.5 : 2} />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                ))}

                {activeMobileSheet === "menu" && (
                  <>
                    {moreSubItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveMobileSheet(null)}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                          pathname === item.href ? "bg-[#04349C]/10 text-[#04349C] font-bold" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${pathname === item.href ? "bg-[#04349C] text-white" : "bg-white text-gray-500 shadow-sm"}`}>
                          <item.icon size={20} strokeWidth={pathname === item.href ? 2.5 : 2} />
                        </div>
                        <span>{item.name}</span>
                      </Link>
                    ))}

                    <div className="my-2 border-t border-gray-100" />
                    
                    {user?.email && (
                      <div className="px-4 py-2">
                         <p className="text-xs text-gray-400">مسجل كـ</p>
                         <p className="text-sm font-semibold text-gray-700 truncate">{user.email}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 p-4 mt-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-bold"
                    >
                      <LogOut size={20} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
