"use client";

import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
  ShieldCheck,
  Send
} from "lucide-react";
import Container from "@/app/components/Container";
import { departmentsData } from "@/app/constants/departmentsData";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function DepartmentDetailPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const id = params?.id as string;
  const isRTL = i18n.language === "ar";

  const department = departmentsData.find((d) => d.id === id);

  if (!department) {
    return (
      <main className="min-h-screen flex items-center justify-center pb-20 bg-slate-50" dir={isRTL ? "rtl" : "ltr"}>
        <div className="text-center space-y-6 max-w-md mx-auto p-8 bg-white rounded-3xl shadow-lg border border-slate-100">
          <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Building2 size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1A3351]">
            {isRTL ? "الإدارة غير موجودة" : "Department Not Found"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isRTL ? "عذراً، الإدارة التي تبحث عنها غير متوفرة." : "Sorry, the department you are looking for is not available."}
          </p>
          <Link
            href="/about/departments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-main text-white font-bold hover:bg-main/90 transition shadow-md shadow-main/20"
          >
            {isRTL ? "العودة لصفحة الإدارات" : "Back to Departments"}
          </Link>
        </div>
      </main>
    );
  }

  const Icon = department.icon;
  const deptName = isRTL ? department.nameAr : department.nameEn;
  const deptDesc = isRTL ? department.descAr : department.descEn;
  const responsibilities = isRTL
    ? department.responsibilitiesAr || []
    : department.responsibilitiesEn || [];

  // Find adjacent departments for bottom pagination
  const currentIndex = departmentsData.findIndex((d) => d.id === id);
  const prevDept = currentIndex > 0 ? departmentsData[currentIndex - 1] : null;
  const nextDept = currentIndex < departmentsData.length - 1 ? departmentsData[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <Breadcrumb items={[
        { label: isRTL ? "عن بون" : "About Boon", href: "/about" },
        { label: isRTL ? "إدارات المصنع" : "Departments", href: "/about/departments" },
        { label: deptName }
      ]} />
      {/* Hero Header */}
      <section
        dir={isRTL ? "rtl" : "ltr"}
        className="relative bg-gradient-to-br from-[#1A3351] via-main to-[#0d2139] py-20 md:py-30 overflow-hidden text-white"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-main/30 rounded-full blur-3xl" />

        <Container>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Department Icon Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-28 h-28 md:w-36 md:h-36 shrink-0"
            >
              <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-md rotate-6" />
              <div className="absolute inset-[3px] rounded-3xl bg-white text-main flex items-center justify-center shadow-2xl">
                <Icon size={58} strokeWidth={1.4} />
              </div>
            </motion.div>

            {/* Department Title & Description */}
            <div className="text-center md:text-start flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
              >
                {deptName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl text-white/80 max-w-3xl leading-relaxed font-light"
              >
                {deptDesc}
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Details Section */}
      <section dir={isRTL ? "rtl" : "ltr"} className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Responsibilities List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-main/10 text-main flex items-center justify-center">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A3351]">
                      {isRTL ? "مهام واختصاصات الإدارة" : "Key Responsibilities & Functions"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isRTL ? "أبرز المسؤوليات والأدوار التشغيلية لهذه الإدارة بالمصنع" : "Core operational duties executed by this department"}
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 gap-4">
                  {responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-main/20 hover:bg-main/5 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-main/10 text-main flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-main group-hover:text-white transition-colors">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-slate-700 font-medium text-base leading-relaxed pt-0.5">
                        {resp}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Quality Commitment Notice */}
              {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-3xl p-8 border border-blue-100/80 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white text-main shadow-md flex items-center justify-center shrink-0">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A3351] text-lg mb-1">
                    {isRTL ? "الالتزام بالمعايير العالمية cGMP & ISO" : "c-GMP & ISO Quality Standards"}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isRTL
                      ? "تعمل جميع إدارات مصنع بون تحت مظلة دقيقة من معايير التصنيع الجيد والحوكمة الصارمة المعتمدة من هيئة الغذاء والدواء السعودية (SFDA)."
                      : "All departments operate under rigorous cGMP and SFDA regulatory standards ensuring maximum quality and safety."}
                  </p>
                </div>
              </div> */}
            </motion.div>

            {/* Sidebar / Quick Links & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-4 space-y-6"
            >
              {/* Quick Navigation Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center justify-between">
                  <span>{isRTL ? "إدارات أخرى" : "Other Departments"}</span>
                  <Link href="/about/departments" className="text-xs text-main hover:underline font-semibold">
                    {isRTL ? "عرض الكل" : "View all"}
                  </Link>
                </h3>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 hide-scrollbar">
                  {departmentsData.slice(0, 8).map((d) => {
                    const DIcon = d.icon;
                    const isSelected = d.id === id;
                    return (
                      <Link
                        key={d.id}
                        href={`/about/departments/${d.id}`}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-main text-white shadow-md shadow-main/20"
                            : "bg-slate-50 text-slate-700 hover:bg-main/10 hover:text-main"
                        }`}
                      >
                        <DIcon size={18} />
                        <span className="truncate">{isRTL ? d.nameAr : d.nameEn}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Contact / CTA Card */}
              <div className="bg-gradient-to-br from-[#1A3351] to-main text-white rounded-3xl p-7 shadow-xl space-y-5">
                <h3 className="text-xl font-extrabold">
                  {isRTL ? "هل ترغب في تصنيع منتجك معنا؟" : "Want to Manufacture With Us?"}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {isRTL
                    ? "تواصل معنا مباشرة لبدء مشروع التصنيع التعاقدي أو طلب استشارة من خبراء المصنع."
                    : "Contact us directly to start your contract manufacturing project with our expert team."}
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-main font-bold text-sm hover:bg-slate-100 transition shadow-md"
                >
                  <Send size={16} />
                  <span>{isRTL ? "تواصل معنا الآن" : "Contact Us Now"}</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Prev / Next Pagination */}
      <section dir={isRTL ? "rtl" : "ltr"} className="border-t border-slate-200 bg-white py-6">
        <Container>
          <div className="flex justify-between items-center">
            {prevDept ? (
              <Link
                href={`/about/departments/${prevDept.id}`}
                className="flex items-center gap-2 text-slate-500 hover:text-main transition-colors group"
              >
                {isRTL ? (
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                )}
                <span className="text-sm font-semibold">
                  {isRTL ? prevDept.nameAr : prevDept.nameEn}
                </span>
              </Link>
            ) : <div />}

            {nextDept ? (
              <Link
                href={`/about/departments/${nextDept.id}`}
                className="flex items-center gap-2 text-slate-500 hover:text-main transition-colors group"
              >
                <span className="text-sm font-semibold">
                  {isRTL ? nextDept.nameAr : nextDept.nameEn}
                </span>
                {isRTL ? (
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            ) : <div />}
          </div>
        </Container>
      </section>
    </main>
  );
}
