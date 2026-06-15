"use client";

import { useEffect, useState } from "react";
import { generateClientPDF } from "../../lib/pdf";
import Link from "next/link";
import { Search, Eye, Download } from "lucide-react";
import { useTranslation } from "react-i18next";


type PDF = { name: string; company: string; url: string };

export default function AdminPDFsPage() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const createPDFs = async () => {
      const tempPdfs: PDF[] = [];
      const res = await fetch("/api/getClients");
      const clients = await res.json();

      for (const client of clients) {
        const pdfBytes = await generateClientPDF(client);
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const name = client["Contact Person"] || "-";
        const company = client["Name"] || "-"; 

        tempPdfs.push({ name, company, url });
      }

      setPdfs(tempPdfs);
    };

    createPDFs();
  }, []);

  const filteredPDFs = pdfs.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
  <h1 className="text-3xl font-bold">
    {t("pdfs.title")}
  </h1>

  {/* Search */}
  <div className="relative w-full md:w-1/3">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input
      type="text"
      placeholder={t("pdfs.search")}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-10 pr-4 py-2 w-full border rounded-lg"
    />
  </div>


      {/* Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPDFs.map((pdf, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="mb-3 flex flex-col gap-1">
              <h2 className="font-semibold text-lg text-blue-800">{pdf.name}</h2>
              <span className="text-sm text-gray-500">{pdf.company}</span>
            </div>

            {/* Preview */}
            <iframe
              src={pdf.url}
              width="100%"
              height="180px"
              title={`PDF report for ${pdf.name}`}
              className="mb-4 border rounded"
            ></iframe>

            {/* Actions */}
            <div className="mt-auto flex gap-2">
              <Link
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-cyan-600 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Eye size={16} /> {t("pdfs.view")}
              </Link>
              <Link
                href={pdf.url}
                download={`${pdf.name}-${pdf.company}-Report.pdf`}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Download size={16} /> {t("pdfs.download")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
