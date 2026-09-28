"use client";

import { auth } from "../../lib/firebaseConfig";
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
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to delete.");
        return;
      }
      
      const token = await user.getIdToken();
      const res = await fetch(`/api/admin/locations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error("Failed to delete");
      
      onRefresh();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete location.");
    }
  };

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
        {t("noLocations")}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-[#f8fafc] border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Country (البلد)
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Coordinates (الإحداثيات)
              </th>
              <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Stores (المتاجر)
              </th>
              <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status (الحالة)
              </th>
              <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions (إجراءات)
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {locations.map((loc) => (
              <tr
                key={loc.id}
                className="hover:bg-blue-50/50 transition-colors duration-200 group"
              >
                {/* ===== Location Info ===== */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-base">
                      {loc.name_ar}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {loc.name_en}
                    </span>
                  </div>
                </td>

                {/* ===== Coordinates ===== */}
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded-md w-fit border border-gray-100">
                      <span className="text-gray-400">Lat:</span>
                      {loc.lat.toFixed(4)}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded-md w-fit border border-gray-100">
                      <span className="text-gray-400">Lng:</span>
                      {loc.lng.toFixed(4)}
                    </div>
                  </div>
                </td>

                {/* ===== Stores ===== */}
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1 rounded-full text-xs font-bold bg-[#04349C]/10 text-[#04349C] border border-[#04349C]/20 shadow-sm">
                    {loc.online_stores ? loc.online_stores.length : 0}
                  </span>
                </td>

                {/* ===== Status ===== */}
                <td className="px-6 py-4 text-center">
                  {loc.active ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      نشط
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      معطل
                    </span>
                  )}
                </td>

                {/* ===== Actions ===== */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(loc)}
                      className="p-2 text-[#04349C] hover:bg-[#04349C]/10 rounded-lg transition-colors border border-transparent hover:border-[#04349C]/20"
                      title={t("edit")}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteLocation(loc.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                      title={t("delete")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
