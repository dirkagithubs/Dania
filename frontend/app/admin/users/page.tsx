"use client";

import { useState, useEffect, useCallback } from "react";

type BranchUser = {
  id: string;
  name: string;
  email: string;
  branch: string;
  is_active: boolean;
  created_at: string;
};

type UserFormData = {
  name: string;
  email: string;
  password: string;
  branch: string;
};

const emptyForm: UserFormData = { name: "", email: "", password: "", branch: "" };

export default function AdminUsers() {
  const [users, setUsers] = useState<BranchUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<UserFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");
  const [tableError, setTableError] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 403) {
        setTableError(false);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const err = await res.json();
        if (err.error?.includes("does not exist") || err.error?.includes("relation")) {
          setTableError(true);
        }
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data || []);
      setTableError(false);
    } catch {
      showToast("❌ Failed to load users");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }
      showToast(`User "${form.name}" created successfully`);
      setShowForm(false);
      setForm(emptyForm);
      fetchUsers();
    } catch (err: unknown) {
      showToast(`❌ ${err instanceof Error ? err.message : "Error"}`);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const user = users.find(u => u.id === id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      showToast(`"${user?.name}" has been removed`);
      fetchUsers();
    } catch (err: unknown) {
      showToast(`❌ ${err instanceof Error ? err.message : "Error"}`);
    }
    setDeleteConfirm(null);
  };

  const handleToggleActive = async (user: BranchUser) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, is_active: !user.is_active }),
      });
      if (!res.ok) throw new Error("Update failed");
      showToast(`"${user.name}" ${!user.is_active ? "activated" : "deactivated"}`);
      fetchUsers();
    } catch {
      showToast("❌ Failed to update user status");
    }
  };

  return (
    <div className="animate-[fade-in-up_0.5s_ease-out_forwards] relative">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-8 z-[100] ${toast.startsWith("❌") ? "bg-red-600" : "bg-emerald-600"} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3`}>
          <span className="material-symbols-outlined">{toast.startsWith("❌") ? "error" : "check_circle"}</span>
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-500 text-3xl">person_remove</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Remove User?</h3>
            <p className="text-center text-slate-500 text-sm mb-8">
              This will permanently delete the user account. They will no longer be able to log in.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-sm">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-xl text-primary dark:text-white">Add Branch User</h3>
                <p className="text-sm text-slate-500 mt-1">Create a login for a branch or agent</p>
              </div>
              <button onClick={() => { setShowForm(false); setForm(emptyForm); }} className="w-10 h-10 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none transition-all text-sm font-medium"
                  placeholder="e.g. Ahmed Al-Rashid"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Branch / Location *</label>
                <input
                  required
                  value={form.branch}
                  onChange={e => setForm(p => ({ ...p, branch: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none transition-all text-sm font-medium"
                  placeholder="e.g. The Pearl Branch"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none transition-all text-sm font-medium"
                  placeholder="agent@daniarealestate.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password *</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 pr-12 focus:ring-2 focus:ring-copper-accent outline-none transition-all text-sm font-medium"
                    placeholder="Set a secure password"
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-copper-accent transition-colors">
                    <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Minimum 6 characters. Share this securely with the user.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-copper-accent hover:bg-copper-accent/90 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50">
                  {saving ? (
                    <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Creating...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">person_add</span> Create User</>
                  )}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm); }}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Add and manage branch users who can upload properties</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-copper-accent hover:bg-copper-accent/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Users</p>
          <p className="text-2xl font-black text-primary dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Active</p>
          <p className="text-2xl font-black text-emerald-600">{users.filter(u => u.is_active).length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Inactive</p>
          <p className="text-2xl font-black text-slate-400">{users.filter(u => !u.is_active).length}</p>
        </div>
      </div>

      {/* Table missing notice */}
      {tableError && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-500 text-2xl mt-0.5">warning</span>
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Database table not set up yet</h4>
              <p className="text-sm text-amber-700 dark:text-amber-500 mb-3">
                The <code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1 rounded">admin_users</code> table doesn&apos;t exist in your Supabase project.
                Run this SQL in your Supabase dashboard to enable user management:
              </p>
              <pre className="bg-slate-900 text-emerald-400 text-xs font-mono p-4 rounded-lg overflow-x-auto whitespace-pre">{`CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'Main Branch',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users (email);`}</pre>
              <button onClick={fetchUsers} className="mt-4 text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">refresh</span> Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-copper-accent">progress_activity</span>
            <span className="ml-3 text-slate-500 font-bold">Loading users...</span>
          </div>
        ) : !tableError && users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-200 dark:text-slate-600 mb-4">group</span>
            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-2">No branch users yet</h3>
            <p className="text-sm text-slate-400 mb-6">Create a user account to let branch agents upload properties.</p>
            <button onClick={() => setShowForm(true)} className="bg-copper-accent text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-copper-accent/90 transition-colors">
              <span className="material-symbols-outlined text-lg">person_add</span> Add First User
            </button>
          </div>
        ) : !tableError ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Added</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-copper-accent/10 flex items-center justify-center shrink-0 border border-copper-accent/20">
                          <span className="text-copper-accent font-extrabold text-sm uppercase">
                            {user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {user.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(user.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(user)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          user.is_active
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 border-slate-200 dark:border-slate-600 hover:bg-slate-200"
                        }`}
                        title={user.is_active ? "Click to deactivate" : "Click to activate"}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                        {user.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
                          title="Remove user"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {/* Info box */}
      {!tableError && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5 flex items-start gap-4">
          <span className="material-symbols-outlined text-blue-400 text-xl mt-0.5 shrink-0">info</span>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <p className="font-bold">How branch users work</p>
            <p>Branch users log in at <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 rounded">/admin/login</code> using their email and password. They can add and manage properties but cannot access this Users page.</p>
          </div>
        </div>
      )}
    </div>
  );
}
