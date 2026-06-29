import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function BlogSlugLoading() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');
  const dir = isEn ? 'ltr' : 'rtl';

  return (
    <div className="-mt-22 pt-8" dir={dir}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 ${isEn ? 'text-left' : 'text-right'}`}>
        
        {/* Real Navigation & Logo (Static appearance) */}
        <div className={`flex items-center justify-between mb-10 pb-6 border-b border-gray-100 ${isEn ? 'flex-row' : ''}`}>
          <Link href="/">
            <Image src="/images/Logo.svg" alt="Bonn Medical" width={70} height={70} className="object-contain" />
          </Link>
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-main transition-colors font-semibold text-sm bg-gray-50 hover:bg-main/5 px-4 py-2 rounded-xl">
            {isEn ? <span>Back to Blog ←</span> : <span>العودة للمدونة ←</span>}
          </Link>
        </div>

        {/* Category Skeleton */}
        <div className="w-24 h-8 bg-slate-200 rounded-full animate-pulse mb-4"></div>

        {/* Title Skeleton */}
        <div className="space-y-3 mb-6">
          <div className="w-full h-10 md:h-12 bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="w-3/4 h-10 md:h-12 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Date Skeleton */}
        <div className="w-32 h-4 bg-slate-200 rounded animate-pulse mb-8"></div>

        {/* Main Image Skeleton */}
        <div className="w-full h-[300px] sm:h-[450px] rounded-3xl bg-slate-200 animate-pulse mb-12"></div>

        {/* Summary Skeleton */}
        <div className={`space-y-4 mb-10 border-slate-200 ${isEn ? 'border-l-4 pl-4' : 'border-r-4 pr-4'}`}>
          <div className="w-full h-5 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-5/6 h-5 bg-slate-200 rounded animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-5">
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-11/12 h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-4/5 h-4 bg-slate-200 rounded animate-pulse"></div>
          <br/>
          <div className="w-1/2 h-6 bg-slate-200 rounded animate-pulse mb-3"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
