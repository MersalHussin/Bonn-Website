"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Construction } from "lucide-react";
import Container from "../components/Container";
import ComingSoonPage from "../components/ComingSoon";

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <ComingSoonPage/>
  );
}
