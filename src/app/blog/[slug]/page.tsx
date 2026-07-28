import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Breadcrumb from '../../components/ui/Breadcrumb';

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

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ================= SEO ================= */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');

  const { data: artical } = await supabase
    .from('articals')
    .select('title, title_en, summary, summary_en, image_url')
    .eq('slug', decodedSlug)
    .maybeSingle();

  const title = (isEn && artical?.title_en) ? artical.title_en : (artical?.title || 'مقالة في مدونة بون');
  const description = (isEn && artical?.summary_en) ? artical.summary_en : (artical?.summary || 'اكتشف أحدث المقالات من صناعات بون الطبية');

  return {
    title: `${title} | Bonn Medical`,
    description,
    openGraph: {
      title,
      description,
      images: artical?.image_url ? [{ url: artical.image_url }] : [],
    },
  };
}

/* ================= PAGE ================= */
export default async function BlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  const { data: artical, error } = await supabase
    .from('articals')
    .select('*')
    .eq('slug', decodedSlug)
    .maybeSingle();

  if (error || !artical) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="text-[120px] font-black text-slate-200 leading-none mb-4">404</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          {isEn ? 'Article not found' : 'المقالة غير موجودة'}
        </h1>
        <Link href="/events?tab=blog" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-main text-white font-semibold hover:bg-main-hover transition">
          {isEn ? 'Back to Blog' : 'العودة للمدونة'}
        </Link>
      </div>
    );
  }

  const displayTitle = (isEn && artical.title_en) ? artical.title_en : artical.title;
  const displaySummary = (isEn && artical.summary_en) ? artical.summary_en : artical.summary;
  
  // 💡 تنظيف النص القادم من المحرر من المسافات غير القابلة للكسر والتي تمنع التفاف النص العربي
  const cleanContent = (content: string) => content ? content.replaceAll('&nbsp;', ' ') : '';
  const displayContent = cleanContent((isEn && artical.content_en) ? artical.content_en : artical.content);

  return (
    <main className="mt-[65px]">
      <div className="pt-8">
      <article className={`max-w-4xl mx-auto px-4 sm:px-6 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
        {/* رأس الصفحة: اللوجو وزر العودة */}
      <div className={`flex items-center justify-between mb-10 pb-6 border-b border-gray-100 ${isEn ? 'flex-row' : ''}`}>
        <Link href="/">
          <Image src="/images/Logo.svg" alt="Bonn Medical" width={70} height={70} className="object-contain" />
        </Link>
        <Link href="/events?tab=blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-main transition-colors font-semibold text-sm bg-gray-50 hover:bg-main/5 px-4 py-2 rounded-xl">
          {isEn ? <span>Back to Blog ←</span> : <span>العودة للمدونة ←</span>}
        </Link>
      </div>

      {/* خط الإنتاج */}
      {artical.production_line && (
        <span className="inline-block bg-main/5 text-main-hover text-sm px-3 py-1.5 rounded-full font-bold mb-4">
          {artical.production_line}
        </span>
      )}

      {/* العنوان */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
        {displayTitle}
      </h1>

      <div className="mb-6">
        <Breadcrumb items={[
          { label: isEn ? 'Media Center' : 'المركز الإعلامي', href: '/events' },
          { label: isEn ? 'Blog' : 'المقالات', href: '/events?tab=blog' },
          { label: displayTitle }
        ]} />
      </div>

      {/* التاريخ */}
      <div className="text-slate-500 text-sm mb-8 flex items-center gap-2">
        <time dateTime={artical.created_at}>
          {new Date(artical.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      {/* الصورة الرئيسية */}
      {artical.image_url && (
        <div className="w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-md">
          <img
            src={artical.image_url}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* الملخص */}
      {displaySummary && (
        <p className={`text-xl text-slate-700 font-medium leading-relaxed border-main-light mb-10 ${isEn ? 'border-l-4 pl-4' : 'border-r-4 pr-4'}`}>
          {displaySummary}
        </p>
      )}

      {/* المحتوى */}
      <div
        className="quill-content text-slate-800 leading-relaxed text-lg space-y-6"
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />

      {/* تنسيقات محتوى Quill */}
      <style>{`
        .quill-content {
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: normal;
          max-width: 100%;
          overflow-x: hidden;
        }
        .quill-content * {
          max-width: 100%;
        }
        .quill-content p, .quill-content span, .quill-content div {
          white-space: normal !important;
        }
        .quill-content a {
          word-break: break-all;
        }
        .quill-content img, .quill-content iframe, .quill-content video {
          max-width: 100%;
          height: auto;
        }
        .quill-content ul {
          list-style-type: disc !important;
          margin-inline-start: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
        .quill-content ol {
          list-style-type: decimal !important;
          margin-inline-start: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
        .quill-content li {
          margin-bottom: 0.5rem !important;
        }
        .quill-content p {
          margin-bottom: 1.25rem !important;
        }
        .quill-content h2 {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          color: #0f172a !important;
        }
        .quill-content h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
          color: #1e293b !important;
        }
      `}</style>
    </article>
      <RelatedArticles currentSlug={decodedSlug} isEn={isEn} dir={dir} />
      </div>
    </main>
  );
}
// 💡 إضافة المكون الخاص بالمقالات ذات الصلة هنا حتى نتمكن من استدعائه بالأسفل
async function RelatedArticles({ currentSlug, isEn, dir }: { currentSlug: string, isEn: boolean, dir: string }) {
  const { data: relatedArticals } = await supabase
    .from('articals')
    .select('id, title, title_en, slug, summary, summary_en, image_url, created_at, production_line')
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!relatedArticals || relatedArticals.length === 0) return null;

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 mt-12 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        {isEn ? 'Articles You Might Like' : 'مقالات قد تعجبك'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticals.map((artical: any) => {
          const displayTitle = (isEn && artical.title_en) ? artical.title_en : artical.title;
          const displaySummary = (isEn && artical.summary_en) ? artical.summary_en : artical.summary;

          return (
            <Link key={artical.id} href={`/blog/${decodeURIComponent(artical.slug)}`} className="group h-full block">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                {artical.image_url ? (
                  <div className="h-48 overflow-hidden relative">
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
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-medium relative">
                    {isEn ? 'No Image' : 'لا توجد صورة'}
                    {artical.production_line && (
                      <span className={`absolute top-4 ${isEn ? 'left-4' : 'right-4'} bg-white/90 backdrop-blur text-main-hover text-xs px-3 py-1.5 rounded-full font-bold shadow-sm`}>
                        {artical.production_line}
                      </span>
                    )}
                  </div>
                )}
                
                <div className={`p-5 flex-1 flex flex-col ${isEn ? 'text-left' : 'text-right'}`}>
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <time dateTime={artical.created_at}>
                      {new Date(artical.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-main transition-colors line-clamp-2">
                    {displayTitle}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">
                    {displaySummary}
                  </p>
                  
                  <div className="mt-auto flex items-center text-main font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                    <span>{isEn ? 'Read More' : 'اقرأ المزيد'}</span>
                    <span className={`transform transition-transform ${isEn ? 'ml-1' : 'mr-1 rotate-180'}`}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
  );
}