'use client';

import React, { useEffect } from 'react';
import i18n from '../i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let savedLang = null;
    try {
      savedLang = localStorage.getItem('i18nextLng');
    } catch (e) {
      // Ignore
    }

    if (!savedLang) {
      // First visit: check browser language
      const browserLang = typeof navigator !== 'undefined' ? (navigator.language || (navigator as any).userLanguage) : 'ar';
      const detected = browserLang.startsWith('ar') ? 'ar' : 'en';
      
      // If browser prefers English, switch to English post-mount to avoid hydration mismatch
      if (detected === 'en') {
        i18n.changeLanguage('en');
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      }
    } else {
      // Not first visit: enforce the saved language's layout dir and lang on the html element
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
  }, []);

  return <>{children}</>;
}