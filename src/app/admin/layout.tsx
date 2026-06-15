'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/admin/Sidebar';
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  return (
    <div className="flex m-0 p-0 h-screen overflow-hidden"   dir="ltr">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className=" bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
