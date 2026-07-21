"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import {
  LogOut,
  FileText,
  ClipboardList,
  Package,
  MapPin,
  LayoutDashboard,
  Newspaper,
  Users,
  Briefcase,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user ,role } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("فشل تسجيل الخروج، حاول مرة أخرى.");
    }
  };

  const menuItems = [
    { name: "الرئيسية", href: "/admin", icon: LayoutDashboard },
    // { name: "المنتجات", href: "/admin/products", icon: Package },
    // { name: "الفروع", href: "/admin/locations", icon: MapPin },
    { name: "المقالات", href: "/admin/blog", icon: FileText },
    { name: "الأخبار", href: "/admin/news", icon: Newspaper },
    { name: "الفريق", href: "/admin/team", icon: Users },
    { name: "الوظائف", href: "/admin/jobs", icon: Briefcase },
    { name: "طلبات التصنيع", href: "/admin/clients", icon: ClipboardList },
    { name: "الرسائل", href: "/admin/messages", icon: MessageSquare },
    { name: "أسئلة الزوار", href: "/admin/faq-questions", icon: HelpCircle },
  ];

  return (
    <aside
      dir="rtl"
      className="admin-sidebar"
    >
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
      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => {
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
            <p className="text-sm font-medium text-white/90 truncate px-2">
              {role}
            </p>
          </div>
        )}
        <button onClick={handleLogout} className="admin-sidebar-logout">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
