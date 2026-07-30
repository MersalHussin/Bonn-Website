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

// Helper: wrap a promise with a timeout
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), ms)
    ),
  ]);
}

export function LeVisageAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { session }, error } = await withTimeout(
          supabase.auth.getSession(),
          5000 // 5 second timeout
        );
        
        if (!mounted) return;
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Session check failed or timed out:', err);
        if (!mounted) return;
        setSession(null);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
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
