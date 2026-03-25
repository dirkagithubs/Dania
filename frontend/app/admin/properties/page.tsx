"use client";

import { useState, useEffect, useCallback } from "react";

type PropertyRow = {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  status: "For Sale" | "For Rent";
  type: "Villa" | "Penthouse" | "Apartment" | "Townhouse" | "Duplex";
  description: string;
  main_image: string;
  gallery_images: string[];
  video_preview: string;
  amenities: { icon: string; label: string }[];
  created_at: string;
};

type PropertyFormData = {
  title: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  area: string;
  status: "For Sale" | "For Rent";
  type: "Villa" | "Penthouse" | "Apartment" | "Townhouse" | "Duplex";
  description: string;
  main_image: string;
  gallery_images: string[];
  video_preview: string;
  amenities: { icon: string; label: string }[];
};

const emptyForm: PropertyFormData = {
  title: "",
  price: "",
  location: "",
  beds: "",
  baths: "",
  area: "",
  status: "For Sale",
  type: "Villa",
  description: "",
  main_image: "",
  gallery_images: [],
  video_preview: "",
  amenities: [],
};

export default function AdminProperties() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState<PropertyFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch properties via API route (uses service role key server-side)
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProperties(data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProps = filter === "All"
    ? properties
    : properties.filter(p => p.status === filter);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (property: PropertyRow) => {
    setEditingId(property.id);
    setForm({
      title: property.title,
      price: property.price.toString(),
      location: property.location,
      beds: property.beds.toString(),
      baths: property.baths.toString(),
      area: property.area.toString(),
      status: property.status,
      type: property.type,
      description: property.description || "",
      main_image: property.main_image || "",
      gallery_images: property.gallery_images || [],
      video_preview: property.video_preview || "",
      amenities: property.amenities || [],
    });
    setShowForm(true);
  };

  const uploadImageTask = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      
      const data = await res.json();
      return data.url;
    } catch (err: any) {
      console.error("Upload error:", err.message);
      showSuccess(`❌ Upload Error: ${err.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      price: parseInt(form.price) || 0,
      location: form.location,
      beds: parseInt(form.beds) || 0,
      baths: parseInt(form.baths) || 0,
      area: parseInt(form.area) || 0,
      status: form.status,
      type: form.type,
      description: form.description,
      main_image: form.main_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDPvE1rx3-nl7VIFi8qQhwSu4CSNC5SYReJIkTPQrlH-FUhjBr5w312iIxHs-T7U0Dof6a-gfaijWvo-aXD1ca3UfrvYycq7wXQzwIgsGx9-PC8IwVS2uTpo3Gijb7TTFTAdB9Bq346BSAlDkos8Msh9yj2AorT4nWA5cNgD4mGi3mbOcSXNxGcyQ0_rcAA8eG8W6M503d09GG0YyPKyrkznBCHpoC1RkUCLozGIJWSbpGg674B9ClJJ6-t7nzFSG6iCNGcWzB9XV4",
      gallery_images: form.gallery_images.filter(url => url.trim() !== ""),
      video_preview: form.video_preview,
      amenities: form.amenities.filter(a => a.label.trim() !== ""),
    };

    try {
      if (editingId) {
        const res = await fetch("/api/properties", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Update failed");
        }
        showSuccess(`"${form.title}" has been updated successfully!`);
      } else {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Insert failed");
        }
        showSuccess(`"${form.title}" has been added successfully!`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("Save error:", msg);
      showSuccess(`❌ Error: ${msg}`);
    }

    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    fetchProperties(); // Refresh from DB
  };

  const handleDelete = async (id: string) => {
    const prop = properties.find(p => p.id === id);
    try {
      const res = await fetch(`/api/properties?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      showSuccess(`"${prop?.title}" has been deleted.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error("Delete error:", msg);
      showSuccess(`❌ Error: ${msg}`);
    }
    setDeleteConfirm(null);
    fetchProperties(); // Refresh from DB
  };

  const updateField = (field: keyof PropertyFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-[fade-in-up_0.5s_ease-out_forwards] relative">

      {/* Success Toast */}
      {successMsg && (
        <div className={`fixed top-20 right-8 z-[100] ${successMsg.startsWith("❌") ? "bg-red-600" : "bg-emerald-600"} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-[fade-in-up_0.3s_ease-out_forwards]`}>
          <span className="material-symbols-outlined">{successMsg.startsWith("❌") ? "error" : "check_circle"}</span>
          <span className="font-bold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-500 text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">Delete Property?</h3>
            <p className="text-center text-slate-500 text-sm mb-8">This action cannot be undone. The property will be permanently removed from Supabase.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-100 dark:border-slate-700 my-8">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl">
              <div>
                <h3 className="font-bold text-xl text-primary dark:text-white">
                  {editingId ? "Edit Property" : "Add New Property"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {editingId ? "Update the property details below" : "Fill in the details to list a new property"}
                </p>
              </div>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="w-10 h-10 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Property Title *</label>
                <input required value={form.title} onChange={(e) => updateField("title", e.target.value)}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                  placeholder="e.g. Luxury Waterfront Villa" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Price (QAR) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">QAR</span>
                    <input required type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)}
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 pl-14 pr-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                      placeholder="12500000" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location *</label>
                  <input required value={form.location} onChange={(e) => updateField("location", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                    placeholder="e.g. The Pearl-Qatar" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Property Type *</label>
                  <select value={form.type} onChange={(e) => updateField("type", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-3 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium cursor-pointer">
                    <option>Villa</option><option>Penthouse</option><option>Apartment</option><option>Townhouse</option><option>Duplex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Status *</label>
                  <select value={form.status} onChange={(e) => updateField("status", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-3 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium cursor-pointer">
                    <option>For Sale</option><option>For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Beds *</label>
                  <input required type="number" min="0" value={form.beds} onChange={(e) => updateField("beds", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium" placeholder="5" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Baths *</label>
                  <input required type="number" min="0" value={form.baths} onChange={(e) => updateField("baths", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium" placeholder="6" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Area (sqm) *</label>
                  <input required type="number" min="0" value={form.area} onChange={(e) => updateField("area", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium" placeholder="850" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Main Image *</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <label className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-colors font-bold text-sm shrink-0 shadow-sm">
                      <span className="material-symbols-outlined mr-2">upload</span>
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadImageTask(file);
                          if (url) updateField("main_image", url);
                        }
                      }} />
                    </label>
                    <input required value={form.main_image} onChange={(e) => updateField("main_image", e.target.value)}
                      className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                      placeholder="Or paste URL here..." />
                  </div>
                  {uploadingImage && <p className="text-xs text-copper-accent animate-pulse font-bold">Uploading image...</p>}
                  {form.main_image && (
                    <div className="w-full h-40 rounded-xl bg-cover bg-center border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundImage: `url('${form.main_image}')` }}></div>
                  )}
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Gallery Images</label>
                  <div className="flex gap-4">
                    <label className="text-xs font-bold text-slate-500 hover:text-copper-accent cursor-pointer flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-sm">upload</span> Upload Images
                      <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        for (const file of files) {
                          const url = await uploadImageTask(file);
                          if (url) {
                            setForm(prev => ({ ...prev, gallery_images: [...prev.gallery_images, url] }));
                          }
                        }
                      }} />
                    </label>
                    <button type="button"
                      onClick={() => setForm(prev => ({ ...prev, gallery_images: [...prev.gallery_images, ""] }))}
                      className="text-xs font-bold text-copper-accent hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">add_link</span> Add URL
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {form.gallery_images.map((url, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <input
                          value={url}
                          onChange={(e) => {
                            const updated = [...form.gallery_images];
                            updated[idx] = e.target.value;
                            setForm(prev => ({ ...prev, gallery_images: updated }));
                          }}
                          className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-10 px-4 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium"
                          placeholder={`Gallery image URL ${idx + 1}`}
                        />
                        {url && (
                          <div className="mt-2 w-full h-24 rounded-lg bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{ backgroundImage: `url('${url}')` }}></div>
                        )}
                      </div>
                      <button type="button"
                        onClick={() => {
                          const updated = form.gallery_images.filter((_, i) => i !== idx);
                          setForm(prev => ({ ...prev, gallery_images: updated }));
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-slate-400 hover:text-red-500 transition-colors mt-1">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ))}
                  {form.gallery_images.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No gallery images added yet. Click &quot;Add Image&quot; above.</p>
                  )}
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Video URL (YouTube or direct link)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">videocam</span>
                  <input value={form.video_preview} onChange={(e) => updateField("video_preview", e.target.value)}
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-12 pl-12 pr-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                    placeholder="https://youtube.com/watch?v=... or video URL" />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Key Amenities</label>
                  <button type="button"
                    onClick={() => setForm(prev => ({ ...prev, amenities: [...prev.amenities, { icon: "star", label: "" }] }))}
                    className="text-xs font-bold text-copper-accent hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add_circle</span> Add Amenity
                  </button>
                </div>
                <div className="space-y-3">
                  {form.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="w-1/3">
                        <input
                          value={amenity.icon}
                          onChange={(e) => {
                            const updated = [...form.amenities];
                            updated[idx] = { ...updated[idx], icon: e.target.value };
                            setForm(prev => ({ ...prev, amenities: updated }));
                          }}
                          className="w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 h-10 px-3 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium"
                          placeholder="Icon (e.g. ac_unit, pool)"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          value={amenity.label}
                          onChange={(e) => {
                            const updated = [...form.amenities];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setForm(prev => ({ ...prev, amenities: updated }));
                          }}
                          className="w-full rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 h-10 px-3 focus:ring-2 focus:ring-copper-accent outline-none text-sm font-medium"
                          placeholder="Label (e.g. Central AC)"
                        />
                      </div>
                      <button type="button"
                        onClick={() => {
                          const updated = form.amenities.filter((_, i) => i !== idx);
                          setForm(prev => ({ ...prev, amenities: updated }));
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  ))}
                  {form.amenities.length === 0 && (
                    <p className="text-xs text-slate-400 italic mb-2">No amenities added yet. Useful Google font icons: pool, ac_unit, directions_car, fitness_center.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Description *</label>
                <textarea required value={form.description} onChange={(e) => updateField("description", e.target.value)}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent outline-none transition-all text-sm font-medium resize-y"
                  rows={4} placeholder="Describe the property features..." />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button type="submit" disabled={saving}
                  className="flex-1 sm:flex-none bg-copper-accent hover:bg-copper-accent/90 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                  {saving ? (
                    <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Saving...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">{editingId ? "save" : "add"}</span> {editingId ? "Save Changes" : "Add Property"}</>
                  )}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === PAGE CONTENT === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white">Property Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all listed properties — connected to <span className="text-emerald-500 font-bold">Supabase ●</span></p>
        </div>
        <button onClick={openAddForm}
          className="bg-copper-accent hover:bg-copper-accent/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Property
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Listed</p>
          <p className="text-2xl font-black text-primary dark:text-white">{properties.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">For Sale</p>
          <p className="text-2xl font-black text-primary dark:text-white">{properties.filter(p => p.status === "For Sale").length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">For Rent</p>
          <p className="text-2xl font-black text-primary dark:text-white">{properties.filter(p => p.status === "For Rent").length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Avg. Price</p>
          <p className="text-2xl font-black text-primary dark:text-white">
            QAR {properties.length > 0 ? (Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 100000) / 10).toFixed(1) : 0}M
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-bold text-slate-500 shrink-0">Filter:</span>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
          {["All", "For Sale", "For Rent"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${filter === f ? "bg-slate-900 dark:bg-slate-700 text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
            >{f}</button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-medium ml-auto">{filteredProps.length} properties</span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-copper-accent">progress_activity</span>
            <span className="ml-3 text-slate-500 font-bold">Loading from Supabase...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Beds / Baths</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Area</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {filteredProps.length > 0 ? filteredProps.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-cover bg-center border border-slate-200 dark:border-slate-600 shrink-0 shadow-sm"
                          style={{ backgroundImage: `url('${property.main_image}')` }}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{property.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>{property.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">{property.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-copper-accent">QAR {property.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-sm">bed</span>{property.beds}</span>
                      <span className="mx-2 text-slate-300">/</span>
                      <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-sm">bathtub</span>{property.baths}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">{property.area} sqm</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-black/5 ${
                        property.status === "For Sale" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${property.status === "For Sale" ? "bg-blue-500" : "bg-emerald-500"}`}></span>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditForm(property)} className="p-2 hover:bg-copper-accent/10 rounded-lg text-slate-600 dark:text-slate-300 hover:text-copper-accent transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button onClick={() => setDeleteConfirm(property.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors" title="Delete">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <span className="material-symbols-outlined text-5xl text-slate-200 mb-4 block">search_off</span>
                      <h3 className="text-lg font-bold text-slate-500 mb-1">No properties found</h3>
                      <p className="text-sm text-slate-400 mb-4">Try adjusting your filter or add a new property.</p>
                      <button onClick={openAddForm} className="text-copper-accent font-bold text-sm hover:underline">+ Add Property</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
