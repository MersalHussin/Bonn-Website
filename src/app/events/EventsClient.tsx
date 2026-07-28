"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';

interface EventsClientProps {
  isEn: boolean;
  news: any[];
  blogs: any[];
}

export default function EventsClient({ isEn, news, blogs }: EventsClientProps) {
  const dir = isEn ? 'ltr' : 'rtl';
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'news' | 'blog'>('news');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'blog' || tabParam === 'news') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'news' | 'blog') => {
    setActiveTab(tab);
    router.push(`/events?tab=${tab}`, { scroll: false });
  };

  const featuredNews = news.length > 0 ? news[0] : null;
  const regularNews = news.length > 1 ? news.slice(1) : [];

  return (
    <main className="mt-[65px]">
      <Breadcrumb items={[{ label: isEn ? 'Media Center' : 'المركز الإعلامي' }]} />
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <h1 className="text-[6rem] md:text-[8rem] font-black uppercase whitespace-nowrap overflow-hidden">
              {isEn ? 'Media Center' : 'المركز الإعلامي'}
            </h1>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 relative z-10">
            {isEn ? <><span className="text-main">Bonn</span> Media Center</> : <>المركز الإعلامي لـ <span className="text-main">Bonn</span></>}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto relative z-10">
            {isEn 
              ? 'Stay updated with our latest news, articles, and corporate announcements.' 
              : 'ابق على اطلاع بأحدث أخبارنا ومقالاتنا الطبية المتجددة.'}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12 relative z-20">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => handleTabChange('news')}
              className={`relative px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'news' ? 'text-main' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {activeTab === 'news' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{isEn ? 'News' : 'الأخبار'}</span>
            </button>
            <button
              onClick={() => handleTabChange('blog')}
              className={`relative px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'blog' ? 'text-main' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {activeTab === 'blog' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{isEn ? 'Blog' : 'المدونة'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[50vh]">
          <AnimatePresence mode="wait">
            {/* News Content */}
            {activeTab === 'news' && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {news.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-slate-500 text-xl font-medium">{isEn ? 'No news published yet.' : 'لا توجد أخبار منشورة حالياً.'}</p>
                  </div>
                ) : (
                  <>
                    {/* Featured News */}
                    {featuredNews && (
                      <Link href={`/news/${featuredNews.slug}`} className="group block">
                        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row transform group-hover:-translate-y-2 relative">
                          <div className="lg:w-3/5 h-72 lg:h-[30rem] relative overflow-hidden">
                            <div className="absolute inset-0 bg-main/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                            <img 
                              src={featuredNews.image_url || '/placeholder.png'} 
                              alt={isEn ? featuredNews.title_en || featuredNews.title_ar : featuredNews.title_ar} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                            />
                            <div className={`absolute top-6 ${isEn ? 'left-6' : 'right-6'} bg-main text-white text-sm px-4 py-1.5 rounded-full font-bold shadow-lg z-20 uppercase tracking-wide`}>
                              {isEn ? 'Featured' : 'خبر مميز'}
                            </div>
                          </div>
                          
                          <div className={`lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center ${isEn ? 'text-left' : 'text-right'} bg-gradient-to-br from-white to-slate-50`}>
                            <div className="flex items-center text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">
                              <time dateTime={featuredNews.created_at}>
                                {new Date(featuredNews.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </time>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight group-hover:text-main transition-colors">
                              {isEn ? featuredNews.title_en || featuredNews.title_ar : featuredNews.title_ar}
                            </h2>
                            <p className="text-slate-600 text-lg line-clamp-4 mb-8 leading-relaxed">
                              {isEn ? featuredNews.summary_en || featuredNews.summary_ar : featuredNews.summary_ar}
                            </p>
                            
                            <div className="mt-auto flex items-center text-main font-bold text-base gap-2 group-hover:gap-4 transition-all uppercase tracking-wide">
                              <span>{isEn ? 'Read Full Story' : 'اقرأ القصة كاملة'}</span>
                              <span className={`transform transition-transform ${isEn ? '' : 'rotate-180'}`}>→</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Regular News Grid */}
                    {regularNews.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularNews.map((newsItem: any) => {
                          const displayTitle = (isEn && newsItem.title_en) ? newsItem.title_en : newsItem.title_ar;
                          const displaySummary = (isEn && newsItem.summary_en) ? newsItem.summary_en : newsItem.summary_ar;

                          return (
                            <Link key={newsItem.id} href={`/news/${newsItem.slug}`} className="group h-full">
                              <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 relative">
                                <div className="h-60 overflow-hidden relative">
                                  <img 
                                    src={newsItem.image_url || '/placeholder.png'} 
                                    alt={displayTitle} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                  />
                                </div>
                                <div className={`p-8 flex-1 flex flex-col ${isEn ? 'text-left' : 'text-right'}`}>
                                  <div className="flex items-center text-xs text-slate-400 mb-4 font-semibold uppercase tracking-wider">
                                    <time dateTime={newsItem.created_at}>
                                      {new Date(newsItem.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </time>
                                  </div>
                                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-main transition-colors line-clamp-2 leading-snug">
                                    {displayTitle}
                                  </h3>
                                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                    {displaySummary}
                                  </p>
                                  <div className="mt-auto flex items-center text-main font-bold text-sm gap-2 group-hover:gap-3 transition-all uppercase">
                                    <span>{isEn ? 'Read More' : 'اقرأ المزيد'}</span>
                                    <span className={`transform transition-transform ${isEn ? '' : 'rotate-180'}`}>→</span>
                                  </div>
                                </div>
                              </article>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* Blog Content */}
            {activeTab === 'blog' && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {blogs.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-slate-500 text-xl font-medium">{isEn ? 'No articles published yet.' : 'لا توجد مقالات منشورة حالياً.'}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((artical: any) => {
                      const displayTitle = (isEn && artical.title_en) ? artical.title_en : artical.title;
                      const displaySummary = (isEn && artical.summary_en) ? artical.summary_en : artical.summary;

                      return (
                        <Link key={artical.id} href={`/blog/${artical.slug}`} className="group block h-full">
                          <article className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform group-hover:-translate-y-2">
                            <div className="h-60 relative overflow-hidden bg-slate-100">
                              <div className="absolute inset-0 bg-main/10 group-hover:bg-transparent transition-colors z-10" />
                              <img 
                                src={artical.image_url || '/placeholder.png'} 
                                alt={displayTitle} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                              />
                              {artical.production_line && (
                                <div className={`absolute top-4 ${isEn ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur text-main text-xs px-3 py-1.5 rounded-full font-bold shadow-sm z-20`}>
                                  {artical.production_line}
                                </div>
                              )}
                            </div>
                            
                            <div className={`p-8 flex-1 flex flex-col ${isEn ? 'text-left' : 'text-right'}`}>
                              <div className="text-sm text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                                <time dateTime={artical.created_at}>
                                  {new Date(artical.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-main transition-colors line-clamp-2 leading-snug">
                                {displayTitle}
                              </h3>
                              <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                {displaySummary}
                              </p>
                              
                              <div className="mt-auto flex items-center text-main font-bold text-sm gap-2 group-hover:gap-3 transition-all uppercase">
                                <span>{isEn ? 'Read More' : 'اقرأ المزيد'}</span>
                                <span className={`transform transition-transform ${isEn ? '' : 'rotate-180'}`}>→</span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
