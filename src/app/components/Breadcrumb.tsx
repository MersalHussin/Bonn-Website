"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import Container from "./Container";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** Optional additional className */
  className?: string;
};

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      dir={isRTL ? "rtl" : "ltr"}
      className={`bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 ${className}`}
    >
      <Container>
        <ol className="flex items-center gap-2 py-4 text-sm flex-wrap">
          {/* Home icon */}
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-400 hover:text-main transition-colors duration-200"
              aria-label="Home"
            >
              <Home size={15} strokeWidth={2} />
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                <Chevron
                  size={14}
                  className="text-gray-300 flex-shrink-0"
                  strokeWidth={2}
                />
                {isLast || !item.href ? (
                  <span className="text-main font-semibold truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-main transition-colors duration-200 truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
