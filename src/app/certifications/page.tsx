"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

export default function CertificatesPage() {
  const { t } = useTranslation();

  const certificates = [
    {
      id: 1,
      title: "ISO 9001 Certification",
      file: "/certificates/ISO9001.pdf",
      preview: "/certificates/cert1.png",
    },
    {
      id: 2,
      title: "ISO 22000 Certification",
      file: "/certificates/ISO22000.pdf",
      preview: "/certificates/cert2.png",
    },
    {
      id: 3,
      title: "HACCP Certification",
      file: "/certificates/HACCPCertificate.pdf",
      preview: "/certificates/cert3.png",
    },
    {
      id: 4,
      title: "ISO 13485 Certification",
      file: "/certificates/ISO13485.pdf",
      preview: "/certificates/cert4.png",
    },
    {
      id: 5,
      title: "Saudi Food & Drugs Authority",
      file: "https://www.sfda.gov.sa/ar/node/87914",
      preview: "/certificates/Food&Drug.png",
    },
  ];

  return (
    <div className="w-full">
      {/* 2. Certificates Grid */}
      <section className="py-20 px-6 md:px-12 bg-[#F4F8FF]">
        <h2 className="text-4xl font-bold text-main mb-14 text-center">
          {t("certifications") || "الشهادات"}
        </h2>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 mb-10">
          {certificates.slice(0, 3).map((cert) => (
            <div
              key={cert.id}
              className="group bg-white border border-[#E0E7FF] rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              <Link
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col transition"
              >
                {/* Preview Image */}
                <div className="relative w-full h-72 md:h-80 bg-[#FAFCFF] p-4 flex items-center justify-center overflow-hidden border-b border-[#E0E7FF]">
                  <Image
                    src={cert.preview}
                    alt={cert.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center bg-white group-hover:bg-[#f4f8ff] transition-colors">
                  <h3 className="font-bold text-lg md:text-xl text-[var(--second-color)] text-center">
                    {cert.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
          {certificates.slice(3).map((cert) => (
            <div
              key={cert.id}
              className="group bg-white border border-[#E0E7FF] rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col overflow-hidden"
            >
              <Link
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col transition"
              >
                {/* Preview Image */}
                <div className="relative w-full h-64 md:h-72 bg-[#FAFCFF] p-4 flex items-center justify-center overflow-hidden border-b border-[#E0E7FF]">
                  <Image
                    src={cert.preview}
                    alt={cert.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center bg-white group-hover:bg-[#f4f8ff] transition-colors">
                  <h3 className="font-bold text-lg md:text-xl text-[var(--second-color)] text-center">
                    {cert.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
