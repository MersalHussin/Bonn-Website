"use client";

import React, { useMemo, useState } from "react";
import Head from "next/head";
import { motion , AnimatePresence} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaInstagram } from "react-icons/fa";


import {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Wrench,
  Rocket,
  Calendar,
  Heart,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

/* ================= ICON MAP ================= */

const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  Wrench,
  Rocket,
  Calendar,
  Heart,
};

type Feature = {
  title: string;
  desc: string;
  icon: keyof typeof iconMap;
};

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

/* ================= NUMBER BOX ================= */

type NumberBoxProps = {
  value: string | number;
  label: string;
  delay?: number;
  color?: string;
};

function NumberBox({
  value,
  label,
  delay = 0,
  color = "#d81e46",
}: NumberBoxProps) {
  const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
  const showPlus = String(value).includes("+");
  const [start, setStart] = useState(false);

  return (
    <motion.div
      className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      onViewportEnter={() => setStart(true)}
    >
      <div className="text-3xl font-extrabold" style={{ color }}>
        {start ? <CountUp start={0} end={numeric} duration={2} separator="," /> : 0}
        {showPlus ? "+" : ""}
      </div>
      <div className="text-gray-600 mt-2">{label}</div>
    </motion.div>
  );
}

/* ================= TRANSLATIONS ================= */
const translations = {
  en: {
    dir: "ltr",
    brandName: "Le Visage",
    heroTitle: "Premium Skincare & Beauty Solutions",
    heroSubtitle:
      "Advanced skincare crafted with precision, safety and innovation to enhance natural beauty.",
    heroCta: "Explore Services",

    whoTitle: "Who We Are",
    whoText: `Le Visage is a Saudi brand specializing in advanced facial care serums and creams. We are part of the Bonn Medical Industries ecosystem, operating under a license from Germany's KOLN Naturstoffe. We develop targeted formulations to address real skin concerns - not generic products, but precise solutions for every case. Each serum is crafted with global medical standards, rigorous testing, and full transparency.`,

    featuresTitle: "Why Le Visage",
    features: [
      {
        title: "Global Standards",
        desc: "Manufactured under strict international quality regulations.",
        icon: "Globe",
      },
      {
        title: "Safe Formulas",
        desc: "Dermatologically tested and safe for daily use.",
        icon: "ShieldCheck",
      },
      {
        title: "Advanced Science",
        desc: "Powered by modern cosmetic research and innovation.",
        icon: "Sparkles",
      },
      {
        title: "Premium Quality",
        desc: "High-performance ingredients delivering real results.",
        icon: "Star",
      },
    ],

    categoriesTitle: "Product Lines",
    categories: [
      "Face Care",
      "Body Care",
      "Sensitive Skin",
      "Hair Care",
      "Daily Essentials",
    ],

    numbersTitle: "Our Impact",
    numbers: [
      { value: "150+", label: "Products" },
      { value: "20+", label: "Countries" },
      { value: "1M+", label: "Customers" },
    ],

    timelineTitle: "Product Journey",
    timeline: [
      "Research",
      "Formulation",
      "Testing",
      "Certification",
      "Launch",
    ],

    ctaTitle: "Ready to feel the difference?",
    ctaBtn: "Browse Products",
    partTitle: "Part of BON LE VISAGE PLUS",
    partText:
      "Not a separate brand, but an integral part of BON Medical Industries' LE VISAGE PLUS system.",
    partList: [
      "Internationally accredited with 150 medical infrastructures, modern laboratories, and advanced equipment.",
      "Specialized and experienced team including chemical engineers, dermatology experts, and consulting specialists.",
      "Certified quality and strict medical standards, higher than regular cosmetic products.",
      "More than 30 years of experience from Germany (KOLN Naturstoffe) under trusted scientific partnership and licensing.",
      "Comprehensive documentation for every batch with certificates and test reports.",
      "Continuous support from marketing, customer service, and logistics teams.",
    ],
    whyTitle: "Why Choose LE VISAGE PLUS",
    whyList: [
      "Choose LE VISAGE PLUS when you want a brand with a strong reputation backed by real medical expertise.",
      "Guaranteed quality from an internationally certified manufacturer.",
      "Transparency and reliability unmatched in the market.",
      "Professional support from a specialized and experienced team.",
    ],
    contactTitle: "Why Contact Us?",
    contactSections: [
      {
        heading: "Individual Customers",
        items: [
          "Free consultation to find the right product for your skin",
          "Free samples to try before purchase",
          "Expert advice on proper usage",
          "Loyalty programs and special offers",
        ],
      },
      {
        heading: "Companies, Agents & Distributors",
        items: [
          "Pricing details and profit margins",
          "Marketing support and product training",
          "Long-term partnership programs",
        ],
      },
      {
        heading: "Pharmacists & Dermatologists",
        items: [
          "Logistics support and commercial consulting",
          "Detailed ingredient and benefits information",
          "Specialized support for patient recommendations",
          "Professional samples",
        ],
      },
      {
        heading: "Beauty Centers & Spas",
        items: [
          "Professional use supply",
          "Team training support",
          "Special wholesale offers",
          "Strategic partnership programs",
        ],
      },
    ],
    contactForm: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send Message",
      placeholder: {
        name: "Enter your full name",
        email: "example@email.com",
        phone: "+96000000000",
        message: "Write your message here...",
      },
    }
  },

  ar: {
    dir: "rtl",
    brandName: "لو فيزاج بلس",
    heroTitle: "حلول متقدمة للعناية بالبشرة والجمال",
    heroSubtitle:
      "منتجات عناية متطورة تجمع بين الأمان والابتكار لتعزيز الجمال الطبيعي.",

    heroCta: "استكشف الخدمات",

    whoTitle: "من نحن",
    whoText: `
لو فيزاج بلس هي علامة تجارية سعودية متخصصة في تصنيع سيرومات وكريمات العناية المتقدمة بالوجه نحن جزء من منظومة مصنع بون للصناعات الطبية، وتعمل تحت ترخيص . من ألمانيا KOLN Naturstoffe متخصصون في تطوير تركيبات محددة لحل مشاكل البشرة الفعلية لا منتجات عامة، بل حلول دقيقة لكل حالة كل سيرم مصنوع بمعايير طبية عالمية، مع اختبارات صارمة وشفافية كاملة.`,

    featuresTitle: "لماذا لو فيزاج بلس",
    features: [
      {
        title: "معايير عالمية",
        desc: "تصنيع وفق أعلى معايير الجودة العالمية.",
        icon: "Globe",
      },
      {
        title: "تركيبات آمنة",
        desc: "مختبرة جلدياً وآمنة للاستخدام اليومي.",
        icon: "ShieldCheck",
      },
      {
        title: "تقنيات متقدمة",
        desc: "تعتمد على أحدث أبحاث التجميل.",
        icon: "Sparkles",
      },
      {
        title: "جودة فاخرة",
        desc: "مكونات عالية الأداء بنتائج حقيقية.",
        icon: "Star",
      },
    ],

    categoriesTitle: "خطوط المنتجات",
    categories: [
      "العناية بالوجه",
      "العناية بالجسم",
      "البشرة الحساسة",
      "العناية بالشعر",
      "العناية اليومية",
    ],

    numbersTitle: "إنجازاتنا",
    numbers: [
      { value: "150+", label: "منتج" },
      { value: "20+", label: "دولة" },
      { value: "1M+", label: "عميل" },
    ],

    timelineTitle: "رحلة المنتج",
    timeline: [
      "البحث",
      "التركيب",
      "الاختبار",
      "الاعتماد",
      "الإطلاق",
    ],

    ctaTitle: "جاهز لتجربة الفرق؟",
    ctaBtn: "تصفح المنتجات",
        partTitle: "ضمن منظومة بون LE VISAGE PLUS",
    partText:
      "ليست علامة منفصلة، بل جزء متكامل من مصنع بون للصناعات الطبية LE VISAGE PLUS.",
    partList: [
      "معتمدة دولياً مع 150 بنية تحتية طبية عالمية، معامل حديثة، معدات متقدمة.",
      "فريق متخصص ومتمرس يشمل مهندسون كيميائيون، خبراء جلديين واستشاريون متخصصون.",
      "جودة معتمدة ومعايير طبية صارمة أعلى من معايير المستحضرات العادية.",
      "أكثر من 30 سنة خبرة من ألمانيا (KOLN Naturstoffe) تحت شراكة علمية موثوقة وترخيص.",
      "توثيق شامل لكل دفعة مع شهادات وتقارير اختبارات.",
      "دعم مستمر من فرق التسويق، خدمة العملاء والدعم اللوجستي.",
    ],
    whyTitle: "النتيجة",
    whyList: [
      "تختارون LE VISAGE PLUS عندما تريدون علامة تجارية بسمعة قوية مدعومة بخبرة طبية حقيقية.",
      "جودة مضمونة من مصنع معتمد دولياً.",
      "شفافية وموثوقية لا تجد مثلها في السوق.",
      "دعم احترافي من فريق متخصص وذو خبرة.",
    ],
    contactTitle: "لماذا التواصل معنا؟",
    contactSections: [
      {
        heading: "للعملاء الأفراد",
        items: [
          "استشارة مجانية حول منتج مناسب لبشرتك",
          "عينات مجانية للتجربة قبل الشراء",
          "نصائح متخصصة حول كيفية الاستخدام الصحيح",
          "برامج ولاء وعروض خاصة",
        ],
      },
      {
        heading: "للشركات والوكلاء والموزعين",
        items: [
          "تفاصيل التسعير والهوامش الربحية",
          "دعم تسويقي وتدريب منتجات",
          "برامج شراكة طويلة المدى",
        ],
      },
      {
        heading: "للصيادلة والأطباء الجلديين",
        items: [
          "دعم لوجستي واستشارات تجارية",
          "معلومات تفصيلية عن المكونات والفوائد",
          "دعم متخصص للتوصية للمرضى",
          "عينات احترافية",
        ],
      },
      {
        heading: "للمراكز الجمالية والسيا",
        items: [
          "توريد للاستخدام الاحترافي",
          "دعم لتدريب الفريق",
          "عروض جملة خاصة",
          "برامج شراكة استراتيجية",
        ],
      },
    ],
    contactForm: {
      title: "تواصل معنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      placeholder: {
        name: "اكتب اسمك الكامل",
        email: "example@email.com",
        phone: "+96600000000",
        message: "اكتب رسالتك هنا...",
      },
    }
  },
};

