'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/admin/Sidebar';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';

function AdminContent({ children }: { children: ReactNode }) {
  const { user, role, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('admin-mode');
    
    // Aggressively hide chatbase widget using JS to handle delayed loading
    const hideChatbase = () => {
      document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src || '';
        const id = iframe.id || '';
        if (src.includes('chatbase') || id.includes('chatbase') || id.includes('chatbase-bubble')) {
          iframe.style.setProperty('display', 'none', 'important');
        }
      });
      document.querySelectorAll('div[id*="chatbase"], div[class*="chatbase"]').forEach(div => {
        (div as HTMLElement).style.setProperty('display', 'none', 'important');
      });
    };

    hideChatbase();
    const interval = setInterval(hideChatbase, 1000);

    if (!loading && (!user || !role)) {
      router.replace("/login");
    }
    
    return () => {
      document.body.classList.remove('admin-mode');
      clearInterval(interval);
    };
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
