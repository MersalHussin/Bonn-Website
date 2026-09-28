"use client";

import { useState, useEffect } from "react";
import { auth } from "../../lib/firebaseConfig";

import { Location } from "../../admin/locations/page";
import { useTranslation } from "react-i18next";

type Props = {
  initialData: Location | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function LocationForm({ initialData, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name_en: initialData?.name_en ?? "",
    name_ar: initialData?.name_ar ?? "",
    lat: initialData?.lat ?? 30.0444,
    lng: initialData?.lng ?? 31.2357,
    active: initialData?.active ?? true,
    online_stores: initialData?.online_stores ?? [],
  });

  const addStore = () => {
    setForm({ ...form, online_stores: [...form.online_stores, { name: "", url: "" }] });
  };

  const updateStore = (index: number, field: string, value: string) => {
    const updatedStores = [...form.online_stores];
    updatedStores[index] = { ...updatedStores[index], [field]: value };
    setForm({ ...form, online_stores: updatedStores });
  };

  const removeStore = (index: number) => {
    const updatedStores = [...form.online_stores];
    updatedStores.splice(index, 1);
    setForm({ ...form, online_stores: updatedStores });
  };



  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to save locations.");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      
      const url = initialData?.id 
        ? `/api/admin/locations/${initialData.id}` 
        : `/api/admin/locations`;
        
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("API error:", data.error);
        alert(data.error || "Failed to save location");
      } else {
        onSaved();
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred while saving.");
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

        {/* Location Details */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-bold text-gray-900 text-lg">
              Basic Details (البيانات الأساسية)
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Country Name (English)</label>
              <input
                className="input focus:ring-2 focus:ring-main/20 border-gray-200"
                placeholder="e.g. Saudi Arabia"
                value={form.name_en}
                onChange={(e) =>
                  setForm({ ...form, name_en: e.target.value })
                }
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Country Name (Arabic)</label>
              <input
                className="input focus:ring-2 focus:ring-main/20 border-gray-200 text-right"
                placeholder="مثال: السعودية"
                value={form.name_ar}
                onChange={(e) =>
                  setForm({ ...form, name_ar: e.target.value })
                }
                required
              />
            </div>
          </div>
        </section>

        {/* Coordinates */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b pb-2">
            <h3 className="font-bold text-gray-900 text-lg">
              Coordinates (الإحداثيات)
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Enter the exact latitude and longitude for the country pin on the map.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Latitude (خط العرض)</label>
              <input
                type="number"
                step="any"
                className="input font-mono text-sm"
                placeholder="e.g. 24.7136"
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Longitude (خط الطول)</label>
              <input
                type="number"
                step="any"
                className="input font-mono text-sm"
                placeholder="e.g. 46.6753"
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
        </section>

        {/* Online Stores */}
        <section className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-2">
            <h3 className="font-bold text-gray-900 text-lg">Online Stores (المتاجر الإلكترونية)</h3>
            <button 
              type="button" 
              onClick={addStore} 
              className="text-sm bg-[#04349C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#03287A] transition shadow-sm flex items-center gap-2"
            >
              + Add Store
            </button>
          </div>
          
          <div className="space-y-3">
            {form.online_stores.map((store, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-3 items-center bg-white p-3 rounded-lg border shadow-sm group">
                <input
                  placeholder="Store Name (e.g. Amazon)"
                  className="input flex-1 bg-transparent border-gray-200"
                  value={store.name}
                  onChange={(e) => updateStore(i, "name", e.target.value)}
                  required
                />
                <input
                  placeholder="Store URL (https://...)"
                  className="input flex-1 bg-transparent border-gray-200"
                  value={store.url}
                  onChange={(e) => updateStore(i, "url", e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => removeStore(i)} 
                  className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center transition"
                  title="Remove Store"
                >
                  ✕
                </button>
              </div>
            ))}
            {form.online_stores.length === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                <p className="text-sm text-gray-500">No stores added yet. Click "Add Store" to add one.</p>
              </div>
            )}
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
