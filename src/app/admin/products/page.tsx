"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND_NAMES } from "../../lib/Brands";
import { supabase } from "../../lib/supabaseClient";
import {
  Plus,
  Search,
  Package,
  Star,
  Ban,
  Pencil,
  Trash2,
  EyeOff,
  Info,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Layers, Tag, Settings, Image as ImageIcon, Upload } from "lucide-react";

// ---- Types ----
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

const initialProduct = (): Product => ({
  id: "",
  brand: "",
  name_en: "",
  name_ar: "",
  slug: "",
  tagline_en: "",
  tagline_ar: "",
  description_en: "",
  description_ar: "",
  category: [],
  usage_en: "",
  usage_ar: "",
  compliance: [],
  images: [],
  brand_id: null,
  seo_title_en: "",
  seo_title_ar: "",
  seo_desc_en: "",
  seo_desc_ar: "",
  best_selling: false,
  featured: false,
  new_arrival: false,
  disabled: false,
    usage_target_en: "",
    usage_target_ar: "",
    instructions_en: "",
    instructions_ar: "",
    ingredients_en: [],
    ingredients_ar: [],
    storage_en: "",
    storage_ar: "",

});

export default function AdminProductsPage() {
  const MAX_IMAGES = 6;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();
  const CATEGORY_OPTIONS = [
  {
    title: "Skin Type",
    options: ["Sensitive Skin", "Oily Skin", "Dry Skin", "Normal Skin"],
  },
  {
    title: "Product Type",
    options: ["Face Wash", "Cleanser", "Moisturizer", "Serum"],
  },
  {
    title: "Usage",
    options: ["Daily Use", "Medical", "Kids", "Men", "Women"],
  },
];


  const stats = {
    total: products.length,
    best: products.filter((p) => p.best_selling).length,
    disabled: products.filter((p) => p.disabled).length,
  };

  const [product, setProduct] = useState<Product>(initialProduct());

  const isArabic = i18n.language === "ar";

  const getName = (p: Product) => (isArabic ? p.name_ar : p.name_en);
  const getDescription = (p: Product) => (isArabic ? p.description_ar : p.description_en);

  // ---- helpers ----
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const sanitizeUUID = (v?: string | null) => (v && v.trim() !== "" ? v : null);

  // ---- fetch products ----
  // helper to extract message from unknown errors
  const getErrorMessage = (err: unknown) => {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    try {
      return JSON.stringify(err) || String(err);
    } catch {
      return String(err);
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("fetch products error:", error);
          toast.error("Failed to load products: " + getErrorMessage(error));
          return;
        }

        // Normalize incoming data: ensure brand_id null instead of ""
        if (data) {
          // type the supabase response items as Product
          const normalized = (data as Product[]).map((d) => ({
            ...d,
            brand_id: sanitizeUUID(d.brand_id),
          })) as Product[];
          setProducts(normalized);
        }
      } catch (err: unknown) {
        console.error("fetch products failed:", err);
        toast.error("Failed to load products: " + getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  

  // ---- filtered products ----
  const filteredProducts = products.filter((p) => {
    const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;

    const s = search.trim().toLowerCase();
    const matchesSearch =
      !s ||
      p.name_en.toLowerCase().includes(s) ||
      p.name_ar.toLowerCase().includes(s) ||
      p.slug.toLowerCase().includes(s);

    return matchesBrand && matchesSearch;
  });

  // ---- toggle flags ----
  const toggleFlag = async (id: string, key: keyof Product) => {
    if (!id) {
      toast.error("Invalid product id");
      return;
    }

    const target = products.find((p) => p.id === id);
    if (!target) return;

    const newValue = !target[key];

    try {
      const { error } = await supabase.from("products").update({ [key]: newValue }).eq("id", id);
      if (error) throw error;

      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: newValue } : p)));
      toast.success("Updated");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Update failed");
    }
  };

  // ---- delete ----
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Invalid product ID");
      return;
    }

    if (!confirm("Delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Delete failed");
    }
  };

  // ---- form handlers ----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    // special case for brand select: set brand name and clear brand_id (unless you have mapping)
    if (name === "brand") {
      setProduct((prev) => ({ ...prev, brand: value, brand_id: null }));
      return;
    }

    setProduct((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleEdit = (p: Product) => {
    setProduct({ ...p, brand_id: sanitizeUUID(p.brand_id) });
    setIsEditing(true);
    setShowForm(true);
  };

  const uploadImage = async (file: File) => {
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("products").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
      

      if (uploadError) throw uploadError;

      // supabase storage getPublicUrl result typing varies; narrow to known shape
      type PublicUrlResult = { publicUrl?: string; public_url?: string } | null | undefined;
      const result = supabase.storage.from("products").getPublicUrl(filePath) as unknown as { data?: PublicUrlResult };
      const dataRes = result?.data;
      const publicUrl = dataRes?.publicUrl ?? dataRes?.public_url ?? null;

      if (!publicUrl) throw new Error("No URL returned from storage");
      return publicUrl as string;
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      // rethrow so calling code can show toast if needed
      throw err;
    }
  };

  
  // ---- submit (insert/update) ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name_en || !product.name_ar) {
      toast.error("Name is required");
      return;
    }

    // Generate id client-side so we can reference it immediately (and generate slug later)
    const idToUse = product.id && product.id.trim() !== "" ? product.id : crypto.randomUUID();

    // slug fallback (if empty, build from name_en or name_ar)
