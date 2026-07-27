"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { MyPlayer } from "./Player";

function useTypingEffect(texts: string[], typingSpeed = 100, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    const currentText = texts[index];
    if (!deleting && subIndex === currentText.length) {
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDisplayText(currentText.substring(0, subIndex));
    }, typingSpeed);

    
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, texts, typingSpeed, pauseTime]);

  return displayText;
}

export default function About() {
  const { t, i18n } = useTranslation();

  // const typingText = useTypingEffect([
  //   t("whoWeAre"),
  //   t("weAreDifferent"),
  //   t("bmiIsFuture"),
  // ]);

  const [mount , setMount] = useState(false);
    useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);

  return mount ? (
      <>
    <section 
      dir={i18n.language === "ar" ? "rtl" : "ltr"} 
      className="w-full bg-gradient-to-br from-white to-[#F1F6FD] py-16"
    >
      <Container>
        <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-10">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-main ">
            <SectionTitle title={t('whoWeAre')} align="auto" theme="dark" className="mb-0" />

            <p className="text-lg leading-relaxed text-[#1A3351]">
              {t("aboutParagraph1")}
            </p>
            <p className="text-lg leading-relaxed text-[#1A3351]">
              {t("aboutParagraph2")}
            </p>
            <Link
              href="/about"
              className="inline-block mt-4 text-main font-semibold hover:underline transition"
            >
              {t("readMore")}
            </Link>
          </div>

          {/* Video Section */}
          <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden  bg-white aspect-video">
           <div className="relative w-full h-full overflow-hidden rounded-">
         <div className="w-full rounded-[20px] overflow-hidden shadow-2xl">
                  <MyPlayer src="https://res.cloudinary.com/dzgztrsa0/video/upload/v1785134673/bonn_medical_industries_mnlicp.mp4" />
                </div>

  {/* الخدعة: شريط شفاف علوي يغطي منطقة العنوان ويمنع ظهورها عند حركة الماوس */}
  <div className="absolute top-0 left-0 w-full h-20 bg-transparent z-10 pointer-events-auto" />
</div>
          </div>
        </div>
        </Container>
        </section>
        </>
  ) : null;
}
