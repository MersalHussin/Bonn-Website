"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FAQComponent from "../components/Sections/FAQ";
import Breadcrumb from "../components/ui/Breadcrumb";

export default function FAQPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("faq.title", "Frequently Asked Questions") }
        ]}
      />
      <FAQComponent />
    </>
  );
}
