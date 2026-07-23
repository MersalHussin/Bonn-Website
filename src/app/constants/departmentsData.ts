import {
  Factory,
  TrendingUp,
  Megaphone,
  ShoppingCart,
  Globe,
  Tag,
  FileText,
  Users,
  PieChart,
  ShoppingBag,
  FlaskConical,
  ShieldCheck,
  CheckCircle,
  Settings,
  Microscope,
  Headset,
  Scale,
  LucideIcon
} from "lucide-react";

export interface DepartmentItem {
  id: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  responsibilitiesAr?: string[];
  responsibilitiesEn?: string[];
}

export const departmentsData: DepartmentItem[] = [
  {
    id: "plant-management",
    icon: Factory,
    color: "text-slate-600",
    bg: "bg-slate-50",
    nameEn: "Plant Management",
    nameAr: "إدارة المصنع",
    descEn: "Full oversight of factory production lines and operational processes to ensure high efficiency.",
    descAr: "الإشراف الكامل على خطوط الإنتاج والعمليات التشغيلية بالمصنع لضمان الكفاءة العالية.",
    responsibilitiesAr: [
      "إدارة وتوجيه كافة الأقسام التشغيلية بالمصنع",
      "ضمان تحقيق خطط الإنتاج اليومية والشهرية",
      "تطبيق أعلى معايير السلامة المهنية وصيانة المنشأة",
      "تحسين كفاءة استخدام الموارد وتقليل الهدر التشغيلي"
    ],
    responsibilitiesEn: [
      "Managing and directing all factory operational departments",
      "Ensuring daily and monthly production plans are met",
      "Applying occupational safety standards and facility maintenance",
      "Optimizing resource efficiency and reducing operational waste"
    ]
  },
  {
    id: "business-development",
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
    nameEn: "Business Development",
    nameAr: "تطوير الأعمال",
    descEn: "Building strategic partnerships and expanding market reach locally and globally.",
    descAr: "بناء الشراكات الاستراتيجية وتوسيع نطاق أعمال الشركة في الأسواق المحلية والدولية.",
    responsibilitiesAr: [
      "استكشاف فرص استثمارية وشراكات جديدة في القطاع الطبي والتجميلي",
      "دراسة التوجهات المستقبليّة وتحليل متطلبات السوق",
      "تطوير نماذج الأعمال والخدمات المقدمة للعملاء",
      "بناء شبكة علاقات قوية مع كبرى الشركات الإقليمية والدولية"
    ],
    responsibilitiesEn: [
      "Exploring new investment and partnership opportunities in healthcare and cosmetics",
      "Analyzing market trends and future industry shifts",
      "Developing business models and client service offerings",
      "Building strategic relationships with regional and international partners"
    ]
  },
  {
    id: "marketing",
    icon: Megaphone,
    color: "text-pink-600",
    bg: "bg-pink-50",
    nameEn: "Marketing Department",
    nameAr: "إدارة التسويق",
    descEn: "Planning and executing marketing campaigns and brand identity building.",
    descAr: "التخطيط والتنفيذ للحملات التسويقية وبناء الهوية البصرية للعلامات التجارية.",
    responsibilitiesAr: [
      "وضع الاستراتيجيات التسويقية للعلامات التجارية التابعة للمصنع",
      "إدارة الوجود الرقمي والحملات الإعلانية والتواصل الاجتماعي",
      "إعداد المواد التسويقية والمشاركات في المعارض المحلية والدولية",
      "قياس وتطوير الوعي بالعلامات التجارية ورضا العملاء"
    ],
    responsibilitiesEn: [
      "Developing marketing strategies for factory-owned and partner brands",
      "Managing digital presence, ad campaigns, and social media",
      "Preparing marketing collateral and international exhibition participation",
      "Measuring and improving brand awareness and customer perception"
    ]
  },
  {
    id: "sales",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    nameEn: "Sales Department",
    nameAr: "إدارة المبيعات",
    descEn: "Closing commercial deals, account management, and achieving sales targets.",
    descAr: "إبرام التوافقات التجارية ومتابعة العملاء وتحقيق الأهداف البيعية الاستراتيجية.",
    responsibilitiesAr: [
      "إدارة عمليات البيع والتوزيع في كافة قنوات المبيعات",
      "بناء ومتابعة العلاقات مع الصيدليات وسلاسل التجزئة",
      "تحقيق المستهدفات البيعية والتوسع في التغطية الجغرافية",
      "تقديم الاستشارات التجارية والحلول المناسبة للعملاء"
    ],
    responsibilitiesEn: [
      "Managing sales and distribution across all channels",
      "Building and maintaining accounts with pharmacies and retail chains",
      "Achieving revenue targets and expanding geographic coverage",
      "Providing commercial consultations and tailored client solutions"
    ]
  },
  {
    id: "export",
    icon: Globe,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    nameEn: "Export Department",
    nameAr: "إدارة التصدير",
    descEn: "Managing international export operations and regulatory compliance for global markets.",
    descAr: "إدارة عمليات التصدير للأسواق العالمية والتوافق مع المتطلبات الجمركية والتنظيمية.",
    responsibilitiesAr: [
      "توسيع نطاق حضور منتجات بون في الأسواق العالمية والتصدير",
      "إنهاء كافة المعاملات الجمركية والشهادات التنفيذية للتصدير",
      "التوافق مع الاشتراطات التنظيمية الخاصة بكل دولة",
      "إدارة شبكة الموزعين والوكلاء في الخارج"
    ],
    responsibilitiesEn: [
      "Expanding Bonn products into international export markets",
      "Handling customs documentation and export certification",
      "Ensuring compliance with destination country regulations",
      "Managing distributor and agent networks overseas"
    ]
  },
  {
    id: "private-label",
    icon: Tag,
    color: "text-purple-600",
    bg: "bg-purple-50",
    nameEn: "Private Label Department",
    nameAr: "العلامات التجارية الخاصة",
    descEn: "Comprehensive contract manufacturing solutions from ideation to finished product.",
    descAr: "تقديم حلول التصنيع التعاقدي المتكاملة للعملاء من الفكرة حتى المنتج النهائي.",
    responsibilitiesAr: [
      "تقديم خدمة التصنيع لحساب الغير (OEM / ODM) بأعلى جودة",
      "مساعدة المستثمرين في اختيار الفكرة وتطوير الهوية والتركيبة",
      "متابعة سير العمل من الفكرة وحتى نزول المنتج للرف",
      "توفير مرونة عالية في الكميات والتركيبات والتغليف"
    ],
    responsibilitiesEn: [
      "Providing OEM / ODM contract manufacturing with high precision",
      "Assisting brand owners from concept to formula & design",
      "End-to-end tracking from raw material to shelf readiness",
      "Offering flexible minimum order quantities, formulas, and packaging"
    ]
  },
  {
    id: "government-tenders",
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
    nameEn: "Government Tenders",
    nameAr: "إدارة المناقصات الحكومية",
    descEn: "Managing participation in government and medical tenders under strict standards.",
    descAr: "المشاركة في المناقصات والمشاريع الحكومية والطبية وفق أعلى الشروط والمعايير.",
    responsibilitiesAr: [
      "متابعة وإعداد العطاءات والمناقصات الطبية والصحية الحكومية",
      "توفير كافة الوثائق والتراخيص الفنية والشهادات المعتمدة",
      "الالتزام الكامل بالجداول الزمنية وشروط الموردين الحكوميين",
      "متابعة تنفيذ العقود الحكومية وتوريد الكميات المطلوبة"
    ],
    responsibilitiesEn: [
      "Preparing bids for government medical & healthcare tenders",
      "Providing technical documentation, licenses, and official certificates",
      "Strict adherence to timelines and public procurement standards",
      "Managing government contract execution and fulfillment"
    ]
  },
  {
    id: "hr",
    icon: Users,
    color: "text-orange-600",
    bg: "bg-orange-50",
    nameEn: "HR Department",
    nameAr: "الموارد البشرية",
    descEn: "Talent acquisition, continuous staff development, and professional workspace culture.",
    descAr: "الاستقطاب والتطوير المستمر للكوادر البشرية وبيئة العمل الاحترافية.",
    responsibilitiesAr: [
      "استقطاب الكفاءات والخبراء في المجالات الصيدلانية والتصنيعية",
      "تطوير البرامج التدريبية والتأهيلية المستمرة للموظفين",
      "إدارة الشؤون الإدارية وحقوق الموظفين ومستحقاتهم",
      "تعزيز ثقافة بيئة العمل الإيجابية والابتكار"
    ],
    responsibilitiesEn: [
      "Recruiting top talents in pharmaceutical and manufacturing fields",
      "Developing continuous training programs for technical staff",
      "Managing HR administration, employee welfare, and relations",
      "Fostering a positive, collaborative, and innovative culture"
    ]
  },
  {
    id: "finance",
    icon: PieChart,
    color: "text-green-600",
    bg: "bg-green-50",
    nameEn: "Finance Department",
    nameAr: "الإدارة المالية",
    descEn: "Financial planning, budgeting, and securing sustainable financial growth.",
    descAr: "التخطيط والتوجيه المالي وتأمين الاستقرار والنمو المستدام لموارد الشركة.",
    responsibilitiesAr: [
      "إدارة الميزانيات والتخطيط المالي الاستراتيجي للمصنع",
      "إعداد التقارير المالية والتدقيق وتحديد التكاليف التشغيلية",
      "متابعة المستحقات والتحصيل وإدارة السيولة النقدية",
      "الامتثال للأنظمة الضريبية والمحاسبية المعتمدة"
    ],
    responsibilitiesEn: [
      "Managing budgets and long-term financial planning",
      "Preparing financial statements, audit reports, and cost accounting",
      "Receivables management, invoicing, and cash flow control",
      "Ensuring tax and legal financial compliance"
    ]
  },
  {
    id: "procurement",
    icon: ShoppingBag,
    color: "text-teal-600",
    bg: "bg-teal-50",
    nameEn: "Procurement Department",
    nameAr: "إدارة المشتريات",
    descEn: "Sourcing top-quality raw materials and packaging under global specifications.",
    descAr: "توريد أجود المواد الخام ومواد التغليف وفق أفضل المعايير والمواصفات العالمية.",
    responsibilitiesAr: [
      "شراء وتأمين المواد الخام ومواد التغليف المعتمدة",
      "تقييم وتأهيل الموردين الدوليين والمحليين",
      "إدارة سلاسل التوريد وتفادي أي نقص في المستلزمات",
      "التفاوض للحصول على أفضل التكاليف مع الحفاظ على أعلى مستويات الجودة"
    ],
    responsibilitiesEn: [
      "Sourcing certified raw materials and packaging components",
      "Qualifying and evaluating global and local suppliers",
      "Managing supply chain logistics to prevent material shortages",
      "Negotiating optimal pricing while keeping uncompromised quality"
    ]
  },
  {
    id: "rnd",
    icon: FlaskConical,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    nameEn: "Research & Development (R&D)",
    nameAr: "البحث والتطوير",
    descEn: "Developing innovative, safe formulas leveraging modern ingredient science.",
    descAr: "تطوير وتحديث التركيبات المبتكرة والآمنة وفق أحدث العلوم والمكونات الطبيعية.",
    responsibilitiesAr: [
      "ابتكار صياغات وتركيبات تجميلية وطبية فريدة وتطويرها",
      "إجراء اختبارات الثباتية (Stability Tests) والتحقق من الفعالية",
      "مواكبة أحدث العلوم والمكونات النشطة عالمياً",
      "مواءمة التركيبات مع اشتراطات هيئة الغذاء والدواء SFDA"
    ],
    responsibilitiesEn: [
      "Formulating cutting-edge cosmetic and medical products",
      "Executing rigorous stability testing and efficacy trials",
      "Integrating global active ingredient scientific research",
      "Aligning formulas with SFDA and international regulations"
    ]
  },
  {
    id: "quality-assurance",
    icon: ShieldCheck,
    color: "text-rose-600",
    bg: "bg-rose-50",
    nameEn: "Quality Assurance (QA)",
    nameAr: "ضمان الجودة",
    descEn: "Implementing ISO & cGMP systems ensuring total compliance and quality standards.",
    descAr: "تطبيق معايير ISO و cGMP وضمان الامتثال التام لكافة التشريعات والمواصفات.",
    responsibilitiesAr: [
      "تطبيق وتطوير نظام إدارة الجودة الشامل (QMS)",
      "التأكد من التوافق التام مع معايير cGMP و ISO 9001 / ISO 13485 / ISO 22000",
      "مراجعة وثائق الدفعات الإنتاجية والتراخيص الرسمية",
      "تنفيذ عمليات التدقيق الداخلي والإجراءات التصحيحية CAPA"
    ],
    responsibilitiesEn: [
      "Implementing and auditing Quality Management Systems (QMS)",
      "Ensuring compliance with cGMP and ISO standards",
      "Reviewing batch records and regulatory documentation",
      "Executing internal audits and CAPA corrective measures"
    ]
  },
  {
    id: "quality-control",
    icon: CheckCircle,
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    nameEn: "Quality Control (QC)",
    nameAr: "مراقبة الجودة",
    descEn: "Rigorous lab inspection of batches and materials at all manufacturing stages.",
    descAr: "الفحص المخبري المستمر للشحنات والمواد في كافة مراحل التصنيع قبل الاعتماد.",
    responsibilitiesAr: [
      "فحص واختبار المواد الخام ومواد التعبئة الواردة",
      "مراقبة الجودة أثناء عملية التصنيع وفي خطوط الإنتاج",
      "إجراء التحاليل الفيزيائية والكيميائية للمنتجات النهائية",
      "إصدار شهادات التحليل المعتمدة (CoA) لكل دفعة"
    ],
    responsibilitiesEn: [
      "Testing incoming raw materials and packaging items",
      "In-process quality monitoring on production lines",
      "Physical and chemical laboratory testing of finished goods",
      "Issuing Certificates of Analysis (CoA) for every batch"
    ]
  },
  {
    id: "production",
    icon: Settings,
    color: "text-zinc-600",
    bg: "bg-zinc-50",
    nameEn: "Production Department",
    nameAr: "إدارة الإنتاج",
    descEn: "Operating production lines at scale with maximum precision and throughput.",
    descAr: "تشغيل وإدارة خطوط الإنتاج بالطاقات القصوى وبأعلى درجات الدقة والسرعة.",
    responsibilitiesAr: [
      "تشغيل خطوط خلط وتعبئة وتغليف مستحضرات التجميل والأجهزة الطبية",
      "الالتزام التام بتعليمات التشغيل القياسية (SOPs) ونظافة الغرف النظيفة",
      "رفع كفاءة الإنتاجية وتقليل الزمن المستغرق في التغيير والتنظيف",
      "تسليم المنتجات النهائية في المواعيد المحددة وبأعلى معايير الدقة"
    ],
    responsibilitiesEn: [
      "Operating mixing, filling, and packaging lines",
      "Adhering to Standard Operating Procedures (SOPs) and cleanroom protocols",
      "Maximizing throughput and optimizing changeover times",
      "Delivering finished goods on schedule under high precision"
    ]
  },
  {
    id: "microbiology",
    icon: Microscope,
    color: "text-sky-600",
    bg: "bg-sky-50",
    nameEn: "Microbiology Laboratory",
    nameAr: "علم الأحياء الدقيقة",
    descEn: "Microbial testing ensuring total sterility and safety of all products.",
    descAr: "إجراء الفحوصات الجرثومية والبكتيرية لضمان خلو كافة المنتجات من أي تلوث.",
    responsibilitiesAr: [
      "إجراء الفحوصات الميكروبية المعتمدة للمواد والمنتجات",
      "مراقبة البيئة الهوائية والمائية داخل صالات الإنتاج والغرف النظيفة",
      "اختبار كفاءة المواد الحافظة والتأكد من السلامة الجرثومية",
      "ضمان توفر أعلى درجات التعقيم في المنتجات الطبية"
    ],
    responsibilitiesEn: [
      "Performing microbial limit and safety testing on products",
      "Environmental monitoring of air and water in cleanrooms",
      "Challenge testing for preservative system efficacy",
      "Guaranteeing top-tier sterility for healthcare items"
    ]
  },
  {
    id: "customer-service",
    icon: Headset,
    color: "text-violet-600",
    bg: "bg-violet-50",
    nameEn: "Customer Service",
    nameAr: "خدمة العملاء",
    descEn: "Direct communication with clients, order tracking, and ensuring peak satisfaction.",
    descAr: "التواصل المباشر مع العملاء ومتابعة طلباتهم وضمان أقصى درجات الرضا.",
    responsibilitiesAr: [
      "متابعة استفسارات وطلبات العملاء بشكل مباشر وسريع",
      "إحاطة العملاء بمراحل التصنيع والتوزيع أولاً بأول",
      "معالجة الملاحظات والشكاوى بمهنية وفاعلية عالية",
      "قياس انطباعات العملاء وتقديم التوصيات للتحسين المستمر"
    ],
    responsibilitiesEn: [
      "Handling client inquiries and order updates promptly",
      "Keeping clients informed about manufacturing stages and delivery",
      "Resolving feedback and issues with high professionalism",
      "Measuring client satisfaction to fuel operational improvements"
    ]
  },
  {
    id: "legal",
    icon: Scale,
    color: "text-stone-600",
    bg: "bg-stone-50",
    nameEn: "Legal Department",
    nameAr: "الشؤون القانونية",
    descEn: "Drafting contracts, IP protection, and ensuring full regulatory compliance.",
    descAr: "صياغة وتوثيق العقود وحماية حقوق الملكية الفكرية والامتثال للأنظمة واللوائح.",
    responsibilitiesAr: [
      "صياغة ومراجعة اتفافية التصنيع التعاقدي (OEM) وعقود التوزيع",
      "حماية حقوق الملكية الفكرية والعلامات التجارية للمصنع والشركاء",
      "تقديم الاستشارات القانونية والتوافق مع الأنظمة السعودية والدولية",
      "تمثيل الشركة أمام الجهات الرسمية والتنظيمية"
    ],
    responsibilitiesEn: [
      "Drafting and reviewing OEM manufacturing & distribution agreements",
      "Protecting intellectual property rights and trademarks",
      "Providing legal advice regarding domestic and international compliance",
      "Representing the company before regulatory and judicial authorities"
    ]
  }
];
