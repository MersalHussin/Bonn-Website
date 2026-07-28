"use client";

import { useTranslation } from "react-i18next";
import Container from "../components/ui/Container";
import Breadcrumb from "../components/Breadcrumb";

export default function TermsAndConditions() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <div className="pt-[85px] pb-24 bg-gray-50 min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumb items={[{ label: isAr ? "الشروط والأحكام" : "Terms & Conditions" }]} className="mb-8 !bg-transparent !border-none" />
      <Container>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-main mb-8">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "1. قبول الشروط" : "1. Acceptance of Terms"}
              </h2>
              <p>
                {isAr 
                  ? "باستخدامك لموقع مصنع بون للصناعات الطبية (Bonn Medical Industries)، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا."
                  : "By using the Bonn Medical Industries website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our website."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "2. الخدمات المقدمة" : "2. Provided Services"}
              </h2>
              <p>
                {isAr 
                  ? "يقدم موقعنا معلومات حول خدمات التصنيع التعاقدي للمستلزمات الطبية، مستحضرات التجميل، والأجهزة الصحية. جميع المعلومات التقنية والمواصفات المذكورة على الموقع خاضعة لمعايير هيئة الغذاء والدواء السعودية (SFDA)."
                  : "Our website provides information about our contract manufacturing services for medical supplies, cosmetics, and health devices. All technical information and specifications mentioned on the site are subject to SFDA standards."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "3. حقوق الملكية الفكرية" : "3. Intellectual Property Rights"}
              </h2>
              <p>
                {isAr 
                  ? "جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والتصميمات والشعارات (Logo) والرسومات والفيديوهات، هي ملك لمصنع بون للصناعات الطبية ومحمية بموجب قوانين حقوق النشر. لا يجوز استخدامها أو إعادة إنتاجها بدون إذن كتابي مسبق."
                  : "All content on this website, including text, designs, logos, graphics, and videos, is the property of Bonn Medical Industries and is protected by copyright laws. It may not be used or reproduced without prior written permission."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "4. طلبات التصنيع والتعاقد" : "4. Manufacturing and Contracting Requests"}
              </h2>
              <p>
                {isAr 
                  ? "الطلبات المبدئية التي تتم عبر الموقع (مثل تعبئة نموذج 'ابدأ مشروعك') لا تعتبر عقداً نهائياً. يتم إبرام العقود الرسمية وتحديد الشروط والمواصفات ومواعيد التسليم بعد التواصل المباشر والدراسة الفنية من قبل فريقنا المتخصص."
                  : "Initial requests made through the website (e.g., filling out the 'Start Your Project' form) do not constitute a final contract. Official contracts, terms, specifications, and delivery dates are established after direct communication and technical review by our specialized team."}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {isAr ? "5. إخلاء المسؤولية" : "5. Disclaimer"}
              </h2>
              <p>
                {isAr 
                  ? "نبذل قصارى جهدنا لضمان دقة وتحديث المعلومات على الموقع، إلا أننا لا نضمن خلوه التام من الأخطاء. نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة قد تنشأ عن استخدام الموقع."
                  : "While we strive to ensure the accuracy and currency of information on our site, we do not guarantee it is completely error-free. We are not liable for any direct or indirect damages arising from the use of the site."}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
