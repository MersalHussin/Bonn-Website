"use client";

import Breadcrumb from "../components/Breadcrumb";
import ContactUs from "../components/Contact";
import Lottie from "lottie-react";
import innovationAnimation from "../../animations/Innovation.json";
import ResponsAnimation from "../../animations/Respons.json";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TeamMember {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  image_url: string;
}

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
import Link from "next/link";
import { departmentsData } from "../constants/departmentsData";
import { FaArrowLeft, FaArrowRight, FaSitemap } from "react-icons/fa";
import TeamMemberCard from "../components/TeamMemberCard";

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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(3);

      if (!error && data) {
        setTeamMembers(data);
      }
    }
    
    fetchMembers();
  }, []);

  const valuesIcons: Record<string, React.ReactNode> = {
    quality: <FaCheckCircle className="text-3xl text-main mx-auto mb-3" />,
    integrity: <FaBalanceScale className="text-3xl text-main mx-auto mb-3" />,
    speed: <FaBolt className="text-3xl text-main mx-auto mb-3" />,
    partnership: <FaHandshake className="text-3xl text-main mx-auto mb-3" />,
    innovation: <FaLightbulb className="text-3xl text-main mx-auto mb-3" />,
    sustainability: <FaLeaf className="text-3xl text-main mx-auto mb-3" />,
  };

  // Target partners removed

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

      <main dir={isRTL ? "rtl" : "ltr"} className="w-full bg-[#FCFDFF] text-[#1A3351] overflow-hidden ">
        <Breadcrumb items={[{ label: isRTL ? "عن بون" : "About Boon" }]} />

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#EBF3FC] via-[#FCFDFF] to-[#FCFDFF] px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            {/* Title & Description above the image */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--main-color)] leading-tight max-w-4xl mx-auto">
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

        {/* ================= FACTORY DEPARTMENTS SECTION (Blue Theme) ================= */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-main via-[#0951be] to-[#00368a] relative overflow-hidden">
          {/* Background decorations */}


          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                {isRTL ? "إدارات المصنع" : "Our Factory Departments"}
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {isRTL
                  ? "تتميز شركة بون بمنظومة إدارية وفنية متكاملة تتضافر فيها كافة الأقسام لتحقيق أعلى مستويات الجودة والابتكار."
                  : "Bonn Medical Industries operates through a seamless network of specialized departments working in harmony to deliver excellence."}
              </p>
            </div>

            {/* All Departments Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {departmentsData.slice(0, 8).map((dept) => {
                const Icon = dept.icon;
                return (
                  <Link
                    key={dept.id}
                    href={`/about/departments/${dept.id}`}
                    className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-white/30 shadow-lg hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative w-16 h-16 mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white to-white/90 text-main shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <Icon size={28} />
                    </div>
                    
                    <h4 className="relative font-bold text-base md:text-lg text-white  transition-colors">
                      {isRTL ? dept.nameAr : dept.nameEn}
                    </h4>
                  </Link>
                );
              })}
            </div>

            {/* CTA to View All Departments */}
            <div className="text-center pt-8 ">
              <Link
                href="/about/departments"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white backdrop-blur-md text-main font-bold rounded-2xl shadow-lg hover:bg-white/95 transition-all duration-300 text-sm md:text-base border border-white/20"
              >
                <span>{isRTL ? "استعرض كافة الإدارات" : "Explore All Departments"}</span>
                {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
              </Link>
            </div>
          </div>
        </section>

       

        {/* ================= VALUES SECTION ================= */}
        <section className="py-20 px-4 md:px-12 lg:px-24 bg-[#FCFDFF] border-t border-gray-50">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">

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


         {/* ================= VISION & MISSION ================= */}
  
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-br from-[#F4F9FF] to-[#EBF4FF] border-t border-gray-100">

   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
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

        {/* ================= BLUE SECTION: RESPONSIBILITIES & INNOVATION ================= */}


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

        {/* ================= OUR TEAM SECTION ================= */}
        {teamMembers.length > 0 && (
          <section className="py-20 px-4 md:px-12 lg:px-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--main-color)]">
                  {isRTL ? "فريق بون" : "Boon Team"}
                </h2>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {isRTL
                    ? "نفخر بنخبة من أفضل الخبراء والمهندسين والأطباء المتخصصين الذين يكرسون جهودهم للابتكار والجودة."
                    : "We are proud of our elite team of experts, engineers, and specialists dedicated to innovation and uncompromised quality."}
                </p>
              </div>

              {/* Team Members Grid Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {teamMembers.map((member, idx) => (
                      <TeamMemberCard key={member.id} member={member} idx={idx} />
                 
                ))}
              </div>

              {/* CTA to View All Team Members */}
              <div className="text-center pt-6">
                <Link
                  href="/about/team"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-main text-white font-bold rounded-2xl shadow-lg shadow-main/20 hover:bg-main/90 hover:scale-[1.02] transition-all duration-300 text-sm md:text-base"
                >
                  <span>{isRTL ? "تعرف على فريق بون الكامل" : "Meet the Full Boon Team"}</span>
                  {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#FCFDFF] border-t border-gray-50">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">

              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--main-color)]">
                {isRTL ? "الشهادات" : "Our Certifications"}
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
                { img: "cert3.png", title: "ISO 22000", link: "/certificates/ISO22000.pdf" },
                { img: "cert4.png", title: "ISO 13485", link: "/certificates/ISO13485.pdf" },
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
                    className="group relative bg-white rounded-3xl p-6 flex flex-col items-center justify-between gap-5 hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden border border-gray-100"
                    style={{
                      boxShadow: "0 8px 30px rgba(0,0,0,0.04)"
                    }}
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-main/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Corner Decoration */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-main/10 to-main/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="w-full h-32 md:h-44 flex items-center justify-center relative z-10 p-2">
                      <Image 
                        src={`/certificates/${cert.img}`} 
                        alt={cert.title} 
                        width={220}
                        height={220}
                        className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10"
                      />
                    </div>
                    
                    <div className="w-full pt-5 border-t border-gray-100/80 text-center relative z-10 flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center gap-2">
                        <FaAward className="text-main/70 text-sm shrink-0" />
                        <h4 className="font-extrabold text-sm md:text-base text-gray-800 group-hover:text-main transition-colors line-clamp-1">
                          {cert.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[11px] md:text-xs text-white font-bold bg-main px-4 py-1.5 rounded-full shadow-md shadow-main/20 flex items-center gap-1.5">
                          <FaEye className="text-[11px]" /> {isRTL ? "عرض الشهادة" : "View Certificate"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Border gradient effect on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-main/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
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

                <h3 className="text-2xl md:text-3xl font-bold text-[var(--main-color)] mb-6">
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