import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BlogPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  const { data: articals, error } = await supabase
    .from('articals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error.message);
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
          {isEn ? <><span className="text-main">Bonn</span> Blog</> : <>مدونة <span className="text-main">Bonn</span></>}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {isEn 
            ? 'Discover the latest articles and news about our products and quality standards.' 
            : 'اكتشف أحدث المقالات والأخبار حول منتجاتنا ومعايير الجودة التي نقدمها.'}
        </p>
      </div>

      {!articals || articals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">{isEn ? 'No articles published yet.' : 'لا توجد مقالات منشورة حالياً.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articals.map((artical: any) => {
            const displayTitle = (isEn && artical.title_en) ? artical.title_en : artical.title;
            const displaySummary = (isEn && artical.summary_en) ? artical.summary_en : artical.summary;

            return (
              <Link key={artical.id} href={`/blog/${artical.slug}`} className="group h-full">
                <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                  {artical.image_url ? (
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src={artical.image_url} 
                        alt={displayTitle} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {artical.production_line && (
                        <span className={`absolute top-4 ${isEn ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur text-main-hover text-xs px-3 py-1.5 rounded-full font-bold shadow-sm`}>
                          {artical.production_line}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="h-52 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-medium relative">
                      {isEn ? 'No Image' : 'لا توجد صورة'}
                      {artical.production_line && (
                        <span className={`absolute top-4 ${isEn ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur text-main-hover text-xs px-3 py-1.5 rounded-full font-bold shadow-sm`}>
                          {artical.production_line}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className={`p-6 flex-1 flex flex-col ${isEn ? 'text-left' : 'text-right'}`}>
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <time dateTime={artical.created_at}>
                        {new Date(artical.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-main transition-colors line-clamp-2">
                      {displayTitle}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                      {displaySummary}
                    </p>
                    
                    <div className="mt-auto flex items-center text-main font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                      <span>{isEn ? 'Read More' : 'اقرأ المزيد'}</span>
                      <span className={`transform transition-transform ${isEn ? 'ml-1' : 'mr-1 rotate-180'}`}>→</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
