"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type RelatedProduct = {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  images: string[];
  tagline_en?: string;
  brand: string;
};

export default function RelatedProducts({
  products,
}: {
  products: RelatedProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-semibold mb-12">
          You may also like
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              className="group"
            >
              <Link
                href={`/products/${p.slug}`}
                className="block bg-[#F8FAFF] rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="relative h-48 mb-6">
                  <Image
                    src={p.images?.[0]}
                    alt={p.name_en}
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-xs text-blue-600 font-semibold uppercase">
                  {p.brand}
                </span>

                <h4 className="mt-2 font-semibold leading-tight">
                  {p.name_en}
                </h4>

                {p.tagline_en && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {p.tagline_en}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