export default function LeVisagePage() {
  const { i18n } = useTranslation();
  const lang = i18n?.language === "ar" ? "ar" : "en";
  const t = useMemo(() => translations[lang], [lang]);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3500);
  };


  const RED = "#d81e46";
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

  /* ================= HELPERS ================= */

const isArabic = lang === "ar";

/* ===== Like System ===== */

const [liked, setLiked] = useState<Record<string, boolean>>({});

const toggleLike = (product: Product) => {
  setLiked((prev) => ({
    ...prev,
    [product.id]: !prev[product.id],
  }));

  // optional: update DB later
};

/* ===== Group Products By Brand ===== */

const grouped = useMemo(() => {
  const map: Record<string, Product[]> = {};

  products.forEach((p) => {
    const brand = p.brand || "Other";
    if (!map[brand]) map[brand] = [];
    map[brand].push(p);
  });

  return map;
}, [products]);


  return (
    <>
      <Head>
        <title>{t.brandName}</title>
        <meta name="description" content={t.heroSubtitle} />
      </Head>

      <main dir={t.dir} className="min-h-screen bg-gradient-to-b from-white to-[#fff1f4]">

        {/* HERO */}
        <section
          className="relative overflow-hidden bg-cover bg-center mt-10"
          style={{ backgroundImage: "url('/images/visageProducts.png')" }}
        >
          <div className="absolute inset-0 bg-black/45 z-10" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-30 text-white">
                          <div className="inline-flex items-center gap-3 mb-4">
                <div style={{ background: RED }} className="w-3 h-3 rounded-full" />
                <span className="text-sm font-semibold text-white">{t.brandName}</span>
              </div>
            <motion.h1 {...fadeUp} className="text-4xl md:text-5xl font-extrabold mb-4">
              {t.heroTitle}
            </motion.h1>

            <motion.p {...fadeUp} className="max-w-2xl mb-6 opacity-90">
              {t.heroSubtitle}
            </motion.p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg hover:scale-[1.03] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              {t.heroCta}
              {lang === "ar" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
          </div>
        </section>

        {/* WHO */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4 text-[#d81e46]">{t.whoTitle}</h2>
            <p className="text-gray-700 text-lg whitespace-pre-line">{t.whoText}</p>
          </div>
        </section>

         {/* FEATURES / VALUES */}
         <section className="py-12" style={{ background: "#fff" }}>
           <div className="max-w-7xl mx-auto px-6">
             <h2 className="text-3xl font-bold mb-12">{t.featuresTitle}</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {t.features.map((f: Feature, i: number) => {
  const Icon = iconMap[f.icon] || Globe;
                 return (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
                   >
                     <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-xl" style={{ background: `${RED}20` }}>
                            <Icon size={26} className="text-[#d81e46] mb-3" />
                     </div>
                     <h3 className="font-semibold mb-2">{f.title}</h3>
                     <p className="text-gray-600">{f.desc}</p>
                   </motion.div>
                 );
               })}
             </div>
           </div>
         </section>


        {/* CATEGORIES */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-bold mb-6 text-center">{t.categoriesTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {t.categories.map((c: string, i: number) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl text-center shadow"
                >
                  <Layers className="mx-auto mb-3 text-[#d81e46]" />
                  <div className="font-medium">{c}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-6">{t.numbersTitle}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.numbers.map((n, i: number) => (
                <NumberBox key={i} value={n.value} label={n.label} delay={i * 0.12} color={RED} />
              ))}
            </div>
          </div>
        </section>

{/* TIMELINE */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-12">{t.timelineTitle}</h2>
    <div className="relative md:flex md:items-center md:gap-12">
      {/* Vertical line for mobile */}
      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-100 md:hidden transform -translate-x-1/2"></div>
      {/* Horizontal line for desktop */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200"></div>
      {t.timeline.map((step: string, i: number) => {
        const icons = [Globe, Wrench, Rocket, CheckCircle, Calendar];
        const Icon = icons[i] || Globe;

        return (
          <motion.div
            key={i}
            className="relative z-10 mb-12 md:mb-0 md:flex-1 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            {/* ELEMENTS (centered on mobile) */}
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-white shadow mb-4">
                <Icon size={28} color={RED} />
              </div>
              {/* Title/text */}
              <span className="font-semibold">{step}</span>
            </div>

          </motion.div>
        );
      })}
    </div>
  </div>
</section>

{/* PRODUCTS CTA + GRID */}
<section className="py-20 bg-gradient-to-b from-white to-[#d81e4610]">
  <div className="max-w-7xl mx-auto px-6 text-center space-y-12">

    {/* Main CTA */}
    <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-[#d81e46]">
      {t.ctaTitle} {/* "Ready to feel the difference?" */}
    </motion.h2>

    {/* Subtitle for products */}
    <motion.p {...fadeUp} className="text-xl md:text-2xl font-semibold text-gray-800">
      {lang === "ar" ? "منتجات لي فيساج" : "Le Visage Products"}
    </motion.p>

    {/* PRODUCTS CAROUSEL */}
    {Object.entries(grouped).map(([brandName, items]) => {
      const brandUI = BRAND_UI[brandName];
      const primary = brandUI?.primary || "#0056D2";

      return (
        <div key={brandName} className="space-y-8">
          {/* Products */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="
              flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory
              scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {items.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -5 }}
                className="
                  snap-start shrink-0 w-[250px] sm:w-[270px]
                  rounded-2xl overflow-hidden bg-white/80 backdrop-blur
                  border border-gray-100 shadow-md hover:shadow-lg
                  transition
                "
              >
                <Link href={`/products/${p.slug}`} className="block">
                  <Image
                    src={p.images?.[0] || "/placeholder.png"}
                    alt={isArabic ? p.name_ar : p.name_en}
                    width={400}
                    height={260}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-base leading-tight" style={{ color: primary }}>
                      {isArabic ? p.name_ar : p.name_en}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {isArabic ? p.description_ar : p.description_en}
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
                        className={`flex items-center gap-1 transition ${liked[p.id] ? "text-red-600" : "text-gray-400"}`}
                      >
                        <Heart
                          size={20}
                          className={`transition ${liked[p.id] ? "fill-red-600 scale-110" : "hover:scale-110"}`}
                        />
                        <span className="text-xs">{p.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
</section>

{/* PART OF BON */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold mb-12 text-[#E11D48]">{t.partTitle}</h2>
    <p className="text-gray-700 mb-10 leading-relaxed">{t.partText}</p>

    <div className="grid md:grid-cols-2 gap-6">
      {t.partList.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(232, 29, 72, 0.2)" }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-4 p-6 bg-[#FFF0F4] rounded-2xl border-l-4 border-[#E11D48]"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E11D48] text-white font-bold">{i + 1}</div>
          <p className="text-gray-700">{item}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* WHY CHOOSE */}
<section className="py-24 bg-[#FFF5F7]">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold mb-12 text-[#E11D48]">{t.whyTitle}</h2>

    <div className="grid md:grid-cols-2 gap-8">
      {t.whyList.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-gray-100"
        >
          <div className="absolute -top-6 left-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#E11D48] to-[#FF4B7D] text-white font-bold text-lg">
            {i + 1}
          </div>
          <p className="mt-6 text-gray-700">{item}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* WHY CONTACT */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* LEFT — CONTACT INFO */}
        <div className="space-y-7">
          <h2 className="text-3xl font-bold text-[#E11D48]">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {isArabic
              ? "فريق لو فيزاج جاهز للرد على استفساراتكم وتقديم الدعم. يمكنكم التواصل عبر القنوات التالية."
              : "Our Le Visage team is ready to assist and answer your inquiries through the following channels."}
          </p>

          <div className="space-y-5">

            <div className="flex gap-4">
              <FaEnvelope className="text-[#E11D48] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </div>
                <a
                  href="mailto:CustomerRelation@bonnmed.com"
                  className="text-gray-600 hover:text-[#f36f1a]"
                >
                  Relation@bonnmed.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaPhone className="text-[#E11D48] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "رقم الهاتف" : "Phone Number"}
                </div>
                <a
                  href="tel:+966580347173"
                  className="text-gray-600 hover:text-[#E11D48]"
                  dir="ltr"
                >
                  +966 58 034 7173
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaClock className="text-[#E11D48] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "ساعات العمل" : "Working Hours"}
                </div>
                <div className="text-gray-600">
                  {isArabic
                    ? "من الأحد إلى الخميس: 9 صباحًا - 5 مساءً"
                    : "Sun - Thu: 9am - 5pm"}
                </div>
              </div>
            </div>
          </div>
        </div>
    {/* CONTACT FORM */}
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#FFE6EC] rounded-3xl shadow-lg p-12 flex flex-col items-center justify-center text-center h-full"
          >
            <FaCheckCircle className="text-[#E11D48] text-6xl mb-6 animate-bounce" />
            <h3 className="text-2xl font-semibold mb-3">{isArabic ? "تم إرسال الرسالة بنجاح" : "Message Sent Successfully"}</h3>
            <p className="text-gray-600 text-base">{isArabic ? "سيتواصل معك فريقنا في أقرب وقت." : "Our team will get back to you shortly."}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl p-10 space-y-5"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contactForm.placeholder.name}
              required
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#E11D48] outline-none transition"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contactForm.placeholder.email}
              required
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#E11D48] outline-none transition"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.contactForm.placeholder.phone}
              required
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#E11D48] outline-none transition"
            />
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contactForm.placeholder.message}
              required
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 resize-none focus:ring-2 focus:ring-[#E11D48] outline-none transition"
            />
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#FF4B7D] text-white font-semibold text-lg hover:opacity-90 transition"
            >
              {t.contactForm.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  </div>
</section>


      </main>
    </>
  );
}
