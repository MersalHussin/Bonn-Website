'use client';

import { ReactNode } from 'react';
import { LeVisageAuthProvider, useLeVisageAuth } from './context/LeVisageAuthContext';
import { supabase } from '@/app/lib/supabaseClient';
import Link from 'next/link';
import { LogOut, Package } from 'lucide-react';

function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useLeVisageAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lv-main"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" dir="rtl">
      {user && (
        <aside className="w-full md:w-64 bg-white border-l border-gray-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-lv-main">LeVisage Admin</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/levisage/admin" 
              className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg font-medium transition-colors"
            >
              <Package size={20} />
              المنتجات
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          </div>
        </aside>
      )}
      
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function LeVisageAdminLayout({ children }: { children: ReactNode }) {
  return (
    <LeVisageAuthProvider>
      <AdminShell>{children}</AdminShell>
    </LeVisageAuthProvider>
  );
}
