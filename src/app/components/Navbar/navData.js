import { FaInfoCircle, FaUsers, FaFlask, FaIndustry, FaNewspaper, FaBlog, FaMicroscope, FaVials, FaTags, FaFileContract, FaFileDownload } from "react-icons/fa";

export const aboutMenuLinks = [
  { key: "about", path: "/about", icon: FaInfoCircle, descEn: "Company overview & history", descAr: "نظرة عامة وتاريخ الشركة" },
  { key: "team", path: "/about/team", icon: FaUsers, descEn: "Meet our leadership & experts", descAr: "تعرف على فريقنا الإداري والطبي" },
  { key: "rnd.title", path: "/about/rd", icon: FaFlask, descEn: "Continuous innovation & development", descAr: "مركز الابتكار والتطوير المستمر" },
  { key: "production_lines", path: "/production-lines", icon: FaIndustry, descEn: "Explore our manufacturing capabilities", descAr: "استكشف قدراتنا التصنيعية" },
];

export const eventsMenuLinks = [
  { key: "news", path: "/events?tab=news", icon: FaNewspaper, descEn: "Latest company news", descAr: "أحدث أخبار الشركة" },
  { key: "blog", path: "/events?tab=blog", icon: FaBlog, descEn: "Articles and insights", descAr: "مقالات ورؤى طبية" },
  { key: "knowledge_center", path: "/resources", icon: FaFileDownload, descEn: "Downloadable resources", descAr: "تحميل الملفات والمصادر" },
];

export const servicesMenuLinks = [
  { key: "services.formulation.title", path: "/services/custom-formulation", icon: FaMicroscope, descEn: "Safe & effective formulas", descAr: "تطوير تركيبات مخصصة" },
  { key: "services.ideation.title", path: "/services/product-ideation", icon: FaFlask, descEn: "Data-driven product concepts", descAr: "فكرة المنتج واختياره" },
  { key: "services.packaging.title", path: "/services/packaging-design", icon: FaTags, descEn: "Creative & compliant design", descAr: "تطوير وتصميم التعبئة" },
  { key: "services.ready.title", path: "/services/ready-formulas", icon: FaVials, descEn: "Ready-to-deploy formulas", descAr: "تركيبات جاهزة للاستخدام" },
  { key: "services.registration.title", path: "/services/registration", icon: FaFileContract, descEn: "Regulatory & market support", descAr: "توثيق وتسجيل المنتجات" },
  { key: "services.production.title", path: "/services/production", icon: FaIndustry, descEn: "GMP-certified manufacturing", descAr: "الإنتاج الشامل" },
];

export const brands = [
  {
    name_en: "Covix Care",
    name_ar: "كوفيكس كير",
    slug: "covix-care",
    logo: "/images/covix.png",
  },
  {
    name_en: "Le Visage Plus",
    name_ar: "لو فيزاج بلس",
    slug: "leVisagePlus",
    logo: "/images/Visage.png",
  },
  {
    name_en: "B1Care",
    name_ar: "بي 1 كير",
    slug: "b1care",
    logo: "/images/B1.png",
  },
  {
    name_en: "PuCare",
    name_ar: "بو كير",
    slug: "pucare",
    logo: "/images/PUCare.png",
  },
  {
    name_en: "Vert",
    name_ar: "فيرت",
    slug: "vert",
    logo: "/images/Vert.png",
  },
  {
    name_en: "Rubin",
    name_ar: "روبين",
    slug: "rubin",
    logo: "/images/Rubin.png",
  }
];
