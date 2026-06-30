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
    <div className="admin-page space-y-6" dir="rtl">
      {/* ===== Header ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div className="admin-page-header" style={{ marginBottom: 0 }}>
          <h1>الفروع</h1>
          <p>إدارة المواقع والفروع</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="admin-btn admin-btn-primary"
        >
          <Plus size={18} />
          إضافة فرع
        </button>
      </div>

      {/* ===== Locations Table ===== */}
      <div className="admin-content-card" style={{ padding: 16 }}>
        {loading ? (
          <p style={{ color: "#64748b", padding: 20 }}>جارِ التحميل...</p>
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
