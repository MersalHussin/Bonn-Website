import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Image from 'next/image';

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 60 } }),
    },
  }
);

export default async function NewsPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  const { data: newsItems, error } = await supabase
    .from('news')
    .select('id, title_ar, title_en, slug, summary_ar, summary_en, image_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error.message);
  }

  const featuredNews = newsItems && newsItems.length > 0 ? newsItems[0] : null;
  const regularNews = newsItems && newsItems.length > 1 ? newsItems.slice(1) : [];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h1 className="text-[8rem] font-black uppercase whitespace-nowrap overflow-hidden">
            {isEn ? 'Global News' : 'آخر الأخبار'}
          </h1>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 relative z-10">
          {isEn ? <><span className="text-main">Bonn</span> News Hub</> : <>مركز أخبار <span className="text-main">Bonn</span></>}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto relative z-10">
          {isEn 
            ? 'Stay updated with the latest headlines, breakthroughs, and corporate announcements.' 
            : 'ابق على اطلاع بأحدث العناوين، والإنجازات، والإعلانات الخاصة بنا.'}
        </p>
      </div>

      {!newsItems || newsItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-slate-500 text-xl font-medium">{isEn ? 'No news published yet.' : 'لا توجد أخبار منشورة حالياً.'}</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured News Section */}
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
        </div>
      )}
    </div>
  );
}
