"use client";

import React, { useState, useRef, DragEvent } from "react";
import { UploadCloud, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUploader({ value, onChange, label = "صورة الغلاف", folder }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("يرجى اختيار ملف صورة صالح (PNG, JPG, WebP...)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة كبير جداً، الحد الأقصى المسموح به هو 5 ميجابايت");
      return;
    }

    if (!cloudName || !uploadPreset) {
      toast.error("إعدادات Cloudinary غير مكتملة في ملف البيئة (.env)");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      if (folder) {
        formData.append("folder", folder);
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("فشل الرفع إلى Cloudinary");
      }

      const data = await response.json();
      onChange(data.secure_url);
      toast.success("تم رفع الصورة بنجاح!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-gray-400" /> {label}
        </label>
      )}

      {value ? (
        // Preview State
        <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 h-56 flex items-center justify-center transition-all">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onButtonClick}
              disabled={uploading}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              تغيير الصورة
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              حذف
            </button>
          </div>
        </div>
      ) : (
        // Upload / Drop Zone State
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all min-h-56 ${
            isDragActive
              ? "border-main bg-main/5 scale-[0.99]"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100/70 hover:border-gray-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 text-main animate-spin" />
              <p className="text-sm font-medium text-gray-600">جاري رفع الصورة...</p>
            </div>
          ) : (
            <>
              <div className={`p-4 rounded-full bg-white shadow-sm transition-transform ${isDragActive ? "scale-110" : ""}`}>
                <UploadCloud className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  اسحب الصورة هنا أو <span className="text-main hover:underline">تصفح الملفات</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  يدعم صيغ PNG, JPG, WebP حتى 5 ميجابايت
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
