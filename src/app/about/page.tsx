"use client";

import AnimatedBackground from "../components/AnimatedBackground";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import visionAnimation from "../../animations/Vision.json";
import missionAnimation from "../../animations/Mission.json";
import AboutAnimation from "../../animations/About.json";
import innovationAnimation from "../../animations/Innovation.json";
import ResponsAnimation from "../../animations/Respons.json";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import {
  FaEye,
  FaBullseye,
  FaTasks,
  FaLightbulb,
  FaInfoCircle,
  FaCheckCircle,
  FaHandshake,
  FaLeaf,
  FaBolt,
  FaBalanceScale,
} from "react-icons/fa";

      <Head>
        <title>About Bonn Medical Industries</title>
        <meta
          name="description"
          content="Bonn is a contract manufacturer located in Riyadh, Saudi Arabia. Equipped with the latest and up to date machines and equipment, we are confident that we are able to provide the latest and novel formulations under cGMP regulations, either for standard formulations as well as bespoke preparations when required. Our highly qualified staff is continuously improving and actualizing their knowledge to attend the constant advances in the sector."
        />
        <meta name="keywords" content="cosmetics manufacturer, skincare saudi arabia, oem, bonn medical" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.bonnmed.com/about" />
      </Head>

// Typing Effect for Story
function TypingStory({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      }, 10); // أسرع شوية
      return () => clearTimeout(timer);
    }
  }, [displayed, text]);

  return <p className="text-lg text-[#1A3351] leading-relaxed">{displayed}</p>;
}

// Typing effect for title
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
  }, [subIndex, deleting]);

  return displayText;
}

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [showStory, setShowStory] = useState(false);

  const typingText = useTypingEffect([
    t("whoWeAre"),
    t("weAreDifferent"),
    t("bmiIsFuture"),
  ]);

  const valuesIcons: Record<string, React.ReactNode> = {
    quality: <FaCheckCircle className="text-2xl text-[#0056D2] mx-auto mb-2" />,
    integrity: <FaBalanceScale className="text-2xl text-[#0056D2] mx-auto mb-2" />,
    speed: <FaBolt className="text-2xl text-[#0056D2] mx-auto mb-2" />,
    partnership: <FaHandshake className="text-2xl text-[#0056D2] mx-auto mb-2" />,
    innovation: <FaLightbulb className="text-2xl text-[#0056D2] mx-auto mb-2" />,
    sustainability: <FaLeaf className="text-2xl text-[#0056D2] mx-auto mb-2" />,
  };

  return (
    <>
      <Head>
        <title>
          {t("about.pageTitle") || "About Us | Bonn Medical Industries"}
        </title>
      </Head>

      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full mt-10 px-4 md:px-20 py-16 text-[#1A3351] bg-gradient-to-b from-[#DCEEFF]/70 via-white/30 to-white"
      >
        <AnimatedBackground />

        {/* Page Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#003D99] mb-24 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("about_title") || "About Us"}
        </motion.h2>

        <div className="space-y-28">
          {/* About Section */}
          <motion.div
            className="flex flex-col md:grid md:grid-cols-2 items-center md:gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaInfoCircle className="text-3xl text-[#0056D2]" />
                <h2 className="text-5xl font-extrabold min-h-[48px] drop-shadow-md">
                  {typingText}
                  <span className="blinking-cursor">|</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("p1")}</p>
              <p className="text-lg leading-relaxed">{t("p2")}</p>
              <p className="text-lg leading-relaxed">{t("p3")}</p>
              <p className="text-lg leading-relaxed">{t("p4")}</p>
            </div>

            {/* Media */}
            <div className="flex justify-center max-h-[400px]">
              <Lottie animationData={AboutAnimation} loop autoplay />
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            className="flex flex-col-reverse md:grid md:grid-cols-2 items-center md:gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center max-h-[250px]">
              <Lottie animationData={visionAnimation} loop autoplay />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <FaEye className="text-4xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("visionTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("visionText")}</p>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="flex flex-col md:grid md:grid-cols-2 items-center md:gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <FaBullseye className="text-4xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("missionTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("missionText")}</p>
            </div>

            <div className="flex justify-center max-h-[250px]">
              <Lottie animationData={missionAnimation} loop autoplay />
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-[#003D99] mb-5 text-center">
              {t("valuesTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["quality", "integrity", "speed", "partnership", "innovation", "sustainability"].map(
                (key, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition"
                    whileHover={{ scale: 1.05 }}
                  >
                    {valuesIcons[key]}
                    <h4 className="font-bold text-[#0056D2] mb-2">
                      {t(`value_${key}_title`)}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {t(`value_${key}_desc`)}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* Story Button + Modal */}
          <div className="mt-24 text-center">
            {!showStory && (
              <motion.button
                onClick={() => setShowStory(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#0056D2] to-[#003D99] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                whileHover={{ y: -2 }}
                aria-label="See Our Story"
              >
                {t("seeOurStory")}
              </motion.button>
            )}

            <AnimatePresence>
              {showStory && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setShowStory(false)}
                  />

                  {/* Modal */}
                  <motion.div
                    className="relative bg-white rounded-2xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      onClick={() => setShowStory(false)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      aria-label="Close Story Modal"
                    >
                      ✕
                    </button>

                    <h3 className="text-3xl font-bold text-[#003D99] mb-6">
                      {t("ourStoryTitle")}
                    </h3>
                    <TypingStory text={t("ourStoryText")} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Responsibilities Section */}
          <motion.div
            className="flex flex-col-reverse md:grid md:grid-cols-2 items-center md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-center max-h-[250px]">
              <Lottie animationData={ResponsAnimation} loop autoplay />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaTasks className="text-3xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("responsibilitiesTitle")}
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>{t("responsibility1")}</li>
                <li>{t("responsibility2")}</li>
                <li>{t("responsibility3")}</li>
              </ul>
            </div>
          </motion.div>

          {/* Innovation Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaLightbulb className="text-3xl text-[#0056D2]" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  {t("innovationTitle")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed">{t("innovationText")}</p>
            </div>

            <div className="flex justify-center max-h-[250px]">
              <Lottie animationData={innovationAnimation} loop autoplay />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}