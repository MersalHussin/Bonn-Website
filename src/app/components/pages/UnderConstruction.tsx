"use client";

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

export default function UnderConstruction() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="relative w-48 h-48 mb-8">
        <Image 
          src="/images/Logo.svg" 
          alt="Bonn Medical" 
          fill 
          className="object-contain opacity-50 grayscale"
        />
        <div className="absolute inset-0 border-4 border-dashed border-slate-300 rounded-full animate-spin-slow"></div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        {isEn ? "Under Construction" : "قيد التطوير"}
      </h1>
      
      <p className="text-lg text-slate-500 mb-8 max-w-md">
        {isEn 
          ? "We are currently working hard to bring you this page. Please check back later!" 
          : "نحن نعمل بجد حالياً لإعداد هذه الصفحة. يرجى التحقق مرة أخرى قريباً!"}
      </p>

      <Link 
        href="/" 
        className="px-8 py-3 bg-main text-white font-bold rounded-xl hover:bg-main-hover transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        {isEn ? "Back to Home" : "العودة للرئيسية"}
      </Link>
    </div>
  );
}
