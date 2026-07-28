'use client';

import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface TeamMemberProps {
  member: {
    id?: number | string;
    name_ar: string;
    name_en: string;
    title_ar: string;
    title_en: string;
    image_url: string;
  };
  idx?: number;
}

export default function TeamMemberCard({ member, idx = 0 }: TeamMemberProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 group text-center"
    >
      <div className="relative w-48 h-48 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white group-hover:scale-105 transition-transform duration-500">
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
  );
}
