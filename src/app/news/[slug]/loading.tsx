import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function NewsSlugLoading() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  return (
    <div className="-mt-22 pt-8" dir={dir}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 ${isEn ? 'text-left' : 'text-right'}`}>
        
        {/* Real Navigation & Logo (Static appearance) */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
          <Link href="/">
            <Image src="/images/Logo.svg" alt="Bonn Medical" width={80} height={80} className="object-contain" />
          </Link>
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-500 hover:text-main transition-colors font-bold text-sm bg-slate-50 hover:bg-main/5 px-5 py-2.5 rounded-full">
            {isEn ? <span>Back to News ←</span> : <span>العودة للأخبار ←</span>}
          </Link>
        </div>

        {/* Date & Category Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-6 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="w-32 h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-3 mb-8">
          <div className="w-full h-12 md:h-16 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-4/5 h-12 md:h-16 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Main Image Skeleton */}
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-[2rem] bg-slate-200 animate-pulse mb-16"></div>

        {/* Summary Skeleton */}
        <div className={`mb-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 ${isEn ? 'text-left' : 'text-right'}`}>
          <div className="space-y-4">
            <div className="w-full h-6 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-11/12 h-6 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-4/5 h-6 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-11/12 h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-4/5 h-4 bg-slate-200 rounded animate-pulse"></div>
          <br/>
          <div className="w-3/4 h-8 bg-slate-200 rounded animate-pulse mb-4"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-10/12 h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
