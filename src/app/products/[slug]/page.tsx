import { supabaseServer } from "../../lib/supabaseServer";
import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";

export const dynamic = "force-dynamic";

type Product = {
  id: string; // client-generated UUID (or DB-generated if you prefer)
  brand: string; // brand name shown in UI
  name_en: string;
  name_ar: string;
  slug: string;
  tagline_en: string;
  tagline_ar: string;
  description_en: string;
  description_ar: string;
  category: string[];
  usage_en: string;
  usage_ar: string;
  compliance: string[];
  images: string[];
  brand_id: string | null;
  seo_title_en: string;
  seo_title_ar: string;
  seo_desc_en: string;
  seo_desc_ar: string;
  best_selling: boolean;
  usage_target_en: string;
  usage_target_ar: string;
  instructions_en?: string;
  instructions_ar?: string;
  ingredients_en?: string[];
  ingredients_ar?: string[];
  storage_en?: string;
  storage_ar?: string;
  featured: boolean;
  new_arrival: boolean;
  disabled: boolean;
};

export const runtime = "nodejs";
export const revalidate = 0;

const safe = (value?: string | null) => {
  if (!value) return null;
  const v = value.trim();
  return v.length ? v : null;
};

/* ================= SEO ================= */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const slug = params.slug;

  const { data } = await supabaseServer
    .from("products")
    .select(`
      name_en,
      description_en,
      seo_title_en,
      seo_desc_en,
      images,
      brand,
      disabled
    `)
    .eq("slug", slug)
    .eq("disabled", false) // مهم
    .maybeSingle();

  /* ====== FALLBACK LOGIC (NO EMPTY STRINGS) ====== */

  const title =
    safe(data?.seo_title_en) ||
    safe(data?.name_en) ||
    "Bonn Medical Product";

  const description =
    safe(data?.seo_desc_en) ||
    safe(data?.description_en) ||
    "Medical products manufactured by Bonn Medical Industries";

  const image =
    data?.images?.[0] ||
    "https://www.bonnmed.com/cover.png";

  const brandName =
    safe(data?.brand)
      ? `by ${data?.brand}`
      : "by Bonn Medical Industries";

  const fullTitle = `${title} | ${brandName}`;
  const url = `https://www.bonnmed.com/products/${slug}`;

  return {
    title: fullTitle,
    description,

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Bonn Medical Industries",
      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },

    // مهم للـ bots
    metadataBase: new URL("https://www.bonnmed.com"),
  };
}


/* ================= PAGE ================= */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const { data: product } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Product>();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Product not found
        </h1>
        <p className="text-gray-600">
          This product may have been removed or renamed.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
