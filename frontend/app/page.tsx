"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("All Locations");
  const [beds, setBeds] = useState("Any");
  const [category, setCategory] = useState("All");
  
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          // Take top 3 most recent
          setFeaturedProperties((data || []).slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch featured properties:", err);
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== "All Locations") params.set("location", location);
    if (category === "Rent") params.set("category", "For Rent");
    if (category === "Sale") params.set("category", "For Sale");
    if (beds && beds !== "Any" && beds !== "Bedrooms") params.set("beds", beds);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <div className="absolute inset-0 bg-black/40 z-10 transition-opacity"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiHxUk894-g1JK35ZAUCTxP_ytQ-YQq4j_VLldIQ6AvVezo2-2r1Joxkcs6gTpbLLcMTRdNhzah9JmxQlGqoBFoeaLXsRoN0AD4bm4Hk4fzK2U3c1gtNtjjpwrk4oo-_-Y0wnbjCIUbqzshBeC8ojg3o5JysYG3DhgtMG6g5vap7qEV-IBD3xS0fuHYUpJ_mOZLEv1yz4RPR_7kFbqATKGGA6z6ErOA6K1ZrNgCY3LgJj-paRCNnmpfzTdABV7ACWrqEc9NqR9n88')" }}
          ></div>
        </div>
        
        <div className="relative z-20 max-w-5xl w-full flex flex-col items-center gap-8 -translate-y-4">
          <div className="space-y-3 text-center">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              Exquisite Properties.<br />Unparalleled Expertise.
            </h2>
            <p className="text-white/90 text-sm md:text-base font-light tracking-wide pt-2">
              Experience the pinnacle of luxury living in Doha, Qatar
            </p>
          </div>
          
          {/* Search Bar matching the screenshot */}
          <div className="w-full mt-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl flex flex-col md:flex-row items-center gap-2 shadow-xl border border-white/20">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              {/* Location */}
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined text-copper-accent text-xl">location_on</span>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent border-none text-sm font-bold text-slate-700 outline-none p-0 appearance-none cursor-pointer"
                >
                  <option>All Locations</option>
                  <option>The Pearl-Qatar</option>
                  <option>Lusail City</option>
                  <option>West Bay</option>
                  <option>Msheireb Downtown</option>
                </select>
                <span className="material-symbols-outlined text-slate-400 text-base pointer-events-none">expand_more</span>
              </div>
              
              {/* Price Range */}
              <div className="flex items-center gap-2 px-4 py-2 opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-copper-accent text-xl">payments</span>
                <select disabled className="w-full bg-transparent border-none text-sm font-bold text-slate-700 outline-none p-0 appearance-none cursor-not-allowed">
                  <option>Price Range</option>
                </select>
                <span className="material-symbols-outlined text-slate-400 text-base pointer-events-none">expand_more</span>
              </div>
              
              {/* Bedrooms */}
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined text-copper-accent text-xl">bed</span>
                <select 
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full bg-transparent border-none text-sm font-bold text-slate-700 outline-none p-0 appearance-none cursor-pointer"
                >
                  <option>Any</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
                <span className="material-symbols-outlined text-slate-400 text-base pointer-events-none">expand_more</span>
              </div>
              
              {/* Rent/Sale */}
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="material-symbols-outlined text-copper-accent text-xl">home</span>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent border-none text-sm font-bold text-slate-700 outline-none p-0 appearance-none cursor-pointer"
                >
                  <option>All</option>
                  <option>Rent</option>
                  <option>Sale</option>
                </select>
                <span className="material-symbols-outlined text-slate-400 text-base pointer-events-none">expand_more</span>
              </div>
            </div>
            
            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-[#362C28] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#251E1A] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="w-full bg-[#EBEAE5] dark:bg-slate-900 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          {/* Header Row */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-copper-accent font-bold tracking-[0.15em] text-[10px] uppercase">Exclusively Curated</span>
              <h3 className="text-3xl font-extrabold mt-1 text-primary dark:text-white">Featured Properties</h3>
            </div>
            <Link className="text-primary dark:text-white font-bold text-sm border-b-2 border-primary/20 dark:border-white/20 pb-0.5 hover:border-primary dark:hover:border-white transition-colors" href="/properties">
              View All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {loadingFeatured ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-12">
                <span className="material-symbols-outlined animate-spin text-4xl text-copper-accent">progress_activity</span>
              </div>
            ) : featuredProperties.length > 0 ? (
              featuredProperties.map((prop) => (
                <Link key={prop.id} href={`/properties/${prop.id}`} className="group">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-[280px] overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 bg-slate-200 dark:bg-slate-700" 
                           style={{ backgroundImage: `url('${prop.main_image}')` }}>
                      </div>
                      <div className={`absolute top-4 left-4 text-white text-[9px] font-extrabold tracking-wider px-3 py-1.5 rounded uppercase shadow-sm ${prop.status === "For Sale" ? "bg-blue-600" : "bg-emerald-600"}`}>
                        {prop.status}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-copper-accent font-bold text-xl mb-1">QAR {prop.price.toLocaleString()}</p>
                      <h4 className="font-extrabold text-lg mb-2 text-primary dark:text-white group-hover:text-copper-accent transition-colors">{prop.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mb-4">
                        <span className="material-symbols-outlined text-base">location_on</span> {prop.location}
                      </p>
                      <div className="mt-auto grid grid-cols-3 border-t border-slate-100 dark:border-slate-700 pt-4 gap-2">
                        <div className="flex flex-col items-center">
                          <span className="material-symbols-outlined text-slate-400">bed</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">{prop.beds} Beds</span>
                        </div>
                        <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-700">
                          <span className="material-symbols-outlined text-slate-400">bathtub</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">{prop.baths} Baths</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="material-symbols-outlined text-slate-400">square_foot</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">{prop.area} sqm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-slate-500">
                <p>No properties available yet.</p>
              </div>
            )}
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-slate-900 py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-3xl font-extrabold mb-4 text-primary dark:text-white">Find Your Dream Home Today</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            Our consultants are ready to assist you with the most exclusive listings in the Qatari market. Reach out through your preferred channel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-3 bg-copper-accent hover:bg-copper-accent/90 text-white px-10 py-4 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(120,84,67,0.3)] hover:shadow-[0_15px_30px_rgba(120,84,67,0.4)] hover:-translate-y-1 transition-all">
              <span className="material-symbols-outlined text-[20px]">call</span>
              Call Now
            </button>
            <button className="flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(4,120,87,0.3)] hover:shadow-[0_15px_30px_rgba(4,120,87,0.4)] hover:-translate-y-1 transition-all">
              <span className="material-symbols-outlined text-[20px]">chat</span>
              WhatsApp
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
