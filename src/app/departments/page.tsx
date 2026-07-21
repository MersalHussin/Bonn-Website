"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Factory,
  TrendingUp,
  Megaphone,
  ShoppingCart,
  Globe,
  Tag,
  FileText,
  Users,
  PieChart,
  ShoppingBag,
  FlaskConical,
  CheckCircle,
  ShieldCheck,
  Settings,
  Microscope,
  Headset,
  Scale,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const departments = [
  { id: "plant-management", icon: Factory, color: "text-slate-600", bg: "bg-slate-50", nameEn: "Plant Management", nameAr: "إدارة المصنع" },
  { id: "business-development", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50", nameEn: "Business Development", nameAr: "تطوير الأعمال" },
  { id: "marketing", icon: Megaphone, color: "text-pink-600", bg: "bg-pink-50", nameEn: "Marketing Department", nameAr: "إدارة التسويق" },
  { id: "sales", icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50", nameEn: "Sales Department", nameAr: "إدارة المبيعات" },
  { id: "export", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50", nameEn: "Export Department", nameAr: "إدارة التصدير" },
  { id: "private-label", icon: Tag, color: "text-purple-600", bg: "bg-purple-50", nameEn: "Private Label Department", nameAr: "العلامات التجارية الخاصة" },
  { id: "government-tenders", icon: FileText, color: "text-amber-600", bg: "bg-amber-50", nameEn: "Government Tenders", nameAr: "إدارة المناقصات الحكومية" },
  { id: "hr", icon: Users, color: "text-orange-600", bg: "bg-orange-50", nameEn: "HR", nameAr: "الموارد البشرية" },
  { id: "finance", icon: PieChart, color: "text-green-600", bg: "bg-green-50", nameEn: "Finance", nameAr: "الإدارة المالية" },
  { id: "procurement", icon: ShoppingBag, color: "text-teal-600", bg: "bg-teal-50", nameEn: "Procurement", nameAr: "إدارة المشتريات" },
  { id: "rnd", icon: FlaskConical, color: "text-indigo-600", bg: "bg-indigo-50", nameEn: "R&D", nameAr: "البحث والتطوير" },
  { id: "quality-assurance", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50", nameEn: "Quality Assurance", nameAr: "ضمان الجودة" },
  { id: "quality-control", icon: CheckCircle, color: "text-fuchsia-600", bg: "bg-fuchsia-50", nameEn: "Quality Control", nameAr: "مراقبة الجودة" },
  { id: "production", icon: Settings, color: "text-zinc-600", bg: "bg-zinc-50", nameEn: "Production", nameAr: "إدارة الإنتاج" },
  { id: "microbiology", icon: Microscope, color: "text-sky-600", bg: "bg-sky-50", nameEn: "Microbiology", nameAr: "علم الأحياء الدقيقة" },
  { id: "customer-service", icon: Headset, color: "text-violet-600", bg: "bg-violet-50", nameEn: "Customer Service", nameAr: "خدمة العملاء" },
  { id: "legal", icon: Scale, color: "text-stone-600", bg: "bg-stone-50", nameEn: "Legal", nameAr: "الشؤون القانونية" },
];

export default function DepartmentsPage() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1A3351] mb-4"
          >
            {isAr ? "إدارات الشركة" : "Company Departments"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            {isAr 
              ? "تعرف على الأقسام والإدارات المختلفة التي تعمل معاً لتحقيق رؤيتنا وتقديم أفضل الخدمات." 
              : "Discover the various departments working together to achieve our vision and deliver the best services."}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div key={dept.id} variants={itemVariants}>
                <Link href={`/departments/${dept.id}`}>
                  <div className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    
                    {/* Icon Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dept.bg} ${dept.color} transition-transform group-hover:scale-110 duration-300`}>
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover:${dept.bg} group-hover:${dept.color} transition-colors`}>
                        {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1A3351] mb-2 group-hover:text-main transition-colors">
                        {isAr ? dept.nameAr : dept.nameEn}
                      </h3>
                      <div className="w-10 h-1 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-main/20 transition-all duration-500"></div>
                    </div>

                    {/* Placeholder links snippet */}
                    <div className="mt-6 pt-4 border-t border-gray-50">
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        {isAr ? "عرض التفاصيل والروابط" : "View details & links"}
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
