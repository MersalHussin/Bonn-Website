"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const clients = [
  { name: "saudia", logo: "/images/saudia.svg" },
  { name: "HAUT", logo: "/images/Haut.png" },
  { name: "Sheild", logo: "/images/Shield.png" },
  { name: "Vert", logo: "/images/Vert.png" },
  { name: "SENSA", logo: "/images/SENSA.png" },
  { name: "Visage", logo: "/images/Visage.png" },
  { name: "B1 Care", logo: "/images/B1.png" },
  { name: "Four Seasons Hotels", logo: "/images/four.png" },
  { name: "Covix Care", logo: "/images/covix.png" },
  { name: "ZENDA", logo: "/images/ZENDA.png" },
  { name: "Havera", logo: "/images/Havera.png" },
  { name: "Koln", logo: "/images/Koln.png" },
  { name: "Microsure", logo: "/images/Microsure.png" },
  { name: "Sanita", logo: "/images/Sanita.png" },
  { name: "PU Care", logo: "/images/PUCare.png" },
];

export default function ClientsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto px-6 text-center"
        dir="ltr">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0056D2] mb-10">
          {t("OurClients")}
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={3}
          centeredSlides={true} 
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {clients.map((client, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center transition-all duration-500"
            >
              {({ isActive }) => (
<div
  className={`w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] aspect-[4/3] flex items-center justify-center transition-all duration-500 overflow-visible
    ${ isActive ? "scale-110 grayscale-0" : "scale-80 grayscale opacity-60" }}`}
>
  <Image
    src={client.logo}
    alt={client.name}
    width={200}
    height={120}
    className="object-contain max-h-full max-w-full"
  />
</div>

              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
