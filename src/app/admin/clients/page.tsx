"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp, FileText, Building2, User, Phone, Mail, Printer, CheckCircle2, Circle, ArrowDownUp } from "lucide-react";

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
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        person.toLowerCase().includes(search.toLowerCase())
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
    const clientIndex = newClients.findIndex(c => c.rowIndex === client.rowIndex);
    if (clientIndex !== -1) {
      newClients[clientIndex] = { ...newClients[clientIndex], Status: newStatus };
      setClients(newClients);
    }

    try {
      await fetch("/api/updateClientStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex: client.rowIndex, status: newStatus })
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

  const parseValue = (val: string | undefined, key: string) => {
    if (!val) return "-";
    try {
      const parsed = JSON.parse(val);
      if (parsed && typeof parsed === "object" && parsed.label) {
        if (key === "Country" && parsed.value) {
          try {
            const arName = new Intl.DisplayNames(['ar'], { type: 'region' }).of(parsed.value);
            if (arName) return `${parsed.value} (${arName})`;
          } catch (e) {
            // Ignore invalid region codes
          }
        }
        return parsed.label;
      }
      if (Array.isArray(parsed)) {
         return parsed.map(p => p.label || p).join(", ");
      }
    } catch (e) {
      // not JSON
      if (key === "Country" && val.length === 2) {
         try {
            const arName = new Intl.DisplayNames(['ar'], { type: 'region' }).of(val.toUpperCase());
            if (arName) return `${val.toUpperCase()} (${arName})`;
         } catch (e) {}
      }
    }
    return val;
  };

  const handlePrint = (client: ClientData) => {
    const printWindow = window.open('', '_blank');
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

    displayFields.forEach(field => {
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

  return (
    <div className="admin-page" dir="rtl">
      <div className="admin-page-header">
        <h1>طلبات التصنيع</h1>
        <p>عرض تفاصيل طلبات العملاء المباشرة</p>
      </div>

      {/* Filters and Search */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div className="admin-search" style={{ flex: 1, minWidth: 250, margin: 0 }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="بحث باسم الشركة أو الشخص المسؤول..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 10, backgroundColor: "white", padding: "0 16px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <ArrowDownUp size={16} color="#64748b" />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            style={{ border: "none", outline: "none", backgroundColor: "transparent", fontSize: 14, color: "#334155", padding: "10px 0", cursor: "pointer" }}
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="oldest">الأقدم أولاً</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748b", padding: 20 }}>
          <div className="admin-spinner" style={{ width: 24, height: 24 }} />
          <span>جارِ تحميل الطلبات...</span>
        </div>
      ) : sortedClients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <FileText size={48} style={{ marginBottom: 12, opacity: 0.4, marginInline: "auto" }} />
          <p style={{ fontSize: 16, fontWeight: 600 }}>لا توجد طلبات</p>
          <p style={{ fontSize: 13 }}>لم يتم العثور على أي طلبات مطابقة</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sortedClients.map((client, idx) => {
            const isExpanded = expandedIndex === idx;
            const companyName = client["Name"] || "-";
            const contactPerson = client["Contact Person"] || "-";
            const phone = client["Phone Number"] || "-";
            const email = client["Email"] || "-";
            const date = client["Date"] || "-";

            return (
              <div 
                key={idx} 
                className="admin-content-card" 
                style={{ overflow: "hidden", transition: "all 0.3s ease" }}
              >
                {/* Header (Always Visible) */}
                <div 
                  onClick={() => toggleExpand(idx)}
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    padding: "20px 24px", 
                    cursor: "pointer",
                    backgroundColor: isExpanded ? "#f8fafc" : "white",
                    borderBottom: isExpanded ? "1px solid #e2e8f0" : "none"
                  }}
                >
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 200 }}>
                      <div style={{ backgroundColor: "#eff6ff", color: "#2563eb", padding: 10, borderRadius: 8 }}>
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                          {companyName}
                        </h2>
                        <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                          <User size={14} /> {contactPerson}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <Phone size={14} /> {phone}
                      </span>
                      <span style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <Mail size={14} /> {email}
                      </span>
                    </div>

                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, paddingRight: 20 }}>
                       <button
                          onClick={(e) => { e.stopPropagation(); toggleStatus(client); }}
                          style={{ 
                            display: "flex", alignItems: "center", gap: 6, 
                            padding: "6px 12px", borderRadius: 12, border: "none", cursor: "pointer",
                            backgroundColor: client.Status === "Reviewed" ? "#dcfce7" : "#f1f5f9",
                            color: client.Status === "Reviewed" ? "#166534" : "#64748b",
                            fontWeight: 600, fontSize: 12, transition: "all 0.2s"
                          }}
                       >
                         {client.Status === "Reviewed" ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                         {client.Status === "Reviewed" ? "تم المراجعة" : "لم يتم المراجعة"}
                       </button>

                       <span style={{ fontSize: 13, color: "#94a3b8", backgroundColor: "#f1f5f9", padding: "4px 10px", borderRadius: 12 }}>
                         التاريخ: {date}
                       </span>
                    </div>
                  </div>
                  
                  <div style={{ color: "#94a3b8", padding: 8 }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Details (Expanded View) */}
                {isExpanded && (
                  <div style={{ padding: "24px", backgroundColor: "white" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid #e2e8f0" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#334155", margin: 0 }}>
                        كافة تفاصيل الطلب
                      </h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); handlePrint(client); }}
                        className="admin-btn admin-btn-secondary"
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", backgroundColor: "#f8fafc", color: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}
                      >
                        <Printer size={16} /> طباعة التقرير
                      </button>
                    </div>
                    
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                      gap: "20px 30px" 
                    }}>
                      {displayFields.map((field) => {
                        let value = parseValue(client[field.key], field.key);
                        if (!value) value = "-";

                        return (
                          <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{field.label}</span>
                            <span style={{ 
                              fontSize: 14, 
                              color: "#0f172a", 
                              fontWeight: 600,
                              wordBreak: "break-word",
                              padding: "8px 12px",
                              backgroundColor: "#f8fafc",
                              borderRadius: 6,
                              border: "1px solid #f1f5f9"
                            }}>
                              {value}
                            </span>
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
