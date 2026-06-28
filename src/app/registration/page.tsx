"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import type { OptionProps, SingleValueProps } from "react-select";
import ReactCountryFlag from "react-country-flag";
import { components } from "react-select";
import Link from "next/link";

const countries = [
  { value: "AF", label: "Afghanistan (أفغانستان)", code: "AF" },
  { value: "AL", label: "Albania (ألبانيا)", code: "AL" },
  { value: "DZ", label: "Algeria (الجزائر)", code: "DZ" },
  { value: "AD", label: "Andorra (أندورا)", code: "AD" },
  { value: "AO", label: "Angola (أنغولا)", code: "AO" },
  { value: "AR", label: "Argentina (الأرجنتين)", code: "AR" },
  { value: "AM", label: "Armenia (أرمينيا)", code: "AM" },
  { value: "AU", label: "Australia (أستراليا)", code: "AU" },
  { value: "AT", label: "Austria (النمسا)", code: "AT" },
  { value: "AZ", label: "Azerbaijan (أذربيجان)", code: "AZ" },
  { value: "BH", label: "Bahrain (البحرين)", code: "BH" },
  { value: "BD", label: "Bangladesh (بنغلاديش)", code: "BD" },
  { value: "BE", label: "Belgium (بلجيكا)", code: "BE" },
  { value: "BR", label: "Brazil (البرازيل)", code: "BR" },
  { value: "BN", label: "Brunei (بروناي)", code: "BN" },
  { value: "BG", label: "Bulgaria (بلغاريا)", code: "BG" },
  { value: "CA", label: "Canada (كندا)", code: "CA" },
  { value: "CN", label: "China (الصين)", code: "CN" },
  { value: "CO", label: "Colombia (كولومبيا)", code: "CO" },
  { value: "CU", label: "Cuba (كوبا)", code: "CU" },
  { value: "CY", label: "Cyprus (قبرص)", code: "CY" },
  { value: "CZ", label: "Czech Republic (التشيك)", code: "CZ" },
  { value: "DK", label: "Denmark (الدنمارك)", code: "DK" },
  { value: "DJ", label: "Djibouti (جيبوتي)", code: "DJ" },
  { value: "EG", label: "Egypt (مصر)", code: "EG" },
  { value: "AE", label: "United Arab Emirates (الإمارات)", code: "AE" },
  { value: "SA", label: "Saudi Arabia (السعودية)", code: "SA" },
  { value: "KW", label: "Kuwait (الكويت)", code: "KW" },
  { value: "QA", label: "Qatar (قطر)", code: "QA" },
  { value: "OM", label: "Oman (عُمان)", code: "OM" },
  { value: "YE", label: "Yemen (اليمن)", code: "YE" },
  { value: "JO", label: "Jordan (الأردن)", code: "JO" },
  { value: "PS", label: "Palestine (فلسطين)", code: "PS" },
  { value: "LB", label: "Lebanon (لبنان)", code: "LB" },
  { value: "SY", label: "Syria (سوريا)", code: "SY" },
  { value: "IQ", label: "Iraq (العراق)", code: "IQ" },
  { value: "LY", label: "Libya (ليبيا)", code: "LY" },
  { value: "MA", label: "Morocco (المغرب)", code: "MA" },
  { value: "TN", label: "Tunisia (تونس)", code: "TN" },
  { value: "SD", label: "Sudan (السودان)", code: "SD" },
  { value: "SO", label: "Somalia (الصومال)", code: "SO" },
  { value: "MR", label: "Mauritania (موريتانيا)", code: "MR" },
  { value: "DZ", label: "Algeria (الجزائر)", code: "DZ" },
  { value: "FR", label: "France (فرنسا)", code: "FR" },
  { value: "DE", label: "Germany (ألمانيا)", code: "DE" },
  { value: "GB", label: "United Kingdom (المملكة المتحدة)", code: "GB" },
  { value: "US", label: "United States (الولايات المتحدة)", code: "US" },
  { value: "KR", label: "South Korea (كوريا الجنوبية)", code: "KR" },
  { value: "KP", label: "North Korea (كوريا الشمالية)", code: "KP" },
  { value: "JP", label: "Japan (اليابان)", code: "JP" },
  { value: "IN", label: "India (الهند)", code: "IN" },
  { value: "PK", label: "Pakistan (باكستان)", code: "PK" },
  { value: "TR", label: "Turkey (تركيا)", code: "TR" },
  { value: "ES", label: "Spain (إسبانيا)", code: "ES" },
  { value: "IT", label: "Italy (إيطاليا)", code: "IT" },
  { value: "GR", label: "Greece (اليونان)", code: "GR" },
  { value: "RU", label: "Russia (روسيا)", code: "RU" },
  { value: "UA", label: "Ukraine (أوكرانيا)", code: "UA" },
  { value: "PL", label: "Poland (بولندا)", code: "PL" },
  { value: "SE", label: "Sweden (السويد)", code: "SE" },
  { value: "NO", label: "Norway (النرويج)", code: "NO" },
  { value: "FI", label: "Finland (فنلندا)", code: "FI" },
  { value: "CH", label: "Switzerland (سويسرا)", code: "CH" },
  { value: "NL", label: "Netherlands (هولندا)", code: "NL" },
  { value: "BE", label: "Belgium (بلجيكا)", code: "BE" },
  { value: "PT", label: "Portugal (البرتغال)", code: "PT" },
  { value: "ZA", label: "South Africa (جنوب أفريقيا)", code: "ZA" },
  { value: "NG", label: "Nigeria (نيجيريا)", code: "NG" },
  { value: "KE", label: "Kenya (كينيا)", code: "KE" },
  { value: "ET", label: "Ethiopia (إثيوبيا)", code: "ET" },
  { value: "GH", label: "Ghana (غانا)", code: "GH" },
  { value: "UG", label: "Uganda (أوغندا)", code: "UG" },
  { value: "TZ", label: "Tanzania (تنزانيا)", code: "TZ" },
  { value: "CA", label: "Canada (كندا)", code: "CA" },
  { value: "MX", label: "Mexico (المكسيك)", code: "MX" },
  { value: "AR", label: "Argentina (الأرجنتين)", code: "AR" },
  { value: "CL", label: "Chile (تشيلي)", code: "CL" },
  { value: "PE", label: "Peru (بيرو)", code: "PE" },
  { value: "VE", label: "Venezuela (فنزويلا)", code: "VE" },
  { value: "CO", label: "Colombia (كولومبيا)", code: "CO" },
  { value: "AU", label: "Australia (أستراليا)", code: "AU" },
  { value: "NZ", label: "New Zealand (نيوزيلندا)", code: "NZ" },
].sort((a, b) => a.label.localeCompare(b.label));

