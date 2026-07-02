"use client";

import AnimatedBackground from "../components/AnimatedBackground";
import Breadcrumb from "../components/Breadcrumb";
import ContactUs from "../components/Contact";
import Lottie from "lottie-react";
import innovationAnimation from "../../animations/Innovation.json";
import ResponsAnimation from "../../animations/Respons.json";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import {
  FaEye,
  FaBullseye,
  FaTasks,
  FaLightbulb,
  FaInfoCircle,
  FaCheckCircle,
  FaHandshake,
  FaLeaf,
  FaBolt,
  FaBalanceScale,
  FaAward,
  FaIndustry,
  FaShieldAlt,
  FaStore,
  FaUserTie,
  FaUsers,
  FaLandmark,
  FaBookOpen,
} from "react-icons/fa";
import Image from "next/image";

// Typing Effect for Story
function TypingStory({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [displayed, text]);

  return <p className="text-base md:text-lg text-gray-700 leading-relaxed">{displayed}</p>;
}

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const [showStory, setShowStory] = useState(false);
  const isRTL = i18n.language === "ar";

  const valuesIcons: Record<string, React.ReactNode> = {
    quality: <FaCheckCircle className="text-3xl text-main mx-auto mb-3" />,
    integrity: <FaBalanceScale className="text-3xl text-main mx-auto mb-3" />,
    speed: <FaBolt className="text-3xl text-main mx-auto mb-3" />,
    partnership: <FaHandshake className="text-3xl text-main mx-auto mb-3" />,
    innovation: <FaLightbulb className="text-3xl text-main mx-auto mb-3" />,
    sustainability: <FaLeaf className="text-3xl text-main mx-auto mb-3" />,
  };

  const targetPartners = [
    {
      icon: <FaIndustry className="text-3xl text-main" />,
      titleAr: "مصنعى العلامات الخاصة",
      titleEn: "Private Label Manufacturing",
      descAr: "نُمكّن أصحاب العلامات التجارية ورواد الأعمال من تصنيع منتجاتهم الخاصة بأعلى معايير الجودة، من التركيبة حتى التغليف النهائي.",
      descEn: "We empower brand owners and entrepreneurs to manufacture their own products with the highest quality standards, from formulation to final packaging."
    },
    {
      icon: <FaHandshake className="text-3xl text-main" />,
      titleAr: "الموزعون والشركاء التجاريون",
      titleEn: "Distributors & Trade Partners",
      descAr: "نتعاون مع الموزعين وتجار التجزئة لتوريد منتجاتنا بكميات كبيرة وجودة ثابتة، مع إمكانية بناء شراكات تجارية طويلة الأمد.",
      descEn: "We partner with distributors and retailers to supply our products in bulk with consistent quality, building long-term trade partnerships."
    },
    {
      icon: <FaLandmark className="text-3xl text-main" />,
      titleAr: "المناقصات الحكومية",
      titleEn: "Government Tenders",
      descAr: "نشارك في المناقصات الحكومية لتوريد المنتجات الطبية والصحية للجهات الحكومية والمستشفيات بمعايير الجودة المطلوبة.",
      descEn: "We participate in government tenders to supply medical and healthcare products to government entities and hospitals with required quality standards."
    },
    {
      icon: <FaUsers className="text-3xl text-main" />,
      titleAr: "المستهلك النهائي",
      titleEn: "End Consumer",
      descAr: "نصنع منتجات عالية الجودة تصل مباشرة إلى المستخدم النهائي عبر علاماتنا التجارية، لتلبية احتياجاته اليومية في العناية والصحة.",
      descEn: "We create high-quality products that reach the end consumer through our own brands, meeting their daily care and health needs."
    }
  ];

  return (
    <>
      <Head>
        <title>{t("about.pageTitle") || "About Us | Bonn Medical Industries"}</title>
        <meta
          name="description"
          content="Bonn is a contract manufacturer located in Riyadh, Saudi Arabia. Equipped with the latest and up to date machines and equipment, we are confident that we are able to provide the latest and novel formulations under cGMP regulations."
        />
        <meta name="keywords" content="cosmetics manufacturer, skincare saudi arabia, oem, bonn medical" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.bonnmed.com/about" />
      </Head>

      <main dir={isRTL ? "rtl" : "ltr"} className="w-full bg-[#FCFDFF] text-[#1A3351] overflow-hidden">
        <Breadcrumb items={[{ label: t("about") || (isRTL ? "من نحن" : "About Us") }]} />
        <AnimatedBackground />

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#EBF3FC] via-[#FCFDFF] to-[#FCFDFF] px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            {/* Title & Description above the image */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--main-color)] leading-tight max-w-4xl mx-auto">
              {t("about_title")}
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t("p1")}
            </p>

            {/* Styled "See Our Story" Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowStory(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-main text-white font-bold rounded-2xl shadow-lg shadow-main/20 hover:shadow-main/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-sm md:text-base"
              >
                <FaBookOpen /> {t("seeOurStory") || "See Our Story"}
              </button>
            </div>

            {/* Full-Width Image (Minister of Industry Visit & Team) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[250px] sm:h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,118,255,0.1)] border-4 border-white mt-12"
            >
              <Image
                src="/images/Team-images/وزير_الصناعة.JPG"
                width={800}
                height={800}
                alt="Visit of H.E. the Minister of Industry to Bonn Factory"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Quick Stats Bar */}
          <div className="max-w-7xl mx-auto mt-12 md:mt-16 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100 rtl:divide-x-reverse">
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-main">+25</h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase">{t("stats.tonsPerDay") || "Tons / Day"}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-main">4,000,000+</h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase">{isRTL ? "عبوة مُنتجة سنوياً" : "Units Produced Annually"}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-main">6+</h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase">{t("stats.countries") || "Export Countries"}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-main">100%</h3>
              <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase">{isRTL ? "مطابقة لمواصفات SFDA" : "SFDA & cGMP Compliant"}</p>
            </div>
          </div>
        </section>

        {/* ================= WHO WE ARE (WITH FACTORY IMAGE) ================= */}
        <section className="py-20 px-4 md:px-12 lg:px-24 bg-white border-y border-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Factory Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <Image
                  src="/images/Team-images/مصنع.jpg"
                  alt="Bonn Manufacturing Facility"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Detailed text */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-start">
              <div className="flex items-center gap-2.5">
                <FaInfoCircle className="text-2xl text-main" />
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--main-color)]">
                  {t("whoWeAre")}
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
                <p>{t("p4")}</p>
              </div>

              {/* Certifications Badges */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {isRTL ? "شهاداتنا واعتماداتنا الدولية" : "Our Certifications & Compliance"}
                </h4>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-bold text-gray-700">
                    <FaAward className="text-main" /> ISO 9001:2015
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-bold text-gray-700">
                    <FaShieldAlt className="text-main" /> ISO 13485 (Medical Devices)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-bold text-gray-700">
                    <FaLeaf className="text-main" /> ISO 22000 (Safety)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-bold text-gray-700">
                    <FaIndustry className="text-main" /> cGMP Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BLUE SECTION: WHO WE SERVE (من نستهدف) ================= */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-main via-[#0046b0] to-[#00368a] relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
                {isRTL ? "شركاء النجاح" : "Our Partners"}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                {isRTL ? "من نستهدف في بون؟" : "Who We Serve"}
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {isRTL
                  ? "نحن ندعم مختلف قطاعات الرعاية التجميلية والصحية لإطلاق وتوسيع علاماتهم التجارية بجودة لا تضاهى وبشراكة مستدامة."
                  : "We support various cosmetic and healthcare sectors to launch and scale their brands with unmatched quality and sustainable partnership."}
              </p>
            </div>

            {/* Target Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {targetPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 flex flex-col space-y-4 text-start hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-main/5 flex items-center justify-center flex-shrink-0">
                    {partner.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--main-color)]">
                    {isRTL ? partner.titleAr : partner.titleEn}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {isRTL ? partner.descAr : partner.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VISION & MISSION ================= */}
        <section className="py-20 px-4 md:px-12 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-[#F5F9FF] to-white border border-blue-50 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-6 items-start text-start">
              <div className="w-14 h-14 rounded-2xl bg-main/10 flex items-center justify-center text-main text-2xl flex-shrink-0 mx-auto md:mx-0">
                <FaEye />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[var(--main-color)] text-center md:text-start">{t("visionTitle")}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center md:text-start">{t("visionText")}</p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-[#F5F9FF] to-white border border-blue-50 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-6 items-start text-start">
              <div className="w-14 h-14 rounded-2xl bg-main/10 flex items-center justify-center text-main text-2xl flex-shrink-0 mx-auto md:mx-0">
                <FaBullseye />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[var(--main-color)] text-center md:text-start">{t("missionTitle")}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center md:text-start">{t("missionText")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES SECTION ================= */}
        <section className="py-20 px-4 md:px-12 lg:px-24 bg-[#FCFDFF] border-t border-gray-50">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-3 py-1 rounded-full bg-main/10 text-main text-xs font-bold uppercase tracking-wider">
                {isRTL ? "مبادئنا الأساسية" : "Our Core Values"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--main-color)]">
                {t("valuesTitle")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["quality", "integrity", "speed", "partnership", "innovation", "sustainability"].map(
                (key, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {valuesIcons[key]}
                    <h4 className="font-bold text-lg text-[var(--main-color)] mb-2">
                      {t(`value_${key}_title`)}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                      {t(`value_${key}_desc`)}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ================= BLUE SECTION: RESPONSIBILITIES & INNOVATION ================= */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-[#F4F9FF] to-[#EBF4FF] border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Responsibilities Card */}
            <div className="bg-white border border-blue-100/50 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 text-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-main/10 flex items-center justify-center text-main text-2xl">
                    <FaTasks />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--main-color)]">
                    {t("responsibilitiesTitle")}
                  </h3>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-start gap-3 p-4 rounded-xl bg-[#FCFDFF] border border-blue-50/60 hover:border-blue-100 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-main/5 text-main flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {num}
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {t(`responsibility${num}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Innovation Card */}
            <div className="bg-white border border-blue-100/50 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6 text-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-main/10 flex items-center justify-center text-main text-2xl">
                    <FaLightbulb />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--main-color)]">
                    {t("innovationTitle")}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed p-5 rounded-2xl bg-[#FCFDFF] border border-blue-50/60">
                  {t("innovationText")}
                </p>
                {/* Visual highlights of innovation */}
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="p-3 bg-[#FCFDFF] border border-blue-50/50 rounded-xl">
                    <span className="block text-xl font-bold text-main">R&D</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">{isRTL ? "مختبرات متطورة" : "Advanced Labs"}</span>
                  </div>
                  <div className="p-3 bg-[#FCFDFF] border border-blue-50/50 rounded-xl">
                    <span className="block text-xl font-bold text-main">cGMP</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">{isRTL ? "تصنيع دقيق" : "Strict GMP"}</span>
                  </div>
                  <div className="p-3 bg-[#FCFDFF] border border-blue-50/50 rounded-xl">
                    <span className="block text-xl font-bold text-main">SFDA</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">{isRTL ? "اعتماد كامل" : "Full License"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#FCFDFF] border-t border-gray-50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-main/10 text-main text-xs font-bold uppercase tracking-wider">
                {isRTL ? "الاعتمادات" : "Accreditations"}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--main-color)]">
                {isRTL ? "شهادات واعتمادات الجودة" : "Our Quality Certifications"}
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {isRTL 
                  ? "نفخر في مصنع بون بالتزامنا التام بأعلى معايير التصنيع والجودة العالمية، مما يضمن تقديم منتجات آمنة، فعالة، ومطابقة لأدق المواصفات المطلوبة من شركائنا." 
                  : "At Bonn Factory, we pride ourselves on strict adherence to the highest global manufacturing and quality standards, ensuring safe, effective, and fully compliant products for our partners."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
              {[
                { img: "cert1.png", title: "ISO 9001:2015", link: "/certificates/ISO9001.pdf" },
                { img: "cert2.png", title: "ISO 22716 (GMP)", link: "/certificates/cert2.png" },
                { img: "cert3.png", title: "ISO 13485", link: "/certificates/ISO13485.pdf" },
                { img: "cert4.png", title: "ISO 22000", link: "/certificates/ISO22000.pdf" },
                { img: "Food&Drug.png", title: isRTL ? "هيئة الغذاء والدواء" : "SFDA Compliant", link: "/certificates/Food&Drug.png" },
              ].map((cert, idx) => (
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  className="block group"
                >
                  <motion.div
                    className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex flex-col items-center justify-between gap-6 hover:shadow-2xl hover:shadow-main/20 hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-main/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-full h-32 md:h-40 flex items-center justify-center relative z-10">
                      <Image 
                        src={`/certificates/${cert.img}`} 
                        alt={cert.title} 
                        width={200}
                        height={200}
                        className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="w-full pt-4 border-t border-gray-50 text-center relative z-10 flex flex-col items-center gap-1.5">
                      <h4 className="font-bold text-sm md:text-base text-gray-700 group-hover:text-main transition-colors">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] md:text-xs text-main font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 duration-300">
                        <FaEye className="text-[11px]" /> {isRTL ? "عرض الشهادة" : "View Certificate"}
                      </span>
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <ContactUs />

        {/* ================= STORY MODAL ================= */}
        <AnimatePresence>
          {showStory && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                onClick={() => setShowStory(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal */}
              <motion.div
                className="relative bg-white rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl w-full mx-auto z-10 overflow-hidden border border-gray-100 text-start"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {/* Decorative top bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-main" />

                <button
                  onClick={() => setShowStory(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Story Modal"
                >
                  ✕
                </button>

                <h3 className="text-2xl md:text-3xl font-black text-[var(--main-color)] mb-6">
                  {t("ourStoryTitle")}
                </h3>
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <TypingStory text={t("ourStoryText")} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}