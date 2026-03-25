"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarLinks = [
  // { href: "/admin", label: "Dashboard", icon: "dashboard", disabled: true },
  { href: "/admin/properties", label: "Properties", icon: "apartment", disabled: false },
  // { href: "/admin/leads", label: "Leads", icon: "group", disabled: true },
  // { href: "/admin/inquiries", label: "Inquiries", icon: "chat_bubble", disabled: true },
];

const comingSoonLinks = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Leads", icon: "group" },
  { label: "Inquiries", icon: "chat_bubble" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  return (
    <div className={`flex bg-slate-50 dark:bg-background-dark min-h-screen max-w-full overflow-hidden ${isLoginPage ? 'bg-transparent' : ''}`}>
      {/* Sidebar */}
      {!isLoginPage && (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white hidden md:flex flex-col h-screen fixed top-0 left-0 z-[60]">
        <div className="p-6 flex items-center justify-center border-b border-slate-800 pb-8">
          <img src="/images/logo.png" alt="Dania Admin" className="h-10 w-auto object-contain" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 px-4 mb-3">Management</p>
          {sidebarLinks.map((link) => {
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

          <div className="pt-6 mt-4 border-t border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 px-4 mb-3">Coming Soon</p>
            {comingSoonLinks.map((link) => (
              <div
                key={link.label}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 cursor-not-allowed opacity-50"
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
                <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
              </div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg transition-colors group">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">AD</div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-slate-400 truncate">Logout</p>
            </div>
            <span className="material-symbols-outlined text-transparent group-hover:text-slate-500 transition-colors text-lg">logout</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col w-full relative z-[55] ${!isLoginPage ? 'md:ml-64' : ''}`}>
        {/* Top Bar */}
        {!isLoginPage && (
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-[55]">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-sm hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-copper-accent transition-shadow outline-none text-slate-900 dark:text-white"
                placeholder="Search properties..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-copper-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">AD</div>
            </div>
          </div>
        </header>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
