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
  online_stores?: { name: string; url: string }[];
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
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [center, setCenter] = useState<[number, number]>([24.7136, 46.6753]);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*").eq("active", true);
      if (!error && data && data.length > 0) {
        setLocations(data);
      }
    };
    fetchLocations();
  }, []);



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
                    <div className="relative w-6 h-6 bg-main rounded-full flex items-center justify-center shadow-lg border-[3px] border-white transition-transform duration-300 group-hover:scale-110" onClick={() => setSelectedLocation(loc)}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {hovered === loc.id && selectedLocation?.id !== loc.id && (
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

                    {/* Click Popup (Online Stores) */}
                    <AnimatePresence>
                      {selectedLocation?.id === loc.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 p-4 bg-white text-[#001d4a] text-sm rounded-xl shadow-2xl z-[60] w-64 cursor-default"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg">{isAr ? loc.name_ar : loc.name_en}</h4>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedLocation(null); }} className="text-gray-400 hover:text-gray-600">
                              <X size={16} />
                            </button>
                          </div>
                          
                          {loc.online_stores && loc.online_stores.length > 0 ? (
                            <div className="flex flex-col gap-2 mt-3">
                              <p className="text-gray-500 font-semibold text-xs uppercase">{isAr ? "المتاجر الإلكترونية" : "Online Stores"}</p>
                              {loc.online_stores.map((store, idx) => (
                                <a key={idx} href={store.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-50 hover:bg-main/5 p-2 rounded-lg transition-colors border border-gray-100">
                                  <Globe size={14} className="text-main" />
                                  <span className="font-medium">{store.name}</span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm mt-2">{isAr ? "لا توجد متاجر مضافة حالياً." : "No online stores added yet."}</p>
                          )}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white"></div>
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