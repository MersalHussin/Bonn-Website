"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

import "swiper/css";

const stats = [
  { value: 500, suffix: "+", label: "products.title" },
  { value: 10, suffix: "+", label: "clients" },
  { value: 100, suffix: "%", label: "satisfaction" },
  { value: 25, suffix: "+", label: "tonsPerDay" },
  { value: 9, suffix: "+", label: "countries" },
  { value: 7, suffix: "+", label: "productionLines" },
];

type StatCardProps = {
  value: number;
  suffix: string;
  label: string;
};

function StatCard({ value, suffix, label }: StatCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center py-10"
    >
      {/* Number */}
      <motion.h3
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="
text-6xl md:text-7xl font-semibold tracking-tight
bg-gradient-to-b from-white to-white/60
bg-clip-text text-transparent
"
      >
        <CountUp
          end={value}
          duration={2}
          suffix={suffix}
          enableScrollSpy
        />
      </motion.h3>

      {/* underline */}
      <span className="mt-3 h-[2px] w-10 bg-white/30 rounded-full" />

      {/* Label */}
      <p className="mt-4 text-sm uppercase tracking-widest text-white/70 text-center">
        {t(label)}
      </p>
    </motion.div>
  );
}


export default function StatsCarousel() {
  return (
    <section className="relative py-4 overflow-hidden bg-gradient-to-br from-[#0056D2] via-[#0046b0] to-[#003a8c]">
      
      {/* background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      {/* FORCE LTR */}
      <div dir="ltr">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={900}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative max-w-7xl mx-auto px-4"
        >
          {stats.map((stat, index) => (
            <SwiperSlide key={index}>
              <StatCard {...stat} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

