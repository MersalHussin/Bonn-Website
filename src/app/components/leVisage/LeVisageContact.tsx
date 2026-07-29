import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaClock, FaCheckCircle, FaInstagram } from "react-icons/fa";

export default function LeVisageContact({ t, lang }: { t: any; lang: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message)
      return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3500);
  };

  return (
    <section id="contact-us" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-lv-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {lang === "ar" ? "تواصل معنا" : "Contact Us"}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-lv-main to-[#FF4B7D] rounded-full mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {lang === "ar" 
                  ? "نحن هنا لخدمتك! سواء كان لديك استفسار عن منتجاتنا، أو تحتاج إلى مساعدة، لا تتردد في التواصل معنا وسيقوم فريقنا بالرد عليك في أقرب وقت." 
                  : "We are here to help! Whether you have a question about our products or need assistance, feel free to reach out and our team will get back to you shortly."}
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-6 mt-8">
              <a href="mailto:Relation@bonnmed.com" className="flex items-center gap-4 text-gray-700 hover:text-lv-main transition-colors font-bold text-lg p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-lv-main/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-lv-main text-xl" />
                </div>
                Relation@bonnmed.com
              </a>
              <a href="tel:+966580347173" className="flex text-right items-center gap-4 text-gray-700 hover:text-lv-main transition-colors font-bold text-lg p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full  bg-lv-main/10 flex items-center justify-center shrink-0">
                  <FaPhone className="text-lv-main text-xl" />
                </div>
                <span dir="ltr">
                +966 5803 47173
                </span>
              </a>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contactForm.title}</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-gray-500 font-medium">
                    {lang === "ar" ? "سنتواصل معك في أقرب وقت ممكن." : "We will get back to you as soon as possible."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.contactForm.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contactForm.placeholder.name}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-lv-main focus:ring-2 focus:ring-lv-main/20 outline-none transition-all bg-gray-50/50 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">{t.contactForm.email}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contactForm.placeholder.email}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-lv-main focus:ring-2 focus:ring-lv-main/20 outline-none transition-all bg-gray-50/50 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">{t.contactForm.phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contactForm.placeholder.phone}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-lv-main focus:ring-2 focus:ring-lv-main/20 outline-none transition-all bg-gray-50/50 font-medium text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">{t.contactForm.message}</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contactForm.placeholder.message}
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-lv-main focus:ring-2 focus:ring-lv-main/20 outline-none transition-all bg-gray-50/50 font-medium resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-lv-main text-white font-bold py-4 rounded-xl hover:bg-[#FF4B7D] transition-colors shadow-lg shadow-lv-main/30 hover:shadow-lv-main/50 active:scale-[0.98]"
                  >
                    {t.contactForm.submit}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
