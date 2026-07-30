'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addLeVisageProduct, updateLeVisageProduct } from '@/app/actions/levisageProductActions';
import Image from 'next/image';
import { X, Upload, Link as LinkIcon, Trash } from 'lucide-react';

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    name_ar: initialData?.name_ar || '',
    name_en: initialData?.name_en || '',
    tagline_ar: initialData?.tagline_ar || '',
    tagline_en: initialData?.tagline_en || '',
    description_ar: initialData?.description_ar || '',
    description_en: initialData?.description_en || '',
    usage_ar: initialData?.usage_ar || '',
    usage_en: initialData?.usage_en || '',
    volume: initialData?.volume || '',
    best_selling: initialData?.best_selling || false,
    ingredients_ar: initialData?.ingredients_ar || [],
    ingredients_en: initialData?.ingredients_en || [],
    category: initialData?.category || [],
    images: initialData?.images || [],
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData({ ...formData, [field]: array });
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageUrlInput.trim()] });
      setImageUrlInput('');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError('إعدادات Cloudinary مفقودة');
      return;
    }

    setUploadingImage(true);
    
    const formDataObj = new FormData();
    formDataObj.append('file', file);
    formDataObj.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formDataObj,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
      } else {
        setError('فشل رفع الصورة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateLeVisageProduct(initialData.id, formData);
      } else {
        res = await addLeVisageProduct(formData);
      }

      if (res?.success) {
        router.push('/levisage/admin');
      } else {
        setError(res?.error || 'حدث خطأ غير متوقع');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100" dir="rtl">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">رابط المنتج (Slug)</label>
          <input 
            type="text" name="slug" value={formData.slug} onChange={handleInputChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
            dir="ltr" placeholder="e.g. skin-care-cream"
          />
        </div>
        <div className="flex items-center mt-8">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" name="best_selling" checked={formData.best_selling} onChange={handleInputChange}
              className="w-5 h-5 text-lv-main border-gray-300 rounded focus:ring-lv-main"
            />
            <span className="mr-3 font-semibold text-gray-700">الأكثر مبيعاً</span>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">الاسم (عربي)</label>
          <input 
            type="text" name="name_ar" value={formData.name_ar} onChange={handleInputChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">الاسم (إنجليزي)</label>
          <input 
            type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main" dir="ltr"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">شعار/Tagline (عربي)</label>
          <input 
            type="text" name="tagline_ar" value={formData.tagline_ar} onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">شعار/Tagline (إنجليزي)</label>
          <input 
            type="text" name="tagline_en" value={formData.tagline_en} onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main" dir="ltr"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">التصنيف (مفصول بفاصلة)</label>
          <input 
            type="text" value={formData.category.join(', ')} onChange={(e) => handleArrayChange('category', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">الحجم (Volume)</label>
          <input 
            type="text" name="volume" value={formData.volume} onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">الوصف (عربي)</label>
          <textarea 
            name="description_ar" value={formData.description_ar} onChange={handleInputChange} rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">الوصف (إنجليزي)</label>
          <textarea 
            name="description_en" value={formData.description_en} onChange={handleInputChange} rows={4} dir="ltr"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">طريقة الاستخدام (عربي)</label>
          <textarea 
            name="usage_ar" value={formData.usage_ar} onChange={handleInputChange} rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">طريقة الاستخدام (إنجليزي)</label>
          <textarea 
            name="usage_en" value={formData.usage_en} onChange={handleInputChange} rows={3} dir="ltr"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">المكونات (عربي - مفصولة بفاصلة)</label>
          <textarea 
            value={formData.ingredients_ar.join(', ')} onChange={(e) => handleArrayChange('ingredients_ar', e.target.value)} rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">المكونات (إنجليزي - مفصولة بفاصلة)</label>
          <textarea 
            value={formData.ingredients_en.join(', ')} onChange={(e) => handleArrayChange('ingredients_en', e.target.value)} rows={2} dir="ltr"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-lv-main"
          ></textarea>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">صور المنتج</h3>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {formData.images.map((img: string, idx: number) => (
            <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
              <Image src={img} alt={`Image ${idx}`} fill className="object-cover" />
              <button 
                type="button" 
                onClick={() => removeImage(idx)}
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">إضافة رابط صورة</label>
            <div className="flex gap-2">
              <input 
                type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lv-main"
                placeholder="https://example.com/image.jpg" dir="ltr"
              />
              <button 
                type="button" onClick={addImageUrl}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <LinkIcon size={16} /> إضافة
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">أو رفع صورة (Cloudinary)</label>
            <div className="relative w-full">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
              />
              <div className={`w-full px-4 py-2 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors ${uploadingImage ? 'border-gray-300 bg-gray-100 text-gray-400' : 'border-lv-main/50 bg-lv-main/5 text-lv-main hover:bg-lv-main/10'}`}>
                {uploadingImage ? (
                  <>جاري الرفع...</>
                ) : (
                  <>
                    <Upload size={18} />
                    اختر صورة لرفعها
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <button 
          type="button" onClick={() => router.back()}
          className="mr-4 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
        >
          إلغاء
        </button>
        <button 
          type="submit" disabled={isPending}
          className="px-8 py-3 bg-lv-main text-white rounded-lg font-bold shadow-md hover:bg-lv-main/90 transition-all disabled:opacity-50"
        >
          {isPending ? 'جاري الحفظ...' : 'حفظ المنتج'}
        </button>
      </div>
    </form>
  );
}
