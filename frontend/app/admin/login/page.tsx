"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin dashboard on success
        router.push("/admin/properties");
        router.refresh();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative px-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.4]"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL0tPeA96aP9ePSoiBsapc8xxDXj84dEujTa2GZl_d9nDg3SDNJTEp9hH5-F8N5yqn-BIOVbSjL9c4BhHerSH-wDum3FfZ_p5IEeNasCmgqEA4Ahmb6ucCyYd3D_LTpAc9-JPUmT_qwnC-0B4Kn8EStTpHz1oDMyE9BNkCCT2tKbORJxiljfXpTxsNr7IEbg3dfQ-jRqoJ9rZWNf8aJ-Ix-a_Tp9GGiahnswRwQZNN09kvpvDa07kgJ2RgG97W4WlWP9iUPzuYuJc')" }}
      ></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="p-10 flex flex-col items-center">
          {/* Logo Icon */}
          <div className="h-16 w-16 bg-[#362C28] rounded-full flex items-center justify-center mb-6 shadow-md">
            <span className="material-symbols-outlined text-white text-3xl">domain</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#362C28] mb-1">Dania Real Estate</h1>
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-10">Admin Portal</p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            
            {/* Email Field */}
            <div className="w-full">
              <label className="block text-xs font-bold text-[#362C28] mb-2">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-copper-accent focus:ring-1 focus:ring-copper-accent outline-none text-sm transition-all text-slate-700"
                  placeholder="admin@daniarealestate.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="block text-xs font-bold text-[#362C28] mb-2">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-11 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-copper-accent focus:ring-1 focus:ring-copper-accent outline-none text-sm transition-all text-slate-700 font-medium tracking-widest placeholder:tracking-normal"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-copper-accent transition-colors flex items-center justify-center focus:outline-none"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-bold text-[#7A5C4A] hover:text-[#5c4436]">Forgot Password?</a>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#7A5C4A] hover:bg-[#6A4D3D] text-white rounded-xl font-bold text-sm tracking-wide transition-colors mt-2 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  AUTHENTICATING...
                </>
              ) : (
                "LOGIN TO DASHBOARD"
              )}
            </button>
          </form>
        </div>

        {/* Card Footer */}
        <div className="bg-[#F8F9FA] border-t border-slate-100 py-4 px-6 flex justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            SECURE ACCESS • DANIA REAL ESTATE LLC © 2024
          </p>
        </div>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-6 w-full flex justify-center gap-6 z-10">
        <button className="text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors">
          <span className="material-symbols-outlined text-sm">help</span> Support
        </button>
        <button onClick={() => router.push('/')} className="text-white/60 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors">
          <span className="material-symbols-outlined text-sm">language</span> Main Website
        </button>
      </div>
    </main>
  );
}
