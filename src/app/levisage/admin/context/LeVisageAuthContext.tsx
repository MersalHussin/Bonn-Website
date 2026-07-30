'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';

interface LeVisageAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const LeVisageAuthContext = createContext<LeVisageAuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const useLeVisageAuth = () => useContext(LeVisageAuthContext);

export function LeVisageAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/levisage/admin/login') {
        router.push('/levisage/admin/login');
      } else if (user && pathname === '/levisage/admin/login') {
        router.push('/levisage/admin');
      }
    }
  }, [user, loading, pathname, router]);

  return (
    <LeVisageAuthContext.Provider value={{ user, session, loading }}>
      {children}
    </LeVisageAuthContext.Provider>
  );
}