type CountryOption = { value: string; label: string; code: string };

/* Floating circles used in background (same logic) */
const circles = [
  { size: 120, color: "#DCEEFF", x: "8%", y: "18%" },
  { size: 160, color: "#99C2FF", x: "78%", y: "30%" },
  { size: 100, color: "#B3D9FF", x: "18%", y: "70%" },
  { size: 140, color: "#CCE5FF", x: "70%", y: "75%" },
  { size: 180, color: "#A3CCFF", x: "50%", y: "10%" },
];



// Custom Option
  const customOption = (props: OptionProps<CountryOption, false>) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex items-center gap-2">
          <ReactCountryFlag
            countryCode={data.value}
            svg
            title={data.label}
            style={{ width: "1.5em", height: "1em" }}
          />
          <span>{data.label}</span>
        </div>
      </components.Option>
    );
  };

  const customSingleValue = (props: SingleValueProps<CountryOption, false>) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          <ReactCountryFlag
            countryCode={data.value}
            svg
            title={data.label}
            style={{ width: "1.5em", height: "1em" }}
          />
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

export default function FullClientEvaluationForm() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const steps = [
    t("form.section1Title") || "Company Info",
    t("form.section2Title") || "Business Profile",
    t("form.section3Title") || "Products",
    t("form.section4Title") || "Formulation",
    t("form.section5Title") || "Packaging",
    t("form.section6Title") || "Logistics",
    t("form.declarationTitle") || "Declaration"
  ];

  const handleNext = () => {
    if (!isStepCompleted(currentStep)) {
      alert(isRTL ? "يرجى ملء جميع الحقول في هذه المرحلة قبل الانتقال للمرحلة التالية." : "Please fill all fields in this step before proceeding to the next step.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    const languageOptions = [
    { value: "ar", label: "Arabic" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ru", label: "Russian" },
  ];

  /* mouse pos for repelling circles */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* form state */
  interface FormData {
    companyName: string;
    contactPerson: string;
    telephone: string;
    email: string;
    website: string;
    postalAddress: string;
    country: string;
    tradeLicense: string;
    yearEstablished: string;
    owners: string;
    businessType: string;
    presence: string;
    turnover: string;
    teamSize: string;
    partnerBrands: string;
    references: string;
    competitors: string;
    requestedProducts: string;
    targetProfile: string;
    productCategory: string;
    launchDate: string;
    customFormulation: string;
    formulationDetails: string;
    sampleQty: string;
    sampleDeadline: string;
    testingRequirements: string;
    packagingRequirements: string;
    packagingDetails: string;
    artwork: string;
    barcode: string;
    localLanguage: string;
    logisticsNeeds: string;
    incoterms: string;
    serialization: string;
    deliveryLeadTime: string;
    authorizedDistributors: string;
    storageConditions: string;
    otherNotes: string;
    signature: string;
    date: string;
    agreeTerms: boolean; // checkbox
  }

  const initialFormState: FormData = {
    companyName: "",
    contactPerson: "",
    telephone: "",
    email: "",
    website: "",
    postalAddress: "",
    country: "",
    tradeLicense: "",
    yearEstablished: "",
    owners: "",
    businessType: "",
    presence: "",
    turnover: "",
    teamSize: "",
    partnerBrands: "",
    references: "",
    competitors: "",
    requestedProducts: "",
    targetProfile: "",
    productCategory: "",
    launchDate: "",
    customFormulation: "",
    formulationDetails: "",
    sampleQty: "",
    sampleDeadline: "",
    testingRequirements: "",
    packagingRequirements: "",
    packagingDetails: "",
    artwork: "",
    barcode: "",
    localLanguage: "",
    logisticsNeeds: "",
    incoterms: "",
    serialization: "",
    deliveryLeadTime: "",
    authorizedDistributors: "",
    storageConditions: "",
    otherNotes: "",
    signature: "",
    date: "",
    agreeTerms: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isStepCompleted = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return !!(
          formData.companyName &&
          formData.contactPerson &&
          formData.telephone &&
          formData.email &&
          formData.website &&
          formData.country &&
          formData.tradeLicense &&
          formData.yearEstablished &&
          formData.postalAddress &&
          formData.owners
        );
      case 1:
        return !!(
          formData.businessType &&
          formData.presence &&
          formData.turnover &&
          formData.teamSize &&
          formData.partnerBrands &&
          formData.references &&
          formData.competitors
        );
      case 2:
        return !!(
          formData.requestedProducts &&
          formData.targetProfile &&
          formData.productCategory &&
          formData.launchDate
        );
      case 3:
        return !!(
          formData.customFormulation &&
          formData.sampleQty &&
          formData.formulationDetails &&
          formData.sampleDeadline &&
          formData.testingRequirements
        );
      case 4:
        return !!(
          formData.packagingRequirements &&
          formData.packagingDetails &&
          formData.artwork &&
          formData.barcode &&
          formData.localLanguage
        );
      case 5:
        return !!(
          formData.logisticsNeeds &&
          formData.incoterms &&
          formData.serialization &&
          formData.deliveryLeadTime &&
          formData.authorizedDistributors &&
          formData.storageConditions
        );
      case 6:
        return !!(
          formData.otherNotes &&
          formData.signature &&
          formData.date &&
          formData.agreeTerms
        );
      default:
        return false;
    }
  };

  const canGoToStep = (index: number): boolean => {
    for (let i = 0; i < index; i++) {
      if (!isStepCompleted(i)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const savedForm = localStorage.getItem("registrationFormCache");
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setFormData(parsed);
        // We cannot reliably resolve the selectedCountry here without access to 'countries' array from outside, 
        // but wait, 'countries' is defined inside the file on top. Let's find it.
        // If it's not strictly necessary, we just set the string in formData and ReactSelect will figure it out if we pass the value object.
      } catch (e) {
        console.error("Failed to load form cache", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registrationFormCache", JSON.stringify(formData));
  }, [formData]);

  /* input classes - kept same tailwind details as original inputs */
  const getPlaceholder = (field: keyof FormData) => {
    const placeholders: Record<keyof FormData, { ar: string; en: string }> = {
      companyName: { ar: "مثال: شركة بون المحدودة", en: "e.g. Boon Medical LLC" },
      contactPerson: { ar: "مثال: أحمد محمد", en: "e.g. John Doe" },
      telephone: { ar: "مثال: 971501234567+", en: "e.g. +971501234567" },
      email: { ar: "مثال: info@company.com", en: "e.g. info@company.com" },
      website: { ar: "مثال: www.company.com", en: "e.g. www.company.com" },
      postalAddress: { ar: "مثال: ص.ب 12345، دبي، الإمارات العربية المتحدة", en: "e.g. P.O. Box 12345, Dubai, UAE" },
      country: { ar: "اختر الدولة", en: "Select Country" },
      tradeLicense: { ar: "مثال: 123456-TR", en: "e.g. 123456-TR" },
      yearEstablished: { ar: "مثال: 2020", en: "e.g. 2020" },
      owners: { ar: "مثال: اكتب أسماء الشركاء الرئيسيين ونسب الملكية...", en: "e.g. List main shareholders and ownership %..." },
      businessType: { ar: "اختر نوع العمل", en: "Select Business Type" },
      presence: { ar: "مثال: الإمارات، السعودية، مصر", en: "e.g. UAE, Saudi Arabia, Egypt" },
      turnover: { ar: "مثال: 5 ملايين دولار سنوياً", en: "e.g. $5 Million USD annually" },
      teamSize: { ar: "اختر عدد الموظفين", en: "Select team size" },
      partnerBrands: { ar: "مثال: ماركة أ، ماركة ب...", en: "e.g. Brand A, Brand B..." },
      references: { ar: "مثال: اسم وتفاصيل اتصال مرجع تجاري...", en: "e.g. Trade reference contact details..." },
      competitors: { ar: "مثال: شركة س، شركة ص...", en: "e.g. Competitor A, Competitor B..." },
      requestedProducts: { ar: "مثال: شامبو خالي من السلفات، كريم مرطب للبشرة...", en: "e.g. Sulfate-free shampoo, Moisturizing cream..." },
      targetProfile: { ar: "مثال: النساء من سن 20 إلى 45 عاماً", en: "e.g. Women aged 20-45" },
      productCategory: { ar: "اختر التصنيف", en: "Select Category" },
      launchDate: { ar: "مثال: الربع الأول 2027", en: "e.g. Q1 2027" },
      customFormulation: { ar: "هل تحتاج تركيبة خاصة؟", en: "Do you need custom formulation?" },
      formulationDetails: { ar: "مثال: تركيبة نباتية تحتوي على حمض الهيالورونيك والصبار...", en: "e.g. Vegan formula with Hyaluronic Acid & Aloe..." },
      sampleQty: { ar: "مثال: 5 عينات", en: "e.g. 5 samples" },
      sampleDeadline: { ar: "مثال: 15 سبتمبر 2026", en: "e.g. 15 September 2026" },
      testingRequirements: { ar: "مثال: اختبار الاستقرار، اختبار الحساسية للجلد...", en: "e.g. Stability testing, Dermatological testing..." },
      packagingRequirements: { ar: "مثال: عبوات زجاجية معتمة مع مضخة بيضاء...", en: "e.g. Amber glass bottles with white pump..." },
      packagingDetails: { ar: "مثال: حجم 50 مل و 100 مل...", en: "e.g. 50ml and 100ml sizes..." },
      artwork: { ar: "مثال: التصميم جاهز وبانتظار الموافقة", en: "e.g. Ready and pending approval" },
      barcode: { ar: "مثال: نحتاج باركود GS1 جديد", en: "e.g. Need new GS1 barcodes" },
      localLanguage: { ar: "اختر اللغة المحلية", en: "Select Local Language" },
      logisticsNeeds: { ar: "مثال: شحن مبرد، شحن جوي سريع...", en: "e.g. Temperature-controlled shipping, Express air freight..." },
      incoterms: { ar: "مثال: FOB Dubai, CIF Hamburg", en: "e.g. FOB Dubai, CIF Hamburg" },
      serialization: { ar: "مثال: مطلوب حسب شروط وزارة الصحة", en: "e.g. Required as per MOH regulations" },
      deliveryLeadTime: { ar: "مثال: خلال 30 يوم من تأكيد الطلب", en: "e.g. Within 30 days of order confirmation" },
      authorizedDistributors: { ar: "مثال: شركة التوزيع الطبية أ", en: "e.g. Medical Distribution Co. A" },
      storageConditions: { ar: "مثال: تحت 25 درجة مئوية، بعيداً عن الرطوبة", en: "e.g. Store below 25°C, away from moisture" },
      otherNotes: { ar: "مثال: أي متطلبات خاصة أخرى تود ذكرها...", en: "e.g. Any other special requirements..." },
      signature: { ar: "اكتب اسمك الكامل هنا كالتوقيع الإلكتروني", en: "Type your full name as digital signature" },
      date: { ar: "تاريخ اليوم", en: "Today's Date" },
      agreeTerms: { ar: "", en: "" }
    };
    return isRTL ? placeholders[field].ar : placeholders[field].en;
  };

  /* input classes - optimized for modern look and smaller vertical footprint */
  const inputClass =
    "w-full mt-1.5 px-4 py-2.5 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 bg-white/80 focus:bg-white text-gray-800";
  const textareaClass = inputClass + " resize-none min-h-[76px]";

  /* handle generic change for inputs/selects/textarea */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev: FormData) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryChange = (option: CountryOption | null) => {
    setSelectedCountry(option);
    setFormData((prev: FormData) => ({ ...prev, country: option?.value || "" }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if the user is not on the final step
    if (currentStep !== steps.length - 1) {
      return;
    }

    if (!formData.agreeTerms) {
      alert(t("form.mustAgreeTerms"));
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = { ...formData };

      const res = await fetch("/api/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Submit failed:", err);
        alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        setIsSubmitting(false);
        return;
      }

      // Open the success modal popup
      setShowSuccessModal(true);

      setFormData(initialFormState);
      setSelectedCountry(null);
      setCurrentStep(0);
      localStorage.removeItem("registrationFormCache");

    } catch (error) {
      console.error("Submit exception:", error);
      alert("حدث خطأ غير متوقع. شوف الـ console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent Enter key in inputs from submitting the form prematurely
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault();
    }
  };

  const isSubmitDisabled = !formData.companyName || !formData.email || !formData.agreeTerms;

  return (
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-b from-[#F8FBFF] to-white py-10">
      
      {/* Form Card */}
      <motion.div
        className="mt-14 relative w-full max-w-5xl bg-white/95 backdrop-blur-lg rounded-2xl py-6 px-4 md:px-8 md:py-8 border border-[#E0E7FF] shadow-[0_8px_40px_rgba(0,0,0,0.06)] mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--second-color)] text-center mb-2">{t("form.title")}</h2>
        <p className="text-center text-sm text-gray-500 mb-6">{t("form.subtitle")}</p>

        {/* Progress Bar */}
        <div className="mb-6 px-2 md:px-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 h-1 bg-main z-0 rounded-full transition-all duration-500 ease-in-out ${isRTL ? 'right-0' : 'left-0'}`}
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isClickable = canGoToStep(index) && index !== currentStep;
              const isLocked = !canGoToStep(index);
              const isCompleted = isStepCompleted(index);

              return (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (canGoToStep(index)) {
                        setCurrentStep(index);
                      }
                    }}
                    disabled={isLocked}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      isActive
                        ? "bg-main text-white ring-4 ring-blue-100 border-2 border-white scale-110 cursor-default"
                        : isClickable
                        ? "bg-blue-50 text-main border-2 border-main/40 hover:bg-main hover:text-white hover:border-main cursor-pointer"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-100 cursor-not-allowed"
                    }`}
                  >
                    {isActive ? index + 1 : (isClickable && isCompleted) ? "✓" : index + 1}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <h3 className="text-lg md:text-xl font-bold text-[var(--second-color)]">{steps[currentStep]}</h3>
            <span className="text-xs text-gray-400">{t("form.step")} {currentStep + 1} {t("form.of")} {steps.length}</span>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {/* Section 1 Card */}
              {currentStep === 0 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section1Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Company name */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.companyName")} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        placeholder={getPlaceholder("companyName")}
                        className={inputClass}
                      />
                    </div>

                    {/* Contact person */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.contactPerson")}</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder={getPlaceholder("contactPerson")}
                        className={inputClass}
                      />
                    </div>

                    {/* Telephone */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.telephone")}</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder={getPlaceholder("telephone")}
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.email")} <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={getPlaceholder("email")}
                        className={inputClass}
                      />
                    </div>

                    {/* Website */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.website")}</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder={getPlaceholder("website")}
                        className={inputClass}
                      />
                    </div>

                    {/* Country select with flags */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.countryOfRegistration")}</label>
                      <div className="mt-1.5">
                        <Select
                          options={countries}
                          value={selectedCountry}
                          onChange={(opt) => handleCountryChange(opt as CountryOption)}
                          components={{
                            Option: customOption as React.ComponentType<OptionProps<CountryOption, false>>,
                            SingleValue: customSingleValue as React.ComponentType<SingleValueProps<CountryOption, false>>
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isClearable
                          placeholder={getPlaceholder("country")}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: 42,
                              borderRadius: 12,
                              borderColor: state.isFocused ? 'var(--main)' : '#E5E7EB',
                              boxShadow: state.isFocused ? '0 0 0 2px rgba(0,118,255,0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
                              fontSize: '0.875rem',
                              '&:hover': {
                                borderColor: '#D1D5DB'
                              }
                            }),
                          }}
                        />
                      </div>
                    </div>

                    {/* Trade / license */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.tradeLicense")}</label>
                      <input
                        type="text"
                        name="tradeLicense"
                        value={formData.tradeLicense}
                        onChange={handleChange}
                        placeholder={getPlaceholder("tradeLicense")}
                        className={inputClass}
                      />
                    </div>

                    {/* Year established */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.yearEstablished")}</label>
                      <input
                        type="number"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleChange}
                        placeholder={getPlaceholder("yearEstablished")}
                        className={inputClass}
                      />
                    </div>

                    {/* Postal Address */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.postalAddress")}</label>
                      <input
                        type="text"
                        name="postalAddress"
                        value={formData.postalAddress}
                        onChange={handleChange}
                        placeholder={getPlaceholder("postalAddress")}
                        className={inputClass}
                      />
                    </div>

                    {/* Owners */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.owners")}</label>
                      <textarea
                        name="owners"
                        value={formData.owners}
                        onChange={handleChange}
                        placeholder={getPlaceholder("owners")}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2 Card */}
              {currentStep === 1 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section2Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Business Type (select) */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.businessType")}</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t("form.selectOption")}</option>
                        <option value="brandOwner">{t("form.brandOwner")}</option>
                        <option value="distributor">{t("form.distributor")}</option>
                        <option value="retailer">{t("form.retailer")}</option>
                        <option value="ecommerce">{t("form.ecommerce")}</option>
                        <option value="other">{t("form.other")}</option>
                      </select>
                    </div>

                    {/* Team size */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.teamSize")}</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t("form.selectOption")}</option>
                        <option value="1-10">{t("form.size_small")}</option>
                        <option value="11-50">{t("form.size_medium")}</option>
                        <option value="51-200">{t("form.size_large")}</option>
                        <option value="200+">{t("form.size_enterprise")}</option>
                      </select>
                    </div>

                    {/* Presence */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.presence")}</label>
                      <input
                        type="text"
                        name="presence"
                        value={formData.presence}
                        onChange={handleChange}
                        placeholder={getPlaceholder("presence")}
                        className={inputClass}
                      />
                    </div>

                    {/* Turnover */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.turnover")}</label>
                      <input
                        type="text"
                        name="turnover"
                        value={formData.turnover}
                        onChange={handleChange}
                        placeholder={getPlaceholder("turnover")}
                        className={inputClass}
                      />
                    </div>

                    {/* Partner brands */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.partnerBrands")}</label>
                      <textarea
                        name="partnerBrands"
                        value={formData.partnerBrands}
                        onChange={handleChange}
                        placeholder={getPlaceholder("partnerBrands")}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>

                    {/* References */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.references")}</label>
                      <textarea
                        name="references"
                        value={formData.references}
                        onChange={handleChange}
                        placeholder={getPlaceholder("references")}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>

                    {/* Competitors */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.competitors")}</label>
                      <textarea
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleChange}
                        placeholder={getPlaceholder("competitors")}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3 Card */}
              {currentStep === 2 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section3Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Requested products */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.requestedProducts")}</label>
                      <textarea
                        name="requestedProducts"
                        value={formData.requestedProducts}
                        onChange={handleChange}
                        placeholder={getPlaceholder("requestedProducts")}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>

                    {/* Target consumer */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.targetProfile")}</label>
                      <input
                        type="text"
                        name="targetProfile"
                        value={formData.targetProfile}
                        onChange={handleChange}
                        placeholder={getPlaceholder("targetProfile")}
                        className={inputClass}
                      />
                    </div>

                    {/* Category */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.productCategory")}</label>
                      <select
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t("form.selectOption")}</option>
                        <option value="hair">{t("form.hairCare")}</option>
                        <option value="skin">{t("form.skinCare")}</option>
                        <option value="personal">{t("form.personalCare")}</option>
                        <option value="color">{t("form.colorCosmetics")}</option>
                        <option value="other">{t("form.other")}</option>
                      </select>
                    </div>

                    {/* Estimated launch */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.launchDate")}</label>
                      <input
                        type="text"
                        name="launchDate"
                        value={formData.launchDate}
                        onChange={handleChange}
                        placeholder={getPlaceholder("launchDate")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4 Card */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section4Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.customFormulation")}</label>
                      <select
                        name="customFormulation"
                        value={formData.customFormulation}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t("form.selectOption")}</option>
                        <option value="yes">{t("form.yes")}</option>
                        <option value="no">{t("form.no")}</option>
                      </select>
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.sampleQty")}</label>
                      <input
                        type="number"
                        name="sampleQty"
                        value={formData.sampleQty}
                        onChange={handleChange}
                        placeholder={getPlaceholder("sampleQty")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.formulationDetails")}</label>
                      <textarea
                        name="formulationDetails"
                        value={formData.formulationDetails}
                        onChange={handleChange}
                        placeholder={getPlaceholder("formulationDetails")}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.sampleDeadline")}</label>
                      <input
                        type="text"
                        name="sampleDeadline"
                        value={formData.sampleDeadline}
                        onChange={handleChange}
                        placeholder={getPlaceholder("sampleDeadline")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.testingRequirements")}</label>
                      <textarea
                        name="testingRequirements"
                        value={formData.testingRequirements}
                        onChange={handleChange}
                        placeholder={getPlaceholder("testingRequirements")}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5 Card */}
              {currentStep === 4 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section5Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.packagingRequirements")}</label>
                      <textarea
                        name="packagingRequirements"
                        value={formData.packagingRequirements}
                        onChange={handleChange}
                        placeholder={getPlaceholder("packagingRequirements")}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.packagingDetails")}</label>
                      <input
                        type="text"
                        name="packagingDetails"
                        value={formData.packagingDetails}
                        onChange={handleChange}
                        placeholder={getPlaceholder("packagingDetails")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.artwork")}</label>
                      <input
                        type="text"
                        name="artwork"
                        value={formData.artwork}
                        onChange={handleChange}
                        placeholder={getPlaceholder("artwork")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.barcode")}</label>
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                        placeholder={getPlaceholder("barcode")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        {t("form.localLanguage")}
                      </label>
                      <div className="mt-1.5">
                        <Select
                          options={languageOptions}
                          value={languageOptions.filter(opt =>
                            formData.localLanguage?.includes(opt.value)
                          )}
                          onChange={(selected) =>
                            setFormData((prev: FormData) => ({
                              ...prev,
                              localLanguage: (selected as { value: string } | null)?.value || ""
                            }))
                          }
                          placeholder={getPlaceholder("localLanguage")}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: 42,
                              borderRadius: 12,
                              borderColor: state.isFocused ? 'var(--main)' : '#E5E7EB',
                              boxShadow: state.isFocused ? '0 0 0 2px rgba(0,118,255,0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
                              fontSize: '0.875rem',
                              '&:hover': {
                                borderColor: '#D1D5DB'
                              }
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 6 Card */}
              {currentStep === 5 && (
                <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--second-color)] mb-4 border-b border-gray-100 pb-2">{t("form.section6Title")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.logisticsNeeds")}</label>
                      <textarea
                        name="logisticsNeeds"
                        value={formData.logisticsNeeds}
                        onChange={handleChange}
                        placeholder={getPlaceholder("logisticsNeeds")}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.incoterms")}</label>
                      <input
                        type="text"
                        name="incoterms"
                        value={formData.incoterms}
                        onChange={handleChange}
                        placeholder={getPlaceholder("incoterms")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.serialization")}</label>
                      <input
                        type="text"
                        name="serialization"
                        value={formData.serialization}
                        onChange={handleChange}
                        placeholder={getPlaceholder("serialization")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.deliveryLeadTime")}</label>
                      <input
                        type="text"
                        name="deliveryLeadTime"
                        value={formData.deliveryLeadTime}
                        onChange={handleChange}
                        placeholder={getPlaceholder("deliveryLeadTime")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.authorizedDistributors")}</label>
                      <input
                        type="text"
                        name="authorizedDistributors"
                        value={formData.authorizedDistributors}
                        onChange={handleChange}
                        placeholder={getPlaceholder("authorizedDistributors")}
                        className={inputClass}
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.storageConditions")}</label>
                      <textarea
                        name="storageConditions"
                        value={formData.storageConditions}
                        onChange={handleChange}
                        placeholder={getPlaceholder("storageConditions")}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Declaration Card */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 md:p-6 border border-[#F1F5FF] shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--second-color)] mb-2 border-b border-gray-100 pb-2">{t("form.declarationTitle")}</h3>
                    <p className="text-xs text-gray-500 mb-4">{t("form.declarationText")}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.otherNotes")}</label>
                        <textarea
                          name="otherNotes"
                          value={formData.otherNotes}
                          onChange={handleChange}
                          placeholder={getPlaceholder("otherNotes")}
                          rows={3}
                          className={textareaClass}
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.signature")}</label>
                        <input
                          type="text"
                          name="signature"
                          value={formData.signature}
                          onChange={handleChange}
                          placeholder={getPlaceholder("signature")}
                          className={inputClass}
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">{t("form.date")}</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checkbox الشروط */}
                  <div className="flex items-center gap-2 mt-2 px-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-main focus:ring-main border-gray-300 rounded"
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                      {t("form.agreeTerms")}{" "}
                      <Link href="/terms" className="text-main hover:underline font-semibold">
                        {t("form.termsAndConditions")}
                      </Link>
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-600 text-sm font-semibold text-center mt-4"
              >
                {t("form.successMessage")}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons Area */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 gap-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-6 py-2.5 rounded-xl cursor-pointer text-sm font-bold transition-all ${
                currentStep === 0 ? "opacity-0 cursor-default pointer-events-none" : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {t("form.previous") || "Previous"}
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                key="next-step-button"
                type="button"
                onClick={handleNext}
                className="px-8 py-2.5 bg-main cursor-pointer text-white text-sm font-bold rounded-xl shadow-md hover:bg-main/90 hover:-translate-y-0.5 transition-all"
              >
                {t("form.next") || "Next"}
              </button>
            ) : (
              <button
                key="submit-form-button"
                type="submit"
                disabled={isSubmitDisabled || isSubmitting}
                className={`px-8 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-green-700 hover:-translate-y-0.5 transition-all ${
                  isSubmitDisabled || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Beautiful Success Modal Popup */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center z-10 overflow-hidden"
            >
              {/* Decorative top pattern */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
              
              {/* Animated Green Checkmark Icon */}
              <div className="flex justify-center mb-6 mt-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500"
                >
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {isRTL ? "تم استلام طلبك بنجاح!" : "Request Submitted Successfully!"}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {isRTL 
                  ? "نشكرك على اهتمامك بـ Boon. لقد تم حفظ بياناتك بنجاح، وسيقوم فريقنا بمراجعتها والتواصل معك في أقرب وقت ممكن لمتابعة الطلب."
                  : "Thank you for your interest in Boon. Your details have been saved successfully, and our team will review them and contact you very soon."
                }
              </p>
              
              {/* Action Button */}
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {isRTL ? "حسناً، فهمت" : "Okay, Got it"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

