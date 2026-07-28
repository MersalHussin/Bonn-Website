"use client";

import { useTranslation } from "react-i18next";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/Breadcrumb";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <div className="pt-[85px] pb-24 bg-gray-50 min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumb items={[{ label: isAr ? "سياسة الخصوصية" : "Privacy Policy" }]} className="mb-8 !bg-transparent !border-none" />
      <Container>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-main mb-8">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "1. مقدمة" : "1. Introduction"}
              </h2>
              <p>
                {isAr 
                  ? "مرحباً بكم في موقع مصنع بون للصناعات الطبية (Bonn Medical Industries). نحن نقدر خصوصيتكم ونلتزم بحماية بياناتكم الشخصية. تشرح سياسة الخصوصية هذه كيف نقوم بجمع واستخدام وحماية المعلومات عند زيارتكم لموقعنا أو استخدام خدماتنا."
                  : "Welcome to Bonn Medical Industries. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "2. المعلومات التي نجمعها" : "2. Information We Collect"}
              </h2>
              <p>
                {isAr 
                  ? "قد نقوم بجمع معلومات شخصية مثل الاسم، البريد الإلكتروني، ورقم الهاتف عند تواصلكم معنا لطلب خدمات التصنيع (مستحضرات التجميل، الأجهزة الطبية، المنتجات الصحية). كما نجمع بيانات غير شخصية مثل نوع المتصفح وعنوان IP لتحسين تجربة تصفح الموقع."
                  : "We may collect personal information such as your name, email, and phone number when you contact us to request manufacturing services (cosmetics, medical devices, health products). We also collect non-personal data like browser type and IP address to improve your browsing experience."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "3. كيف نستخدم معلوماتك" : "3. How We Use Your Information"}
              </h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>{isAr ? "للرد على استفساراتكم وطلبات التصنيع الخاصة بكم." : "To respond to your inquiries and manufacturing requests."}</li>
                <li>{isAr ? "لتحسين موقعنا وتطوير خدماتنا بما يتوافق مع معايير cGMP." : "To improve our website and develop our services in compliance with cGMP standards."}</li>
                <li>{isAr ? "لإرسال تحديثات حول خدماتنا الطبية والتجميلية (في حال موافقتكم)." : "To send updates about our medical and cosmetic services (with your consent)."}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "4. حماية البيانات" : "4. Data Protection"}
              </h2>
              <p>
                {isAr 
                  ? "نتخذ إجراءات أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. كشركة طبية معتمدة (ISO 9001، ISO 13485)، نطبق أعلى معايير الأمان حتى في أنظمتنا الرقمية."
                  : "We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. As a certified medical company (ISO 9001, ISO 13485), we apply the highest security standards even in our digital systems."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "5. التواصل معنا" : "5. Contact Us"}
              </h2>
              <p>
                {isAr 
                  ? "إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني marketing@bonnmed.com أو زيارة مقرنا في المدينة الصناعية الثانية بالرياض."
                  : "If you have any questions about this Privacy Policy, please contact us at marketing@bonnmed.com or visit our headquarters in the 2nd Industrial City, Riyadh."}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
