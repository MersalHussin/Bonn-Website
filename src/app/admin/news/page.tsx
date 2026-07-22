'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, FileText, Link as LinkIcon, Image as ImageIcon, AlignLeft, LayoutList, ExternalLink, Calendar, Trash2, Edit2, X, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { addNews, updateNews, deleteNews } from '../../actions/newsActions';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <p className="text-gray-500 text-sm p-4">جاري تحميل المحرر...</p> });

// تهيئة عميل Supabase على الـ Client Side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface NewsItem {
  id: number;
  title_ar: string;
  slug: string;
  summary_ar: string;
  content_ar: string;
  image_url: string;
  created_at: string;
  title_en?: string;
  summary_en?: string;
  content_en?: string;
}

export default function NewsAdminPage() {
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [summaryAr, setSummaryAr] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [titleEn, setTitleEn] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');
  const { isSuperUser } = useAdminAuth();
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setFetching(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('حدث خطأ أثناء جلب الأخبار');
    } else if (data) {
      setNews(data);
    }
    setFetching(false);
  }

  const handleDelete = async (id: number) => {
    if (!isSuperUser) {
      toast.error('عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط.');
      return;
    }
    if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return;
    
    try {
      const result = await deleteNews(id);
      if (!result.success) throw new Error(result.error);
      
      setNews(news.filter(n => n.id !== id));
      toast.success('تم حذف الخبر بنجاح');
    } catch (err: any) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingId(newsItem.id);
    setTitleAr(newsItem.title_ar);
    setSlug(newsItem.slug);
    setSummaryAr(newsItem.summary_ar || '');
    setContentAr(newsItem.content_ar || '');
    setImageUrl(newsItem.image_url || '');
    
    setTitleEn(newsItem.title_en || '');
    setSummaryEn(newsItem.summary_en || '');
    setContentEn(newsItem.content_en || '');
    
    setActiveTab('ar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setTitleAr('');
    setSlug('');
    setSummaryAr('');
    setContentAr('');
    setImageUrl('');
    setEditingId(null);
    setTitleEn('');
    setSummaryEn('');
    setContentEn('');
    setActiveTab('ar');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const result = await updateNews(editingId, { 
            title_ar: titleAr, 
            slug, 
            summary_ar: summaryAr, 
            content_ar: contentAr, 
            image_url: imageUrl || null, 
            title_en: titleEn || null,
            summary_en: summaryEn || null,
            content_en: contentEn || null
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setNews(news.map(n => n.id === editingId ? result.data : n));
          resetForm();
          toast.success('تم تعديل الخبر بنجاح!');
        }
      } else {
        const result = await addNews({ 
            title_ar: titleAr, 
            slug, 
            summary_ar: summaryAr, 
            content_ar: contentAr, 
            image_url: imageUrl || null, 
            title_en: titleEn || null,
            summary_en: summaryEn || null,
            content_en: contentEn || null
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setNews([result.data, ...news]);
          resetForm();
          toast.success('تمت إضافة الخبر بنجاح!');
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
          <FileText className="text-main w-8 h-8" />
          إدارة الأخبار
        </h1>
        <p className="text-gray-500 mt-2">قم بإضافة وتعديل وحذف الأخبار الخاصة بموقعك من هنا.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="xl:col-span-2 xl:order-1 order-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="bg-main/5/50 border-b border-gray-100 px-6 py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {editingId ? <Edit2 className="text-main w-5 h-5" /> : <PlusCircle className="text-main w-5 h-5" />}
                  <h2 className="text-lg font-semibold text-gray-800">{editingId ? 'تعديل الخبر' : 'إضافة خبر جديد'}</h2>
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
                    <FileText className="w-4 h-4 text-gray-400" /> عنوان الخبر (عربي) *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    required={activeTab === 'ar'}
                    placeholder="مثال: افتتاح فرع جديد..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-gray-400" /> ملخص الخبر (عربي)
                  </label>
                  <textarea
                    value={summaryAr}
                    onChange={(e) => setSummaryAr(e.target.value)}
                    rows={2}
                    placeholder="وصف مختصر للخبر..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> المحتوى الكامل (عربي) *
                  </label>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <ReactQuill 
                      theme="snow" 
                      value={contentAr} 
                      onChange={setContentAr}
                      placeholder="اكتب تفاصيل الخبر هنا..."
                      className="w-full bg-white text-sm"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}],
                          ['link'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* === ENGLISH FIELDS === */}
              <div className={`space-y-5 ${activeTab !== 'en' ? 'hidden' : ''}`} dir="ltr">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> English Title
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. New Branch Opening..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-gray-400" /> English Summary
                  </label>
                  <textarea
                    value={summaryEn}
                    onChange={(e) => setSummaryEn(e.target.value)}
                    rows={2}
                    placeholder="Brief description of the news..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> English Content
                  </label>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden quill-ltr">
                    <ReactQuill 
                      theme="snow" 
                      value={contentEn} 
                      onChange={setContentEn}
                      placeholder="Write your news details here..."
                      className="w-full bg-white text-sm"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}],
                          ['link'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* === COMMON FIELDS === */}
              <hr className="border-gray-100 my-2" />

              <div className="space-y-1.5">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" /> الرابط الدائم (Slug) *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  placeholder="مثال: new-branch-opening (بدون مسافات)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm text-left"
                  dir="ltr"
                />
              </div>

              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="صورة الخبر"
                folder="News"
              />

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
                    نشر الخبر
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
                <LayoutList className="w-5 h-5 text-gray-400" /> الأخبار المنشورة
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                {news.length} خبر
              </span>
            </div>
            
            <div className="p-0">
              {fetching ? (
                <div className="flex justify-center items-center py-20">
                  <span className="w-8 h-8 border-4 border-gray-200 border-t-main rounded-full animate-spin"></span>
                </div>
              ) : news.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-900 font-medium text-lg">لا توجد أخبار بعد</h3>
                  <p className="text-gray-500 mt-1">ابدأ بإنشاء أول خبر من النموذج الجانبي.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {news.map((newsItem) => (
                    <div key={newsItem.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col gap-4 items-start">
                      <div className="w-full h-32 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                        {newsItem?.image_url ? (
                          <img src={newsItem.image_url} alt={newsItem.title_ar} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-8 h-8 opacity-50" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 w-full min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="bg-main/5 text-main-hover text-xs px-2.5 py-0.5 rounded font-medium">
                            أخبار
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(newsItem.created_at).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 truncate mb-1">
                          {newsItem.title_ar}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {newsItem.summary_ar}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full mt-1">
                        <Link 
                          href={`/news/${newsItem.slug}`} 
                          target="_blank"
                          className="flex justify-center flex-1 items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-main rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                          <ExternalLink className="w-4 h-4" /> عرض
                        </Link>
                        <button 
                          onClick={() => handleEdit(newsItem)}
                          className="flex justify-center flex-1 items-center gap-1.5 px-3 py-2 bg-white border border-main/10 text-main hover:bg-main/5 rounded-lg cursor-pointer text-sm font-medium transition-colors shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" /> تعديل
                        </button>
                        {isSuperUser && (
                          <button 
                            onClick={() => handleDelete(newsItem.id)}
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
