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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
    { name: "طلبات التصنيع", href: "/admin/pdf", icon: ClipboardList },
  ];

  return (
    <aside
      dir="rtl"
      className="admin-sidebar"
    >
      {/* Logo */}
      <div className="admin-sidebar-header">
        <Image
          src="/images/Logo.svg"
          alt="Boon"
          width={100}
          height={36}
          className="bg-white rounded-xl"
          priority
        />
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

      {/* Logout */}
      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="admin-sidebar-logout">
          <LogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
