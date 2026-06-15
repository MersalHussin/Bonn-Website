"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import type { CredentialResponse } from "@react-oauth/google";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Loader2, ShieldCheck } from "lucide-react";

const GOOGLE_CLIENT_ID =
  "959615705471-55qttl0qvqgb6bf9avpibntj19d9sp4k.apps.googleusercontent.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

      const uid = userCredential.user.uid;

      const res = await fetch("/api/check-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });

      const data = await res.json();

      if (data.isAdmin) {
        router.push("/admin");
      } else {
        setError("مش أدمن — مفيش صلاحية دخول");
      }
    } catch {
      setError("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (
    credentialResponse: CredentialResponse | null
  ) => {
    try {
      if (!credentialResponse?.credential) return;
      setLoading(true);
      setError("");

      const credential = GoogleAuthProvider.credential(
        credentialResponse.credential
      );
      const userCredential = await signInWithCredential(auth, credential);
      const tokenResult = await userCredential.user.getIdTokenResult();

      if (tokenResult.claims.admin) {
        router.push("/admin");
      } else {
        setError("not Admin");
      }
    } catch {
      setError("login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0056D2] to-[#003a8c]">
  <div className="w-full max-w-md bg-white/95 backdrop-blur border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-[#0056D2] text-white flex items-center justify-center shadow-lg">
  <ShieldCheck size={22} />
</div>

            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <p className="text-sm text-gray-500">
              Login with your admin credentials
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Email Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg flex items-center hover:cursor-pointer justify-center gap-2 hover:bg-gray-900 disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            or
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google login failed")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
