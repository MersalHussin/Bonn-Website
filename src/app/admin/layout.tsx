'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/admin/Sidebar';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';

function AdminContent({ children }: { children: ReactNode }) {
  const { user, role, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !role)) {
      router.replace("/login");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  // Double check so nothing renders before redirect happens
  if (!user || !role) {
    return null; 
  }

  return (
    <div className="admin-shell" dir="rtl">
      <Sidebar />
      <div className="admin-content-area">
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminContent>{children}</AdminContent>
    </AdminAuthProvider>
  );
}
