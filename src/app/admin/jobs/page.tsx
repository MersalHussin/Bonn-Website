'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, Briefcase, Link as LinkIcon, LayoutList, Trash2, Edit2, X, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { addJob, updateJob, deleteJob } from '../../actions/jobActions';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface Job {
  id: number;
  title_ar: string;
  title_en: string;
  link: string;
  is_active: boolean;
  job_type: string;
  location_type: string;
  created_at: string;
}

export default function JobsAdminPage() {
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [link, setLink] = useState('');
  const [jobType, setJobType] = useState('دوام كامل');
  const [locationType, setLocationType] = useState('مقر الشركة (Onsite)');
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');
  const { isSuperUser } = useAdminAuth();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setFetching(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('حدث خطأ أثناء جلب الوظائف');
    } else if (data) {
      setJobs(data);
    }
    setFetching(false);
  }

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) return;
    
    try {
      const result = await deleteJob(id);
      if (!result.success) throw new Error(result.error);
      
      setJobs(jobs.filter(j => j.id !== id));
      toast.success('تم الحذف بنجاح');
    } catch (err: any) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setTitleAr(job.title_ar || '');
    setTitleEn(job.title_en || '');
    setLink(job.link || '');
    setJobType(job.job_type || 'دوام كامل');
    setLocationType(job.location_type || 'مقر الشركة (Onsite)');
    setIsActive(job.is_active);
    
    setActiveTab('ar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setTitleAr('');
    setTitleEn('');
    setLink('');
    setJobType('دوام كامل');
    setLocationType('مقر الشركة (Onsite)');
    setIsActive(true);
    setEditingId(null);
    setActiveTab('ar');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const result = await updateJob(editingId, { 
            title_ar: titleAr, 
            title_en: titleEn || null,
            link: link,
            is_active: isActive,
            job_type: jobType,
            location_type: locationType
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setJobs(jobs.map(j => j.id === editingId ? result.data : j));
          resetForm();
          toast.success('تم تعديل البيانات بنجاح!');
        }
      } else {
        const result = await addJob({ 
            title_ar: titleAr, 
            title_en: titleEn || null,
            link: link,
            is_active: isActive,
            job_type: jobType,
            location_type: locationType
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setJobs([result.data, ...jobs]);
          resetForm();
          toast.success('تمت الإضافة بنجاح!');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right" dir="rtl">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Briefcase className="text-main w-8 h-8" />
          إدارة الوظائف (Open Positions)
        </h1>
        <p className="text-gray-500 mt-2">قم بإضافة وتعديل روابط التقديم للوظائف المتاحة.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="xl:col-span-2 xl:order-1 order-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="bg-main/5/50 border-b border-gray-100 px-6 py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {editingId ? <Edit2 className="text-main w-5 h-5" /> : <PlusCircle className="text-main w-5 h-5" />}
                  <h2 className="text-lg font-semibold text-gray-800">{editingId ? 'تعديل الوظيفة' : 'إضافة وظيفة جديدة'}</h2>
                </div>
                {editingId && (
                  <button type="button" onClick={resetForm} className="text-gray-500 hover:text-red-500 transition-colors p-1" title="إلغاء التعديل">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Language Switcher */}
              <div className="flex bg-white rounded-lg p-1 border border-main/10/50 w-full sm:w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab('ar')}
                  className={`flex-1 sm:px-6 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'ar' ? 'bg-main/10 text-main-hover shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  عربي
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`flex-1 sm:px-6 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'en' ? 'bg-main/10 text-main-hover shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  dir="ltr"
                >
                  English
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              
              {/* === ARABIC FIELDS === */}
              <div className={`space-y-5 ${activeTab !== 'ar' ? 'hidden' : ''}`}>
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" /> المسمى الوظيفي (عربي) *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    required={activeTab === 'ar'}
                    placeholder="مثال: مهندس برمجيات"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
              </div>

              {/* === ENGLISH FIELDS === */}
              <div className={`space-y-5 ${activeTab !== 'en' ? 'hidden' : ''}`} dir="ltr">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" /> Job Title (English)
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
              </div>

              {/* === COMMON FIELDS === */}
              <hr className="border-gray-100 my-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium">نوع الدوام *</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm appearance-none"
                  >
                    <option value="دوام كامل">دوام كامل (Full Time)</option>
                    <option value="دوام جزئي">دوام جزئي (Part Time)</option>
                    <option value="دوام كامل أو جزئي">دوام كامل أو جزئي</option>
                    <option value="عمل حر">عمل حر (Freelance)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium">مكان العمل *</label>
                  <select
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm appearance-none"
                  >
                    <option value="مقر الشركة (Onsite)">مقر الشركة (Onsite)</option>
                    <option value="عن بعد (Remote)">عن بعد (Remote)</option>
                    <option value="مختلط (Hybrid)">مختلط (Hybrid)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" /> رابط التقديم (HR Form Link) *
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                  dir="ltr"
                  placeholder="https://forms.gle/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">حالة الوظيفة</span>
                  <span className="text-gray-500 text-sm">تفعيل لظهور الوظيفة في الموقع</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`flex items-center justify-center p-1 rounded-full transition-colors ${isActive ? 'text-main' : 'text-gray-400'}`}
                >
                  {isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-main hover:bg-main-hover text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow focus:ring-4 focus:ring-main-light/20 disabled:bg-gray-400 flex justify-center items-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : editingId ? (
                  <>
                    <Save className="w-5 h-5" />
                    حفظ التعديلات
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    إضافة الوظيفة
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="xl:col-span-1 xl:order-2 order-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <LayoutList className="w-5 h-5 text-gray-400" /> الوظائف المتاحة
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                {jobs.length} وظيفة
              </span>
            </div>
            
            <div className="p-0">
              {fetching ? (
                <div className="flex justify-center items-center py-20">
                  <span className="w-8 h-8 border-4 border-gray-200 border-t-main rounded-full animate-spin"></span>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-900 font-medium text-lg">لا يوجد وظائف بعد</h3>
                  <p className="text-gray-500 mt-1">ابدأ بإضافة أول وظيفة من النموذج الجانبي.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col gap-4 items-start">
                      
                      <div className="flex-1 w-full min-w-0 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {job.title_ar}
                          </h3>
                          <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 mt-1">
                            <LinkIcon className="w-3 h-3" /> رابط التقديم
                          </a>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{job.job_type}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{job.location_type}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {job.is_active ? 'نشط' : 'غير نشط'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 w-full mt-1">
                        <button 
                          onClick={() => handleEdit(job)}
                          className="flex justify-center flex-1 items-center gap-1.5 px-3 py-2 bg-white border border-main/10 text-main hover:bg-main/5 rounded-lg cursor-pointer text-sm font-medium transition-colors shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" /> تعديل
                        </button>
                        {isSuperUser && (
                          <button 
                            onClick={() => handleDelete(job.id)}
                            className="flex justify-center flex-1 items-center gap-1.5 px-3 py-2 bg-white border border-red-100 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer text-sm font-medium transition-colors shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" /> حذف
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
