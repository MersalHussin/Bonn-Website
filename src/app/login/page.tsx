"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import { Loader2, ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLogin() {
  const [step, setStep] = useState<1 | 2>(1);
  const [accessCode, setAccessCode] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if device already has access code validated
    if (typeof window !== "undefined" && localStorage.getItem("hasAdminAccessCode") === "true") {
      setStep(2);
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "admin" || userData.role === "super_user" || userData.role === "ceo") {
              router.replace("/admin");
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.error("Auto-login check failed", err);
          setLoading(false);
        }
      }
    });
    return () => unsub();
  }, [router]);

  const handleAccessCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Trying to fetch a document in AccessCodes collection with the ID equal to the typed code
      const codeDoc = await getDoc(doc(db, "AccessCodes", accessCode));
      if (codeDoc.exists()) {
        if (typeof window !== "undefined") {
          localStorage.setItem("hasAdminAccessCode", "true");
        }
        setStep(2); // Move to login form
      } else {
        setError("كود الوصول غير صحيح");
      }
    } catch (err) {
      console.error("Access Code Error:", err);
      setError("حدث خطأ أثناء التحقق من الكود");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "Users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin" || userData.role === "super_user" || userData.role === "ceo") {
          router.push("/admin");
          return;
        }
      }
      setError("عذراً، ليس لديك صلاحية الدخول كمسؤول");
    } catch (err) {
      console.error("Error fetching role:", err);
      setError("حدث خطأ أثناء التحقق من الصلاحيات");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleAuth(userCredential.user.uid);
    } catch (err) {
      setError("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-din" dir="rtl">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-xl bg-blue-50 text-[#04349C] flex items-center justify-center">
            {step === 1 ? (
              <KeyRound size={28} strokeWidth={2} />
            ) : (
              <ShieldCheck size={28} strokeWidth={2} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {step === 1 ? "بوابة الدخول السري" : "تسجيل الدخول"}
          </h1>
          <p className="text-sm text-gray-500">
            {step === 1 
              ? "أدخل كود الوصول للمتابعة إلى صفحة تسجيل الدخول" 
              : "أدخل بيانات الاعتماد الخاصة بك للوصول للوحة التحكم"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 text-sm p-3 rounded-lg animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        {step === 1 ? (
          <form onSubmit={handleAccessCode} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 block px-1">كود الوصول (Access Code)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-focus-within:text-[#04349C] transition-colors">
                  <KeyRound size={18} />
                </div>
                <input
                  type="password"
                  placeholder="أدخل الكود السري..."
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04349C]/20 focus:border-[#04349C] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#04349C] hover:bg-[#032a7a] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>متابعة</span>
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 block px-1">البريد الإلكتروني</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-focus-within:text-[#04349C] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04349C]/20 focus:border-[#04349C] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 block px-1">كلمة المرور</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-focus-within:text-[#04349C] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04349C]/20 focus:border-[#04349C] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#04349C] hover:bg-[#032a7a] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>دخول</span>
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError("");
              }}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-800 transition-colors mt-2"
            >
              العودة لكود الوصول
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
