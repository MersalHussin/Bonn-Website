import Link from 'next/link';
import { Package, MapPin, FileText, ClipboardList, Newspaper } from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    // { title: "المنتجات", href: "/admin/products", icon: Package, desc: "إدارة الكتالوج والمنتجات" },
    // { title: "الفروع", href: "/admin/locations", icon: MapPin, desc: "إدارة المواقع والفروع" },
    { title: "المقالات", href: "/admin/blog", icon: FileText, desc: "إضافة وتعديل المقالات" },
    { title: "الأخبار", href: "/admin/news", icon: Newspaper, desc: "إدارة الأخبار والتحديثات" },
    { title: "طلبات التصنيع", href: "/admin/pdf", icon: ClipboardList, desc: "عرض وتحميل طلبات العملاء" },
  ];

  return (
    <div className="admin-page" dir="rtl">
      <div className="admin-page-header">
        <h1>لوحة التحكم</h1>
        <p>مرحبًا بك في لوحة إدارة Boon</p>
      </div>

      <div className="admin-cards-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="admin-card">
              <div className="admin-card-icon">
                <Icon size={22} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <span className="admin-card-arrow">←</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}