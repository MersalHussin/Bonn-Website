"use client";

import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch, FaBoxOpen, FaBookOpen, FaBullhorn, FaUsers, FaLayerGroup } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mounted: boolean;
  i18n: any;
}

export default function SearchModal({ isOpen, onClose, mounted, i18n }: SearchModalProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState("");
  const [unifiedData, setUnifiedData] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const [
          { data: products },
          { data: articals },
          { data: news },
          { data: teams }
        ] = await Promise.all([
          supabase.from("products").select("id, name_en, name_ar, description_en, description_ar, slug"),
          supabase.from("articals").select("id, title_en, title, summary, slug"),
          supabase.from("news").select("id, title_en, title_ar, slug"),
          supabase.from("team_members").select("id, name_en, name_ar, title_en, title_ar")
        ]);

        const formattedData: any[] = [];

        if (products) {
          products.forEach((p) => {
            formattedData.push({
              id: `prod_${p.id}`,
              type: 'product',
              title_en: p.name_en || '',
              title_ar: p.name_ar || '',
              desc_en: p.description_en || '',
              desc_ar: p.description_ar || '',
              url: `/products/${p.slug}`,
            });
          });
        }

        if (articals) {
          articals.forEach((b) => {
            formattedData.push({
              id: `blog_${b.id}`,
              type: 'blog',
              title_en: b.title_en || b.title || '',
              title_ar: b.title || '',
              desc_en: b.summary || '',
              desc_ar: b.summary || '',
              url: `/blog/${b.slug}`,
            });
          });
        }

        if (news) {
          news.forEach((n) => {
            formattedData.push({
              id: `news_${n.id}`,
              type: 'news',
              title_en: n.title_en || n.title_ar || '',
              title_ar: n.title_ar || '',
              url: `/news/${n.slug}`,
            });
          });
        }

        if (teams) {
          teams.forEach((t) => {
            formattedData.push({
              id: `team_${t.id}`,
              type: 'team',
              title_en: t.name_en || t.name_ar || '',
              title_ar: t.name_ar || '',
              desc_en: t.title_en || t.title_ar || '',
              desc_ar: t.title_ar || '',
              url: `/about/team`,
            });
          });
        }

        const staticPages = [
          { id: 'page_1', type: 'page', title_en: 'About Us', title_ar: 'من نحن', url: '/about' },
          { id: 'page_2', type: 'page', title_en: 'Services', title_ar: 'خدماتنا', url: '/services' },
          { id: 'page_3', type: 'page', title_en: 'Our Brands', title_ar: 'علاماتنا التجارية', url: '/brands' },
          { id: 'page_4', type: 'page', title_en: 'Contact Us', title_ar: 'اتصل بنا', url: '/contact' },
          { id: 'page_5', type: 'page', title_en: 'Certifications', title_ar: 'الشهادات', url: '/certifications' },
          { id: 'page_6', type: 'page', title_en: 'Events', title_ar: 'الفعاليات', url: '/events' },
          { id: 'page_7', type: 'page', title_en: 'FAQ', title_ar: 'الأسئلة الشائعة', url: '/faq' },
          { id: 'page_8', type: 'page', title_en: 'Our Team', title_ar: 'الفريق', url: '/about/team' },
          { id: 'page_9', type: 'page', title_en: 'Blog', title_ar: 'المدونة', url: '/events?tab=blog' },
          { id: 'page_10', type: 'page', title_en: 'News', title_ar: 'الأخبار', url: '/events?tab=news' },
          { id: 'page_11', type: 'page', title_en: 'Production Lines', title_ar: 'خطوط الإنتاج', url: '/production-lines' },
          { id: 'page_12', type: 'page', title_en: 'Research & Development', title_ar: 'البحث والتطوير', url: '/about/rd' },
        ];
        
        setUnifiedData([...formattedData, ...staticPages]);
      } catch (err) {
        console.error("Error fetching search data", err);
      }
    };

    if (isOpen && unifiedData.length === 0) {
      fetchSearchData();
    }
  }, [isOpen]);

  // Fuse Search Logic
  useEffect(() => {
    if (!searchTerm.trim() || unifiedData.length === 0) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const fuse = new Fuse(unifiedData, {
      keys: ["title_en", "title_ar", "desc_en", "desc_ar"],
      threshold: 0.3,
      includeMatches: true,
    });

    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results);
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(mounted && i18n.language === "ar" ? "لا توجد نتائج" : "No results found");
    }
  }, [searchTerm, unifiedData]);

  const handleSearchAction = () => {
    if (!searchTerm.trim()) return;
    const fuse = new Fuse(unifiedData, {
      keys: ["title_en", "title_ar", "desc_en", "desc_ar"],
      threshold: 0.3,
      includeMatches: true,
    });
    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results);
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(mounted && i18n.language === "ar" ? "لا توجد نتائج" : "No results found");
    }
  };

  const isArabic = mounted && i18n.language === "ar";

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'product': return { icon: <FaBoxOpen className="text-main" />, label: isArabic ? 'المنتجات' : 'Products', bg: 'bg-blue-50/70 text-main border-blue-100', iconBg: 'bg-white border-blue-100 shadow-sm' };
      case 'news': return { icon: <FaBullhorn className="text-blue-500" />, label: isArabic ? 'الأخبار' : 'News', bg: 'bg-blue-50/50 text-blue-600 border-blue-100', iconBg: 'bg-white border-blue-100 shadow-sm' };
      case 'blog': return { icon: <FaBookOpen className="text-indigo-500" />, label: isArabic ? 'المقالات' : 'Articles', bg: 'bg-indigo-50/50 text-indigo-600 border-indigo-100', iconBg: 'bg-white border-indigo-100 shadow-sm' };
      case 'page': return { icon: <FaLayerGroup className="text-main" />, label: isArabic ? 'الصفحات' : 'Pages', bg: 'bg-blue-50/50 text-main border-blue-100', iconBg: 'bg-white border-blue-100 shadow-sm' };
      case 'team': return { icon: <FaUsers className="text-cyan-600" />, label: isArabic ? 'فريق العمل' : 'Team Members', bg: 'bg-cyan-50/50 text-cyan-700 border-cyan-100', iconBg: 'bg-white border-cyan-100 shadow-sm' };
      default: return { icon: <FaSearch className="text-slate-500" />, label: isArabic ? 'أخرى' : 'Other', bg: 'bg-slate-50 text-slate-700 border-slate-200', iconBg: 'bg-white border-slate-200 shadow-sm' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[9998]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[95%] max-w-3xl max-h-[80vh] z-[9999] overflow-hidden flex flex-col"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="p-6 md:p-8 border-b border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {mounted ? (isArabic ? "ابحث على ما تريد" : "Search what you want") : "Search"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-colors"
                >
                  <IoCloseSharp size={24} />
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-5 rtl:right-5">
                  <FaSearch size={20} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                  placeholder={mounted ? (isArabic ? "الأخبار، المقالات ، المنتجات، الصفحات...." : "Search for anything you want...") : "Search..."}
                  className="w-full ltr:pl-14 rtl:pr-14 ltr:pr-6 rtl:pl-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-main/10 focus:border-main/30 transition-all text-lg font-medium text-slate-800 placeholder-slate-400 shadow-inner"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
              {searchTerm && (
                <>
                  {searchResults.length > 0 ? (() => {
                    const groupedResults = searchResults.reduce((acc: any, res: any) => {
                      const item = res?.item || res;
                      if (!item) return acc;
                      if (!acc[item.type]) acc[item.type] = [];
                      acc[item.type].push({ res, item });
                      return acc;
                    }, {});

                    const order = ['product', 'news', 'blog', 'page', 'team'];
                    const sortedEntries = Object.entries(groupedResults).sort(([typeA], [typeB]) => {
                      const idxA = order.indexOf(typeA);
                      const idxB = order.indexOf(typeB);
                      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
                    });

                    return (
                      <div className="flex flex-col gap-8">
                        {sortedEntries.map(([type, items]: [string, any]) => {
                          const badgeInfo = getTypeBadge(type);
                          return (
                            <div key={type} className="flex flex-col gap-4">
                              {/* Section Header */}
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${badgeInfo.iconBg} text-xl`}>
                                  {badgeInfo.icon}
                                </div>
                                <h3 className="font-bold text-xl text-slate-800">{badgeInfo.label}</h3>
                                <div className="flex-1 h-px bg-slate-200 ltr:ml-4 rtl:mr-4"></div>
                              </div>
                              
                              {/* Section Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {items.map(({ res, item }: any) => {
                                  const matches = res?.matches || [];
                                  const highlightText = (text: string, keysToMatch: string[]) => {
                                    if (!text || !matches.length) return <span className="opacity-50 transition-opacity group-hover:opacity-80">{text}</span>;
                                    const match = matches.find((m: any) => keysToMatch.includes(m.key));
                                    if (!match) return <span className="opacity-50 transition-opacity group-hover:opacity-80">{text}</span>;
                                    let parts: any[] = [];
                                    let lastIndex = 0;
                                    match.indices.forEach(([start, end]: [number, number], i: number) => {
                                      if (start > lastIndex) {
                                        parts.push(<span key={`u-${i}`} className="opacity-50 transition-opacity group-hover:opacity-80">{text.slice(lastIndex, start)}</span>);
                                      }
                                      parts.push(<span key={`m-${i}`} className="text-main opacity-100">{text.slice(start, end + 1)}</span>);
                                      lastIndex = end + 1;
                                    });
                                    if (lastIndex < text.length) {
                                      parts.push(<span key="u-last" className="opacity-50 transition-opacity group-hover:opacity-80">{text.slice(lastIndex)}</span>);
                                    }
                                    return parts;
                                  };

                                  const nameText = isArabic ? item.title_ar : item.title_en;
                                  const descText = isArabic ? item.desc_ar : item.desc_en;

                                  return (
                                    <Link
                                      key={item.id}
                                      href={item.url}
                                      className={`flex items-center gap-4 p-4 bg-white hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl border border-slate-100 group relative ${badgeInfo.bg}`}
                                      onClick={() => {
                                        setSearchTerm("");
                                        setSearchResults([]);
                                        onClose();
                                      }}
                                    >
                                      <div className={`w-12 h-12 flex-shrink-0 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${badgeInfo.iconBg}`}>
                                        <div className="text-xl group-hover:animate-pulse">{badgeInfo.icon}</div>
                                      </div>
                                      <div className="flex-1 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                                        <h3 className="font-bold text-slate-800 text-[15px] mb-1.5 truncate group-hover:text-main transition-colors">{highlightText(nameText, ["title_en", "title_ar"])}</h3>
                                        {descText && <p className="text-slate-500 text-[13px] line-clamp-1 leading-relaxed">{highlightText(descText, ["desc_en", "desc_ar"])}</p>}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })() : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-3xl text-slate-300" />
                      </div>
                      <p className="text-lg font-bold text-slate-700 mb-1">{searchError || (mounted && isArabic ? "لا توجد نتائج" : "No results found")}</p>
                      <p className="text-slate-500">{mounted && isArabic ? "حاول البحث بكلمات مختلفة" : "Try searching with different keywords"}</p>
                    </div>
                  )}
                </>
              )}
              {!searchTerm && (
                <div className="flex flex-col items-center justify-center py-16 text-center opacity-70">
                  <div className="w-24 h-24 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-6">
                    <FaSearch className="text-4xl text-main/50" />
                  </div>
                  <p className="text-xl font-bold text-slate-700 mb-2">
                    {mounted ? (isArabic ? "ابحث في كل زوايا الموقع!" : "Search every corner of the site!") : "Search..."}
                  </p>

                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
