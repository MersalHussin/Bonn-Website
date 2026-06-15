"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { LogOut, Home } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed, try again.");
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg mt-0 pt-16">
      {/* Top */}
      <div>
        <h1 className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </h1>

        <nav className="flex flex-col mt-6 gap-2 px-4">
          {/* Dashboard */}
          <Link
            href="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === "/admin"
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <Home size={18} />
            Dashboard
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t  border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full hover:cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
