export default function BlogIndexLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir="rtl">
      {/* Header Skeleton */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="h-12 w-64 bg-slate-200 rounded-lg animate-pulse mb-6"></div>
        <div className="h-4 w-96 max-w-full bg-slate-200 rounded animate-pulse"></div>
        <div className="h-4 w-72 max-w-full bg-slate-200 rounded animate-pulse mt-2"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="h-52 bg-slate-200 animate-pulse w-full"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-24 h-3 bg-slate-200 rounded animate-pulse mb-3"></div>
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
  );
}
