"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
  Heart,
} from "lucide-react";

/* ================= TYPES ================= */
type Product = {
  id: string;
  slug: string | null;
  images: string[];
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  brand: string | null;
  best_selling: boolean;
  likes: number | null;
  disabled: boolean | null;
};

/* ================= BRAND UI (LOCAL) ================= */
const BRAND_UI: Record<
  string,
  {
    primary: string;
    gradient: string;
    glow: string;
    badge: string;
    logo?: string;
  }
> = {
  "Covix Care": {
    primary: "#F97316", 
    gradient: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/30",
    badge: "bg-orange-500",
    logo: "/images/covix.png",
  },

  "Le Visage Plus": {
    primary: "#E11D48",
    gradient: "from-pink-600 to-rose-400",
    glow: "shadow-pink-500/30",
    badge: "bg-pink-600",
    logo: "/images/Visage.png",
  },
};


  const images = [
    "/gallery/lab.jpg",
    "/gallery/production.jpg",
    "/gallery/packaging.jpg",
    "/gallery/quality.jpg",
  ];

/* ================= SERVICES ================= */
const services = [
  { key: "ideation", icon: Brain },
  { key: "formulation", icon: FlaskConical },
  { key: "ready", icon: PackageCheck },
  { key: "packaging", icon: Palette },
  { key: "production", icon: Factory },
  { key: "registration", icon: FileCheck2 },
];

export default function ServicesAndProducts() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [products, setProducts] = useState<Product[]>([]);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  /* ================= FETCH ================= */
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
      .from("products")
      .select("*")
        .or("disabled.is.null,disabled.eq.false");

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data || []);
    };

    load();
  }, []);

  /* ================= GROUP + SORT ================= */
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};

    products.forEach((p) => {
      const key = p.brand?.trim() || "Other";
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });

    Object.values(map).forEach((list) =>
      list.sort((a, b) => {
        if (a.best_selling && !b.best_selling) return -1;
        if (!a.best_selling && b.best_selling) return 1;
        return (b.likes || 0) - (a.likes || 0);
      })
    );

    return map;
  }, [products]);

  /* ================= LIKE TOGGLE ================= */
  const toggleLike = async (p: Product) => {
    const isLiked = liked[p.id];
    const newLikes = (p.likes || 0) + (isLiked ? -1 : 1);

    setLiked((prev) => ({ ...prev, [p.id]: !isLiked }));
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, likes: newLikes } : x))
    );

    await supabase.from("products").update({ likes: newLikes }).eq("id", p.id);
  };

  return (
    <main>
      {/* ================= HERO / SERVICES ================= */}
      <section className="py-32 bg-gradient-to-br from-[#032e6a] via-[#0046b0] to-[#00265a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6 max-[468px]:text-5xl ">{t("services.title")}</h1>
          <p className="text-white/70 max-w-2xl mb-20">
            {t("services.subtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -8 }}
                className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur"
              >
                <Icon className="w-12 h-12 mb-6 text-white" />
                <h3 className="text-xl font-semibold mb-2">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-sm text-white/70">
                  {t(`services.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= PRODUCTS ================= */}
      <section className="py-32 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {Object.entries(grouped).map(([brandName, items]) => {
            const brandUI = BRAND_UI[brandName];
            const primary = brandUI?.primary || "#0056D2";

            return (
              <div key={brandName} className="space-y-8 w-7xl">
                {/* BRAND HEADER */}
                <div className="flex items-center gap-4 mb-12">
                  {brandUI?.logo && (
                    <Image
                      src={brandUI.logo}
                      alt={brandName}
                      width={52}
                      height={52}
                    />
                  )}
<h2 className="text-4xl font-bold" style={{ color: primary }}>
  {brandName}
</h2>

                </div>

                {/* PRODUCTS */}
<div
  dir={isArabic ? "rtl" : "ltr"}
  className="
    flex gap-6
    overflow-x-auto pb-8
    snap-x snap-mandatory
    scroll-smooth
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
>

                  {items.map((p) => {
                    return (
                     <motion.div
  key={p.id}
  whileHover={{ y: -10 }}
className={`
  snap-start shrink-0
  w-[260px] sm:w-[280px]
  bg-white rounded-3xl overflow-hidden
  shadow-xl transition
  hover:shadow-2xl
  ${brandUI?.glow || ""}
`}

>

                        <Link href={`/products/${p.slug}`} className="block">
                          <Image
                            src={p.images?.[0] || "/placeholder.png"}
                            alt={isArabic ? p.name_ar : p.name_en}
                            width={400}
                            height={260}
                            className="h-52 w-full object-cover"
                          />

                          <div className="p-6 space-y-3">
<h3
  className="font-semibold text-lg"
  style={{ color: primary }}
>
                              {isArabic ? p.name_ar : p.name_en}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                              {isArabic
                                ? p.description_ar
                                : p.description_en}
                            </p>

                            <div className="flex items-center justify-between pt-4">
                              {p.best_selling && (
                                <span className="text-xs px-2 py-1 rounded bg-red-600 text-white">
                                  Best Seller
                                </span>
                              )}

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleLike(p);
                                }}
                                className={`flex items-center gap-1 transition ${
                                  liked[p.id]
                                    ? "text-red-600"
                                    : "text-gray-400"
                                }`}
                              >
<Heart
  size={20}
  className={`transition ${
    liked[p.id]
      ? "fill-red-600 scale-110"
      : "hover:scale-110"
  }`}
/>

                                <span className="text-xs">
                                  {p.likes || 0}
                                </span>
                              </button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ================= GALLERY ================= */}
<section className="relative py-28 bg-[#F6F9FF] overflow-hidden">

      {/* subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#E2E8FF_0%,transparent_55%)] -z-10" />

      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* ===== Header ===== */}
        <div className="max-w-3xl">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-[#003A8C]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("gallery.title") || "Our Manufacturing Process"}
          </motion.h2>

          <motion.div
            className="mt-5 w-28 h-[3px] bg-gradient-to-r from-[#0056D2] to-[#7BA7FF] rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
          />

          <motion.p
            className="mt-8 text-lg text-[#4B4B4B]/80 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("gallery.subtitle") ||
              "A closer look at our facilities, processes, and production standards."}
          </motion.p>
        </div>

        {/* ===== Images Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative h-[260px] rounded-2xl overflow-hidden shadow-lg bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Image src={img} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          ))}
        </div>

        {/* ===== Videos ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Video 1 */}
          <motion.div
            className="relative rounded-xl overflow-hidden border border-[#0056D2]/20 bg-white"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#0056D2]/10 mix-blend-multiply z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1761160485/whiteboard_final_v_1_nujzk5.webm"
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="relative rounded-xl overflow-hidden border border-[#0056D2]/20 bg-white"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#0056D2]/10 mix-blend-multiply z-10 pointer-events-none" />
            <video
              src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1770045989/finesh_1_1_1_owz1uo.webm"
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
    </main>
  );
}
