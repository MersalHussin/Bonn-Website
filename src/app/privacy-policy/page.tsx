"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [activeTab, setActiveTab] = useState<"general" | "medical" | "food" | "gmp">("general");

  return (
    <div className="pt-[85px] pb-24 bg-gray-50 min-h-screen" dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumb items={[{ label: isAr ? "سياسة الخصوصية" : "Privacy Policy" }]} className="mb-8 !bg-transparent !border-none" />
      <Container>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-main mb-4">
              {isAr ? "السياسات والخصوصية" : "Policies & Privacy"}
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {isAr 
                ? "تعرف على سياساتنا المتعلقة بالخصوصية، الجودة، وسلامة الغذاء." 
                : "Learn about our policies regarding privacy, quality, and food safety."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 pb-8 border-b border-gray-100">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base border ${
                activeTab === "general"
                  ? "bg-main text-white border-main shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-main hover:text-main hover:bg-gray-50"
              }`}
            >
              {isAr ? "السياسة العامة" : "General Policy"}
            </button>
            <button
              onClick={() => setActiveTab("medical")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base border ${
                activeTab === "medical"
                  ? "bg-main text-white border-main shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-main hover:text-main hover:bg-gray-50"
              }`}
            >
              {isAr ? "الأجهزة الطبية" : "Medical Devices"}
            </button>
            <button
              onClick={() => setActiveTab("food")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base border ${
                activeTab === "food"
                  ? "bg-main text-white border-main shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-main hover:text-main hover:bg-gray-50"
              }`}
            >
              {isAr ? "سلامة الغذاء" : "Food Safety"}
            </button>
            <button
              onClick={() => setActiveTab("gmp")}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm md:text-base border ${
                activeTab === "gmp"
                  ? "bg-main text-white border-main shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-main hover:text-main hover:bg-gray-50"
              }`}
            >
              {isAr ? "الجودة وممارسات التصنيع" : "Quality & GMP"}
            </button>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
            )}

            {activeTab === "medical" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {isAr ? "سياسة جودة الأجهزة الطبية" : "Medical Devices Quality Policy"}
                  </h2>
                  <div className="space-y-4">
                    <p>
                      {isAr
                        ? "تلتزم بون (Bonn) بتقديم جودة عالية في تصنيع الأجهزة الطبية، والمطهرات الطبية، ومطهرات الأجهزة الطبية، والمعقمات لقطاع الرعاية الصحية. وتعبئة وإعادة تعبئة المنتجات والمستلزمات الطبية والمعقمة، وتعقيم المنتجات والمستلزمات الطبية. بما يلبي احتياجات العملاء بشكل موضوعي ويلتزم بالمعايير واللوائح المطلوبة من خلال:"
                        : "Bonn is committed to delivering high-quality, to the Manufacturing of medical devices, medical disinfectants, medical device disinfectants, and antiseptics for the healthcare sector. Packaging and repackaging of medical and sterile products and supplies, and sterilization of medical products and supplies. That objectively meet customer needs and adhere to required standards and regulations by:"}
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2 mx-4">
                      <li>
                        {isAr
                          ? "تنفيذ العمليات والممارسات بموجب نظام إدارة جودة معتمد (QMS)."
                          : "Implementing processes and practices under a certified Quality Management System (QMS)."}
                      </li>
                      <li>
                        {isAr
                          ? "الحفاظ على نظام إدارة الجودة وتحسينه باستمرار طوال فترة حياة الشركة ومنتجاتها."
                          : "Maintaining and continuously improving QMS throughout the life of the company and its products."}
                      </li>
                      <li>
                        {isAr
                          ? "الالتزام بتقييم ومراقبة المخاطر طوال دورة حياة المنتج، من الإنتاج حتى الاستخدام ما بعد السوق، بموجب معايير السلامة والجودة واللوائح التنظيمية الحالية."
                          : "A commitment to assessing and controlling risk throughout the product lifecycle, from production through post-market use under current safety standards, quality standards, and regulatory requirements."}
                      </li>
                      <li>
                        {isAr
                          ? "السعي لتحقيق أهداف جودة قابلة للقياس تتماشى مع الأهداف المؤسسية الحالية لشركة بون وسياستها الخاصة بالجودة طوال مراحل تقدم المنظمة وإنجاز المنتجات."
                          : "Pursuing measurable quality objectives that align with current Bonn corporate objectives and its quality policy throughout the organization’s progress and product realization milestones."}
                      </li>
                      <li>
                        {isAr
                          ? "إظهار التزام على مستوى المنظمة ككل بالجودة."
                          : "Demonstrating organization-wide commitment to quality."}
                      </li>
                    </ul>
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {isAr
                          ? "الالتزام بالامتثال للمتطلبات والحفاظ على نظام إدارة الجودة (QMS)"
                          : "A Commitment to comply with requirements and maintain the QMS"}
                      </h3>
                      <p className="mb-3">
                        {isAr
                          ? "مع جميع المتطلبات التنظيمية مثل EU MDR/IVDR و FDA و SFDA، ومتطلبات العملاء، ومتطلبات معيار ISO 13485 نفسه، فإن هذا يعني أن سياسة الجودة ونظام إدارة الجودة يتغيران ويتحسنان حسب الحاجة لتلبية التحديثات التنظيمية أو الخاصة بالعملاء أو المتعلقة بمعيار ISO 13485. قد يعني هذا أيضًا تحديث نظام إدارة الجودة بناءً على التغييرات في أهداف المنتج أو المنظمة."
                          : "With all regulatory requirements such as EU MDR/IVDR, FDA, and SFDA, customer requirements, and the requirements of ISO 13485 itself, this means that the Quality Policy and QMS change and improve as needed to meet regulatory, customer, or ISO 13485 updates. It could also mean updating the QMS based on changes to product or organizational goals."}
                      </p>
                      <p>
                        {isAr
                          ? "الالتزام بتعزيز فهم سياسة الجودة الخاصة بنا ونشرها داخل منظمتنا، من خلال التدريب المستمر والتواصل مع موظفينا."
                          : "Commitment to promoting an understanding and dissemination of our Quality Policy within our organization, through continuous training and communication with our employees."}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "food" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
                    {isAr ? "سياسة إدارة سلامة الغذاء" : "Food Safety Management System Policy"}
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "1. المقدمة" : "1. Introduction"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "نحن ملتزمون في منظمتنا بتوفير بيئة آمنة لضيوفنا وموظفينا وأصحاب المصلحة وكجزء من هذا الالتزام، قمنا بإنشاء نظام لإدارة سلامة الأغذية وفقًا لمتطلبات معايير ISO 22000:2018 و ISO 9001:2015."
                          : "At Bonn Medical Industries, we are committed to providing a safe environment for our guests, employees, and stakeholders. As part of this commitment, we have established a Management System that covers Food Safety in accordance with the requirements of ISO 22000:2018 Standard and ISO 9001:2015."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "2. سياسة سلامة الغذاء" : "2. Food Safety Policy"}
                      </h3>
                      <p className="mb-3 text-gray-700 leading-relaxed">
                        {isAr
                          ? "تلتزم منظمتنا بضمان سلامة وجودة الاغذية التي نقوم بتصنيعها. نحن ملتزمون بالامتثال لجميع لوائح ومعايير سلامة الأغذية ذات الصلة. تتضمن سياسة سلامة الأغذية لدينا ما يلي:"
                          : "Bonn Medical Industries is dedicated to ensuring the safety and quality of the food Manufactured by us. We are committed to complying with all relevant food safety regulations and standards. Our Food Safety Policy includes:"}
                      </p>
                      <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed mx-4">
                        <li>
                          {isAr
                            ? "التأكد من أن جميع عمليات التصنيع تلبي متطلبات المواصفة القياسية."
                            : "Ensuring that all processes meet the requirements standard."}
                        </li>
                        <li>
                          {isAr
                            ? "تنفيذ مبادئ تحليل المخاطر ونقاط التحكم الحرجة (HACCP) لتحديد مخاطر سلامة الأغذية ومنعها والسيطرة عليها."
                            : "Implementing Hazard Analysis and Critical Control Points (HACCP) principles to identify, prevent, and control food safety hazards."}
                        </li>
                        <li>
                          {isAr
                            ? "تقديم برامج التدريب والتوعية لجميع العاملين في مجال التعامل مع الاغذية."
                            : "Providing training and awareness programs for all employees involved in food handling and preparation."}
                        </li>
                        <li>
                          {isAr
                            ? "مراقبة ومراجعة ممارسات سلامة الأغذية لدينا بانتظام لتحديد مجالات التحسين."
                            : "Regularly monitoring and reviewing our food safety practices to identify areas for improvement."}
                        </li>
                        <li>
                          {isAr
                            ? "التواصل بشكل مفتوح مع موردينا وعملائنا والسلطات التنظيمية فيما يتعلق بمسائل سلامة الأغذية."
                            : "Communicating openly with our suppliers, customers, and regulatory authorities regarding food safety matters."}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "3. الامتثال" : "3. Compliance"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "تلتزم منظمتنا بالامتثال لجميع المتطلبات القانونية والتنظيمية المعمول بها والمتعلقة بسلامة الغذاء. سنراقب بانتظام حالة امتثالنا ونتخذ الإجراءات المناسبة لمعالجة أي مشكلات تتعلق بعدم الامتثال."
                          : "Bonn Medical Industries is committed to complying with all applicable legal and regulatory requirements related to food safety, we will regularly monitor our compliance status and take appropriate actions to address any non-compliance issues."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "4. التحسين المستمر" : "4. Continuous Improvement"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "تلتزم منظمتنا بالتحسين المستمر لنظام سلامة الغذاء. سنقوم بانتظام بمراجعة سياساتنا وإجراءاتنا وأدائنا لتحديد فرص التحسين وتنفيذ الإجراءات اللازمة لتعزيز فعالية نظام الإدارة لدينا."
                          : "Bonn Medical Industries is committed to continuously improving our Food Safety Management System. We will regularly review our policies, procedures, and performance to identify opportunities for improvement and implement necessary actions to enhance the effectiveness of our management system."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "5. التواصل والتشاور" : "5. Communication and Consultation"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "ستقوم منظمتنا بإبلاغ سياسة نظام الإدارة المتكامل هذه إلى جميع الموظفين والمقاولين والموردين وأصحاب المصلحة الآخرين ذوي الصلة. سنشجع أيضًا التواصل المفتوح والتشاور لضمان مشاركة جميع أصحاب المصلحة في تنفيذ نظام الإدارة لدينا وتحسينه."
                          : "Bonn Medical Industries will communicate this Management System Policy to all employees, contractors, suppliers, and other relevant stakeholders. We will also encourage open communication and consultation to ensure that all stakeholders are engaged in the implementation and improvement of our management system."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "6. المسؤولية" : "6. Responsibility"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "تتولى إدارة منظمتنا مسؤولية ضمان التنفيذ الفعال والصيانة والتحسين المستمر لنظام سلامة الأغذية. يتحمل جميع الموظفين مسؤولية الالتزام بهذه السياسة والمشاركة الفعالة في تنفيذ نظام الإدارة لدينا."
                          : "The management of Bonn Medical Industries is responsible for ensuring the effective implementation, maintenance, and continual improvement of our Food Safety, Management System. All employees are responsible for complying with this policy and actively participating in the implementation of our management system."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "7. المراجعة" : "7. Review and Revision"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "ستتم مراجعة سياسة نظام الإدارة وتنقيحها حسب الضرورة لضمان استمرار ملاءمتها وكفايتها وفعاليتها. ستقوم الإدارة بإجراء مراجعات دورية لهذه السياسة للتأكد من توافقها مع أهداف المنظمة وغاياتها وقيمها."
                          : "This Management System Policy will be reviewed and revised as necessary to ensure its continued suitability, adequacy, and effectiveness. Management will conduct periodic reviews of this policy to ensure its alignment with the organization's goals, objectives, and values."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-main mb-3">
                        {isAr ? "8. ملكية السياسة" : "8. Policy Ownership"}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {isAr
                          ? "يتحمل المدير العام لمنظمتنا المسؤولية النهائية عن الإشراف على سياسة نظام إدارة لسلامة الغذاء وما يلي ذلك تنفيذه الفعال في جميع أنحاء المنظمة."
                          : "General Manager of Bonn Medical Industries holds the ultimate responsibility for the oversight of this Food Safety, Management System Policy and ensuring its effective implementation throughout the organization."}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "gmp" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
                    {isAr ? "سياسة الجودة العامة وممارسات التصنيع" : "General Quality & GMP Policy"}
                  </h2>
                  
                  <div className="space-y-4">
                    <ul className="list-disc list-inside space-y-4 text-gray-700 leading-relaxed mx-4">
                      <li>
                        {isAr
                          ? "تلتزم منظمتنا بتصنيع منتجات طبية وصحية آمنة وفعّالة وعالية الجودة بما يلبي متطلبات العملاء والجهات التنظيمية."
                          : "Our organization is committed to manufacturing safe, effective, and high-quality medical and healthcare products that meet customer and regulatory requirements."}
                      </li>
                      <li>
                        {isAr
                          ? "توفير إطار عمل لوضع أهداف الجودة ومراجعتها وتحقيقها."
                          : "Providing a framework for establishing, reviewing, and achieving quality objectives."}
                      </li>
                      <li>
                        {isAr
                          ? "نقوم بتطبيق وتحسين نظام إدارة الجودة باستمرار وفق متطلبات ISO 9001 ومبادئ ممارسات التصنيع الجيد GMP."
                          : "We implement and continually improve a Quality Management System in accordance with ISO 9001 and Good Manufacturing Practice (GMP)."}
                      </li>
                      <li>
                        {isAr
                          ? "ضمان سلامة العميل وثبات جودة المنتج للوصول لرضا العملاء."
                          : "Ensuring Customer safety and consistent product quality to Achieve Customer Satisfaction."}
                      </li>
                      <li>
                        {isAr
                          ? "الالتزام بجميع المتطلبات التنظيمية والقانونية المعمول بها."
                          : "Compliance with all applicable regulatory and statutory requirements."}
                      </li>
                      <li>
                        {isAr
                          ? "تطبيق التفكير المبني على المخاطر وإدارة مخاطر الجودة."
                          : "Applying risk-based thinking and quality risk management."}
                      </li>
                      <li>
                        {isAr
                          ? "تعزيز التحسين المستمر من خلال إدارة الانحرافات والإجراءات التصحيحية والوقائية والشكاوى والمراجعات الداخلية."
                          : "Promoting continual improvement through CAPA, deviations management, complaints handling, and internal audits."}
                      </li>
                      <li>
                        {isAr
                          ? "تطوير كفاءة العاملين من خلال التدريب والمشاركة الفعالة في أنشطة الجودة."
                          : "Developing competent employees through training and active participation in quality activities."}
                      </li>
                      <li>
                        {isAr
                          ? "ضمان مطابقة الموردين والمواد لمعايير الجودة المحددة."
                          : "Ensuring suppliers and materials meet defined quality standards."}
                      </li>
                      <li>
                        {isAr
                          ? "تلتزم الإدارة العليا بتوفير الموارد اللازمة وتعزيز ثقافة الجودة داخل المنظمة."
                          : "Top Management is committed to providing the necessary resources and fostering a strong quality culture."}
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
