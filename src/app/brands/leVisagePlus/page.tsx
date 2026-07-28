"use client";

import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";

import LeVisageHeader from "../../components/leVisage/LeVisageHeader";
import LeVisageFooter from "../../components/leVisage/LeVisageFooter";

// Data and Types
import { translations } from "./translations";
import { Product } from "./types";

// Extracted Sections
import LeVisageHero from "../../components/leVisage/LeVisageHero";
import LeVisageAbout from "../../components/leVisage/LeVisageAbout";
import LeVisageFeatures from "../../components/leVisage/LeVisageFeatures";
import LeVisageCategories from "../../components/leVisage/LeVisageCategories";
import LeVisageAchievements from "../../components/leVisage/LeVisageAchievements";
import LeVisageTimeline from "../../components/leVisage/LeVisageTimeline";
import LeVisageProducts from "../../components/leVisage/LeVisageProducts";
import LeVisageContact from "../../components/leVisage/LeVisageContact";

export default function LeVisagePage() {
  const { i18n } = useTranslation();
  const lang = i18n?.language === "ar" ? "ar" : "en";
  const t = useMemo(() => translations[lang], [lang]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("brand", "%le visage%");

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  const isArabic = lang === "ar";

  /* ===== Like System ===== */
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (product: Product) => {
    setLiked((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

  /* ===== Group Products By Brand ===== */
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};

    const displayProducts = products.length > 0 ? products : [
      {
        id: "mock1", slug: "mock1", images: ["/images/visageProducts.png"],
        name_en: "Vitamin C Serum", name_ar: "سيروم فيتامين سي",
        description_en: "Advanced glowing serum", description_ar: "سيروم النضارة المتقدم",
        brand: "Le Visage Plus", best_selling: true, likes: 120, disabled: false
      },
      {
        id: "mock2", slug: "mock2", images: ["/images/visageProducts.png"],
        name_en: "Hyaluronic Acid", name_ar: "حمض الهيالورونيك",
        description_en: "Deep hydration and plumping", description_ar: "ترطيب عميق وامتلاء",
        brand: "Le Visage Plus", best_selling: false, likes: 85, disabled: false
      },
      {
        id: "mock3", slug: "mock3", images: ["/images/visageProducts.png"],
        name_en: "Retinol Cream", name_ar: "كريم الريتينول",
        description_en: "Anti-aging night cream", description_ar: "كريم ليلي مضاد للتجاعيد",
        brand: "Le Visage Plus", best_selling: true, likes: 230, disabled: false
      },
      {
        id: "mock4", slug: "mock4", images: ["/images/visageProducts.png"],
        name_en: "Niacinamide 10%", name_ar: "نياسيناميد ١٠٪",
        description_en: "Pore minimizing formula", description_ar: "تركيبة تصغير المسام",
        brand: "Le Visage Plus", best_selling: false, likes: 95, disabled: false
      }
    ];

    displayProducts.forEach((p) => {
      const brand = p.brand || "Other";
      if (!map[brand]) map[brand] = [];
      map[brand].push(p as Product);
    });

    return map;
  }, [products]);


  return (
    <>
      <Head>
        <title>{t.brandName}</title>
        <meta name="description" content={t.heroSubtitle} />
      </Head>

      <LeVisageHeader />

      <main dir={t.dir} className="min-h-screen bg-gradient-to-b from-white to-[#fff1f4]">
        <LeVisageHero t={t} lang={lang} />
        
        <LeVisageAbout t={t} lang={lang} />
        
        <LeVisageFeatures t={t} />
        
        <LeVisageCategories t={t} />
        
        <LeVisageAchievements t={t} />
        
        <LeVisageTimeline t={t} />
        
        <LeVisageProducts
          t={t}
          lang={lang}
          isArabic={isArabic}
          grouped={grouped}
          liked={liked}
          toggleLike={toggleLike}
          fadeUp={fadeUp}
        />

        {/* <LeVisageContact t={t} lang={lang} /> */}
      </main>
      
      <LeVisageFooter />
    </>
  );
}
