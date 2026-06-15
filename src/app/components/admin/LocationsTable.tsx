"use client";

import { supabase } from "../../lib/supabaseClient";
import { Location } from "../../admin/locations/page";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  locations: Location[];
  onEdit: (loc: Location) => void;
  onRefresh: () => void;
};

export default function LocationsTable({ locations, onEdit, onRefresh }: Props) {
  const { t } = useTranslation();

  const deleteLocation = async (id: string) => {
    if (!confirm(t("confirmDeleteLocation"))) return;
    await supabase.from("locations").delete().eq("id", id);
    onRefresh();
  };

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
        {t("noLocations")}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left p-4">{t("location")}</th>
            <th className="text-left">{t("coordinates")}</th>
            <th className="text-left">{t("status")}</th>
            <th className="text-right p-4">{t("admin-actions")}</th>
          </tr>
        </thead>

        <tbody>
          {locations.map((loc) => (
            <tr
              key={loc.id}
              className="border-t hover:bg-gray-50 transition"
            >
              {/* ===== Location Info ===== */}
              <td className="p-4">
                <div className="font-medium text-gray-900">
                  {loc.name_en}
                </div>
                {loc.city && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {loc.city}
                  </div>
                )}
              </td>

              {/* ===== Coordinates ===== */}
              <td className="text-gray-600">
                <div>{loc.lat.toFixed(4)}</div>
                <div>{loc.lng.toFixed(4)}</div>
              </td>

              {/* ===== Status ===== */}
              <td>
                {loc.active ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {t("active")}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                    {t("disabled")}
                  </span>
                )}
              </td>

              {/* ===== Actions ===== */}
              <td className="p-4">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(loc)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title={t("edit")}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteLocation(loc.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title={t("delete")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
