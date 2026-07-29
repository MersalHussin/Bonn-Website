import { Product } from "../types";

export interface LeVisageProduct extends Product {
  tagline_en?: string;
  tagline_ar?: string;
  category?: string[];
  usage_en?: string;
  usage_ar?: string;
  ingredients_en?: string[];
  ingredients_ar?: string[];
  volume?: string;
}

export const mockProducts: LeVisageProduct[] = [
  {
    id: "mock1",
    slug: "vitamin-c-serum",
    images: ["/images/visageProducts.png"],
    name_en: "Vitamin C Serum",
    name_ar: "سيروم فيتامين سي",
    tagline_en: "Advanced glowing serum",
    tagline_ar: "سيروم النضارة المتقدم",
    description_en: "An advanced glowing serum that brightens the skin, evens out skin tone, and reduces the appearance of dark spots. Enriched with pure Vitamin C and Hyaluronic Acid for deep hydration.",
    description_ar: "سيروم نضارة متقدم يعمل على تفتيح البشرة، توحيد لونها، وتقليل ظهور البقع الداكنة. غني بفيتامين سي النقي وحمض الهيالورونيك لترطيب عميق.",
    brand: "Le Visage Plus",
    best_selling: true,
    likes: 120,
    disabled: false,
    category: ["Serums", "Brightening"],
    usage_en: "Apply 3-4 drops to clean, dry skin in the morning. Follow with moisturizer and sunscreen.",
    usage_ar: "ضعي ٣-٤ قطرات على بشرة نظيفة وجافة في الصباح. اتبعيه بالمرطب وواقي الشمس.",
    ingredients_en: ["Vitamin C (L-Ascorbic Acid)", "Hyaluronic Acid", "Vitamin E", "Glycerin"],
    ingredients_ar: ["فيتامين سي", "حمض الهيالورونيك", "فيتامين إي", "جلسرين"],
    volume: "30ml"
  },
  {
    id: "mock2",
    slug: "hyaluronic-acid",
    images: ["/images/visageProducts.png"],
    name_en: "Hyaluronic Acid Serum",
    name_ar: "سيروم حمض الهيالورونيك",
    tagline_en: "Deep hydration and plumping",
    tagline_ar: "ترطيب عميق وامتلاء",
    description_en: "Experience ultimate hydration with our pure Hyaluronic Acid serum. It draws moisture into the skin, instantly plumping fine lines and leaving a dewy, radiant finish.",
    description_ar: "استمتعي بترطيب فائق مع سيروم حمض الهيالورونيك النقي. يجذب الرطوبة إلى البشرة، مما يملأ الخطوط الدقيقة فوراً ويترك البشرة نضرة ومشرقة.",
    brand: "Le Visage Plus",
    best_selling: false,
    likes: 85,
    disabled: false,
    category: ["Serums", "Hydration"],
    usage_en: "Apply to damp skin after cleansing. Can be used morning and night.",
    usage_ar: "يستخدم على بشرة رطبة بعد الغسول. يمكن استخدامه صباحاً ومساءً.",
    ingredients_en: ["Hyaluronic Acid 2%", "Pro-Vitamin B5", "Water"],
    ingredients_ar: ["حمض الهيالورونيك ٢٪", "برو-فيتامين ب٥", "ماء"],
    volume: "30ml"
  },
  {
    id: "mock3",
    slug: "retinol-cream",
    images: ["/images/visageProducts.png"],
    name_en: "Retinol Night Cream",
    name_ar: "كريم الريتينول الليلي",
    tagline_en: "Anti-aging night cream",
    tagline_ar: "كريم ليلي مضاد للتجاعيد",
    description_en: "A potent yet gentle retinol cream designed to accelerate cell turnover, diminish fine lines, and improve skin texture overnight without irritation.",
    description_ar: "كريم ريتينول قوي ولطيف مصمم لتسريع تجديد الخلايا، تقليل الخطوط الدقيقة، وتحسين ملمس البشرة طوال الليل دون تهيج.",
    brand: "Le Visage Plus",
    best_selling: true,
    likes: 230,
    disabled: false,
    category: ["Creams", "Anti-Aging"],
    usage_en: "Use only at night. Apply a pea-sized amount to dry skin. Use sunscreen during the day.",
    usage_ar: "يستخدم ليلاً فقط. ضعي كمية صغيرة على بشرة جافة. يجب استخدام واقي شمس نهاراً.",
    ingredients_en: ["Retinol 0.5%", "Squalane", "Ceramides", "Shea Butter"],
    ingredients_ar: ["ريتينول ٠.٥٪", "سكوالين", "سيراميد", "زبدة الشيا"],
    volume: "50ml"
  },
  {
    id: "mock4",
    slug: "niacinamide",
    images: ["/images/visageProducts.png"],
    name_en: "Niacinamide 10%",
    name_ar: "نياسيناميد ١٠٪",
    tagline_en: "Pore minimizing formula",
    tagline_ar: "تركيبة تصغير المسام",
    description_en: "A multi-tasking serum that visibly minimizes enlarged pores, improves uneven skin tone, and regulates sebum production for a balanced complexion.",
    description_ar: "سيروم متعدد المهام يقلل بشكل واضح من المسام الواسعة، يحسن لون البشرة غير الموحد، وينظم إفراز الدهون للحصول على بشرة متوازنة.",
    brand: "Le Visage Plus",
    best_selling: false,
    likes: 95,
    disabled: false,
    category: ["Serums", "Blemish Control"],
    usage_en: "Apply few drops morning and evening before heavier creams.",
    usage_ar: "ضعي قطرات قليلة صباحاً ومساءً قبل الكريمات الثقيلة.",
    ingredients_en: ["Niacinamide 10%", "Zinc 1%", "Aloe Vera Extract"],
    ingredients_ar: ["نياسيناميد ١٠٪", "زنك ١٪", "خلاصة الصبار"],
    volume: "30ml"
  }
];
