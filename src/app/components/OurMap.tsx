"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { supabase } from "../lib/supabaseClient";
import { useMap } from "react-leaflet";
import { X } from "lucide-react";
import Image from "next/image";
import type * as LeafletType from "leaflet";
import "leaflet/dist/leaflet.css";

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

/* ================= LEAFLET ================= */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

/* ================= MAP CONTROLLER ================= */
function MapController({ active, reset }: { active: LocationData | null; reset: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (active) {
      map.flyTo([active.lat, active.lng], 6, { duration: 1.4, easeLinearity: 0.25 });
    }
  }, [active, map]);

  useEffect(() => {
    if (reset) {
      map.flyTo([22, 10], 2, { duration: 1 });
    }
  }, [reset, map]);

  return null;
}

/* ================= COMPONENT ================= */
export default function OurMap() {
    const [L, setL] = useState<typeof LeafletType | null>(null);
useEffect(() => {
  import("leaflet").then((leaflet) => {
    setL(leaflet);
  });
}, []);

  
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [active, setActive] = useState<LocationData | null>(null);
  const [resetMap, setResetMap] = useState(false);

  /* ================= PIN ================= */
const createPin = (color: string, isActive = false) => {
  if (!L) return null;

  return new L.DivIcon({
    html: `<div style="
      width:16px;
      height:16px;
      border-radius:50%;
      background:${color};
      box-shadow:
        0 0 ${isActive ? "14px" : "6px"} ${color}99,
        0 0 0 ${isActive ? "20px" : "14px"} ${color}33;
      border:2px solid white;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    className: "",
  });
};


  /* ================= FETCH LOCATIONS ================= */
  useEffect(() => {
    supabase
      .from("locations")
      .select("*")
      .eq("active", true)
      .then(({ data }) => setLocations(data || []));
  }, []);

  const closePanel = () => {
    setActive(null);
    setResetMap(true);
    setTimeout(() => setResetMap(false), 400);
  };

return (
    <section className="relative py-24 bg-gradient-to-b from-[#0056D2] to-[#003a8c] overflow-hidden">
        {/* Fix Z-Index */}
        <style jsx global>{`
            .leaflet-container {
                z-index: 0 !important;
                touch-action: none !important;
                cursor: default !important;
            }
            .map-pin:hover {
                transform: scale(1.5);
            }
            button, a {
                cursor: pointer;
            }
        `}</style>

        {/* ===== Heading ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                {t("globalPresenceTitle")}
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">{t("globalPresenceDesc")}</p>
        </div>

        {/* ===== Map Wrapper ===== */}
        <div className="relative z-0 max-w-7xl mx-auto px-6">
            <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <MapContainer
                    center={[22, 10]}
                    zoom={2}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    dragging={false}
                    zoomControl={false}
                    attributionControl={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    <MapController active={active} reset={resetMap} />
                    {locations.map((loc) => {
                        const icon = createPin(loc.brand_color || "#0056D2", active?.id === loc.id);
                        if (!icon) return null;
                        return (
                            <Marker
                                key={loc.id}
                                position={[loc.lat, loc.lng]}
                                icon={icon}
                                eventHandlers={{ click: () => setActive(loc) }}
                            />
                        );
                    })}
                </MapContainer>

                {/* ===== Overlay (click outside) ===== */}
                <AnimatePresence>
                    {active && (
                        <motion.div
                            onClick={closePanel}
                            className="absolute inset-0 bg-black/40 z-[998]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </AnimatePresence>

                {/* ===== SIDE PANEL ===== */}
                <AnimatePresence>
                    {active && (
                        <motion.aside
                            initial={{ x: "110%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "110%", opacity: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            style={{
                                borderLeft: `6px solid ${active.brand_color || "#0056D2"}`,
                            }}
                            className="absolute top-0 right-0 h-full w-full sm:w-[420px] z-[999] bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)]sm:rounded-l-3xl"
                        >
                            {/* Close */}
                            <button
                                onClick={closePanel}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                                aria-label="Close Panel"
                            >
                                <X size={18} />
                            </button>

                            {/* Brand */}
                            <div className="flex items-center gap-3 mb-6">
                                {active.brand_logo && (
                                    <Image
                                        src={active.brand_logo}
                                        alt={active.brand_name || "Brand Logo"}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-contain"
                                        unoptimized
                                    />
                                )}
                                <div>
                                    <h3
                                        className="text-xl font-bold"
                                        style={{ color: active.brand_color || "#0056D2" }}
                                    >
                                        {active.brand_name}
                                    </h3>
                                    {(active.name_en || active.name_ar) && (
                                        <span className="text-xs text-gray-500">
                                            {isArabic ? active.name_ar : active.name_en}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            {active.description && (
                                <p className="text-sm text-gray-700 leading-relaxed mb-4">{active.description}</p>
                            )}
                            <div className="space-y-2 text-sm">
                                {active.city && (
                                    <p>
                                        <strong>{t("city")}:</strong> {active.city}
                                    </p>
                                )}
                                {active.address && (
                                    <p>
                                        <strong>{t("address")}:</strong> {active.address}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {active.website && (
                                    <a
                                        href={active.website}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg text-sm text-white font-medium"
                                        style={{ background: active.brand_color || "#0056D2" }}
                                        rel="noopener noreferrer"
                                    >
                                        Website
                                    </a>
                                )}
                                {active.linkedin && (
                                    <a
                                        href={active.linkedin}
                                        target="_blank"
                                        className="px-4 py-2 rounded-lg text-sm border font-medium"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </section>
);
}
