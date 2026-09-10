export type BrandKey =
  | "Covix Care"
  | "Rubin"
  | "B1Care"
  | "Le Visage Plus"
  | "Sensa"
  | "PuCare"
  | "Luxury";

export const brandsInfo: Record<BrandKey, { logo: string; name: string }> = {
  "Covix Care": { logo: "/images/covix.png", name: "Covix Care" },
  "Rubin": { logo: "/images/rubin.png", name: "Rubin" },
  "B1Care": { logo: "/images/b1care.png", name: "B1Care" },
  "Le Visage Plus": { logo: "/images/levisage.png", name: "Le Visage Plus" },
  "Sensa": { logo: "/images/Sensa.png", name: "Sensa" },
  "PuCare": { logo: "/images/pucare.png", name: "PuCare" },
  "Luxury": { logo: "/images/luxury.png", name: "Luxury" },
};

export const BRAND_NAMES = Object.keys(brandsInfo) as BrandKey[];
