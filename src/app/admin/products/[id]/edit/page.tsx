'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../../components/ProductForm';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLeVisageProduct } from '@/app/actions/levisageProductActions';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getLeVisageProduct(id);
        if (res.success) {
          setProduct(res.data);
        } else {
          setError(res.error || 'المنتج غير موجود');
        }
      } catch (e: any) {
        setError(e.message || 'خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lv-main"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20" dir="rtl">
        <p className="text-red-500 font-medium text-lg">{error || 'المنتج غير موجود'}</p>
        <Link href="/levisage/admin" className="text-lv-main mt-4 inline-block font-bold">
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
      <div className="flex items-center gap-4">
        <Link 
          href="/levisage/admin" 
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowRight size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">تعديل المنتج</h1>
          <p className="text-gray-500 mt-1">تعديل بيانات المنتج: {product.name_ar}</p>
        </div>
      </div>
      
      <ProductForm initialData={product} />
    </div>
  );
}
