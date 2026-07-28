'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { Users, User as UserIcon } from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { motion } from 'framer-motion';
import UnderConstruction from '@/app/components/pages/UnderConstruction';
import TeamMemberCard from '@/app/components/Sections/TeamMemberCard';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TeamMember {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  image_url: string;
}

export default function TeamPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMembers(data);
      }
      setLoading(false);
    }
    
    fetchMembers();
  }, []);

  return (
    <>
     <Head>
        <title>{isRTL ? 'الفريق | مصنع بون' : 'Our Team | Bonn Factory'}</title>
        <meta name="description" content={isRTL ? 'تعرف على فريق العمل في مصنع بون' : 'Meet the team at Bonn Factory'} />
      </Head>

      <main dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-[#FCFDFF] text-[#1A3351] overflow-hidden ">
        <Breadcrumb items={[
          { label: isRTL ? "عن بون" : "About Boon", href: '/about' },
          { label: isRTL ? 'الفريق' : 'Our Team' }
        ]} />

        <section className="relative pt-10 pb-16 md:pt-20 md:pb-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">

              <h1 className="mt-2.5 text-3xl md:text-5xl font-bold text-[var(--main-color)]">
                {isRTL ? "تعرف على فريق بون" : "Meet Our Team"}
              </h1>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {isRTL
                  ? "نفخر في بون بوجود فريق من الخبراء والاستثنائيين الذين يكرسون جهودهم لتقديم أفضل جودة وخدمة لشركائنا."
                  : "At Bonn, we are proud to have a team of exceptional experts dedicated to providing the best quality and service to our partners."}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <span className="w-10 h-10 border-4 border-gray-200 border-t-main rounded-full animate-spin"></span>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">{isRTL ? "لا توجد بيانات حالياً" : "No members found"}</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, idx) => (
                  <TeamMemberCard key={member.id} member={member} idx={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main> 
    </>
  );
}
