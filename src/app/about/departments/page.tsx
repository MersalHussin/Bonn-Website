"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { departmentsData } from "@/app/constants/departmentsData";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function DepartmentsPage() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>
        <Breadcrumb items={[
          { label: isAr ? "عن بون" : "About Boon", href: "/about" },
          { label: isAr ? "إدارات المصنع" : "Departments" }
        ]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          
          <div className="text-center mb-16">
            <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1A3351] mb-4"
          >
            {isAr ? "إدارات وأقسام المصنع" : "Company Departments"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            {isAr 
              ? "تعرف على الأقسام والإدارات المختلفة التي تعمل معاً لتحقيق رؤيتنا وتقديم أفضل الخدمات الطبية والتجميلية." 
              : "Discover the various departments working together to achieve our vision and deliver top quality products."}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {departmentsData.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div key={dept.id} variants={itemVariants}>
                <Link href={`/about/departments/${dept.id}`}>
                  <div className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    
                    {/* Icon Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dept.bg} ${dept.color} transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
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
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {isAr ? dept.descAr : dept.descEn}
                      </p>
                      <div className="w-10 h-1 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-main/30 transition-all duration-500"></div>
                    </div>

                    {/* Footer link hint */}
                    <div className="mt-6 pt-4 border-t border-gray-50">
                      <p className="text-sm font-semibold text-main flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        {isAr ? "عرض التفاصيل الكاملة" : "View Details"}
                        {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </main>
    </>
  );
}
