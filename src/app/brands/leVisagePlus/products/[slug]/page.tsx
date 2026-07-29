import { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockProducts } from "../data";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name_en} | Le Visage Plus`,
    description: product.description_en,
    openGraph: {
      title: `${product.name_en} | Le Visage Plus`,
      description: product.description_en,
      images: [product.images[0] || "/images/visageProducts.png"],
    },
  };
}

export default async function LeVisageProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
