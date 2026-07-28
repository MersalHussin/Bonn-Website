"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import {
  Factory,
  Weight,
  Package,
  Users,
  ThumbsUp,
  Globe,
  type LucideIcon,
} from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../Sections/SectionTitle";
import { useEffect, useState } from "react";

const stats: { value: number; suffix: string; labelKey: string; icon: LucideIcon }[] = [
  { value: 7, suffix: "+", labelKey: "productionLines", icon: Factory },
  { value: 25, suffix: "+", labelKey: "tonsPerDay", icon: Weight },
  { value: 500, suffix: "+", labelKey: "stats.products", icon: Package },
  { value: 10, suffix: "+", labelKey: "clients", icon: Users },
  { value: 100, suffix: "%", labelKey: "satisfaction", icon: ThumbsUp },
  { value: 9, suffix: "+", labelKey: "countries", icon: Globe },
];

export default function StatsSection() {
  const { t, i18n } = useTranslation();
 const [mount , setMount] = useState(false);
    useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);

  return mount ? (
    <>
    <section
    dir='ltr'
    className="relative w-full py-14 md:py-20 overflow-hidden bg-main"
    >
    <SectionTitle title={`${t('stats.statsTitle')}`} theme="light" align="center"/>
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
      backgroundSize: '40px 40px',
    }} />
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
    
    <Container>
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-6 md:p-10 lg:p-12"
    >
    {/* Grid with dividers */}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
    {stats.map((stat, index) => {
      const Icon = stat.icon;
      const isLastInRow2 = index % 2 === 1;
      const isLastInRow3 = index % 3 === 2;
      const isLastCol6 = index === stats.length - 1;
      
      return (
        <motion.div
        key={stat.labelKey}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: "easeOut",
        }}
        className={`group relative flex flex-col items-center text-center py-8 px-4 transition-all duration-300
          ${!isLastCol6 ? "xl:border-r xl:border-white/[0.08]" : ""}
          ${!isLastInRow3 ? "md:border-r md:max-xl:border-white/[0.08]" : "md:max-xl:border-r-0"}
          ${!isLastInRow2 ? "max-md:border-r max-md:border-white/[0.08]" : "max-md:border-r-0"}
          ${index < 4 ? "max-md:border-b max-md:border-white/[0.08]" : ""}
          ${index < 3 ? "md:max-xl:border-b md:max-xl:border-white/[0.08]" : ""}
          `}
          >
                  {/* Icon with ring */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15 + index * 0.08,
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="relative w-16 h-16 mb-5"
                    >
                    {/* Gradient ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300 rotate-3 group-hover:rotate-6" />
                    <div className="absolute inset-[2px] rounded-2xl bg-main/80 flex items-center justify-center">
                      <Icon
                        size={26}
                        className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300"
                        strokeWidth={1.6}
                        />
                    </div>
                  </motion.div>

                  {/* Number */}
                  <h3 className="text-4xl md:text-[2.75rem] font-extrabold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                      />
                  </h3>

                  {/* Label */}
                  <p className="mt-2 text-sm text-white/50 font-medium tracking-wide group-hover:text-white/80 transition-colors duration-300">
                    {t(stat.labelKey)}
                  </p>
                </motion.div>
              );
            })}
            </div>
            </motion.div>
            </Container>
            </section>
            </>
          ) : null;
        }
        