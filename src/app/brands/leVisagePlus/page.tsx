"use client";

import React, { useMemo, useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";


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
import { mockProducts } from "./products/data";

export default function LeVisagePage() {
  const { i18n } = useTranslation();
  const lang = i18n?.language === "ar" ? "ar" : "en";
  const t = useMemo(() => translations[lang], [lang]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        const fetchPromise = supabase
          .from("levisage_products")
          .select("*")
          .order('created_at', { ascending: false });
          
        const timeoutPromise = new Promise<{ data: any, error: any }>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        );
        
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

        if (mounted && !error && data) {
          setProducts(data);
        } else if (error) {
          console.error("Error fetching products:", error);
        }
      } catch (err) {
        console.error("Fetch timed out or failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    
    return () => {
      mounted = false;
    };
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

    const displayProducts = products.length > 0 ? products : mockProducts;


    displayProducts.forEach((p) => {
      const brand = p.brand || "Le Visage Plus";
      if (!map[brand]) map[brand] = [];
      map[brand].push(p as Product);
    });

    return map;
  }, [products]);


  return (
    <>
      <main dir={t.dir} className="min-h-screen bg-gradient-to-b from-white to-[#fff1f4]">
        <LeVisageHero t={t} lang={lang} />
        
        <LeVisageAbout t={t} lang={lang} />
        
        <LeVisageFeatures t={t} />
        <LeVisageAchievements t={t} />
        
        <LeVisageCategories t={t} />
        
        <LeVisageProducts
          t={t}
          lang={lang}
          isArabic={isArabic}
          grouped={grouped}
          liked={liked}
          toggleLike={toggleLike}
          fadeUp={fadeUp}
        />
        <LeVisageTimeline t={t} />
        
        

        <LeVisageContact t={t} lang={lang} />
      </main>
    </>
  );
}
