"use client";

import { useEffect, useState, useCallback } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";
import Container from "./Container";
import {
  X,
  MapPin,
  Globe,
  Linkedin,
} from "lucide-react";

/* ================= TYPES ================= */
type LocationData = {
  id: string;
  name_en: string;
  name_ar: string;
  brand_name?: string;
  brand_logo?: string;
  description?: string;
  city?: string;
  address?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  lat: number;
  lng: number;
  active: boolean;
  brand_color?: string;
};

/* ===== MOCK DATA ===== */
const MOCK_LOCATIONS: LocationData[] = [
  {
    id: "1",
    name_en: "Saudi Arabia",
    name_ar: "السعودية",
    city: "Saudi Arabia",
    lat: 23.8859,
    lng: 45.0792,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "2",
    name_en: "Kuwait",
    name_ar: "الكويت",
    city: "Kuwait",
    lat: 29.3759,
    lng: 47.9774,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "3",
    name_en: "Bahrain",
    name_ar: "البحرين",
    city: "Bahrain",
    lat: 25.9304,
    lng: 50.6378,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "4",
    name_en: "Oman",
    name_ar: "عمان",
    city: "Oman",
    lat: 21.4735,
    lng: 55.9754,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "5",
    name_en: "Yemen",
    name_ar: "اليمن",
    city: "Yemen",
    lat: 15.5527,
    lng: 48.5164,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "6",
    name_en: "Jordan",
    name_ar: "الأردن",
    city: "Jordan",
    lat: 31.2400,
    lng: 36.5100,
    active: true,
    brand_color: "#003A8C",
  },
  {
    id: "7",
    name_en: "Libya",
    name_ar: "ليبيا",
    city: "Libya",
    lat: 26.3351,
    lng: 17.2283,
    active: true,
    brand_color: "#003A8C",
  }
];

/* ================= COMPONENT ================= */
export default function OurMap() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [locations, setLocations] = useState<LocationData[]>(MOCK_LOCATIONS);
  const [hovered, setHovered] = useState<string | null>(null);
  const [center, setCenter] = useState<[number, number]>([24.7136, 46.6753]);
  const [zoom, setZoom] = useState(4);



  return (
    <section className="relative py-24 bg-gradient-to-b from-[#003A8C] to-[#001d4a] overflow-hidden">
      {/* ===== Decorative Glow ===== */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,#1d4ed855_0%,transparent_70%)] pointer-events-none" />

      <Container>
        {/* ===== Heading ===== */}
        <div className="relative z-10 text-center mb-14">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("globalPresenceTitle")}
          </motion.h2>
          <motion.div
            className="mt-4 mx-auto w-20 h-[3px] rounded-full bg-gradient-to-r from-white/40 via-white to-white/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
          <motion.p
            className="mt-5 text-white/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("globalPresenceDesc")}
          </motion.p>
        </div>

        {/* ===== Map Card ===== */}
        <motion.div
          className="relative mx-auto max-w-6xl rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)] border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {/* Map */}
          <div className="h-[380px] sm:h-[480px] lg:h-[560px]">
            {mounted ? (
            <Map
              center={center}
              zoom={zoom}
              onBoundsChanged={({ center: c, zoom: z }) => {
                setCenter(c);
                setZoom(z);
              }}
              attribution={false}
              twoFingerDrag={true}
              provider={(x, y, z) =>
                `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`
              }
            >
              {/* Markers & Tooltips */}
              {locations.map((loc) => (
                <Overlay key={loc.id} anchor={[loc.lat, loc.lng]} offset={[12, 12]}>
                  <div 
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHovered(loc.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse Animation */}
                    <div className="absolute -inset-3 bg-main rounded-full animate-ping opacity-30"></div>
                    
                    {/* Marker Dot */}
                    <div className="relative w-6 h-6 bg-main rounded-full flex items-center justify-center shadow-lg border-[3px] border-white transition-transform duration-300 group-hover:scale-110">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {hovered === loc.id && (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 10 }}
                           transition={{ duration: 0.2 }}
                           className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-[#001d4a] text-sm font-bold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
                         >
                           {isAr ? loc.name_ar : loc.name_en}
                           <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
                         </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Overlay>
              ))}
            </Map>
            ) : (
              <div className="w-full h-full bg-[#001d4a]/20 animate-pulse flex items-center justify-center text-white/50">
                {isAr ? "جاري تحميل الخريطة..." : "Loading Map..."}
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}