const slugValue =
  product.slug?.trim() ||
  generateSlug(product.name_en || product.name_ar);

if (!slugValue) {
  toast.error("Slug is required");
  return;
}

    const rawData: Product = {
      ...product,
      id: idToUse,
      slug: slugValue,
      brand_id: sanitizeUUID(product.brand_id),
    };

    // remove empty-string fields that must be null
    if (!rawData.brand_id) rawData.brand_id = null;

    try {
      if (isEditing && product.id) {
        const { error } = await supabase.from("products").update(rawData).eq("id", product.id);
        if (error) throw error;

        setProducts((prev) => prev.map((p) => (p.id === product.id ? rawData : p)));
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert([rawData]);
        if (error) throw error;

        setProducts((prev) => [rawData, ...prev]);
        toast.success("Product added");
      }

      setShowForm(false);
      setIsEditing(false);
      setProduct(initialProduct());
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Save failed");
    }
  };

  // ---- UI ----
  if (loading) return <div className="p-6">Loading products...</div>;

  return (
    <div className="p-6 space-y-6 mt-16" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold">{t("products.title")}</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t("products.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>

        <button
          dir={i18n.language === "ar" ? "ltr" : "rtl"}
          onClick={() => {
            setIsEditing(false);
            setProduct(initialProduct());
            setShowForm(true);
          }}
          className="flex items-center hover:cursor-pointer gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          {t("products.add")}
        </button>
      </div>

      {showForm && (
<form
  onSubmit={handleSubmit}
  className="w-full bg-white border rounded-xl shadow-sm p-8 space-y-10"
>
  {/* ================= BASIC INFORMATION ================= */}
  <section className="border rounded-lg p-6 space-y-6">
    <div className="flex items-center gap-2 border-b pb-3">
      <Package size={18} />
      <h2 className="text-lg font-semibold">
        {t("adminForm.basicInfo")}
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="label">
          {t("adminForm.nameEn")}
        </label>
        <input
          name="name_en"
          value={product.name_en}
          onChange={(e) => {
            const value = e.target.value;
            setProduct((prev) => ({
              ...prev,
              name_en: value,
              slug: prev.slug || generateSlug(value),
            }));
          }}
          className="input"
          required
        />
      </div>

      <div>
        <label className="label">
          {t("adminForm.nameAr")}
        </label>
        <input
          name="name_ar"
          value={product.name_ar}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="label">
          {t("adminForm.descriptionEn")}
        </label>
        <textarea
          name="description_en"
          value={product.description_en}
          onChange={handleChange}
          className="textarea"
        />
      </div>

      <div>
        <label className="label">
          {t("adminForm.descriptionAr")}
        </label>
        <textarea
          name="description_ar"
          value={product.description_ar}
          onChange={handleChange}
          className="textarea"
        />
      </div>
    </div>
  </section>

  {/* ================= IMAGES ================= */}
  <section className="border rounded-lg p-6 space-y-6">
    <div className="flex items-center gap-2 border-b pb-3">
      <ImageIcon size={18} />
      <h2 className="text-lg font-semibold">
        {t("adminForm.images")}
      </h2>
    </div>

    <p className="text-sm text-gray-600">
      {t("adminForm.imagesHint", { count: MAX_IMAGES })}
    </p>

    <input
      id="product-images"
      type="file"
      accept="image/*"
      multiple
      hidden
      disabled={product.images.length >= MAX_IMAGES}
      onChange={async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const filesArray = Array.from(files);
        const availableSlots = MAX_IMAGES - product.images.length;
        const filesToUpload = filesArray.slice(0, availableSlots);

        setUploadingImage(true);
        try {
          const uploadPromises = filesToUpload.map((file) => uploadImage(file));
          const uploadedUrls = await Promise.all(uploadPromises);

          setProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...uploadedUrls],
          }));
          toast.success("Images uploaded");
        } catch (err: unknown) {
          console.error(err);
          toast.error("Image upload failed: " + getErrorMessage(err));
        } finally {
          setUploadingImage(false);
          // Clear the input value to allow re-uploading the same file if needed
          e.target.value = "";
        }
        }}
    />

    <label
      htmlFor="product-images"
      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50"
    >
      <Upload size={16} />
      {t("adminForm.uploadImages")}
    </label>

    <div className="flex flex-wrap gap-4">
      {product.images.map((img, idx) => (
        <div key={img} className="relative border rounded-lg p-1">
          <Image
            src={img}
            alt="product"
            width={140}
            height={140}
            className="rounded object-cover"
          />
          <button
            type="button"
            onClick={() =>
              setProduct((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== idx),
              }))
            }
            className="absolute top-1 right-1 bg-white border rounded-full p-1 hover:bg-red-50"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  </section>

  {/* ================= CATEGORY ================= */}
  <section className="border rounded-lg p-6 space-y-6">
    <div className="flex items-center gap-2 border-b pb-3">
      <Layers size={18} />
      <h2 className="text-lg font-semibold">
        {t("adminForm.category")}
      </h2>
    </div>

    {CATEGORY_OPTIONS.map((section) => (
      <div key={section.title}>
        <p className="text-sm font-medium mb-2">{section.title}</p>

        <div className="flex flex-wrap gap-2">
          {section.options.map((option) => {
            const checked = product.category.includes(option);
            return (
              <label
                key={option}
                className={`px-3 py-1 rounded-full border cursor-pointer text-sm
                ${checked ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"}`}
              >
                <input
                  type="checkbox"
                  hidden
                  checked={checked}
                  onChange={() =>
                    setProduct((prev) => ({
                      ...prev,
                      category: checked
                        ? prev.category.filter((c) => c !== option)
                        : [...prev.category, option],
                    }))
                  }
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>
    ))}
  </section>

  {/* ================= BRAND ================= */}
  <section className="border rounded-lg p-6 space-y-4">
    <div className="flex items-center gap-2 border-b pb-3">
      <Tag size={18} />
      <h2 className="text-lg font-semibold">
        {t("adminForm.brand")}
      </h2>
    </div>

    <label className="label">
      {t("adminForm.selectBrand")}
    </label>
    <select
      name="brand"
      value={product.brand}
      onChange={handleChange}
      className="input"
    >
      <option value="">{t("adminForm.selectBrand")}</option>
      {BRAND_NAMES.map((b) => (
        <option key={b} value={b}>
          {b}
        </option>
      ))}
    </select>
  </section>

  {/* ================= FLAGS ================= */}
  <section className="border rounded-lg p-6 space-y-4">
    <div className="flex items-center gap-2 border-b pb-3">
      <Settings size={18} />
      <h2 className="text-lg font-semibold">
        {t("adminForm.flags.title")}
      </h2>
    </div>

    <div className="flex flex-wrap gap-6">
      {(["best_selling", "featured", "new_arrival", "disabled"] as Array<
        keyof Product
      >).map((flag) => (
        <label key={flag} className="flex items-center gap-2">
          <input
            type="checkbox"
            name={flag}
            checked={product[flag] as boolean}
            onChange={handleChange}
          />
          {t(`adminForm.flags.${flag}`)}
        </label>
      ))}
    </div>
  </section>
  {/* ================= DETAILS & USAGE ================= */}
<section className="border rounded-lg p-6 space-y-6">
  <div className="flex items-center gap-2 border-b pb-3">
    <Info size={18} />
    <h2 className="text-lg font-semibold">
      {t("adminForm.details")}
    </h2>
  </div>

  {/* Tagline */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.taglineEn")}</label>
      <input
        name="tagline_en"
        value={product.tagline_en || ""}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.taglineAr")}</label>
      <input
        name="tagline_ar"
        value={product.tagline_ar || ""}
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>

  {/* Usage */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.usageEn")}</label>
      <textarea
        name="usage_en"
        value={product.usage_en || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.usageAr")}</label>
      <textarea
        name="usage_ar"
        value={product.usage_ar || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>
  </div>

  {/* Usage Target */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.usageTargetEn")}</label>
      <input
        name="usage_target_en"
        value={product.usage_target_en || ""}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.usageTargetAr")}</label>
      <input
        name="usage_target_ar"
        value={product.usage_target_ar || ""}
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>

  {/* Instructions */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.instructionsEn")}</label>
      <textarea
        name="instructions_en"
        value={product.instructions_en || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.instructionsAr")}</label>
      <textarea
        name="instructions_ar"
        value={product.instructions_ar || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>
  </div>
</section>
{/* ================= INGREDIENTS & STORAGE ================= */}
<section className="border rounded-lg p-6 space-y-6">
  <div className="flex items-center gap-2 border-b pb-3">
    <h2 className="text-lg font-semibold">
      {t("adminForm.ingredientsStorage")}
    </h2>
  </div>

  {/* Ingredients */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.ingredientsEn")}</label>
      <input
  name="ingredients_en"
  value={product.ingredients_en?.join(", ") || ""}
  onChange={(e) => {
    const value = e.target.value;

    setProduct((prev) => ({
      ...prev,
      ingredients_en: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean), // يشيل الفاضي
    }));
  }}
  className="input"
  placeholder={t("adminForm.ingredientsHint")}
/>

    </div>

    <div>
      <label className="label">{t("adminForm.ingredientsAr")}</label>
<input
  name="ingredients_ar"
  value={product.ingredients_ar?.join(", ") || ""}
  onChange={(e) => {
    const value = e.target.value;

    setProduct((prev) => ({
      ...prev,
      ingredients_ar: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  }}
  className="input"
/>

    </div>
  </div>

  {/* Storage */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.storageEn")}</label>
      <textarea
        name="storage_en"
        value={product.storage_en || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.storageAr")}</label>
      <textarea
        name="storage_ar"
        value={product.storage_ar || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>
  </div>
</section>
{/* ================= COMPLIANCE ================= */}
<section className="border rounded-lg p-6 space-y-4">
  <div className="flex items-center gap-2 border-b pb-3">
    <ShieldCheck size={18} />
    <h2 className="text-lg font-semibold">
      {t("adminForm.compliance")}
    </h2>
  </div>

  <label className="label">{t("adminForm.complianceDesc")}</label>
<textarea
  name="compliance"
  value={product.compliance?.join(", ") || ""}
  onChange={(e) => {
    const value = e.target.value;

    setProduct((prev) => ({
      ...prev,
      compliance: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  }}
  className="textarea"
  placeholder={t("adminForm.complianceHint")}
/>

</section>
{/* ================= SEO ================= */}
<section className="border rounded-lg p-6 space-y-6">
  <div className="flex items-center gap-2 border-b pb-3">
    <Search size={18} />
    <h2 className="text-lg font-semibold">
      {t("adminForm.seo")}
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.seoTitleEn")}</label>
      <input
        name="seo_title_en"
        value={product.seo_title_en || ""}
        onChange={handleChange}
        className="input"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.seoTitleAr")}</label>
      <input
        name="seo_title_ar"
        value={product.seo_title_ar || ""}
        onChange={handleChange}
        className="input"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="label">{t("adminForm.seoDescEn")}</label>
      <textarea
        name="seo_desc_en"
        value={product.seo_desc_en || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>

    <div>
      <label className="label">{t("adminForm.seoDescAr")}</label>
      <textarea
        name="seo_desc_ar"
        value={product.seo_desc_ar || ""}
        onChange={handleChange}
        className="textarea"
      />
    </div>
  </div>
</section>


  {/* ================= ACTIONS ================= */}
  <div className="flex gap-4 justify-end">
    <button
      type="submit"
      disabled={uploadingImage}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {isEditing ? t("update") : t("add")}
    </button>

    <button
      type="button"
      onClick={() => {
        setShowForm(false);
        setProduct(initialProduct());
      }}
      className="px-6 py-2 border rounded-lg hover:bg-gray-50"
    >
      {t("cancel")}
    </button>
  </div>
</form>


      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Package className="text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.total")}</p>
            <p className="text-xl font-semibold">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Star className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.bestSelling")}</p>
            <p className="text-xl font-semibold">{stats.best}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Ban className="text-red-500" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.disabled")}</p>
            <p className="text-xl font-semibold">{stats.disabled}</p>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedBrand("all")} className={`px-4 py-1 rounded hover:cursor-pointer ${selectedBrand === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          All
        </button>

        {BRAND_NAMES.map((brand) => (
          <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-4 py-1 rounded hover:cursor-pointer ${selectedBrand === brand ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            {brand}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <div className="bg-white rounded-xl overflow-hidden group">
              <div className="relative h-48">
                <Image
  src={p.images?.[0] || "/placeholder.png"}
  alt={getName(p)}
  fill
  className="object-cover"
/>

                {p.disabled && (
  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
    Disabled
  </div>
)}

              </div>

              <div className="p-4  flex justify-between gap-4">
                <div>
                  <h2 className="font-medium">{getName(p)}</h2>
                  <p className="text-xs text-gray-500 line-clamp-2">{getDescription(p)}</p>

                  <p className="text-xs text-gray-500">{p.brand}</p>
                </div>

                <div className="flex gap-2 flex-wrap text-xs">
                  {p.best_selling && <span className="px-2 py-1 bg-gray-100 rounded">Best</span>}
                  {p.featured && <span className="px-2 py-1 bg-gray-100 rounded">Featured</span>}
                  {p.new_arrival && <span className="px-2 py-1 bg-gray-100 rounded">New</span>}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button title={t("actions.edit")} onClick={() => handleEdit(p)} className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                    <Pencil size={16} />
                  </button>

                  <button title={t("actions.disable")} onClick={() => toggleFlag(p.id, "disabled")} className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                    <EyeOff size={16} />
                  </button>

                  <button title={t("actions.delete")} onClick={() => handleDelete(p.id)} className="p-2 rounded hover:bg-red-50 text-red-600 hover:cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
