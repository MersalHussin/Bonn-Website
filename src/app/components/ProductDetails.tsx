"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaIndustry,
  FaTemperatureLow,
  FaUserShield,
  FaBox,
  FaTools,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// ================= BRAND THEME =================
const BRAND_THEME: Record<
  string,
  { primary: string; soft: string; ring: string }
> = {
  "Covix Care": {
    primary: "#F97316", // برتقالي
    soft: "#FFF4ED",
    ring: "ring-orange-500",
  },

  "Le Visage": {
    primary: "#DC2626", // أحمر
    soft: "#FEF2F2",
    ring: "ring-red-500",
  },

  Bonn: {
    primary: "#2563EB", // أزرق
    soft: "#EFF6FF",
    ring: "ring-blue-500",
  },

  default: {
    primary: "#2563EB",
    soft: "#EFF6FF",
    ring: "ring-blue-500",
  },
};


function FactCard({
  icon,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color?: string;
}) {
  return (
    <div className="bg-white w-full rounded-xl p-4 shadow-sm">
      <div className="mb-2" style={{ color: color || "#2563EB" }}>
        {icon}
      </div>
      <h5 className="text-sm font-semibold mb-1">{title}</h5>
      <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}



// ---- Types ----
type Product = {
  id: string; // client-generated UUID (or DB-generated if you prefer)
  brand: string; // brand name shown in UI
  name_en: string;
  name_ar: string;
  slug: string;
  tagline_en: string;
  tagline_ar: string;
  description_en: string;
  description_ar: string;
  category: string[];
  usage_en: string;
  usage_ar: string;
  compliance: string[];
  images: string[];
  brand_id: string | null;
  seo_title_en: string;
  seo_title_ar: string;
  seo_desc_en: string;
  seo_desc_ar: string;
  best_selling: boolean;
  usage_target_en: string;
  usage_target_ar: string;
instructions_en?: string;
instructions_ar?: string;
ingredients_en?: string[];
ingredients_ar?: string[];
storage_en?: string;
storage_ar?: string;

  featured: boolean;
  new_arrival: boolean;
  disabled: boolean;
};

function getRelatedProducts(
  current: Product,
  allProducts: Product[] = [],
  limit = 4
) {

  return allProducts
    .filter((p) => p.id !== current.id && !p.disabled)
    .map((p) => {
      let score = 0;

      // Category match
const sharedCategories =
  p.category?.filter((c) =>
    current.category?.includes(c)
  ) || [];

score += sharedCategories.length * 3;

      // Usage target
      if (
        p.usage_target_en &&
        p.usage_target_en === current.usage_target_en
      ) {
        score += 3;
      }

      // Usage
      if (p.usage_en === current.usage_en) {
        score += 2;
      }

      // Ingredients
      if (p.ingredients_en && current.ingredients_en) {
        const sharedIngredients = p.ingredients_en.filter((i) =>
          current.ingredients_en!.includes(i)
        );
        score += sharedIngredients.length;
      }

      // Same brand (low weight)
      if (p.brand_id === current.brand_id) {
        score += 1;
      }

      return { ...p, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export default function ProductDetails({
  product,
  allProducts = [],
}: {
  product: Product;
  allProducts?: Product[];
}) {

  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
const theme = BRAND_THEME[product.brand || "default"] || BRAND_THEME.default;


  const images = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];
const relatedProducts = getRelatedProducts(
  product,
  allProducts || []
);


type AccordionId = "instructions" | "ingredients" | "storage" | "";

function Accordion({
  id,
  title,
  children,
}: {
  id: AccordionId;
  title: string;
  children: React.ReactNode;
}) {
    const isOpen = openAccordion === id;
    return (
        <div className="border-b">
            <button
                onClick={() => setOpenAccordion(isOpen ? "" : id)}
                className="w-full py-6 flex justify-between items-center text-lg font-semibold"
            >
                {title}
                <FaChevronDown
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
                
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pb-6 text-gray-600 leading-relaxed"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const t = {
    name: isAr ? product.name_ar : product.name_en,
    tagline: isAr ? product.tagline_ar : product.tagline_en,
    desc: isAr ? product.description_ar : product.description_en,
    usage: isAr ? product.usage_ar : product.usage_en,
    target: isAr ? product.usage_target_ar : product.usage_target_en,
    instructions: isAr ? product.instructions_ar : product.instructions_en,
    ingredients: isAr ? product.ingredients_ar : product.ingredients_en,
    storage: isAr ? product.storage_ar : product.storage_en,
  };

const [openAccordion, setOpenAccordion] = useState<
  "instructions" | "ingredients" | "storage" | ""
>(() => {
  if (product.instructions_en || product.instructions_ar) return "instructions";
  if (product.ingredients_en?.length) return "ingredients";
  if (product.storage_en || product.storage_ar) return "storage";
  return "";
});

  return (
    <main className="bg-[#F8FAFF] py-20" dir={isAr ? "rtl" : "ltr"}>
      {/* ================= HERO ================= */}
<section className="px-4 sm:px-6 lg:px-20 mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
{/* ===== Gallery ===== */}
<div className="w-full">
  <div className="flex flex-col md:flex-row-reverse md:flex-nowrap gap-6 md:gap-8">

    {/* Main Image */}
    <motion.div
      key={active}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        relative
        w-full
        h-[280px] sm:h-[320px] md:h-[520px]
        bg-white
        rounded-[28px] md:rounded-[40px]
        shadow-2xl
        order-1
      "
    >
      <Image
        src={active}
        alt={t.name}
        fill
        priority
        className="object-contain p-4 sm:p-6 md:p-12"
      />
    </motion.div>

    {/* Thumbnails */}
    <div
      className="
        flex flex-row md:flex-col
        gap-3
        order-2
        justify-center md:justify-start
      "
    >
      {images.map((img, idx) => (
        <button
          key={img}
          onClick={() => setActiveIndex(idx)}
          className={`relative w-13 h-24 rounded-xl overflow-hidden transition min-[400px]:w-20
            ${
              idx === activeIndex
                ?  `ring-2 ${idx === activeIndex ? `ring-2 ${theme.ring}` : ""}`
                : "opacity-60 hover:opacity-100 hover:scale-105 hover:ring-1 hover:ring-gray-200"
            }
          `}
        >
          <Image src={img} alt="" fill className="object-cover" />
        </button>
      ))}
    </div>

  </div>
</div>



        {/* ===== Product Info ===== */}
        <div className="space-y-6">
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: theme.primary }}>
  {product.brand}
</span>

<h1 className="text-4xl md:text-5xl font-bold leading-tight">
  {t.name}
</h1>

<p className="text-lg text-gray-500 max-w-prose">
  {t.tagline}
</p>

          
          {product.compliance?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-4">
    {product.compliance.map((c) => (
      <span
        key={c}
className="px-3 py-1 rounded-full text-xs font-medium border"
style={{
  background: theme.soft,
  color: theme.primary,
  borderColor: theme.primary + "33",
}}
      >
        {c}
      </span>
    ))}
  </div>
)}

          {/* Description */}
          <p className="text-gray-700 leading-relaxed max-w-prose">
            {t.desc}
          </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-6">
  {t.usage && (
    <FactCard
      icon={<FaUserShield />}
      title={isAr ? "الاستخدام" : "Usage"}
      text={t.usage}
      color={theme.primary}
    />
  )}

  {t.target && (
    <FactCard
      icon={<FaIndustry />}
      title={isAr ? "الفئة المستهدفة" : "Target"}
      text={t.target}
      color={theme.primary}
    />
  )}

  {t.storage && (
    <FactCard
      icon={<FaTemperatureLow />}
      title={isAr ? "التخزين" : "Storage"}
      text={t.storage}
      color={theme.primary}
    />
  )}
</div>


        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        {t.instructions && (
          <Accordion
            id="instructions"
            title={isAr ? "تعليمات الاستخدام" : "Instructions"}
          >
            <p>{t.instructions}</p>
          </Accordion>
        )}

        {Array.isArray(t.ingredients) && t.ingredients.length > 0 && (
          <Accordion
            id="ingredients"
            title={isAr ? "المكونات" : "Ingredients"}
          >
            <ul className="grid grid-cols-2 gap-3">
              {t.ingredients.map((i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 mt-2 rounded-full" style={{ background: theme.primary }}/>
                  {i}
                </li>
              ))}
            </ul>
          </Accordion>
        )}

        {t.storage && (
          <Accordion id="storage" title={isAr ? "التخزين" : "Storage"}>
            <p>{t.storage}</p>
          </Accordion>
        )}
      </section>
       {/* MANUFACTURING - PREMIUM Timeline Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-gray-900">
            {isAr
              ? "مصنع بواسطة Bonn Medical Industries"
              : "Manufactured by Bonn Medical Industries"}
          </h3>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="flex gap-5 items-start"></div>

            <div className="flex flex-col gap-10">
              {/* Step 1 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                  <FaTools />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "الإنتاج" : "Production"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "تم الإنتاج في منشآت معتمدة وفق معايير GMP."
                      : "Produced under GMP-certified facilities."}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "ضبط الجودة" : "Quality Control"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "ضبط جودة صارم لضمان أعلى معايير المنتج."
                      : "Strict quality control ensures top product standards."}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white text-xl">
                  <FaBox />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "الامتثال والشهادات" : "Compliance & Certifications"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "مواصفات وامتثال لجميع الشهادات المطلوبة."
                      : "Compliance with all required certifications."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 && (
  <section className="max-w-7xl mx-auto px-6 mt-32">
    <h3 className="text-2xl md:text-3xl font-semibold mb-10">
      {isAr ? "منتجات ذات صلة" : "Related Products"}
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {relatedProducts.map((p) => (
        <Link href={`/products/${p.slug}`}
        key={p.id}
>
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
        >
          <div className="relative h-56 bg-gray-50">
 <Image
  src={p.images?.[0] || "/placeholder.png"}
  alt={isAr ? p.name_ar : p.name_en}
  fill
  className="object-contain p-6"
/>

          </div>

          <div className="p-5 space-y-2">
            <span className="text-xs uppercase font-semibold" style={{ color: theme.primary }}>
              {p.brand}
            </span>

            <h4 className="font-semibold leading-snug">
              {isAr ? p.name_ar : p.name_en}
            </h4>

            <p className="text-sm text-gray-500 line-clamp-2">
              {isAr ? p.tagline_ar : p.tagline_en}
            </p>
          </div>
        </motion.div>
        </Link>
      ))}
    </div>
  </section>
)}

    </main>
  );
}
