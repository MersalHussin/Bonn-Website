import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Breadcrumb from '../../components/Breadcrumb';

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

  const { data: newsItem } = await supabase
    .from('news')
    .select('title_ar, title_en, summary_ar, summary_en, image_url')
    .eq('slug', decodedSlug)
    .maybeSingle();

  const title = (isEn && newsItem?.title_en) ? newsItem.title_en : (newsItem?.title_ar || 'أخبار بون الطبية');
  const description = (isEn && newsItem?.summary_en) ? newsItem.summary_en : (newsItem?.summary_ar || 'أحدث الأخبار من بون الطبية');
  const image = newsItem?.image_url || 'https://www.bonnmed.com/cover.png';

  return {
    title: `${title} | Bonn Medical`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: image }],
    },
  };
}

/* ================= PAGE ================= */
export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  const { data: newsItem, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', decodedSlug)
    .maybeSingle();

  if (error || !newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <div className="text-[120px] font-black text-slate-200 leading-none mb-4">404</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-6">{isEn ? 'News Not Found' : 'الخبر غير موجود'}</h1>
        <Link href="/events?tab=news" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-main text-white font-bold tracking-wide hover:bg-main-hover transition shadow-lg hover:shadow-xl hover:-translate-y-1">
          {isEn ? 'Back to News' : 'العودة للأخبار'}
        </Link>
      </div>
    );
  }

  const displayTitle = (isEn && newsItem.title_en) ? newsItem.title_en : newsItem.title_ar;
  const displaySummary = (isEn && newsItem.summary_en) ? newsItem.summary_en : newsItem.summary_ar;
  
  const cleanContent = (content: string) => content ? content.replaceAll('&nbsp;', ' ') : '';
  const displayContent = cleanContent((isEn && newsItem.content_en) ? newsItem.content_en : newsItem.content_ar);

  return (
    <main className="mt-[65px]">
      <div className="pt-8">
        <article className={`max-w-4xl mx-auto px-4 sm:px-6 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
          {/* Header */}
          <div className={`flex items-center justify-between mb-12 pb-6 border-b border-slate-100 ${isEn ? 'flex-row' : ''}`}>
            <Link href="/">
              <Image src="/images/Logo.svg" alt="Bonn Medical" width={80} height={80} className="object-contain" />
            </Link>
            <Link href="/events?tab=news" className="inline-flex items-center gap-2 text-slate-500 hover:text-main transition-all font-bold tracking-wide text-sm bg-slate-50 hover:bg-main/5 px-5 py-2.5 rounded-full uppercase">
              {isEn ? <span>Back to News ←</span> : <span>العودة للأخبار ←</span>}
            </Link>
          </div>

          {/* Date & Category */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-main/10 text-main font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
              {isEn ? 'News' : 'أخبار'}
            </div>
          <time dateTime={newsItem.created_at} className="text-slate-500 text-sm font-medium uppercase tracking-wide">
            {new Date(newsItem.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 group">
          {displayTitle}
        </h1>

        <div className="mb-8">
          <Breadcrumb items={[
            { label: isEn ? 'Media Center' : 'المركز الإعلامي', href: '/events' },
            { label: isEn ? 'News' : 'الأخبار', href: '/events?tab=news' },
            { label: displayTitle }
          ]} />
        </div>

        {/* Main Image */}
        {newsItem.image_url && (
          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden mb-16 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img
              src={newsItem.image_url}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Summary */}
        {displaySummary && (
          <div className={`relative mb-16 p-8 bg-slate-50 rounded-3xl border border-slate-100`}>
            <div className="absolute -top-4 -left-4 text-6xl text-main opacity-20 font-serif">"</div>
            <p className="text-2xl text-slate-700 font-semibold leading-relaxed relative z-10">
              {displaySummary}
            </p>
          </div>
        )}

        {/* Content */}
        <div
          className="quill-content text-slate-800 leading-loose text-lg md:text-xl space-y-8 font-serif"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />

        {/* Styles for Quill Content */}
        <style>{`
          .quill-content {
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: normal;
            max-width: 100%;
                font-family: var(--font-din);
          }
          .quill-content p, .quill-content span, .quill-content div {
            white-space: normal !important;
          }
          .quill-content a {
            word-break: break-all;
            color: #1d358f;
            text-decoration: underline;
            font-weight: 600;
          }
          .quill-content img, .quill-content iframe, .quill-content video {
            max-width: 100%;
            height: auto;
            border-radius: 1.5rem;
            margin: 2rem 0;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
          }
          .quill-content ul {
            list-style-type: disc !important;
            margin-inline-start: 1.5rem !important;
            margin-bottom: 2rem !important;
          }
          .quill-content ol {
            list-style-type: decimal !important;
            margin-inline-start: 1.5rem !important;
            margin-bottom: 2rem !important;
          }
          .quill-content li {
            margin-bottom: 0.75rem !important;
          }
          .quill-content p {
            margin-bottom: 2rem !important;
          }
          .quill-content h2 {
            font-size: 2rem !important;
            font-weight: 900 !important;
            margin-top: 3rem !important;
            margin-bottom: 1.5rem !important;
            color: #0f172a !important;
            line-height: 1.2 !important;
          }
          .quill-content h3 {
            font-size: 1.5rem !important;
            font-weight: 800 !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1.25rem !important;
            color: #1e293b !important;
          }
          .quill-content blockquote {
            border-left: 4px solid #1d358f;
            padding-left: 1.5rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #475569;
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 0 1rem 1rem 0;
          }
        `}</style>
      </article>
      <RelatedNews currentSlug={decodedSlug} isEn={isEn} dir={dir} />
      </div>
    </main>
  );
}

async function RelatedNews({ currentSlug, isEn, dir }: { currentSlug: string, isEn: boolean, dir: string }) {
  const { data: relatedNews } = await supabase
    .from('news')
    .select('id, title_ar, title_en, slug, summary_ar, summary_en, image_url, created_at')
    .neq('slug', currentSlug)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!relatedNews || relatedNews.length === 0) return null;

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16 border-t border-slate-100 ${isEn ? 'text-left' : 'text-right'}`} dir={dir}>
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 uppercase tracking-wide">
        {isEn ? 'More News' : 'مزيد من الأخبار'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedNews.map((newsItem: any) => {
          const displayTitle = (isEn && newsItem.title_en) ? newsItem.title_en : newsItem.title_ar;
          const displaySummary = (isEn && newsItem.summary_en) ? newsItem.summary_en : newsItem.summary_ar;

          return (
            <Link key={newsItem.id} href={`/news/${decodeURIComponent(newsItem.slug)}`} className="group h-full block">
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2">
                {newsItem.image_url ? (
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={newsItem.image_url} 
                      alt={displayTitle} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-slate-50 flex items-center justify-center text-slate-400 font-medium relative">
                    {isEn ? 'No Image' : 'لا توجد صورة'}
                  </div>
                )}
                
                <div className={`p-6 flex-1 flex flex-col ${isEn ? 'text-left' : 'text-right'}`}>
                  <div className="flex items-center text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                    <time dateTime={newsItem.created_at}>
                      {new Date(newsItem.created_at).toLocaleDateString(isEn ? 'en-US' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-main transition-colors line-clamp-2 leading-snug">
                    {displayTitle}
                  </h3>
                  
                  <div className="mt-auto flex items-center text-main font-bold text-xs gap-2 group-hover:gap-3 transition-all uppercase pt-4 border-t border-slate-50">
                    <span>{isEn ? 'Read Article' : 'اقرأ الخبر'}</span>
                    <span className={`transform transition-transform ${isEn ? '' : 'rotate-180'}`}>→</span>
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
