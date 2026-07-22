export interface FAQItemData {
  id?: number | string;
  question_ar: string;
  answer_ar: string;
  question_en: string;
  answer_en: string;
  category: "general" | "services" | "quality" | "production" | string;
  created_at?: string;
}

export const DEFAULT_FAQS: FAQItemData[] = [
  {
    question_ar: "ما هي شركة بون للصناعات الطبية؟",
    answer_ar: "شركة بون للصناعات الطبية (BMI) هي مصنع سعودي وطني معتمد متخصص في التصنيع لصالح الغير (Private Label / OEM) لمستحضرات التجميل، منتجات العناية بالبشرة، العناية بالشعر، والمستلزمات الطبية، ونسير وفق لوائح التصنيع الجيد (GMP) وشهادات الآيزو العالمية.",
    question_en: "What is Bonn Medical Industries?",
    answer_en: "Bonn Medical Industries (BMI) is a Saudi factory specializing in contract manufacturing (OEM/Private Label) for cosmetics, skincare, haircare, and medical products. We are certified under Good Manufacturing Practices (GMP) and ISO standards.",
    category: "general"
  },
  {
    question_ar: "هل تساعدون في تسجيل المنتجات لدى هيئة الغذاء والدواء؟",
    answer_ar: "نعم، لدينا فريق متخصص في الشؤون التنظيمية يقوم بإعداد الملفات التقنية الكاملة للمنتجات وتسجيلها وترخيصها لدى الهيئة العامة للغذاء والدواء السعودية (SFDA) لضمان إطلاق منتجاتك في السوق بشكل نظامي وقانوني.",
    question_en: "Do you help with SFDA product registration?",
    answer_en: "Yes, we have a specialized regulatory team that prepares the full technical files and registers your products and brands with the Saudi Food and Drug Authority (SFDA) for a compliant and legal market launch.",
    category: "quality"
  },
  {
    question_ar: "ما هو الحد الأدنى لكمية الطلب (MOQ)؟",
    answer_ar: "يختلف الحد الأدنى للطلب (MOQ) بناءً على فئة المنتج، نوع التركيبة، والعبوات المستخدمة. يرجى ملء نموذج التسجيل وسنقوم بتوفير عرض أسعار مخصص يغطي احتياجات علامتك التجارية.",
    question_en: "What is the Minimum Order Quantity (MOQ)?",
    answer_en: "Minimum order quantities vary depending on the product category, formulation, and type of packaging chosen. Please complete our registration form to receive a customized quote suited to your brand's requirements.",
    category: "production"
  },
  {
    question_ar: "هل يمكنكم تطوير تركيبات مخصصة لعلامتي التجارية؟",
    answer_ar: "بالتأكيد. يستطيع قسم البحث والتطوير (R&D) لدينا ابتكار تركيبات مخصصة وحصرية تتناسب تماماً مع الفئة المستهدفة لعلامتك التجارية، والمكونات الفعالة التي تفضلها، والملمس المطلوب.",
    question_en: "Can you develop custom formulations for my brand?",
    answer_en: "Absolutely. Our expert R&D department can formulate custom, stable, and highly effective products tailored to your specific performance targets, preferred ingredients, and market positioning.",
    category: "services"
  },
  {
    question_ar: "ما هي الشهادات والاعتمادات التي يحملها مصنعكم؟",
    answer_ar: "مصنعنا مجهز بأحدث خطوط الإنتاج وحاصل على اعتمادات دولية تشمل ISO 9001 (نظام إدارة الجودة)، ISO 13485 (جودة الأجهزة الطبية)، ISO 22000 (سلامة الغذاء والنظافة المصنعية)، ممارسات التصنيع الجيد (cGMP)، ورخصة الموقع الصناعي من هيئة الغذاء والدواء.",
    question_en: "What certifications does your factory hold?",
    answer_en: "We operate a state-of-the-art facility carrying certifications in ISO 9001 (Quality Management), ISO 13485 (Medical Devices Quality), ISO 22000 (Food Safety/Hygiene), HACCP compliance, and cGMP compliance under SFDA supervision.",
    category: "quality"
  },
  {
    question_ar: "هل يمكنني اختيار تصاميم التغليف والعبوات الخاصة بي؟",
    answer_ar: "نعم، نقدم خدمة تصميم وتأمين العبوات المناسبة. نساعدك في اختيار أو تصميم الزجاجات، العلب، الأنابيب، والكراتين الخارجية بما يتوافق مع شروط الهيئات الرقابية ويعكس المظهر الجمالي لبراندك.",
    question_en: "Can I choose my own packaging designs?",
    answer_en: "Yes. We offer packaging design and sourcing support. We help you choose or design bottles, jars, tubes, and boxes that are compliant with local labeling regulations and match your aesthetic goals.",
    category: "services"
  }
];
