"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DbProperty = any;

export default function PropertyDetails({ params }: { params: { id: string } }) {
  const propertyId = params.id;
  const [property, setProperty] = useState<DbProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p: DbProperty) => p.id === propertyId);
          setProperty(found || null);
        }
      } catch (err) {
        console.error("Failed to load property:", err);
      }
      setLoading(false);
    }
    load();
  }, [propertyId]);

  if (loading) {
    return (
      <main className="flex-1 w-full bg-slate-50 dark:bg-background-dark min-h-[70vh] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-5xl text-copper-accent">progress_activity</span>
        <span className="ml-3 text-slate-500 font-bold text-lg">Loading property...</span>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex-1 w-full bg-slate-50 dark:bg-background-dark min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">home_work</span>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Property Not Found</h1>
        <p className="text-slate-500 mb-8">This listing may have been removed or is currently unavailable.</p>
        <Link href="/properties" className="bg-copper-accent text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all">
          Browse All Properties
        </Link>
      </main>
    );
  }

  // Build the full image list: main image + gallery
  const allImages: string[] = [
    property.main_image,
    ...(property.gallery_images || []),
  ].filter(Boolean);

  const amenities = property.amenities || [];
  const videoUrl = property.video_preview || "";

  // Helper to get YouTube embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url; // Return as-is for direct video URLs
  };

  return (
    <main className="flex-1 w-full bg-slate-50 dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-slate-500 font-medium">
          <Link className="hover:text-primary dark:hover:text-white transition-colors" href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link className="hover:text-primary dark:hover:text-white transition-colors" href="/properties">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-copper-accent font-bold truncate max-w-[200px] sm:max-w-xs">{property.title}</span>
        </nav>

        {/* Hero Gallery */}
        <section className="mb-8">
          {allImages.length > 0 ? (
            <>
              {/* Main image */}
              <div
                className="relative w-full h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer mb-4"
                onClick={() => setShowLightbox(true)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${allImages[activeImage]}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 z-10">
                  <span className="bg-copper-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-lg">
                    {property.status}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">{property.title}</h1>
                  <p className="text-white/80 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">location_on</span> {property.location}
                  </p>
                </div>

                {/* Photo count badge */}
                <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">photo_library</span>
                  {activeImage + 1} / {allImages.length}
                </div>

                {/* Nav arrows */}
                {allImages.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage(prev => (prev - 1 + allImages.length) % allImages.length); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-sm">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveImage(prev => (prev + 1) % allImages.length); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-sm">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-24 h-16 shrink-0 rounded-lg bg-cover bg-center border-2 transition-all ${
                        idx === activeImage
                          ? "border-copper-accent shadow-lg scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundImage: `url('${img}')` }}
                    ></button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[400px] rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-slate-300">image_not_supported</span>
            </div>
          )}
        </section>

        {/* Lightbox */}
        {showLightbox && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setShowLightbox(false)}>
            <button className="absolute top-6 right-6 text-white/70 hover:text-white z-10" onClick={() => setShowLightbox(false)}>
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <img src={allImages[activeImage]} alt="" className="w-full h-full object-contain rounded-lg" />
              {allImages.length > 1 && (
                <>
                  <button onClick={() => setActiveImage(prev => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-2xl">chevron_left</span>
                  </button>
                  <button onClick={() => setActiveImage(prev => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-2xl">chevron_right</span>
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-bold">
                {activeImage + 1} / {allImages.length}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-8">

            {/* Price & Details Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-4xl font-extrabold text-primary dark:text-white mb-2">QAR {property.price.toLocaleString()}</h2>
                  <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-copper-accent">location_on</span> {property.location}
                  </p>
                </div>
                <div className="flex gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
                  <div className="text-center flex-1 md:flex-none">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Type</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{property.type}</p>
                  </div>
                  <div className="text-center flex-1 md:flex-none">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Beds</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{property.beds}</p>
                  </div>
                  <div className="text-center flex-1 md:flex-none">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Baths</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{property.baths}</p>
                  </div>
                  <div className="text-center flex-1 md:flex-none">
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Area</p>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{property.area} <span className="text-sm font-medium text-slate-500">sqm</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Amenities */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Property Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-lg">
                {property.description}
              </p>

              {amenities.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Key Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
                    {amenities.map((amenity: { icon: string; label: string }, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 group">
                        <span className="material-symbols-outlined text-copper-accent bg-copper-accent/10 p-2 rounded-lg group-hover:bg-copper-accent group-hover:text-white transition-colors">{amenity.icon}</span>
                        <span className="font-medium">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Video Section */}
            {videoUrl && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-copper-accent text-3xl">videocam</span>
                  Video Tour
                </h3>
                {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-inner">
                    <iframe
                      src={getYoutubeEmbedUrl(videoUrl)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Property Video Tour"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-inner bg-black">
                    <video src={videoUrl} controls className="w-full h-full object-contain">
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}
              </div>
            )}

            {/* Location Map */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Location</h3>
              <div className="w-full h-[400px] rounded-xl overflow-hidden grayscale contrast-125 border border-slate-200 dark:border-slate-700 relative group">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                     style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClRzNEepjSzYkGWEwki3s4yqZw49ilNowt1ZEHyfc24_TY4ia6IOy6jU4AtnAnhVWPRBvXkwm_PI673RIWsoJ3ZAwQYuSoGr3QdmLCfafjMHzZh9oxIghI1qSpHTOLbHN2Ynlb5Bg7CTPpfxuYYNBapG-_uyGaxT2hs2G6oJg3Wq-zjt72SNHVi042afFXcT7hLcs3CJFFR4X6vBSArsuhwz5htFUjLJQ5OQ6B7zs89lxE-U78jy0MAqrtWJdO8VVQgyIZWZUvpJA')" }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10 bg-white dark:bg-slate-900 p-3 rounded-lg shadow-2xl flex items-center gap-2 border-2 border-copper-accent">
                    <span className="material-symbols-outlined text-copper-accent">location_on</span>
                    <span className="text-xs font-bold uppercase text-slate-900 dark:text-white line-clamp-1 max-w-[200px]">{property.location}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[400px]">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 sticky top-28">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="size-16 rounded-full bg-copper-accent/20 flex items-center justify-center border-2 border-copper-accent shadow-md"
                >
                  <span className="material-symbols-outlined text-copper-accent text-3xl">support_agent</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">{property.agent_name || "Dania Agent"}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{property.agent_title || "Property Specialist"}</p>
                </div>
              </div>

              <form className="space-y-4 mb-6" onSubmit={(e) => { e.preventDefault(); alert("Inquiry sent for " + property.title); }}>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Full Name</label>
                  <input required className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:border-copper-accent focus:ring-copper-accent h-12 px-4 outline-none transition-all text-sm" placeholder="John Doe" type="text" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Email Address</label>
                  <input required className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:border-copper-accent focus:ring-copper-accent h-12 px-4 outline-none transition-all text-sm" placeholder="john@example.com" type="email" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Phone Number</label>
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:border-copper-accent focus:ring-copper-accent h-12 px-4 outline-none transition-all text-sm" placeholder="+974 0000 0000" type="tel" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Message</label>
                  <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:border-copper-accent focus:ring-copper-accent py-3 px-4 outline-none transition-all resize-y text-sm" rows={4} defaultValue={`I am interested in ${property.title} located at ${property.location}...`}></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-slate-800 text-white py-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg">
                  Send Inquiry
                </button>
              </form>

              <button className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg">
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Quick Contact
              </button>
              <p className="text-center text-xs text-slate-400 mt-5 font-medium">Average response time: 15 minutes</p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
