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
    name_en: "Riyadh Headquarters",
    name_ar: "المقر الرئيسي - الرياض",
    brand_name: "Boon",
    description: "Our main headquarters and primary facility.",
    city: "Riyadh",
    address: "Riyadh, Saudi Arabia",
    lat: 24.7136,
    lng: 46.6753,
    active: true,
    brand_color: "red",
  },
  {
    id: "2",
    name_en: "Jeddah Branch",
    name_ar: "فرع جدة",
    brand_name: "Boon",
    description: "Regional office serving the western region.",
    city: "Jeddah",
    address: "Jeddah, Saudi Arabia",
    lat: 21.4858,
    lng: 39.1925,
    active: true,
    brand_color: "#2563eb",
  },
  {
    id: "3",
    name_en: "Dubai Office",
    name_ar: "مكتب دبي",
    brand_name: "Boon Global",
    description: "International distribution and partnership center.",
    city: "Dubai",
    address: "Dubai, UAE",
    lat: 25.2048,
    lng: 55.2708,
    active: true,
    brand_color: "#2563eb",
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
  const [active, setActive] = useState<LocationData | null>(null);
  const [center, setCenter] = useState<[number, number]>([24.7136, 46.6753]);
  const [zoom, setZoom] = useState(4);

  /* ===== Handlers ===== */
  const handleMarkerClick = useCallback((loc: LocationData) => {
    setActive(loc);
    setCenter([loc.lat, loc.lng]);
    setZoom(7);
  }, []);

  const closePanel = useCallback(() => {
    setActive(null);
    setCenter([24, 20]);
    setZoom(2.5 );
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
                `https://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}@2x.png`
              }
              onClick={() => closePanel()}
            >
              {/* Markers */}
              {locations.map((loc) => {
                const isActive = active?.id === loc.id;
                return (
                  <Marker
                    key={loc.id}
                    anchor={[loc.lat, loc.lng]}
                    width={isActive ? 52 : 38}
                    color={loc.brand_color || "#003A8C"}
                    onClick={() => handleMarkerClick(loc)}
                  />
                );
              })}

              {/* Popup Overlay */}
              {active && (
                <Overlay
                  anchor={[active.lat, active.lng]}
                  offset={[0, 50]}
                >
                  <AnimatePresence>
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] overflow-hidden"
                      style={{
                        borderTop: `4px solid ${active.brand_color || "#003A8C"}`,
                      }}
                    >
                      {/* Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closePanel();
                        }}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                        aria-label="Close"
                      >
                        <X size={14} className="text-gray-600" />
                      </button>

                      <div className="p-5">
                        {/* Brand Header */}
                        <div className="flex items-center gap-3 mb-4">
                          {active.brand_logo && (
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: `${active.brand_color || "#003A8C"}15`,
                              }}
                            >
                              <Image
                                src={active.brand_logo}
                                alt={active.brand_name || ""}
                                width={36}
                                height={36}
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3
                              className="text-base font-bold truncate"
                              style={{ color: active.brand_color || "#003A8C" }}
                            >
                              {active.brand_name}
                            </h3>
                            {(active.name_en || active.name_ar) && (
                              <span className="text-xs text-gray-400 block truncate">
                                {isAr ? active.name_ar : active.name_en}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        {active.description && (
                          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {active.description}
                          </p>
                        )}

                        {/* Info Pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {active.city && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                              <MapPin size={12} />
                              {active.city}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-gray-100 flex-wrap">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 min-w-[100px]"
                            style={{
                              backgroundColor: active.brand_color || "#003A8C",
                            }}
                          >
                            <MapPin size={13} />
                            Google Maps
                          </a>
                          {active.website && (
                            <a
                              href={active.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors min-w-[80px]"
                            >
                              <Globe size={13} />
                              Website
                            </a>
                          )}
                          {active.linkedin && (
                            <a
                              href={active.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors min-w-[80px]"
                            >
                              <Linkedin size={13} />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Overlay>
              )}
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