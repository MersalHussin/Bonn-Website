'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, Users, Image as ImageIcon, LayoutList, Trash2, Edit2, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import ImageUploader from '../../components/admin/ImageUploader';
import { useAdminAuth } from '../../context/AdminAuthContext';
import UnderConstruction from '@/app/components/pages/UnderConstruction';
import { addTeamMember, updateTeamMember, deleteTeamMember } from '../../actions/teamActions';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface TeamMember {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  image_url: string;
  created_at: string;
}

export default function TeamAdminPage() {
  const [nameAr, setNameAr] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');
  const { isSuperUser } = useAdminAuth();
  
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setFetching(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('حدث خطأ أثناء جلب أعضاء الفريق');
    } else if (data) {
      setMembers(data);
    }
    setFetching(false);
  }

  const handleDelete = async (id: number) => {
    if (!isSuperUser) {
      toast.error('عفواً، صلاحية الحذف مقتصرة على الـ Super User فقط.');
      return;
    }
    if (!confirm('هل أنت متأكد من حذف العضو من الفريق؟')) return;
    
    try {
      const result = await deleteTeamMember(id);
      if (!result.success) throw new Error(result.error);
      
      setMembers(members.filter(m => m.id !== id));
      toast.success('تم الحذف بنجاح');
    } catch (err: any) {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setNameAr(member.name_ar || '');
    setTitleAr(member.title_ar || '');
    setNameEn(member.name_en || '');
    setTitleEn(member.title_en || '');
    setImageUrl(member.image_url || '');
    
    setActiveTab('ar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setNameAr('');
    setTitleAr('');
    setNameEn('');
    setTitleEn('');
    setImageUrl('');
    setEditingId(null);
    setActiveTab('ar');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const result = await updateTeamMember(editingId, { 
            name_ar: nameAr, 
            name_en: nameEn || null,
            title_ar: titleAr, 
            title_en: titleEn || null,
            image_url: imageUrl || null
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setMembers(members.map(m => m.id === editingId ? result.data : m));
          resetForm();
          toast.success('تم تعديل البيانات بنجاح!');
        }
      } else {
        const result = await addTeamMember({ 
            name_ar: nameAr, 
            name_en: nameEn || null,
            title_ar: titleAr, 
            title_en: titleEn || null,
            image_url: imageUrl || null
        });

        if (!result.success) throw new Error(result.error);

        if (result.data) {
          setMembers([result.data, ...members]);
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
          <Users className="text-main w-8 h-8" />
          إدارة الفريق
        </h1>
        <p className="text-gray-500 mt-2">قم بإضافة وتعديل وحذف أعضاء الفريق الخاص بك من هنا.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="xl:col-span-2 xl:order-1 order-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="bg-main/5/50 border-b border-gray-100 px-6 py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {editingId ? <Edit2 className="text-main w-5 h-5" /> : <PlusCircle className="text-main w-5 h-5" />}
                  <h2 className="text-lg font-semibold text-gray-800">{editingId ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</h2>
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
                    <Users className="w-4 h-4 text-gray-400" /> الاسم (عربي) *
                  </label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    required={activeTab === 'ar'}
                    placeholder="مثال: د.ضياء السيد"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" /> المسمى الوظيفي (عربي) *
                  </label>
                  <input
                    type="text"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    required={activeTab === 'ar'}
                    placeholder="مثال: المدير التنفيذي"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
              </div>

              {/* === ENGLISH FIELDS === */}
              <div className={`space-y-5 ${activeTab !== 'en' ? 'hidden' : ''}`} dir="ltr">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" /> English Name
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Dr. Diaa Elsayed"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" /> English Title
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. CEO"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-light/20 focus:border-main-light transition-all text-sm"
                  />
                </div>
              </div>

              {/* === COMMON FIELDS === */}
              <hr className="border-gray-100 my-2" />

              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="صورة العضو"
                folder="Team member"
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
                    إضافة للفريق
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
                <LayoutList className="w-5 h-5 text-gray-400" /> أعضاء الفريق
              </h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                {members.length} عضو
              </span>
            </div>
            
            <div className="p-0">
              {fetching ? (
                <div className="flex justify-center items-center py-20">
                  <span className="w-8 h-8 border-4 border-gray-200 border-t-main rounded-full animate-spin"></span>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-900 font-medium text-lg">لا يوجد أعضاء بعد</h3>
                  <p className="text-gray-500 mt-1">ابدأ بإضافة أول عضو في الفريق من النموذج الجانبي.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {members.map((member) => (
                    <div key={member.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col gap-4 items-start">
                      <div className="w-full h-48 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 relative">
                        {member?.image_url ? (
                          <img src={member.image_url} alt={member.name_ar} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-8 h-8 opacity-50" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 w-full min-w-0 text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {member.name_ar}
                        </h3>
                        <p className="text-main text-sm font-semibold">
                          {member.title_ar}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full mt-1">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="flex justify-center flex-1 items-center gap-1.5 px-3 py-2 bg-white border border-main/10 text-main hover:bg-main/5 rounded-lg cursor-pointer text-sm font-medium transition-colors shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" /> تعديل
                        </button>
                        {isSuperUser && (
                          <button 
                            onClick={() => handleDelete(member.id)}
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
