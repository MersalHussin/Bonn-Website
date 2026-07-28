import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { Product, BRAND_UI } from "../../brands/leVisagePlus/types";

export default function LeVisageProducts({
  t,
  lang,
  isArabic,
  grouped,
  liked,
  toggleLike,
  fadeUp,
}: {
  t: any;
  lang: string;
  isArabic: boolean;
  grouped: Record<string, Product[]>;
  liked: Record<string, boolean>;
  toggleLike: (p: Product) => void;
  fadeUp: any;
}) {
  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-white to-[#fff1f4]/60 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lv-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lv-main/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            {lang === "ar" ? "منتجات لو فيساج" : "Le Visage Products"}
          </motion.h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full mb-8" />
          <motion.p
            {...fadeUp}
            className="text-xl md:text-2xl font-bold text-lv-main max-w-2xl"
          >
            {t.ctaTitle}
          </motion.p>
        </div>

        {/* PRODUCTS CAROUSEL */}
        {Object.entries(grouped).map(([brandName, items]) => {
          return (
            <div key={brandName} className="space-y-8">
              {/* Products */}
              <div
                dir={isArabic ? "rtl" : "ltr"}
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {items.map((p) => (
                  <motion.div
                    key={p.id}
                    className="group snap-start shrink-0 w-[280px] sm:w-[300px] rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(225,29,72,0.1)] hover:border-lv-main/30 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                  >
                    <Link
                      href={`/products/${p.slug}`}
                      className="block relative overflow-hidden h-[240px]"
                    >
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                      <Image
                        src={p.images?.[0] || "/placeholder.png"}
                        alt={isArabic ? p.name_ar : p.name_en}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      {p.best_selling && (
                        <div className="absolute top-4 rtl:right-4 ltr:left-4 z-20">
                          <span className="text-xs px-3 py-1.5 rounded-full bg-[#FF4B7D] text-white font-bold shadow-md">
                            {isArabic ? "الأكثر مبيعاً" : "Best Seller"}
                          </span>
                        </div>
                      )}
                    </Link>
                    <div className="p-6 bg-white flex-1 flex flex-col">
                      <Link
                        href={`/products/${p.slug}`}
                        className="block space-y-3 mb-6 flex-1"
                      >
                        <h3
                          className="font-extrabold text-xl leading-tight group-hover:text-lv-main transition-colors duration-300 text-gray-900"
                        >
                          {isArabic ? p.name_ar : p.name_en}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                          {isArabic ? p.description_ar : p.description_en}
                        </p>
                      </Link>

                      <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-lv-main font-bold text-sm hover:underline flex items-center gap-1 group/link"
                        >
                          {isArabic ? "التفاصيل" : "Details"}
                          {isArabic ? (
                            <ArrowLeft
                              size={18}
                              className="group-hover/link:-translate-x-1 transition-transform"
                            />
                          ) : (
                            <ArrowRight
                              size={18}
                              className="group-hover/link:translate-x-1 transition-transform"
                            />
                          )}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLike(p);
                          }}
                          className={`flex items-center gap-1.5 transition-colors duration-300 p-2.5 rounded-full bg-gray-50 hover:bg-red-50 ${
                            liked[p.id] ? "text-red-600" : "text-gray-400"
                          }`}
                        >
                          <Heart
                            size={22}
                            className={`transition-all duration-300 ${
                              liked[p.id]
                                ? "fill-red-600 scale-110 drop-shadow-md"
                                : "hover:scale-110"
                            }`}
                          />
                          <span className="text-sm font-semibold">
                            {p.likes || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Products CTA Button */}
        <motion.div {...fadeUp} className="pt-10 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-lv-main text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-lv-main/30 hover:shadow-lv-main/50 hover:-translate-y-1 transition-all"
          >
            {lang === "ar" ? "تصفح جميع المنتجات" : "Explore All Products"}
            {lang === "ar" ? (
              <ArrowLeft size={20} className="stroke-[3px]" />
            ) : (
              <ArrowRight size={20} className="stroke-[3px]" />
            )}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
