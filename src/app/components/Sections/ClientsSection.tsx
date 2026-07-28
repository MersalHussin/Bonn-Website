"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Container from "../ui/Container";
import SectionTitle from './SectionTitle';
import "swiper/css";

const clients = [
  { name: "saudia", logo: "/images/saudia.svg" },
  // { name: "HAUT", logo: "/images/Haut.png" },
  // { name: "Sheild", logo: "/images/Shield.png" },
  // { name: "Vert", logo: "/images/Vert.png" },
  // { name: "SENSA", logo: "/images/SENSA.png" },
  // { name: "Visage", logo: "/images/Visage.png" },
  { name: "B1 Care", logo: "/images/B1.png" },
  { name: "Four Seasons Hotels", logo: "/images/four.png" },
  // { name: "Covix Care", logo: "/images/covix.png" },
  // { name: "ZENDA", logo: "/images/ZENDA.png" },
  // { name: "Havera", logo: "/images/Havera.png" },
  { name: "Koln", logo: "/images/Koln.png" },
  { name: "Microsure", logo: "/images/Microsure.png" },
  { name: "Sanita", logo: "/images/Sanita.png" },
  { name: "PU Care", logo: "/images/PUCare.png" },
];

export default function ClientsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <Container>
        <div className="text-center" dir="ltr">
        <SectionTitle title={t("OurClients")} align="center" theme="dark" />
        
        <style>{`
          .clients-marquee .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={3}
          loop={true}
          speed={4000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="flex items-center clients-marquee mt-12"
        >
          {clients.map((client, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center"
            >
              <div
                className="w-full max-w-[140px] md:max-w-[180px] aspect-video flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={180}
                  height={100}
                  className="object-contain max-h-full max-w-full drop-shadow-sm p-1"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Container>
    </section>
  );
}
