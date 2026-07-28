import React, { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LucideIcon, Layers, Globe, Smile, Star } from "lucide-react";

type NumberBoxProps = {
  value: string | number;
  label: string;
  delay?: number;
  icon?: LucideIcon;
};

function NumberBox({ value, label, delay = 0, icon: Icon }: NumberBoxProps) {
  const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
  const showPlus = String(value).includes("+");
  const [start, setStart] = useState(false);

  return (
    <motion.div
      className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.5 }}
      onViewportEnter={() => setStart(true)}
    >
      {Icon && (
        <div className="absolute top-4 rtl:left-4 ltr:right-4 text-white/10 group-hover:text-lv-main/10 transition-colors duration-300 pointer-events-none">
          <Icon
            size={120}
            strokeWidth={1}
            className="transform rtl:rotate-12 ltr:-rotate-12"
          />
        </div>
      )}
      <div className="relative z-10 text-start">
        <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:text-lv-main transition-colors duration-300 drop-shadow-sm">
          {start ? (
            <CountUp start={0} end={numeric} duration={2.5} separator="," />
          ) : (
            0
          )}
          {showPlus ? "+" : ""}
        </div>
        <div className="text-white/90 group-hover:text-gray-700 font-bold text-lg md:text-xl transition-colors duration-300">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function LeVisageAchievements({ t }: { t: any }) {
  return (
    <section id="achievements" className="py-24 bg-lv-main relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm">
            {t.numbersTitle}
          </h2>
          <div className="w-24 h-1.5 bg-white/30 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {t.numbers.map((n: any, i: number) => {
            const numIcons = [Layers, Globe, Smile];
            const Icon = numIcons[i] || Star;
            return (
              <NumberBox
                key={i}
                value={n.value}
                label={n.label}
                delay={i * 0.12}
                icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
