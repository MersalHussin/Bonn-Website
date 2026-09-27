"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export type Role = "admin" | "super_user" | "ceo" | null;

interface AdminAuthContextType {
  user: User | null;
  role: Role;
  loading: boolean;
  isSuperUser: boolean;
  isCeo: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  role: null,
  loading: true,
  isSuperUser: false,
  isCeo: false,
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "Users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.role as Role;
            
            if (userRole === "admin" || userRole === "super_user" || userRole === "ceo") {
              setUser(firebaseUser);
              setRole(userRole);
            } else {
              // Not an admin role
              setUser(null);
              setRole(null);
            }
          } else {
            // No document found
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        role,
        loading,
        isSuperUser: role === "super_user" || role === "ceo",
        isCeo: role === "ceo",
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
