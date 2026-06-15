"use client";

import React, { useMemo } from "react";
import Head from "next/head";
import { motion , AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
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
  Microscope,
  FlaskConical,
  BadgeCheck
} from "lucide-react";
import CountUp from "react-countup";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaInstagram,
} from "react-icons/fa";



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

type NumberBoxProps = {
  value: string | number;
  label: string;
  delay?: number;
  color?: string;
};

function NumberBox({ value, label, delay, color }: NumberBoxProps) {
  const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
  const showPlus = String(value).includes("+");

  const [start, setStart] = React.useState(false);

  return (
    <motion.div
      className="p-8 rounded-xl bg-white shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setStart(true)}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      <div className="text-3xl font-extrabold" style={{ color }}>
        {start ? (
          <CountUp start={0} end={numeric} duration={2} separator="," />
        ) : (
          0
        )}
        {showPlus ? "+" : ""}
      </div>

      <div className="text-gray-600 mt-2">{label}</div>
    </motion.div>
  );
}

const ORANGE = "#F68A28";

const translations = {
  ar: {
    lang: "ar",
    dir: "rtl",
    brandName: "كوفيكس كير",
    heroTitle: "العلامة التجارية كوفيكس كير",
    heroSubtitle:
      "حلول عناية شخصية علمية وفعالة للمرأة العربية",
    heroCta: "استكشف منتجاتنا",
    whoTitle: "من نحن",
    whoText: `كوفيكس كير علامة تجميل سعودية فخورة بجذورها تعيد تعريف العناية الشخصية من خلال فن التركيبة المتوازنة حيث تلتقي قوة البحث العلمي مع لطف المكونات الطبيعية في كل منتج.

وجودنا موجه لكل امرأة ترفض فكرة التنازل تريد نتائج واضحة بدون مجازفة بسلامة بشرتها، تقدر الشفافية، وتستحق عناية تحترم احتياجات بشرتها الحقيقية.

تتموضع كوفيكس كير كعلامة عناية بريميوم في المتناول: متخصصة في حلول شاملة للعناية بالبشرة والجسم، والشعر، والمنطقة الحميمة مصممة لتلائم مناخ المنطقة وأسلوب حياة المرأة في الخليج والعالم العربي.`,
    featuresTitle: "قيمنا",
    features: [
      {
        title: "الأمان أولاً",
        desc: "تلتزم تركيباتنا بمراحل اختبار دقيقة، مع مكونات طبيعية آمنة للاستخدام اليومي.",
        icon: ShieldCheck,
      },
      {
        title: "جودة بلا مساومة",
        desc: "معايير تصنيع عالمية، ومكونات عالية الجودة، بدون أي اختصارات.",
        icon: Star,
      },
      {
        title: "نتائج حقيقية",
        desc: "تحسن ملموس في البشرة، ترطيب متوازن وراحة حقيقية في الاستخدام.",
        icon: CheckCircle,
      },
      {
        title: "دقة في كل تفصيلة",
        desc: "خطوط متخصصة حسب نوع البشرة لضمان فعالية العناية.",
        icon: Layers,
      },
    ],
    categoriesTitle: "محفظة منتجاتنا",
    categories: [
      "عناية الوجه",
      "عناية الجسم",
      "العناية الحميمة",
      "عناية البشرة الحساسة",
      "عناية الشعر",
    ],
    numbersTitle: "بالأرقام",
    numbers: [
      { label: "عملاء مخدومين", value: "650+" },
      { label: "عبوات مُنتَجة", value: "≈ 4,000,000" },
      { label: "أسواق", value: "6+" },
    ],
    timelineTitle: "مسار تطوير المنتجات",
    timelineSteps: [
      "اختيار المكونات",
      "التوازن والتركيب",
      "الاختبار",
      "الاعتماد",
      "الإطلاق",
    ],
    contact: {
      title: "تواصل معنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "الرسالة",
      namePlaceholder: "اكتب اسمك الكامل",
      emailPlaceholder: "example@email.com",
      phonePlaceholder: "+96000000000",
      messagePlaceholder: "اكتب رسالتك هنا...",
      submit: "إرسال",
    },
    ctaTitle: "جاهز لتجربة الفرق؟",
    ctaBtn: "تصفح المنتجات",
  },

  en: {
    lang: "en",
    dir: "ltr",
    brandName: "Covix Care",
    heroTitle: "Covix Care Brand",
    heroSubtitle:
      "Science-led, effective personal care solutions for Arab women",
    heroCta: "Discover our products",
    whoTitle: "Who we are",
    whoText: `Covix Care is a proudly Saudi beauty brand combining science and nature to deliver effective, safe personal care.

Our presence is aimed at every woman who refuses compromise, seeks visible results without risking her skin, values transparency, and deserves care respecting her real skin needs.

Covix Care positions itself as a premium yet accessible brand: specializing in comprehensive care for skin, body, hair, and intimate areas tailored to Gulf and Arab climates and lifestyle.`,
    featuresTitle: "Our Values",
    features: [
      {
        title: "Safety First",
        desc: "Formulas undergo precise testing with natural ingredients safe for daily use.",
        icon: ShieldCheck,
      },
      {
        title: "Uncompromising Quality",
        desc: "Manufactured to international standards with premium ingredients.",
        icon: Star,
      },
      {
        title: "Real Results",
        desc: "Visible improvements, balanced hydration, and true comfort.",
        icon: CheckCircle,
      },
      {
        title: "Attention to Detail",
        desc: "Specialized lines per skin type to ensure effective care.",
        icon: Layers,
      },
    ],
    categoriesTitle: "Our Product Range",
    categories: [
      "Face Care",
      "Body Care",
      "Intimate Wellness",
      "Sensitive Skin",
      "Hair Care",
    ],
    numbersTitle: "By the numbers",
    numbers: [
      { label: "served customers", value: "650+" },
      { label: "units produced", value: "≈ 4,000,000" },
      { label: "markets", value: "6+" },
    ],
    timelineTitle: "Product Development",
    timelineSteps: [
      "Ingredient selection",
      "Formulation",
      "Testing",
      "Validation",
      "Launch",
    ],
    contact: {
      title: "Contact us",
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      message: "Message",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "example@email.com",
      phonePlaceholder: "+96000000000",
      messagePlaceholder: "Write your message here...",
      submit: "Send",
    },
    contactEmail: "CustomerRelation@bonnmed.com",
    contactPhone: "+966580347173",
    ctaTitle: "Ready to feel the difference?",
    ctaBtn: "Browse Products",
  },
};

