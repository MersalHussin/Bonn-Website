import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import EventsClient from './EventsClient';

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 60 } }),
    },
  }
);

export default async function EventsPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('i18nextLng')?.value || 'ar';
  const isEn = lang.startsWith('en');

  // Fetch both News and Blog articles
  const [newsRes, blogRes] = await Promise.all([
    supabase.from('news').select('*').order('created_at', { ascending: false }),
    supabase.from('articals').select('*').order('created_at', { ascending: false })
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EventsClient isEn={isEn} news={newsRes.data || []} blogs={blogRes.data || []} />
    </Suspense>
  );
}