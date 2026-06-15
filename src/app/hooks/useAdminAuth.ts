"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export function useAdminAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const tokenResult = await user.getIdTokenResult();

      if (!tokenResult.claims.admin) {
        router.push("/login");
        return;
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  return { loading };
}
