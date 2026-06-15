"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo , useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import type * as LeafletType from "leaflet";

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

/* ================= TYPES ================= */
type Props = {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number) => void;
};

/* ================= HELPERS ================= */
function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);

  return null;
}

function ClickHandler({ onPick }: { onPick: Props["onPick"] }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/* ================= COMPONENT ================= */
export default function LocationPickerMap({ lat, lng, onPick }: Props) {
    const [L, setL] = useState<typeof LeafletType | null>(null);
    useEffect(() => {
  import("leaflet").then(setL);
}, []);

const markerIcon = useMemo(() => {
  if (!L) return null;

  return new L.DivIcon({
        className: "",
        html: `
          <div style="
            width:16px;
            height:16px;
            border-radius:50%;
            background:#06b6d4;
            border:2px solid white;
            box-shadow:0 0 0 6px rgba(6,182,212,0.25);
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
}, [L]);

  return (
    <div className="space-y-2">
      <div className="h-[320px] rounded-xl overflow-hidden border border-gray-200">
        <MapContainer
          center={[lat, lng]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {markerIcon && (
  <Marker position={[lat, lng]} icon={markerIcon} />
)}

          <ClickHandler onPick={onPick} />
          <Recenter lat={lat} lng={lng} />
        </MapContainer>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500">
        Click anywhere on the map to update the location
      </p>
    </div>
  );
}
