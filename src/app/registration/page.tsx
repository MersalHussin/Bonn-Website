"use client";

import { useState, useEffect } from "react";
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
  const { t } = useTranslation();
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

  const [formData, setFormData] = useState<FormData>({
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
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  /* input classes - kept same tailwind details as original inputs */
  const inputClass =
    "w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none";
  const textareaClass = inputClass + " resize-none";

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

  if (!formData.agreeTerms) {
    alert(t("form.mustAgreeTerms"));
    return;
  }

  // تمنع الارسال المتكرر
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

    // نجاح
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);

    // لو عايز تمسح الحقول بعد الارسال
    setFormData({
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
    });

  } catch (error) {
    console.error("Submit exception:", error);
    alert("حدث خطأ غير متوقع. شوف الـ console.");
  } finally {
    setIsSubmitting(false);
  }
};

  /* Helper to disable submit button if required fields are empty */
  const isSubmitDisabled = !formData.companyName || !formData.email || !formData.agreeTerms;

  return (
    <section className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-b from-[#F8FBFF] to-white">
      {/* Floating interactive circles */}
      {circles.map((circle, i) => {
const circleX = typeof window !== "undefined" ? (window.innerWidth * parseFloat(circle.x)) / 100 : 0;
const circleY = typeof window !== "undefined" ? (window.innerHeight * parseFloat(circle.y)) / 100 : 0;


        const dx = mousePos.x - circleX;
        const dy = mousePos.y - circleY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const repelRadius = 150;
        let offsetX = 0;
        let offsetY = 0;
        let isRepelling = false;

        if (dist < repelRadius) {
          isRepelling = true;
          const angle = Math.atan2(dy, dx);
          const force = (repelRadius - dist) * 2;
          offsetX = -Math.cos(angle) * force;
          offsetY = -Math.sin(angle) * force;
        }

        return (
          <motion.div
            key={i}
            className="absolute rounded-full shadow-lg"
            style={{
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
              top: circle.y,
              left: circle.x,
            }}
            animate={
              isRepelling
                ? {
                    x: offsetX,
                    y: offsetY,
                    transition: { type: "spring", stiffness: 200, damping: 18 },
                  }
                : {
                    x: 0,
                    y: [0, -15, 0, 15, 0],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        );
      })}

      {/* Form Card */}
      <motion.div
        className="mt-20 relative w-full max-w-7xl bg-white/95 backdrop-blur-lg rounded-2xl py-10 px-1 md:px-10 md:py-14 border border-[#E0E7FF] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003D99] text-center mb-6">{t("form.title")}</h2>
        <p className="text-center text-gray-600 mb-10">{t("form.subtitle")}</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Section 1 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section1Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.companyName")}</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Contact person */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.contactPerson")}</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Telephone */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.telephone")}</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className={inputClass} />
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.email")}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>

              {/* Website */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.website")}</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} className={inputClass} />
              </div>

              {/* Postal Address */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.postalAddress")}</label>
                <input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleChange} className={inputClass} />
              </div>

              {/* Country select with flags */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.countryOfRegistration")}</label>
                <div className="mt-2">
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
                    placeholder={t("form.selectCountry")}
                    styles={{
                      control: (provided) => ({ ...provided, minHeight: 48, borderRadius: 12 }),
                    }}
                  />
                </div>
              </div>

              {/* Trade / license */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.tradeLicense")}</label>
                <input type="text" name="tradeLicense" value={formData.tradeLicense} onChange={handleChange} className={inputClass} />
              </div>

              {/* Year established */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.yearEstablished")}</label>
                <input type="number" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} className={inputClass} />
              </div>

              {/* Owners */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.owners")}</label>
                <textarea name="owners" value={formData.owners} onChange={handleChange} rows={2} className={textareaClass} />
              </div>
            </div>
          </div>

          {/* Section 2 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section2Title")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
              {/* Business Type (select) */}
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.businessType")}</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange} className={inputClass}>
                  <option value="">{t("form.selectOption")}</option>
                  <option value="brandOwner">{t("form.brandOwner")}</option>
                  <option value="distributor">{t("form.distributor")}</option>
                  <option value="retailer">{t("form.retailer")}</option>
                  <option value="ecommerce">{t("form.ecommerce")}</option>
                  <option value="other">{t("form.other")}</option>
                </select>
              </div>

              {/* Presence */}
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.presence")}</label>
                <input type="text" name="presence" value={formData.presence} onChange={handleChange} className={inputClass} />
              </div>

              {/* Turnover */}
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.turnover")}</label>
                <input type="text" name="turnover" value={formData.turnover} onChange={handleChange} className={inputClass} />
              </div>

              {/* Team size */}
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.teamSize")}</label>
                <select name="teamSize" value={formData.teamSize} onChange={handleChange} className={inputClass}>
                  <option value="">{t("form.selectOption")}</option>
                  <option value="1-10">{t("form.size_small")}</option>
                  <option value="11-50">{t("form.size_medium")}</option>
                  <option value="51-200">{t("form.size_large")}</option>
                  <option value="200+">{t("form.size_enterprise")}</option>
                </select>
              </div>

              {/* Partner brands */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.partnerBrands")}</label>
                <textarea name="partnerBrands" value={formData.partnerBrands} onChange={handleChange} rows={2} className={textareaClass} />
              </div>

              {/* References */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.references")}</label>
                <textarea name="references" value={formData.references} onChange={handleChange} rows={2} className={textareaClass} />
              </div>

              {/* Competitors */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.competitors")}</label>
                <textarea name="competitors" value={formData.competitors} onChange={handleChange} rows={2} className={textareaClass} />
              </div>
            </div>
          </div>

          {/* Section 3 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section3Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Requested products */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.requestedProducts")}</label>
                <textarea name="requestedProducts" value={formData.requestedProducts} onChange={handleChange} rows={3} className={textareaClass} />
              </div>

              {/* Target consumer */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.targetProfile")}</label>
                <input type="text" name="targetProfile" value={formData.targetProfile} onChange={handleChange} className={inputClass} />
              </div>

              {/* Category */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.productCategory")}</label>
                <select name="productCategory" value={formData.productCategory} onChange={handleChange} className={inputClass}>
                  <option value="">{t("form.selectOption")}</option>
                  <option value="hair">{t("form.hairCare")}</option>
                  <option value="skin">{t("form.skinCare")}</option>
                  <option value="personal">{t("form.personalCare")}</option>
                  <option value="color">{t("form.colorCosmetics")}</option>
                  <option value="other">{t("form.other")}</option>
                </select>
              </div>

              {/* Estimated launch */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.launchDate")}</label>
                <input type="text" name="launchDate" value={formData.launchDate} onChange={handleChange} placeholder={t("form.launchDatePlaceholder")} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Section 4 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section4Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.customFormulation")}</label>
                <select name="customFormulation" value={formData.customFormulation} onChange={handleChange} className={inputClass}>
                  <option value="">{t("form.selectOption")}</option>
                  <option value="yes">{t("form.yes")}</option>
                  <option value="no">{t("form.no")}</option>
                </select>
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.formulationDetails")}</label>
                <textarea name="formulationDetails" value={formData.formulationDetails} onChange={handleChange} rows={3} className={textareaClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.sampleQty")}</label>
                <input type="number" name="sampleQty" value={formData.sampleQty} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.sampleDeadline")}</label>
                <input type="text" name="sampleDeadline" value={formData.sampleDeadline} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.testingRequirements")}</label>
                <textarea name="testingRequirements" value={formData.testingRequirements} onChange={handleChange} rows={3} className={textareaClass} />
              </div>
            </div>
          </div>

          {/* Section 5 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section5Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.packagingRequirements")}</label>
                <textarea name="packagingRequirements" value={formData.packagingRequirements} onChange={handleChange} rows={3} className={textareaClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.packagingDetails")}</label>
                <input type="text" name="packagingDetails" value={formData.packagingDetails} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.artwork")}</label>
                <input type="text" name="artwork" value={formData.artwork} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.barcode")}</label>
                <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} className={inputClass} />
              </div>

             <div className="col-span-2 md:grid-cols-1">
  <label className="block text-sm font-medium text-[#003D99]">
    {t("form.localLanguage")}
  </label>

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
  />
</div>
            </div>
          </div>

          {/* Section 6 Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.section6Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.logisticsNeeds")}</label>
                <textarea name="logisticsNeeds" value={formData.logisticsNeeds} onChange={handleChange} rows={3} className={textareaClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.incoterms")}</label>
                <input type="text" name="incoterms" value={formData.incoterms} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.serialization")}</label>
                <input type="text" name="serialization" value={formData.serialization} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.deliveryLeadTime")}</label>
                <input type="text" name="deliveryLeadTime" value={formData.deliveryLeadTime} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.authorizedDistributors")}</label>
                <input type="text" name="authorizedDistributors" value={formData.authorizedDistributors} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.storageConditions")}</label>
                <textarea name="storageConditions" value={formData.storageConditions} onChange={handleChange} rows={2} className={textareaClass} />
              </div>
            </div>
          </div>

          {/* Declaration Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#F1F5FF] shadow-sm">
            <h3 className="text-xl font-semibold text-[#003D99] mb-4">{t("form.declarationTitle")}</h3>
            <p className="text-sm text-gray-600 mb-4">{t("form.declarationText")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.otherNotes")}</label>
                <textarea name="otherNotes" value={formData.otherNotes} onChange={handleChange} rows={3} className={textareaClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.signature")}</label>
                <input type="text" name="signature" value={formData.signature} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-2 md:grid-cols-1">
                <label className="block text-sm font-medium text-[#003D99]">{t("form.date")}</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Success message + Submit (keeps AnimatePresence like original) */}
  

          {/* ✅ Checkbox الشروط */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              {t("form.agreeTerms")}{" "}
              <Link href="/terms" className="text-blue-600 underline">
                {t("form.termsAndConditions")}
              </Link>
            </label>
          </div>

          {/* Success message + submit */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-green-600 font-semibold text-center mt-2"
              >
                {t("form.successMessage")}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`w-full py-3 bg-[#0056D2] text-white font-bold rounded-lg shadow-lg hover:scale-[1.02] transition-transform ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Submit Registration Form"
          >
            {t("form.submit")}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

