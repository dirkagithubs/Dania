"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-header-cocoa text-white px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Dania Real Estate Logo" className="h-10 w-auto object-contain" />
        </Link>
      </div>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link className="text-sm font-medium hover:text-copper-accent transition-colors" href="/">Home</Link>
        <Link className="text-sm font-medium hover:text-copper-accent transition-colors" href="/properties">Properties</Link>
        <Link className="text-sm font-medium hover:text-copper-accent transition-colors" href="/about">About</Link>
        <Link className="text-sm font-medium hover:text-copper-accent transition-colors" href="/services">Services</Link>
        <Link className="text-sm font-medium hover:text-copper-accent transition-colors" href="/contact">Contact</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <Link href="/contact" className="hidden lg:block bg-copper-accent hover:bg-opacity-90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all">
          List Property
        </Link>
        {/* Mobile Toggle Button */}
        <button className="md:hidden p-1 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined text-2xl">{isOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#362C28] border-t border-white/10 shadow-xl flex flex-col md:hidden py-4 px-6 gap-4 z-40 animate-[fade-in-down_0.2s_ease-out_forwards]">
          <Link onClick={() => setIsOpen(false)} className="text-base font-bold text-white hover:text-copper-accent transition-colors" href="/">Home</Link>
          <Link onClick={() => setIsOpen(false)} className="text-base font-bold text-white hover:text-copper-accent transition-colors" href="/properties">Properties</Link>
          <Link onClick={() => setIsOpen(false)} className="text-base font-bold text-white hover:text-copper-accent transition-colors" href="/about">About</Link>
          <Link onClick={() => setIsOpen(false)} className="text-base font-bold text-white hover:text-copper-accent transition-colors" href="/services">Services</Link>
          <Link onClick={() => setIsOpen(false)} className="text-base font-bold text-white hover:text-copper-accent transition-colors" href="/contact">Contact</Link>
          <Link onClick={() => setIsOpen(false)} className="mt-2 bg-copper-accent text-center hover:bg-opacity-90 text-white px-5 py-3 rounded-lg text-sm font-bold transition-all w-full" href="/contact">
            List Property
          </Link>
        </div>
      )}
    </header>
  );
}
