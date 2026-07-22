"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  User,
  Phone,
  Mail,
  Printer,
  CheckCircle2,
  Circle,
  ArrowDownUp,
  Globe,
} from "lucide-react";

type ClientData = Record<string, any>;

export default function AdminRequestsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/getClients");
        const data = await res.json();
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error("Expected array of clients, but got:", data);
        }
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const sortedClients = [...clients]
    .filter((c) => {
      const name = c["Name"] || c["اسم الشركة"] || "";
      const person = c["Contact Person"] || c["الشخص المسؤول"] || "";
      const phone = c["Phone Number"] || c["رقم الهاتف"] || "";
      const email = c["Email"] || c["البريد الإلكتروني"] || "";

      const s = search.toLowerCase();
      return (
        name.toLowerCase().includes(s) ||
        person.toLowerCase().includes(s) ||
        phone.toLowerCase().includes(s) ||
        email.toLowerCase().includes(s)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (b.rowIndex || 0) - (a.rowIndex || 0);
      } else {
        return (a.rowIndex || 0) - (b.rowIndex || 0);
      }
    });

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const toggleStatus = async (client: ClientData) => {
    const newStatus = client.Status === "Reviewed" ? "" : "Reviewed";

    // Optimistic update
    const newClients = [...clients];
    const clientIndex = newClients.findIndex((c) => c.rowIndex === client.rowIndex);
    if (clientIndex !== -1) {
      newClients[clientIndex] = { ...newClients[clientIndex], Status: newStatus };
      setClients(newClients);
    }

    try {
      await fetch("/api/updateClientStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex: client.rowIndex, status: newStatus }),
      });
    } catch (e) {
      console.error("Failed to update status", e);
      // Revert if failed
      if (clientIndex !== -1) {
        const reverted = [...clients];
        reverted[clientIndex] = { ...reverted[clientIndex], Status: client.Status };
        setClients(reverted);
      }
    }
  };

  const parseValue = (val: any, key: string) => {
    if (val === undefined || val === null || val === "") return "-";
    if (typeof val === "boolean") return val ? "نعم" : "لا";

    try {
      if (typeof val === "string") {
        const parsed = JSON.parse(val);
        if (parsed && typeof parsed === "object" && parsed.label) {
          if (key === "Country" && parsed.value) {
            try {
              const arName = new Intl.DisplayNames(["ar"], { type: "region" }).of(
                parsed.value
              );
              if (arName) return `${parsed.value} (${arName})`;
            } catch (e) {}
          }
          return parsed.label;
        }
        if (Array.isArray(parsed)) {
          return parsed.map((p) => p.label || p).join("، ");
        }
      }
    } catch (e) {
      if (key === "Country" && typeof val === "string" && val.length === 2) {
        try {
          const arName = new Intl.DisplayNames(["ar"], { type: "region" }).of(
            val.toUpperCase()
          );
          if (arName) return `${val.toUpperCase()} (${arName})`;
        } catch (e) {}
      }
    }
    return String(val);
  };

  const handlePrint = (client: ClientData) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("يرجى السماح بالنوافذ المنبثقة (Pop-ups) للطباعة");
      return;
    }

    let html = `
      <html dir="rtl" lang="ar">
        <head>
          <title>طباعة طلب تصنيع - ${client["Name"] || "عميل"}</title>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; color: #0f172a; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; }
            .header h1 { color: #1e40af; margin: 0 0 8px 0; font-size: 20px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
            .field { break-inside: avoid; }
            .label { font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 13px; font-weight: bold; background: #f8fafc; padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 6px; }
            .footer { margin-top: 30px; text-align: center; color: #94a3b8; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
            @page { margin: 10mm; }
            @media print {
              body { padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .value { border: 1px solid #cbd5e1; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>طلب تصنيع: ${client["Name"] || "-"}</h1>
            <div style="font-size: 16px; color: #475569;">
              الشخص المسؤول: <strong>${client["Contact Person"] || "-"}</strong> &nbsp;|&nbsp; 
              التاريخ: <strong>${client["Date"] || "-"}</strong>
            </div>
          </div>
          <div class="grid">
    `;

    displayFields.forEach((field) => {
      let value = parseValue(client[field.key], field.key);
      if (!value) value = "-";

      html += `
        <div class="field">
          <div class="label">${field.label}</div>
          <div class="value">${value}</div>
        </div>
      `;
    });

    html += `
          </div>
          <div class="footer">
            تم إنشاء هذا التقرير بواسطة نظام إدارة Boon Medical Industries
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const displayFields = [
    { key: "Name", label: "اسم الشركة" },
    { key: "Contact Person", label: "الشخص المسؤول" },
    { key: "Phone Number", label: "رقم الهاتف" },
    { key: "Email", label: "البريد الإلكتروني" },
    { key: "Website", label: "الموقع الإلكتروني" },
    { key: "Country", label: "الدولة" },
    { key: "Postal Code", label: "العنوان البريدي" },
    { key: "Trade License", label: "الرخصة التجارية" },
    { key: "Year Established", label: "سنة التأسيس" },
    { key: "Company Owners", label: "الملاك والشركاء" },
    { key: "Business Type", label: "نوع العمل" },
    { key: "Presence", label: "التواجد والفروع" },
    { key: "Turn Over", label: "حجم المبيعات سنوياً" },
    { key: "Team Size", label: "الموظفين" },
    { key: "Partner Brands", label: "الشركاء التجاريين" },
    { key: "References", label: "المراجع" },
    { key: "Competitors", label: "المنافسين" },
    { key: "Requested Products", label: "المنتجات المطلوبة" },
    { key: "Target Profile", label: "الملف المستهدف" },
    { key: "Product Category", label: "فئة المنتجات" },
    { key: "Launching Date", label: "تاريخ الإطلاق" },
    { key: "Custom Formulation", label: "تركيبة مخصصة" },
    { key: "Formulation Details", label: "تفاصيل التركيبة" },
    { key: "Sample Qty", label: "كمية العينة" },
    { key: "Sample Deadline", label: "موعد العينة" },
    { key: "Testing Requirements", label: "متطلبات الاختبار" },
    { key: "Packaging Requirements", label: "متطلبات التغليف" },
    { key: "Packaging Details", label: "تفاصيل التغليف" },
    { key: "Artwork", label: "التصميم الفني" },
    { key: "Barcode", label: "الباركود" },
    { key: "Local Language", label: "اللغة المحلية" },
    { key: "Logistics Needs", label: "احتياجات لوجستية" },
    { key: "Incoterms", label: "شروط الشحن" },
    { key: "Serialization", label: "التسلسل" },
    { key: "Delivery Lead Time", label: "وقت التوصيل" },
    { key: "Authorized Distributors", label: "الموزعين المعتمدين" },
    { key: "Storage Conditions", label: "شروط التخزين" },
    { key: "Other Notes", label: "ملاحظات" },
    { key: "Signature", label: "التوقيع" },
    { key: "Date", label: "التاريخ" },
    { key: "Agree Terms", label: "الموافقة على الشروط" },
  ];

  const knownKeys = new Set([
    ...displayFields.map((f) => f.key),
    "rowIndex",
    "Status",
    "created_at",
  ]);

  return (
    <div className="admin-page space-y-6" dir="rtl">
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-main/10 text-main rounded-2xl">
            <Building2 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">طلبات التصنيع (Private Label / OEM)</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              عرض وتقييم تفاصيل كافة طلبات التصنيع للعملاء المباشرة
            </p>
          </div>
        </div>

        <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
          إجمالي الطلبات: {clients.length}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="بحث باسم الشركة، الشخص المسؤول، رقم الهاتف، أو البريد..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-main/20 text-gray-800"
          />
        </div>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm text-gray-700 w-full sm:w-auto">
          <ArrowDownUp size={16} className="text-gray-400" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="bg-transparent border-none outline-none font-medium cursor-pointer"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="oldest">الأقدم أولاً</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-3xl border border-gray-200/80">
          جارِ تحميل طلبات التصنيع...
        </div>
      ) : sortedClients.length === 0 ? (
        <div className="p-12 text-center text-gray-400 bg-white rounded-3xl border border-gray-200/80">
          <FileText size={48} className="mx-auto mb-3 opacity-30 text-main" />
          <p className="font-bold text-gray-700 text-base">لا توجد طلبات تصنيع</p>
          <p className="text-xs">لم يتم العثور على أي طلبات مطابقة لبحثك</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedClients.map((client, idx) => {
            const isExpanded = expandedIndex === idx;
            const companyName = client["Name"] || client["اسم الشركة"] || "شركة غير محددة";
            const contactPerson = client["Contact Person"] || client["الشخص المسؤول"] || "-";
            const phone = client["Phone Number"] || client["رقم الهاتف"] || "-";
            const email = client["Email"] || client["البريد الإلكتروني"] || "-";
            const date = client["Date"] || client["التاريخ"] || "-";

            // Extra dynamic fields not in displayFields
            const extraKeys = Object.keys(client).filter((k) => !knownKeys.has(k));

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden transition"
              >
                {/* Header (Always Visible) */}
                <div
                  onClick={() => toggleExpand(idx)}
                  className={`p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer transition ${
                    isExpanded ? "bg-gray-50/80 border-b border-gray-200/80" : "hover:bg-gray-50/40"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="p-3 bg-blue-50 text-main rounded-2xl shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-0.5">
                        {companyName}
                      </h2>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <User size={14} /> {contactPerson}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone size={14} className="text-gray-400" /> {phone}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Mail size={14} className="text-gray-400" /> {email}
                    </span>
                  </div>

                  <div className="mr-auto flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(client);
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        client.Status === "Reviewed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {client.Status === "Reviewed" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Circle size={14} />
                      )}
                      {client.Status === "Reviewed" ? "تمت المراجعة" : "لم يراجع"}
                    </button>

                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl font-medium">
                      {date}
                    </span>

                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-6 bg-white space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <h3 className="text-base font-bold text-gray-900">
                        كافة تفاصيل وبيانات الطلب ({displayFields.length + extraKeys.length} حقل)
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(client);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 transition cursor-pointer"
                      >
                        <Printer size={16} /> طباعة التقرير الشامل
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {displayFields.map((field) => {
                        let value = parseValue(client[field.key], field.key);
                        return (
                          <div key={field.key} className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 block">
                              {field.label}
                            </span>
                            <div className="text-sm font-semibold text-gray-900 p-3 bg-gray-50/70 border border-gray-200/60 rounded-2xl break-words min-h-[42px] flex items-center">
                              {value}
                            </div>
                          </div>
                        );
                      })}

                      {/* Extra Dynamic Keys if present */}
                      {extraKeys.map((key) => {
                        let value = parseValue(client[key], key);
                        return (
                          <div key={key} className="space-y-1">
                            <span className="text-xs font-semibold text-purple-600 block">
                              {key}
                            </span>
                            <div className="text-sm font-semibold text-gray-900 p-3 bg-purple-50/30 border border-purple-100 rounded-2xl break-words min-h-[42px] flex items-center">
                              {value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
