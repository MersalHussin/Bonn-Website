"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "../components/ui/Breadcrumb";
import SectionTitle from "../components/Sections/SectionTitle";
import Container from "../components/ui/Container";

import { getResourcesData } from "./data";

export default function ResourcesPage() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const isRTL = i18n.language === "ar";
  const resources = getResourcesData(t, isRTL, mounted);

  return (
    <>
      <Breadcrumb
        items={[
          { label: mounted ? t("resources.title") : "Resource Center" }
        ]}
      />

      <section className="py-20 lg:py-28 relative overflow-hidden bg-gray-50/50">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-main/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <Container>
          <div className="mb-16">
            <SectionTitle
              title={mounted ? t("resources.title") : "Resource Center"}
              subtitle={mounted ? t("resources.subtitle") : "Browse and download company profiles and important resources from Bonn Medical"}
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <div className="w-16 h-16 bg-main/5 text-main rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-main transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                    {resource.desc}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100 mt-auto">
                    <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {resource.size}
                    </span>
                    
                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-main text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-main/90 transition-colors shadow-sm shadow-main/20 hover:shadow-md hover:shadow-main/30 group/btn"
                      >
                        <span>{mounted ? t("resources.download") : "Download"}</span>
                        <FaExternalLinkAlt className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform text-[12px]" />
                      </a>
                    </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
