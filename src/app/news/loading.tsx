export default function NewsIndexLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" dir="rtl">
      {/* Header Skeleton */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="h-12 w-64 bg-slate-200 rounded-lg animate-pulse mb-6"></div>
        <div className="h-4 w-96 max-w-full bg-slate-200 rounded animate-pulse"></div>
        <div className="h-4 w-72 max-w-full bg-slate-200 rounded animate-pulse mt-2"></div>
      </div>

      <div className="space-y-12">
        {/* Featured News Skeleton */}
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[30rem]">
          <div className="lg:w-3/5 h-72 lg:h-full bg-slate-200 animate-pulse"></div>
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-24 h-4 bg-slate-200 rounded animate-pulse mb-4"></div>
            <div className="w-full h-10 bg-slate-200 rounded animate-pulse mb-3"></div>
            <div className="w-4/5 h-10 bg-slate-200 rounded animate-pulse mb-6"></div>
            <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="w-full h-4 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="w-3/4 h-4 bg-slate-200 rounded animate-pulse mb-8"></div>
            <div className="mt-auto w-32 h-6 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Regular News Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl overflow-hidden h-full flex flex-col">
              <div className="h-60 bg-slate-200 animate-pulse w-full"></div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-24 h-3 bg-slate-200 rounded animate-pulse mb-4"></div>
                <div className="w-full h-6 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-4/5 h-6 bg-slate-200 rounded animate-pulse mb-6"></div>
                <div className="w-full h-3 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-3 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="w-2/3 h-3 bg-slate-200 rounded animate-pulse mb-6"></div>
                <div className="mt-auto w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
