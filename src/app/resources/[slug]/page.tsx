"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { notFound, useParams } from "next/navigation";
import { FaDownload, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import Container from "../../components/Container";
import { getResourcesData } from "../data";

export default function ResourceViewerPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const isRTL = i18n.language === "ar";
  const resources = getResourcesData(t, isRTL, mounted);
  
  const resource = resources.find(r => r.slug === slug);

  if (!resource && mounted) {
    return notFound();
  }

  if (!mounted || !resource) return null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("resources.title", "Resource Center"), href: "/resources" },
          { label: resource.title }
        ]}
      />

      <section className="py-12 bg-gray-50/50 min-h-[80vh]">
        <Container>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
            
            {/* Header Toolbar */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/resources"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-main hover:border-main transition-colors shrink-0"
                >
                  {isRTL ? <FaArrowRight /> : <FaArrowLeft />}
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{resource.title}</h1>
                  <p className="text-sm text-gray-500">{resource.size}</p>
                </div>
              </div>

              <a
                href={resource.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-main text-white px-6 py-2.5 rounded-xl font-bold hover:bg-main/90 transition-colors shadow-md group"
              >
                <FaDownload className="group-hover:-translate-y-0.5 transition-transform" />
                <span>{t("resources.download", "Download")}</span>
              </a>
            </div>

            {/* Document Viewer */}
            <div className="w-full h-[70vh] md:h-[80vh] bg-gray-100">
              <iframe
                src={`${resource.fileUrl}#view=FitH`}
                title={resource.title}
                className="w-full h-full border-none"
                style={{ display: "block" }}
              />
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
