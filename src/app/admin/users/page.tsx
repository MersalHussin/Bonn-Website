"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useRouter } from "next/navigation";
import { UserPlus, Shield, Loader2, Mail, Lock, Trash2, Edit, X } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  createdAt: any;
}

export default function AdminUsersPage() {
  const { user, isCeo, loading } = useAdminAuth();
  const router = useRouter();
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [fetching, setFetching] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editRole, setEditRole] = useState("admin");
  const [editPassword, setEditPassword] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !isCeo) {
      router.replace("/admin");
    }
  }, [loading, isCeo, router]);

  useEffect(() => {
    if (isCeo) {
      fetchUsers();
    }
  }, [isCeo]);

  const fetchUsers = async () => {
    try {
      const token = await user?.getIdToken();
      if (!token) return;

      const res = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUsers(data.users);
      } else {
        console.error("Error fetching users:", data.error);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الحساب؟")) return;
    
    try {
      const token = await user?.getIdToken();
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setMessage({ type: "success", text: "تم حذف الحساب بنجاح" });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحذف");
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditSubmitting(true);
    
    try {
      const token = await user?.getIdToken();
      const body: any = { role: editRole };
      if (editPassword) body.password = editPassword;
      
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setMessage({ type: "success", text: "تم تحديث الحساب بنجاح" });
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء التحديث");
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) return;

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Create user via our API
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      setMessage({ type: "success", text: "تم إنشاء الحساب بنجاح" });
      setEmail("");
      setPassword("");
      setRole("admin");
      fetchUsers();
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !isCeo) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-main w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إدارة المديرين</h1>
        <p className="text-gray-500">إنشاء حسابات جديدة للمديرين وإدارة الصلاحيات.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <UserPlus size={20} className="text-main" />
            إضافة حساب جديد
          </h2>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
                  placeholder="admin@example.com"
                />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
                  placeholder="******"
                />
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all appearance-none"
                >
                  <option value="admin">مدير (Admin)</option>
                  <option value="super_user">مدير أعلى (Super User)</option>
                </select>
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {message.text && (
              <div
                className={`p-3 rounded-xl text-sm font-medium ${
                  message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-main text-white font-semibold rounded-xl py-2.5 hover:bg-main-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : "إنشاء حساب"}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">الحسابات الحالية</h2>
          </div>
          
          <div className="p-0">
            {fetching ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="animate-spin text-main w-8 h-8" />
              </div>
            ) : users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-medium">البريد الإلكتروني</th>
                      <th className="px-6 py-4 font-medium">الصلاحية</th>
                      <th className="px-6 py-4 font-medium text-left">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium" dir="ltr">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === 'super_user' ? 'bg-purple-100 text-purple-700' : u.role === 'ceo' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {u.role === 'super_user' ? 'Super User' : u.role === 'ceo' ? 'CEO' : 'Admin'}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingUser(u);
                              setEditRole(u.role);
                              setEditPassword("");
                            }}
                            className="p-2 text-gray-500 hover:text-main bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                لا توجد حسابات حالياً.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden" dir="rtl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">تعديل الحساب</h3>
              <button 
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditUser} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={editingUser.email}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
                >
                  <option value="admin">مدير (Admin)</option>
                  <option value="super_user">مدير أعلى (Super User)</option>
                  {editingUser.role === "ceo" && <option value="ceo">CEO</option>}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة (اختياري)</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  minLength={6}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
                  placeholder="أدخل كلمة مرور جديدة أو اتركها فارغة"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="flex-1 bg-main text-white font-semibold rounded-xl py-2.5 hover:bg-main-dark transition-all disabled:opacity-70 flex justify-center items-center"
                >
                  {editSubmitting ? <Loader2 size={18} className="animate-spin" /> : "حفظ التعديلات"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl py-2.5 hover:bg-gray-200 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
