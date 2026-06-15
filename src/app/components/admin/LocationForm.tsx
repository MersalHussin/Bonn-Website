"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import LocationPickerMap from "./LocationPickerMap";
import { Location } from "../../admin/locations/page";
import { useTranslation } from "react-i18next";

type Props = {
  initialData: Location | null;
  onClose: () => void;
  onSaved: () => void;
};

type Brand = {
  id: string; // brand_key
  name: string;
  color: string;
  logo: string;
};

export default function LocationForm({ initialData, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const brands: Brand[] = [
    {
      id: "bonn_medical_industries",
      name: "Bonn Medical Industries",
      color: "#0056D2",
      logo: "/images/logo.webp",
    },
    {
      id: "covix_care",
      name: "Covix Care",
      color: "#FF8C00",
      logo: "/images/covix.png",
    },
    {
      id: "le_visage",
      name: "Le Visage",
      color: "#8A2BE2",
      logo: "/images/Visage.png",
    },
  ];

  const [form, setForm] = useState({
    name_en: initialData?.name_en ?? "",
    name_ar: initialData?.name_ar ?? "",
    type: initialData?.type ?? "manufacturing",
    brand_key: initialData?.brand_key ?? "",
    brand_name: initialData?.brand_name ?? "",
    brand_color: initialData?.brand_color ?? "",
    brand_logo: initialData?.brand_logo ?? "",

    city: initialData?.city ?? "",
    address: initialData?.address ?? "",
    description: initialData?.description ?? "",
    website: initialData?.website ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    instagram: initialData?.instagram ?? "",
    linkedin: initialData?.linkedin ?? "",

    lat: initialData?.lat ?? 30.0444,
    lng: initialData?.lng ?? 31.2357,
    active: initialData?.active ?? true,
  });

  /* ===================== BRAND CHANGE ===================== */
  const handleBrandChange = (brandKey: string) => {
    const selected = brands.find((b) => b.id === brandKey);

    setForm((prev) => ({
      ...prev,
      brand_key: brandKey,
      brand_name: selected?.name ?? "",
      brand_color: selected?.color ?? "",
      brand_logo: selected?.logo ?? "",
    }));
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = initialData?.id
        ? await supabase
            .from("locations")
            .update(form)
            .eq("id", initialData.id)
        : await supabase.from("locations").insert([form]);

      if (result.error) {
        console.error("Supabase error:", result.error);
        alert(result.error.message);
      } else {
        onSaved();
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error");
    }

    setLoading(false);
  };

  /* ===================== CLICK OUTSIDE ===================== */
useEffect(() => {
  if (typeof document === "undefined") return;
  
  const handleClickOutside = (e: MouseEvent) => {
    const el = document.getElementById("location-form-wrapper");
    if (el && !el.contains(e.target as Node)) onClose();
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [onClose]);

    /* ===================== SELECTED BRAND ===================== */
  const selectedBrand = brands.find(
    (b) => b.id === form.brand_key
  );

  /* ===================== UI ===================== */
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        id="location-form-wrapper"
        onSubmit={handleSubmit}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {initialData ? t("editLocation") : t("addLocation")}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {t("manageLocations")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Brand */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Country Name (English)"
              value={form.name_en}
              onChange={(e) =>
                setForm({ ...form, name_en: e.target.value })
              }
              required
            />
            <input
              className="input"
              placeholder="Country Name (Arabic)"
              value={form.name_ar}
              onChange={(e) =>
                setForm({ ...form, name_ar: e.target.value })
              }
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-center">
            <select
              className="input"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="manufacturing">
                Manufacturing Facility
              </option>
              <option value="partner">Partner</option>
              <option value="distributor">Distributor</option>
            </select>

            <select
              className="input"
              value={form.brand_key}
              onChange={(e) =>
                handleBrandChange(e.target.value)
              }
              required
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {selectedBrand && (
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={selectedBrand.logo}
                  alt={selectedBrand.name}
                  className="w-10 h-10 object-contain"
                />
                <span
                  className="font-semibold"
                  style={{ color: selectedBrand.color }}
                >
                  {selectedBrand.name}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Location */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            Location Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <LocationPickerMap
            lat={form.lat}
            lng={form.lng}
            onPick={(lat, lng) =>
              setForm({ ...form, lat, lng })
            }
          />
        </section>
        {/* Description */}
         <section className="space-y-4"> 
            <h3 className="font-semibold text-gray-900">Description</h3>
             <textarea rows={3} placeholder="Short description about this location"
              className="input resize-none" 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              /> 
              </section> 
              
              {/* Contact */} 
              <section className="space-y-4"> 
                <h3 className="font-semibold text-gray-900">
                    Contact & Social
                    </h3>
                 <div className="grid md:grid-cols-2 gap-4"> 
                    <input
                     placeholder="Website" 
                     className="input"
                     value={form.website}
                     onChange={(e) => setForm({ ...form, website: e.target.value })} 
                     /> 
                     <input 
                     placeholder="Email" 
                     className="input" 
                     value={form.email} 
                     onChange={(e) => setForm({ ...form, email: e.target.value })} 
                     /> 
                     <input 
                     placeholder="Phone" 
                     className="input" 
                     value={form.phone} 
                     onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                     /> 
                     <input 
                     placeholder="LinkedIn" 
                     className="input" 
                     value={form.linkedin} 
                     onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
                     </div> 
                     </section>

        {/* Footer */}
        <div className="flex justify-between items-center pt-6 border-t">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({ ...form, active: e.target.checked })
              }
            />
            Active location
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Location"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
