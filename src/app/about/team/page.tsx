'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { Users, User as UserIcon } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import AnimatedBackground from '../../components/AnimatedBackground';
import { motion } from 'framer-motion';
import UnderConstruction from '@/app/components/UnderConstruction';

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
      {/* <Head>
        <title>{isRTL ? 'الفريق | مصنع بون' : 'Our Team | Bonn Factory'}</title>
        <meta name="description" content={isRTL ? 'تعرف على فريق العمل في مصنع بون' : 'Meet the team at Bonn Factory'} />
      </Head>

      <main dir={isRTL ? 'rtl' : 'ltr'} className="w-full bg-[#FCFDFF] text-[#1A3351] overflow-hidden">
        <Breadcrumb items={[
          { label: t("about") || (isRTL ? "من نحن" : "About Us"), href: '/about' },
          { label: isRTL ? 'الفريق' : 'Our Team' }
        ]} />
        <AnimatedBackground />

        <section className="relative pt-10 pb-16 md:pt-20 md:pb-20 px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto space-y-16 relative z-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-main/10 text-main text-xs font-bold uppercase tracking-wider">
                {isRTL ? "فريق العمل" : "Our Team"}
              </span>
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
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className=" rounded-3xl p-6  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={isRTL ? member.name_ar : (member.name_en || member.name_ar)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                          <UserIcon className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isRTL ? member.name_ar : (member.name_en || member.name_ar)}
                    </h3>
                    <p className="text-main font-semibold text-sm">
                      {isRTL ? member.title_ar : (member.title_en || member.title_ar)}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main> */}
            <UnderConstruction />
    </>
  );
}
