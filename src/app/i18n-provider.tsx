'use client';

import React, { useEffect, useState } from 'react';
import i18n from '../i18n';

export default function I18nProvider({ children, lang }: { children: React.ReactNode, lang: string }) {
  // Synchronously ensure the client i18n matches the server-determined lang
  // This prevents hydration errors caused by localStorage/cookie mismatches
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    // Keep html tag attributes in sync and sync cookie to localStorage
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('i18nextLng', lang);
      document.cookie = `i18nextLng=${lang}; path=/; max-age=31536000`;
    } catch (e) {
      // Ignore
    }
  }, [lang]);

  return <>{children}</>;
}