import { LucideIcon } from "lucide-react";
import {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  Wrench,
  Rocket,
  Calendar,
  Heart,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  Wrench,
  Rocket,
  Calendar,
  Heart,
};

export type Feature = {
  title: string;
  desc: string;
  icon: keyof typeof iconMap;
};

export type Product = {
  id: string;
  slug: string | null;
  images: string[];
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  brand: string | null;
  best_selling: boolean;
  likes: number | null;
  disabled: boolean | null;
};

export const BRAND_UI: Record<
  string,
  {
    primary: string;
    gradient: string;
    glow: string;
    badge: string;
    logo?: string;
  }
> = {
  "Covix Care": {
    primary: "#F97316", 
    gradient: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/30",
    badge: "bg-orange-500",
    logo: "/images/covix.png",
  },
  "Le Visage Plus": {
    primary: "var(--lv-main)",
    gradient: "from-pink-600 to-rose-400",
    glow: "shadow-pink-500/30",
    badge: "bg-pink-600",
    logo: "/images/Visage.png",
  },
};
