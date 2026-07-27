'use client';

import { useState } from 'react';
import { Users, Save, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from '../components/admin/ImageUploader';
import { addTeamMember, verifyUploadPassword } from '../actions/teamActions';

export default function TeamUploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [nameAr, setNameAr] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const isValid = await verifyUploadPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        toast.error('كلمة المرور غير صحيحة');
      }
    } catch (err) {
      toast.error('حدث خطأ أثناء التحقق');
    } finally {
      setAuthLoading(false);
    }
  };

  const resetForm = () => {
    setNameAr('');
    setTitleAr('');
    setNameEn('');
    setTitleEn('');
    setImageUrl('');
    setActiveTab('ar');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !titleAr) {
      toast.error('الرجاء إدخال الاسم والمسمى الوظيفي باللغة العربية على الأقل');
      return;
    }
    
    setLoading(true);

    try {
      const result = await addTeamMember({ 
          name_ar: nameAr, 
          name_en: nameEn || null,
          title_ar: titleAr, 
          title_en: titleEn || null,
          image_url: imageUrl || null
      });

      if (!result.success) throw new Error(result.error);

      if (result.data) {
        resetForm();
        toast.success('تم رفع بياناتك بنجاح! شكراً لك.');
      }
    } catch (err: any) {
      toast.error(err.message || 'حدث خطأ أثناء رفع البيانات');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center text-main">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            بوابة رفع بيانات الفريق
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            الرجاء إدخال كلمة المرور للوصول إلى نموذج الرفع
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  كلمة المرور
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all text-sm"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-main hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors"
                >
                  {authLoading ? 'جاري التحقق...' : 'دخول'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Users className="text-main w-8 h-8" />
            نموذج رفع البيانات
          </h1>
          <p className="text-gray-500 mt-2">قم برفع بياناتك وصورتك الشخصية لصفحة فريق العمل.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-main/5 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">البيانات الشخصية</h2>
            
            {/* Language Switcher */}
            <div className="flex bg-white rounded-lg p-1 border border-main/10 w-full sm:w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`flex-1 sm:px-6 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'ar' ? 'bg-main/10 text-main shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`flex-1 sm:px-6 py-1.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'en' ? 'bg-main/10 text-main shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                dir="ltr"
              >
                English
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            
            {/* === ARABIC FIELDS === */}
            <div className={`space-y-5 ${activeTab !== 'ar' ? 'hidden' : ''}`}>
              <div className="space-y-1.5">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  الاسم (عربي) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  required={activeTab === 'ar'}
                  placeholder="مثال: د.ضياء السيد"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all text-sm"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  المسمى الوظيفي (عربي) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  required={activeTab === 'ar'}
                  placeholder="مثال: المدير التنفيذي"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all text-sm"
                />
              </div>
            </div>

            {/* === ENGLISH FIELDS === */}
            <div className={`space-y-5 ${activeTab !== 'en' ? 'hidden' : ''}`} dir="ltr">
              <div className="space-y-1.5 text-left">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2 justify-start">
                  English Name
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Dr. Diaa Elsayed"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all text-sm"
                />
              </div>
              
              <div className="space-y-1.5 text-left">
                <label className="text-gray-700 text-sm font-medium flex items-center gap-2 justify-start">
                  English Title
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. CEO"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all text-sm"
                />
              </div>
            </div>

            <hr className="border-gray-100 my-2" />

            {/* Image Uploader */}
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  الصورة الشخصية (اختياري)
               </label>
               <ImageUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  label=""
                  folder="Team member"
               />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-main hover:bg-main/90 text-white font-semibold rounded-xl transition-all shadow-sm focus:ring-4 focus:ring-main/20 disabled:bg-gray-400 flex justify-center items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  إرسال البيانات
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
