'use client';

import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteLeVisageProduct } from '@/app/actions/levisageProductActions';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      startTransition(async () => {
        await deleteLeVisageProduct(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}
