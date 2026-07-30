'use client';

import { useEffect, useState, useTransition } from 'react';
import { getLeVisageProducts } from '@/app/actions/levisageProductActions';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Plus } from 'lucide-react';
import DeleteButton from './components/DeleteButton';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getLeVisageProducts();
        if (res.success) {
          setProducts(res.data || []);
        } else {
          setError(res.error || 'فشل في تحميل المنتجات');
        }
      } catch (e: any) {
        setError(e.message || 'خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8" dir="rtl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">منتجات LeVisage</h1>
          <p className="text-gray-500 mt-1">إدارة منتجات العلامة التجارية LeVisage</p>
        </div>
        <Link 
          href="/levisage/admin/products/new"
          className="flex items-center gap-2 bg-lv-main text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-lv-main/90 transition-all"
        >
          <Plus size={20} />
          إضافة منتج جديد
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lv-main"></div>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500 font-medium">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            لا توجد منتجات حالياً. قم بإضافة منتج جديد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-900 font-semibold">
                <tr>
                  <th className="p-4 whitespace-nowrap">المنتج</th>
                  <th className="p-4 whitespace-nowrap">الاسم (EN)</th>
                  <th className="p-4 whitespace-nowrap">الحجم</th>
                  <th className="p-4 whitespace-nowrap">الأكثر مبيعاً</th>
                  <th className="p-4 whitespace-nowrap text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                          {product.images && product.images[0] ? (
                            <Image 
                              src={product.images[0]} 
                              alt={product.name_ar} 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">لا صورة</div>
                          )}
                        </div>
                        <span className="font-bold text-gray-900">{product.name_ar}</span>
                      </div>
                    </td>
                    <td className="p-4" dir="ltr">{product.name_en}</td>
                    <td className="p-4">{product.volume || '-'}</td>
                    <td className="p-4">
                      {product.best_selling ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">نعم</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">لا</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/levisage/admin/products/${product.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
