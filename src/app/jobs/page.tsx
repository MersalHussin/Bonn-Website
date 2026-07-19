import { createClient } from '@supabase/supabase-js';
import { Briefcase, ArrowLeft, ArrowRight, Building2, MapPin, Clock } from 'lucide-react';
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const revalidate = 60; // Revalidate every minute

function getTimeAgo(dateString: string, isEn: boolean) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.max(0, now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) return { text: isEn ? 'Published recently' : 'نشرت مؤخراً', isNew: true };
  if (diffDays < 14) return { text: isEn ? '1 week ago' : 'منذ أسبوع', isNew: false };
  if (diffDays < 21) return { text: isEn ? '2 weeks ago' : 'منذ أسبوعين', isNew: false };
  if (diffDays < 30) return { text: isEn ? '3 weeks ago' : 'منذ ٣ أسابيع', isNew: false };
  if (diffDays < 60) return { text: isEn ? '1 month ago' : 'منذ شهر', isNew: false };
  if (diffDays < 90) return { text: isEn ? '2 months ago' : 'منذ شهرين', isNew: false };
  const months = Math.floor(diffDays / 30);
  if (months <= 10) return { text: isEn ? `${months} months ago` : `منذ ${months} شهور`, isNew: false };
  return { text: isEn ? 'More than a year ago' : `منذ أكثر من سنة`, isNew: false };
}

function translateJobType(type: string, isEn: boolean) {
  if (!isEn || !type) return type;
  if (type.includes('كامل أو جزئي')) return 'Full/Part Time';
  if (type.includes('كامل')) return 'Full Time';
  if (type.includes('جزئي')) return 'Part Time';
  if (type.includes('حر')) return 'Freelance';
  return type;
}

function translateLocationType(type: string, isEn: boolean) {
  if (!isEn || !type) return type;
  if (type.includes('مقر')) return 'Onsite';
  if (type.includes('عن بعد')) return 'Remote';
  if (type.includes('مختلط')) return 'Hybrid';
  return type;
}

export default async function JobsPage() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("i18nextLng");
  const lang = langCookie ? langCookie.value : "ar";
  const isEn = lang === "en";

  const t = {
    heroTitle: isEn ? "Join Our Team" : "انضم إلى فريقنا",
    heroDesc: isEn ? "We are always looking for exceptional talent to share our passion and vision. Discover available opportunities and be part of our success." : "نحن نبحث دائماً عن المواهب الاستثنائية التي تشاركنا شغفنا ورؤيتنا. اكتشف الفرص المتاحة وكن جزءاً من نجاحنا.",
    noJobsTitle: isEn ? "No open positions currently available" : "لا توجد وظائف متاحة حالياً",
    noJobsDesc: isEn ? "Thank you for your interest in joining us. Please check back later for the latest career opportunities." : "شكراً لاهتمامك بالانضمام إلينا. يرجى معاودة الزيارة لاحقاً للاطلاع على أحدث الفرص الوظيفية.",
    applyNow: isEn ? "Apply Now" : "التقدم للوظيفة",
  };

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
  }

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-main text-white py-20 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className={`absolute top-0 ${isEn ? 'left-0 -ml-20' : 'right-0 -mr-20'} -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl`}></div>
        <div className={`absolute bottom-0 ${isEn ? 'right-0 -mr-20' : 'left-0 -ml-20'} -mb-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl`}></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
      </div>

      {/* Jobs List Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        {!jobs || jobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.noJobsTitle}</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {t.noJobsDesc}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => {
              const timeAgo = job.created_at ? getTimeAgo(job.created_at, isEn) : null;
              
              const primaryTitle = isEn && job.title_en ? job.title_en : job.title_ar;
              const secondaryTitle = isEn && job.title_en ? job.title_ar : job.title_en;
              
              return (
                <div 
                  key={job.id} 
                  className="group bg-white rounded-2xl p-6 md:p-8 shadow-md shadow-gray-200/20 hover:shadow-xl hover:shadow-main/10 border border-gray-100 hover:border-main/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
                >
                  {timeAgo?.isNew && (
                    <div className={`absolute top-0 ${isEn ? 'left-0 rounded-br-xl' : 'right-0 rounded-bl-xl'} bg-red-500 text-white text-xs font-bold px-3 py-1 shadow-sm z-10`} dir="ltr">
                      NEW
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 mt-2 md:mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-main transition-colors">
                        {primaryTitle}
                      </h2>
                      {secondaryTitle && (
                        <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                          {secondaryTitle}
                        </span>
                      )}
                    </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {job.job_type && (
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Building2 className="w-4 h-4 text-main/70" />
                        {translateJobType(job.job_type, isEn)}
                      </span>
                    )}
                    {job.location_type && (
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <MapPin className="w-4 h-4 text-main/70" />
                        {translateLocationType(job.location_type, isEn)}
                      </span>
                    )}
                    {timeAgo && (
                      <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Clock className="w-4 h-4 text-main/70" />
                        {timeAgo.text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 mt-4 md:mt-0">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-main hover:bg-main-hover text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-main/20 transform group-hover:${isEn ? 'translate-x-1' : '-translate-x-1'}`}
                  >
                    <span>{t.applyNow}</span>
                    <ArrowIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
