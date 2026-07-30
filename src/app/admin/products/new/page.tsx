import ProductForm from '../../components/ProductForm';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NewProductPage() {
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
          <h1 className="text-3xl font-extrabold text-gray-900">إضافة منتج جديد</h1>
          <p className="text-gray-500 mt-1">أدخل بيانات المنتج الجديد لـ LeVisage</p>
        </div>
      </div>
      
      <ProductForm />
    </div>
  );
}
