"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DbProperty = any;

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as "All" | "For Sale" | "For Rent") || "All";
  const initialLocation = searchParams.get("location") || "All Locations";
  const initialBeds = searchParams.get("beds") || "Any";

  const [allProperties, setAllProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<"All" | "For Sale" | "For Rent">(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState("All Types");
  const [beds, setBeds] = useState(initialBeds);
  const [baths, setBaths] = useState("Any");
  const [sort, setSort] = useState("Newest Listings");

  // Fetch live properties from Supabase via API
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          setAllProperties(data || []);
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    if (keyword) {
      const lowerKw = keyword.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerKw) || 
        p.location.toLowerCase().includes(lowerKw) ||
        p.type.toLowerCase().includes(lowerKw)
      );
    }
    
    if (category !== "All") {
      result = result.filter(p => p.status === category);
    }
    
    if (location !== "All Locations") {
      result = result.filter(p => p.location.includes(location));
    }
    
    if (propertyType !== "All Types") {
      result = result.filter(p => p.type === propertyType);
    }
    
    if (beds !== "Any") {
      const bedCount = parseInt(beds.replace("+", ""));
      result = result.filter(p => p.beds >= bedCount);
    }
    
    if (baths !== "Any") {
      const bathCount = parseInt(baths.replace("+", ""));
      result = result.filter(p => p.baths >= bathCount);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Area: Largest first") {
      result.sort((a, b) => b.area - a.area);
    }

    return result;
  }, [allProperties, keyword, category, location, propertyType, beds, baths, sort]);

  return (
    <main className="flex-1 w-full bg-slate-50 dark:bg-background-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Breadcrumbs */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-[fade-in-right_0.5s_ease-out_forwards]">
            <nav className="flex mb-4 text-sm text-slate-500 font-medium">
              <Link className="hover:text-primary dark:hover:text-white transition-colors" href="/">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-copper-accent font-bold">Properties</span>
            </nav>
            <h2 className="text-4xl font-extrabold text-primary dark:text-slate-100">Premium Properties in Qatar</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Discover elite living spaces in Doha&apos;s most prestigious districts.</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Sort by:</span>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-0 bg-white dark:bg-slate-800 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:ring-copper-accent outline-none cursor-pointer"
            >
              <option>Newest Listings</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Area: Largest first</option>
            </select>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-primary dark:text-slate-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-copper-accent">tune</span>
                  Filters
                </h3>
                <button 
                  onClick={() => {
                    setKeyword(""); setCategory("All"); setLocation("All Locations"); setPropertyType("All Types"); setBeds("Any"); setBaths("Any");
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-copper-accent uppercase tracking-wider transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Keyword</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input 
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-0 rounded-lg focus:ring-2 focus:ring-copper-accent text-sm outline-none transition-all" 
                      placeholder="Villa, Penthouse..." 
                      type="text" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Category</label>
                  <div className="flex p-1 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-inner">
                    <button 
                      onClick={() => setCategory("For Sale")}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${category === "For Sale" ? "bg-copper-accent text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                    >Buy</button>
                    <button 
                      onClick={() => setCategory("For Rent")}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${category === "For Rent" ? "bg-copper-accent text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                    >Rent</button>
                    <button 
                      onClick={() => setCategory("All")}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${category === "All" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                    >All</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Location</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border-0 rounded-lg focus:ring-2 focus:ring-copper-accent text-sm outline-none cursor-pointer transition-all"
                  >
                    <option>All Locations</option>
                    <option>The Pearl-Qatar</option>
                    <option>Lusail City</option>
                    <option>West Bay</option>
                    <option>Msheireb Downtown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Property Type</label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border-0 rounded-lg focus:ring-2 focus:ring-copper-accent text-sm outline-none cursor-pointer transition-all"
                  >
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Townhouse</option>
                    <option>Duplex</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Bedrooms</label>
                    <select 
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border-0 rounded-lg text-sm outline-none cursor-pointer"
                    >
                      <option>Any</option>
                      <option>1+</option>
                      <option>3+</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Bathrooms</label>
                    <select 
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border-0 rounded-lg text-sm outline-none cursor-pointer"
                    >
                      <option>Any</option>
                      <option>1+</option>
                      <option>3+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Property Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="col-span-3 flex items-center justify-center py-20">
                <span className="material-symbols-outlined animate-spin text-4xl text-copper-accent">progress_activity</span>
                <span className="ml-3 text-slate-500 font-bold">Loading properties...</span>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? filteredProperties.map((property, idx) => (
                <Link href={`/properties/${property.id}`} key={property.id} className="block group">
                  <div 
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col"
                    style={{ animationDelay: `${(idx % 6) * 100}ms` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                        style={{ backgroundImage: `url('${property.main_image || property.mainImage || ""}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute top-4 left-4 bg-copper-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {property.status}
                      </div>
                      
                      <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-copper-accent transition-colors z-10" onClick={(e) => { e.preventDefault(); }}>
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-copper-accent font-extrabold text-xl mb-1">QAR {property.price.toLocaleString()}</p>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-copper-accent transition-colors">{property.title}</h3>
                      
                      <div className="flex items-center text-slate-500 text-sm mb-4">
                        <span className="material-symbols-outlined text-base mr-1">location_on</span>
                        <span className="line-clamp-1">{property.location}</span>
                      </div>
                      
                      <div className="mt-auto pt-4 grid grid-cols-3 border-t border-slate-100 dark:border-slate-700 gap-2">
                        <div className="flex flex-col items-center group/icon hover:text-copper-accent transition-colors">
                          <span className="material-symbols-outlined text-slate-400 group-hover/icon:text-copper-accent transition-colors">bed</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">{property.beds} Beds</span>
                        </div>
                        <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-700 group/icon hover:text-copper-accent transition-colors">
                          <span className="material-symbols-outlined text-slate-400 group-hover/icon:text-copper-accent transition-colors">bathtub</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">{property.baths} Baths</span>
                        </div>
                        <div className="flex flex-col items-center group/icon hover:text-copper-accent transition-colors">
                          <span className="material-symbols-outlined text-slate-400 group-hover/icon:text-copper-accent transition-colors">square_foot</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">{property.area} Sqm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">search_off</span>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No properties found</h3>
                  <p className="text-slate-500">Try adjusting your filters to find what you&apos;re looking for.</p>
                  <button 
                    onClick={() => {
                      setKeyword(""); setCategory("All"); setLocation("All Locations"); setPropertyType("All Types"); setBeds("Any"); setBaths("Any");
                    }}
                    className="mt-6 font-bold text-copper-accent hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
            )}

            {/* Pagination UI */}
            {filteredProperties.length > 0 && (
              <div className="mt-12 flex justify-center pb-12">
                <nav className="flex items-center gap-2">
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-copper-accent hover:border-copper-accent hover:text-white transition-all text-slate-500">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="size-10 flex items-center justify-center rounded-lg bg-copper-accent text-white font-bold shadow-md">1</button>
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-copper-accent hover:border-copper-accent hover:text-white transition-all text-slate-600 dark:text-slate-400 font-bold">2</button>
                  <span className="mx-2 text-slate-400">...</span>
                  <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-copper-accent hover:border-copper-accent hover:text-white transition-all text-slate-500">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PropertiesListing() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-copper-accent">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
