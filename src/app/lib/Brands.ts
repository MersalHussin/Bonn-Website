export type BrandKey =
  | "Covix Care"
  | "Boon"
  | "B1Care"
  | "Le Visage Plus"
  | "Sensa"
  | "PuCare"
  | "Havera";

export const brandsInfo: Record<BrandKey, { logo: string; name: string }> = {
  "Covix Care": { logo: "/images/covix.png", name: "Covix Care" },
  "Boon": { logo: "/images/Logo.svg", name: "Boon" },
  "B1Care": { logo: "/images/b1care.png", name: "B1Care" },
  "Le Visage Plus": { logo: "/images/levisage.png", name: "Le Visage Plus" },
  "Sensa": { logo: "/images/SENSA.png", name: "Sensa" },
  "PuCare": { logo: "/images/pucare.png", name: "PuCare" },
  "Havera": { logo: "/images/Havera.png", name: "Havera" },
};

export const BRAND_NAMES = Object.keys(brandsInfo) as BrandKey[];
