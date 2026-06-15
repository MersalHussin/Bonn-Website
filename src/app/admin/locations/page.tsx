"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LocationsTable from "../../components/admin/LocationsTable";
import LocationForm from "../../components/admin/LocationForm";
import { Plus } from "lucide-react";

export type Location = {
  id: string;
  name_en: string;
  name_ar: string;
  type: string;
  brand_name?: string;
  city?: string;
  address?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  lat: number;
  lng: number;
  active: boolean;
  brand_color?: string;
  brand_logo?: string;
  brand_key?: string;
};

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("locations").select("*");
    if (error) console.error("Error fetching locations:", error);
    else setLocations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-2xl hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Location
        </button>
      </div>

      {/* ===== Locations Table ===== */}
      <div className="bg-white rounded-2xl shadow p-4">
        {loading ? (
          <p className="text-gray-500">Loading locations...</p>
        ) : (
          <LocationsTable
            locations={locations}
            onEdit={(loc) => {
              setEditing(loc);
              setShowForm(true);
            }}
            onRefresh={fetchLocations}
          />
        )}
      </div>

      {/* ===== Location Form Overlay ===== */}
      {showForm && (
        <LocationForm
          initialData={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchLocations();
          }}
        />
      )}
    </div>
  );
}
