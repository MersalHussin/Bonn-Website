"use client";

import { useEffect, useState } from "react";
import { generateClientPDF } from "../../lib/pdf";
import Link from "next/link";
import { Search, Eye, Download, FileText } from "lucide-react";

type PDF = { name: string; company: string; url: string };

export default function AdminPDFsPage() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createPDFs = async () => {
      const tempPdfs: PDF[] = [];
      const res = await fetch("/api/getClients");
      const clients = await res.json();

      if (!Array.isArray(clients)) {
        console.error("Expected array of clients, but got:", clients);
        setLoading(false);
        return;
      }

      for (const client of clients) {
        let url = "";

        for (const key in client) {
          if (
            typeof client[key] === "string" &&
            client[key].startsWith("http") &&
            client[key].toLowerCase().includes(".pdf")
          ) {
            url = client[key];
            break;
          }
        }

        if (!url) {
          try {
            const pdfBytes = await generateClientPDF(client);
            const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
            url = URL.createObjectURL(blob);
          } catch (err) {
            console.error("Failed to generate PDF for client on the fly:", err);
            url = "";
          }
        }

        const name = client["Contact Person"] || "-";
        const company = client["Name"] || "-";

        if (url) {
          tempPdfs.push({ name, company, url });
        }
      }

      setPdfs(tempPdfs);
      setLoading(false);
    };

    createPDFs();
  }, []);

  const filteredPDFs = pdfs.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page" dir="rtl">
      <div className="admin-page-header">
        <h1>طلبات التصنيع</h1>
        <p>عرض وتحميل ملفات PDF الخاصة بطلبات العملاء</p>
      </div>

      {/* Search */}
      <div className="admin-search" style={{ marginBottom: 24 }}>
        <Search size={18} />
        <input
          type="text"
          placeholder="بحث بالاسم أو الشركة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748b", padding: 20 }}>
          <div className="admin-spinner" style={{ width: 24, height: 24 }} />
          <span>جارِ تحميل الطلبات...</span>
        </div>
      ) : filteredPDFs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
          <FileText size={48} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 16, fontWeight: 600 }}>لا توجد طلبات</p>
          <p style={{ fontSize: 13 }}>لم يتم العثور على أي طلبات مطابقة</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {filteredPDFs.map((pdf, idx) => (
            <div
              key={idx}
              className="admin-content-card"
              style={{ display: "flex", flexDirection: "column", padding: 20 }}
            >
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>{pdf.name}</h2>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{pdf.company}</span>
              </div>

              <iframe
                src={pdf.url}
                width="100%"
                height="180px"
                title={`PDF report for ${pdf.name}`}
                style={{ borderRadius: 8, border: "1px solid #e8ecf2", marginBottom: 14 }}
              />

              <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
                <Link
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-secondary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Eye size={16} /> عرض
                </Link>
                <Link
                  href={pdf.url}
                  download={`${pdf.name}-${pdf.company}-Report.pdf`}
                  className="admin-btn admin-btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Download size={16} /> تحميل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
