"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type UserInfo = {
  email: string;
  role: "superadmin" | "branch";
  name: string;
  branch?: string;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [user, setUser] = useState<UserInfo | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isLoginPage) {
      fetch("/api/auth/me")
        .then(r => (r.ok ? r.json() : null))
        .then(data => data && setUser(data))
        .catch(() => null);
    }
  }, [isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  const sidebarLinks = [
    { href: "/admin/properties", label: "Properties", icon: "apartment" },
    ...(user?.role === "superadmin"
      ? [{ href: "/admin/users", label: "Users", icon: "manage_accounts" }]
      : []),
  ];

  const initials = user
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "…";

  return (
    <div className={`flex bg-slate-50 dark:bg-background-dark min-h-screen max-w-full overflow-hidden ${isLoginPage ? "bg-transparent" : ""}`}>
      {/* Desktop Sidebar */}
      {!isLoginPage && (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white hidden md:flex flex-col h-screen fixed top-0 left-0 z-[60]">
          <div className="p-6 flex items-center justify-center border-b border-slate-800 pb-8">
            <Image src="/images/logo.png" alt="Dania Admin" width={160} height={40} className="h-10 w-auto object-contain" />
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 px-4 mb-3">Management</p>
            {sidebarLinks.map(link => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-copper-accent/10 border border-copper-accent/20 text-copper-accent hover:bg-copper-accent/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
                  }`}
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info + Logout */}
          <div className="p-4 border-t border-slate-800 mt-auto">
            {user && (
              <div className="px-4 py-3 mb-2 rounded-lg bg-slate-800/50">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                {user.branch && (
                  <p className="text-[11px] text-copper-accent font-medium truncate mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {user.branch}
                  </p>
                )}
                {user.role === "superadmin" && (
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Super Admin</p>
                )}
              </div>
            )}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors group">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {initials}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">{user?.email || "..."}</p>
                <p className="text-xs text-slate-400 truncate">Logout</p>
              </div>
              <span className="material-symbols-outlined text-transparent group-hover:text-slate-500 transition-colors text-lg">logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col w-full relative z-[55] ${!isLoginPage ? "md:ml-64" : ""}`}>
        {/* Top Bar */}
        {!isLoginPage && (
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-[55]">
            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setMobileNavOpen(p => !p)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">{mobileNavOpen ? "close" : "menu"}</span>
              </button>
              <Image src="/images/logo.png" alt="Dania" width={112} height={28} className="h-7 w-auto object-contain" />
            </div>

            <div className="flex items-center gap-4 flex-1 hidden sm:flex">
              <div className="relative w-full max-w-sm">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-copper-accent transition-shadow outline-none text-slate-900 dark:text-white"
                  placeholder="Search properties..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {user?.branch && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-copper-accent bg-copper-accent/10 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {user.branch}
                </span>
              )}
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
              <div className="w-9 h-9 rounded-full bg-copper-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {initials}
              </div>
            </div>
          </header>
        )}

        {/* Mobile sidebar overlay */}
        {!isLoginPage && mobileNavOpen && (
          <div className="fixed inset-0 z-[65] md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-64 bg-slate-900 flex flex-col shadow-2xl">
              <div className="p-6 flex items-center justify-between border-b border-slate-800">
                <Image src="/images/logo.png" alt="Dania Admin" width={128} height={32} className="h-8 w-auto object-contain" />
                <button onClick={() => setMobileNavOpen(false)} className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-1">
                {sidebarLinks.map(link => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-copper-accent/10 border border-copper-accent/20 text-copper-accent"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined">{link.icon}</span>
                      <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-slate-800">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