export default function CovixCarePage() {  
    const [products, setProducts] = useState<Product[]>([]);
    const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // validation (كل الداتا required)
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.message.trim()
  ) {
    return;
  }

  setSubmitted(true);

  setTimeout(() => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
  }, 3500);
};


  
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
  const { i18n } = useTranslation();
  const lang = i18n && i18n.language === "ar" ? "ar" : "en";
  const t = useMemo(() => translations[lang], [lang]);
  const isArabic = i18n.language === "ar";
  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <>
      <Head>
        <title>{t.brandName} — {t.heroTitle}</title>
        <meta name="description" content={t.heroSubtitle} />
      </Head>

      <main dir={t.dir} className="min-h-screen bg-gradient-to-b from-white to-[#fff7f0] text-[#0b1220] antialiased font-sans">

        {/* HERO */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-cover bg-center mt-10"
          style={{ backgroundImage: "url('/images/covixproducts.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="max-w-7xl mx-auto px-6 py-30 flex flex-col-reverse md:flex-row items-center gap-10 relative z-10">
            <motion.div {...fadeUp} className="flex-1" tabIndex={-1}>
              <div className="inline-flex items-center gap-3 mb-4">
                <div style={{ background: ORANGE }} className="w-3 h-3 rounded-full" />
                <span className="text-sm font-semibold text-white">{t.brandName}</span>
              </div>

              <h1 id="hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
                {t.heroTitle}
              </h1>

              <p className="text-white max-w-2xl mb-6 whitespace-pre-line">{t.heroSubtitle}</p>

              <div className="md:flex items-center gap-4 justify-center md:justify-start space-y-3 md:space-y-0">
                <Link
                  href="/services"
                  aria-label={t.heroCta}
                  className="inline-flex items-center gap-3 bg-gray-100 border border-white hover:text-white text-[#f36f1a] px-6 py-2 rounded-full font-semibold hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-300 w-full justify-center md:justify-start transition-all duration-300 ease-in-out"
                >
                  {t.heroCta}
                  {lang === "ar" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </Link>

                <Link
                  href="/registration"
                  aria-label={lang === "ar" ? "شراكات وتوزيع" : "Partnerships"}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white text-white hover:bg-gray-100 hover:text-[#f36f1a] focus:outline-none focus:ring-2 focus:ring-orange-100 w-full justify-center md:justify-start transition-all duration-300 ease-in-out"
                >
                  <Sparkles size={16} /> {lang === "ar" ? "شراكات وتوزيع" : "Partnerships"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

{/* WHO WE ARE */}
<section
  aria-labelledby="who-title"
  className="relative py-20 bg-white"
>
{/* Background logo → Mobile only */}
<div
  className="absolute inset-0 mt-20 bg-center bg-no-repeat bg-contain opacity-40 md:hidden"
  style={{ backgroundImage: "url('/images/covix.png')" }}
></div>
  <div className="absolute inset-0 bg-white/20 backdrop-blur-xs"></div>

  <div className="relative max-w-7xl mx-auto px-6">
    {/* Logo */}
<div className="flex items-center mb-10 justify-between">
        <motion.h2
      {...fadeUp}
      id="who-title"
      className="text-4xl font-bold mb-4 text-[#f36f1a]"
    >
      {t.whoTitle}
    </motion.h2>
<Image
  src="/images/covix.png"
  alt="Covix Care Logo"
  className="h-18 md:h-19 w-auto object-contain opacity-95 max-[460px]:hidden"
  width="250"
  height="80"
/>

</div>

    <div className="flex flex-col md:flex-row items-center gap-8">
      <motion.p {...fadeUp} className="text-xl text-gray-700 whitespace-pre-line">
        {t.whoText}
      </motion.p>
    </div>
  </div>
</section>

        {/* FEATURES / VALUES */}
        <section className="py-12" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">{t.featuresTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {t.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-xl" style={{ background: `${ORANGE}20` }}>
                      <Icon size={24} color={ORANGE} />
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
        <section aria-labelledby="categories-title" className="py-12 bg-[#fff9f4]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h3 {...fadeUp} id="categories-title" className="text-2xl font-bold mb-6">{t.categoriesTitle}</motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {t.categories.map((c, i) => (
                <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white p-6 rounded-2xl text-center shadow" tabIndex={0}>
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${ORANGE}10` }}>
                    <Layers color={ORANGE} aria-hidden="true" />
                  </div>
                  <div className="font-medium">{c}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

{/* NUMBERS */}
<section aria-labelledby="numbers-title" className="py-12 bg-[#fff9f4]">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.h3 {...fadeUp} id="numbers-title" className="text-2xl font-bold mb-6">
      {t.numbersTitle}
    </motion.h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {t.numbers.map((n, i) => (
        <NumberBox
          key={i}
          value={n.value}
          label={n.label}
          delay={i * 0.12}
          color={ORANGE}
        />
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
      {t.timelineSteps.map((step, i) => {
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
                <Icon size={28} color={ORANGE} />
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
{/* ================= PRODUCT PHILOSOPHY ================= */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2 {...fadeUp} className="text-3xl font-bold mb-10 text-[#f36f1a]">
      {lang === "ar" ? "فلسفة تطوير المنتجات" : "Product Philosophy"}
    </motion.h2>

    <motion.div {...fadeUp} className="bg-gradient-to-r from-orange-50 to-white p-8 rounded-2xl shadow-sm border border-orange-100">
      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
        {lang === "ar"
          ? `التطوير في كوفيكس كير يبدأ دائماً من الاستماع لصوت العميلة. 
نطور تركيبات التفتيح بدمج حماية من الشمس وترطيب متوازن، ونحول مزيلات المكياج إلى صيغ أكثر راحة مثل الفوم مع مكونات مهدئة.

كما توسعنا في خط العناية الحميمة لتغطية احتياجات مختلفة لأن العناية الحقيقية تعني توفير خيارات مدروسة وليس منتجاً واحداً فقط.`
          : `Development at Covix Care always begins with listening to the customer. 
We enhance brightening formulas with sun protection and hydration balance, and transform cleansers into more comfortable formats such as foam enriched with soothing ingredients.

We also expanded intimate care into a full range — because real care means offering thoughtful options, not one generic solution.`}
      </p>
    </motion.div>
  </div>
</section>

{/* PRODUCTS CTA + GRID */}
<section className="py-20 bg-gradient-to-b from-white to-[#fff7f0]">
  <div className="max-w-7xl mx-auto px-6 text-center space-y-12">

    {/* Main CTA */}
    <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-[#f36f1a]">
      {t.ctaTitle} {/* "Ready to feel the difference?" */}
    </motion.h2>

    {/* Subtitle for products */}
    <motion.p {...fadeUp} className="text-xl md:text-2xl font-semibold text-gray-800">
      {lang === "ar" ? "منتجات كوفيكس كير" : "Covix Care Products"}
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
{/* ================= COMPETITIVE ADVANTAGE ================= */}
<section className="py-20 bg-[#fff7f0]">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold mb-12 text-[#f36f1a]">
      {lang === "ar" ? "ما يميز كوفيكس كير" : "Why Covix Care"}
    </motion.h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        {
          icon: ShieldCheck,
          title_ar: "جودة بمعايير دولية",
          title_en: "International Quality",
          desc_ar: "تصنيع وفق ممارسات GMP ومعايير جودة عالمية لضمان ثبات الأداء من أول عبوة حتى آخر واحدة.",
          desc_en: "Manufactured under GMP and international standards ensuring consistent performance.",
        },
        {
          icon: Sparkles,
          title_ar: "مكونات طبيعية آمنة",
          title_en: "Safe Natural Ingredients",
          desc_ar: "مكونات مختارة بعناية خالية من المواد الضارة أو المهيجة مع شفافية كاملة في التركيبة.",
          desc_en: "Carefully selected natural ingredients free from harsh irritants with full transparency.",
        },
        {
          icon: CheckCircle,
          title_ar: "فعالية مدعومة بالعلم",
          title_en: "Science-Backed Effectiveness",
          desc_ar: "كل منتج مبني على دراسات واختبارات حقيقية وليس ادعاءات تسويقية.",
          desc_en: "Every product is built on real testing and research, not marketing claims.",
        },
        {
          icon: Layers,
          title_ar: "تركيبات مخصصة للبشرة",
          title_en: "Skin-Targeted Formulas",
          desc_ar: "خطوط مختلفة لكل نوع بشرة لضمان أفضل نتيجة حقيقية.",
          desc_en: "Specialized lines designed for each skin type for optimal results.",
        },
        {
          icon: Globe,
          title_ar: "تصنيع سعودي بهوية عالمية",
          title_en: "Saudi Manufacturing, Global Mindset",
          desc_ar: "تصنيع محلي بإشراف الجهات التنظيمية مع توافق معايير التصدير.",
          desc_en: "Locally manufactured under strict regulation with export-grade standards.",
        },
        {
          icon: Star,
          title_ar: "قيمة مقابل السعر",
          title_en: "True Value Pricing",
          desc_ar: "موازنة بين جودة التركيبة والسعر لتشعر العميلة بقيمة حقيقية.",
          desc_en: "Balanced pricing ensuring real value without compromising quality.",
        },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group p-7 rounded-2xl bg-white shadow hover:shadow-xl transition border border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-orange-100 group-hover:scale-110 transition">
              <Icon color={ORANGE} />
            </div>

            <h3 className="font-bold mb-2">
              {lang === "ar" ? item.title_ar : item.title_en}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {lang === "ar" ? item.desc_ar : item.desc_en}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

{/* ================= EXPANSION ================= */}
<section className="py-20 bg-[#fff9f4]">
  <div className="max-w-7xl mx-auto px-6">

    <motion.h2 {...fadeUp} className="text-3xl font-bold mb-10 text-[#f36f1a]">
      {lang === "ar" ? "الانتشار والشراكات" : "Expansion & Partnerships"}
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-8">

      <motion.div {...fadeUp} className="p-6 bg-white rounded-2xl shadow border">
        <h3 className="font-bold mb-3">
          {lang === "ar" ? "الأسواق" : "Markets"}
        </h3>
        <p className="text-gray-600">
          {lang === "ar"
            ? "كوفيكس كير حاضرة في السعودية، البحرين، الأردن، عُمان، سوريا، ومصر عبر قنوات توزيع متعددة."
            : "Covix Care is present in Saudi Arabia, Bahrain, Jordan, Oman, Syria, and Egypt through multiple distribution channels."}
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="p-6 bg-white rounded-2xl shadow border">
        <h3 className="font-bold mb-3">
          {lang === "ar" ? "الشراكات الاستراتيجية" : "Strategic Partnerships"}
        </h3>
        <p className="text-gray-600">
          {lang === "ar"
            ? "شراكات مع مؤسسات طبية وسلاسل صيدليات ومتاجر متخصصة لضمان وصول المنتجات ضمن بيئات عالية الجودة."
            : "Partnerships with healthcare institutions and pharmacy chains ensuring premium-grade distribution."}
        </p>
      </motion.div>

    </div>
  </div>
</section>

{/* BON × COVIX MEDICAL SECTION */}
<section className="py-20 bg-white relative overflow-hidden">

  <div className="max-w-7xl mx-auto px-6">

    {/* LOGOS ROW */}
    <motion.div
      {...fadeUp}
      className="flex flex-col items-center justify-center gap-6 mb-10"
    >
      <div className="flex items-center gap-6">

        {/* BONN LOGO */}
        <img
          src="/images/logo.webp"
          className="h-22 object-contain opacity-90"
        />

        {/* Divider */}
        <div className="w-px h-8 bg-gray-300"></div>

        {/* COVIX LOGO */}
        <img
          src="/images/covix.png"
          alt="Covix Care"
          className="h-15 object-contain"
        />

      </div>
    </motion.div>


    {/* TITLE */}
    <motion.div
      {...fadeUp}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#f36f1a] mb-4">
        {lang === "ar"
          ? "كوفيكس كير ضمن منظومة بون الطبية"
          : "Covix Care — Powered by Bonn Medical"}
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {lang === "ar"
          ? "كوفيكس كير تعمل تحت مظلة مصنع بون للصناعات الطبية، حيث تلتقي معايير التصنيع الطبي الدقيقة مع العناية التجميلية الحديثة لتقديم منتجات آمنة، فعالة، وموثوقة."
          : "Covix Care operates under Bonn Medical, combining strict medical-grade manufacturing with modern cosmetic science to deliver safe, effective, and trusted care."}
      </p>
    </motion.div>


    {/* CARDS */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {[
        { icon: ShieldCheck, titleAr: "جودة طبية", titleEn: "Medical-grade Quality", descAr: "معايير تصنيع طبية صارمة لضمان أعلى درجات الأمان.", descEn: "Strict medical manufacturing standards for maximum safety." },
        { icon: FlaskConical, titleAr: "تركيبات علمية", titleEn: "Advanced Formulation", descAr: "تركيبات مبنية على أبحاث علمية حديثة.", descEn: "Formulations based on modern scientific research." },
        { icon: BadgeCheck, titleAr: "رقابة جودة دقيقة", titleEn: "Strict Quality Control", descAr: "كل منتج يمر بمراحل تدقيق وفحص متعددة.", descEn: "Every batch passes through multiple quality checks." },
        { icon: Microscope, titleAr: "جمال علمي", titleEn: "Scientific Beauty", descAr: "عناية تجميلية بعقلية طبية دقيقة.", descEn: "Beauty backed by precise medical science." },
      ].map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#fff7f0] to-white border border-orange-100 hover:shadow-xl transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-4 bg-orange-100">
              <Icon color={ORANGE} />
            </div>

            <h3 className="font-semibold mb-1">
              {lang === "ar" ? card.titleAr : card.titleEn}
            </h3>

            <p className="text-sm text-gray-600">
              {lang === "ar" ? card.descAr : card.descEn}
            </p>
          </motion.div>
        );
      })}
    </div>

  </div>
</section>



        {/* Contact Us */}
<section className="py-20 bg-[#fffaf6]" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* LEFT — CONTACT INFO */}
        <div className="space-y-7">
          <h2 className="text-3xl font-bold text-[#f36f1a]">
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {isArabic
              ? "فريق كوفيكس كير جاهز للرد على استفساراتكم وتقديم الدعم. يمكنكم التواصل عبر القنوات التالية."
              : "Our Covix Care team is ready to assist and answer your inquiries through the following channels."}
          </p>

          <div className="space-y-5">

            <div className="flex gap-4">
              <FaEnvelope className="text-[#f36f1a] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                </div>
                <a
                  href="mailto:CustomerRelation@bonnmed.com"
                  className="text-gray-600 hover:text-[#f36f1a]"
                >
                  CustomerRelation@bonnmed.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaPhone className="text-[#f36f1a] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "رقم الهاتف" : "Phone"}
                </div>
                <a
                  href="tel:+966580347173"
                  className="text-gray-600 hover:text-[#f36f1a]"
                  dir="ltr"
                >
                  +966 58 034 7173
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaInstagram className="text-[#f36f1a] mt-1" />
              <div>
                <div className="font-semibold">
                  {isArabic ? "إنستغرام" : "Instagram"}
                </div>
                <a
                  href="https://www.instagram.com/covix.care"
                  target="_blank"
                  className="text-gray-600 hover:text-[#f36f1a]"
                >
                  @covix.care
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaClock className="text-[#f36f1a] mt-1" />
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

        {/* RIGHT — FORM */}
        <div className="relative">

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center text-center h-full"
              >
                <FaCheckCircle className="text-[#f36f1a] text-5xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {isArabic ? "تم إرسال الرسالة بنجاح" : "Message Sent Successfully"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isArabic
                    ? "سيتواصل معك فريقنا في أقرب وقت."
                    : "Our team will get back to you shortly."}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg p-8 space-y-4"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#f36f1a] outline-none"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#f36f1a] outline-none"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={isArabic ? "رقم الهاتف (اختياري)" : "Phone (Optional)"}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#f36f1a] outline-none"
                />

                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isArabic ? "اكتب رسالتك..." : "Your message..."}
                  required
                  className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#f36f1a] outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#f36f1a] text-white font-semibold hover:opacity-90 transition"
                >
                  {isArabic ? "إرسال الرسالة" : "Send Message"}
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
