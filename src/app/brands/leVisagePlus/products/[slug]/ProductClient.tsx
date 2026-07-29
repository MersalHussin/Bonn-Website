"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../../components/ui/Breadcrumb";

export default function ProductClient({ product }: { product: any }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#F8FAFF] pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb
          homeHref="/brands/leVisagePlus"
          theme="leVisage"
          items={[
            { label: isArabic ? "المنتجات" : "Products", href: "/brands/leVisagePlus#products" },
            { label: isArabic ? product.name_ar : product.name_en },
          ]}
          className="mb-8 !bg-transparent !border-none !px-0"
        />
      </div>

      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden bg-white shadow-xl border border-gray-100">
          <Image 
            src={product.images[0] || "/placeholder.png"} 
            alt={isArabic ? product.name_ar : product.name_en}
            fill
            className="object-cover"
          />
          {product.best_selling && (
            <span className={`absolute top-6 ${isArabic ? 'right-6' : 'left-6'} bg-[#FF4B7D] text-white px-4 py-2 rounded-full font-bold text-sm shadow-md z-20`}>
              {isArabic ? "الأكثر مبيعاً" : "Best Seller"}
            </span>
          )}
        </div>

        <div className="space-y-6 pt-4">
          <div className="text-sm font-bold text-lv-main uppercase tracking-widest">
            {product.category?.join(" • ")}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            {isArabic ? product.name_ar : product.name_en}
          </h1>
          
          {(isArabic ? product.tagline_ar : product.tagline_en) && (
            <h2 className="text-xl text-gray-500 font-medium leading-snug">
              {isArabic ? product.tagline_ar : product.tagline_en}
            </h2>
          )}

          <div className="h-px w-full bg-gray-200 my-6" />

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {isArabic ? product.description_ar : product.description_en}
          </p>

          <div className="space-y-6 pt-4">
            {(isArabic ? product.usage_ar : product.usage_en) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {isArabic ? "طريقة الاستخدام" : "How to Use"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isArabic ? product.usage_ar : product.usage_en}
                </p>
              </div>
            )}

            {(isArabic ? product.ingredients_ar : product.ingredients_en) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {isArabic ? "المكونات الرئيسية" : "Key Ingredients"}
                </h3>
                <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
                  {(isArabic ? product.ingredients_ar : product.ingredients_en).map((ing: string, idx: number) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.volume && (
              <div className="pt-2">
                <span className="font-semibold text-gray-900">
                  {isArabic ? "الحجم: " : "Volume: "}
                </span>
                <span className="text-gray-600">{product.volume}</span>
              </div>
            )}
          </div>

          <div className="pt-8">
            <Link
              href="/brands/leVisagePlus/contact"
              className="inline-flex justify-center items-center gap-3 bg-lv-main text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-lv-main/30 hover:shadow-xl hover:shadow-lv-main/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              {isArabic ? "تواصل معنا" : "Contact us now"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
