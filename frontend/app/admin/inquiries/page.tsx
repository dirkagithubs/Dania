"use client";

import { useState } from "react";

const mockInquiries = [
  { id: 1, name: "Ahmed Al-Thani", email: "ahmed@example.com", phone: "+974 5012 3456", subject: "Waterfront Villa Inquiry", message: "I am interested in viewing the Majestic Waterfront Villa at The Pearl-Qatar. Are viewings available this weekend?", property: "Majestic Waterfront Villa", date: "Mar 7, 2026", status: "Unread", priority: "High" },
  { id: 2, name: "Fatma Hassan", email: "fatma.h@example.com", phone: "+974 5534 2211", subject: "Rental Availability", message: "Hi, I would like to know if the Skyline Penthouse is still available for rent? What are the lease terms?", property: "Skyline Penthouse Apartment", date: "Mar 6, 2026", status: "Read", priority: "Medium" },
  { id: 3, name: "Mohammed Khalid", email: "mkhalid@example.com", phone: "+974 5567 8900", subject: "Investment Property", message: "I am looking for off-plan investment opportunities in Lusail. Can you share available inventory and expected ROI?", property: "Modernist Lusail Mansion", date: "Mar 5, 2026", status: "Replied", priority: "High" },
  { id: 4, name: "Sara Williams", email: "sara.w@gmail.com", phone: "+974 5501 4422", subject: "Property Valuation", message: "I own a 3-bedroom apartment in West Bay and would like a free valuation. When can someone visit?", property: "General Inquiry", date: "Mar 4, 2026", status: "Unread", priority: "Low" },
  { id: 5, name: "James Rodriguez", email: "jrod@company.com", phone: "+974 5098 7654", subject: "Commercial Lease", message: "We are expanding our offices and need a commercial space in Msheireb Downtown. Do you handle commercial leasing?", property: "General Inquiry", date: "Mar 3, 2026", status: "Replied", priority: "Medium" },
];

export default function AdminInquiries() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<number | null>(null);

  const filtered = statusFilter === "All"
    ? mockInquiries
    : mockInquiries.filter(i => i.status === statusFilter);

  const selected = mockInquiries.find(i => i.id === selectedInquiry);

  return (
    <div className="animate-[fade-in-up_0.5s_ease-out_forwards]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white">Inquiries</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">View and respond to client inquiries from the website contact forms.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 shadow-sm border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {mockInquiries.filter(i => i.status === "Unread").length} Unread
          </span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-bold text-slate-500">Status:</span>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
          {["All", "Unread", "Read", "Replied"].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                statusFilter === f ? "bg-slate-900 dark:bg-slate-700 text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Inquiry List */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-bold text-sm text-primary dark:text-white">{filtered.length} Inquiries</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50 max-h-[600px] overflow-y-auto">
            {filtered.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => setSelectedInquiry(inquiry.id)}
                className={`w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${
                  selectedInquiry === inquiry.id ? "bg-copper-accent/5 border-l-4 border-copper-accent" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-sm ${inquiry.status === "Unread" ? "font-extrabold text-slate-900 dark:text-white" : "font-medium text-slate-700 dark:text-slate-300"}`}>
                    {inquiry.name}
                  </p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                    inquiry.priority === "High" ? "bg-red-100 text-red-600" :
                    inquiry.priority === "Medium" ? "bg-amber-100 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  }`}>{inquiry.priority}</span>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 truncate">{inquiry.subject}</p>
                <p className="text-xs text-slate-500 truncate">{inquiry.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400">{inquiry.date}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    inquiry.status === "Unread" ? "bg-blue-100 text-blue-700" :
                    inquiry.status === "Read" ? "bg-slate-100 text-slate-600" :
                    "bg-emerald-100 text-emerald-700"
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      inquiry.status === "Unread" ? "bg-blue-500" :
                      inquiry.status === "Read" ? "bg-slate-400" :
                      "bg-emerald-500"
                    }`}></span>
                    {inquiry.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Inquiry Detail */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          {selected ? (
            <>
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-primary dark:text-white mb-1">{selected.subject}</h3>
                    <p className="text-sm text-slate-500">From: <span className="font-bold text-slate-700 dark:text-slate-300">{selected.name}</span></p>
                  </div>
                  <span className="text-xs text-slate-400">{selected.date}</span>
                </div>
              </div>
              <div className="p-8">
                {/* Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <span className="material-symbols-outlined text-copper-accent">mail</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selected.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <span className="material-symbols-outlined text-copper-accent">call</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Phone</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{selected.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <span className="material-symbols-outlined text-copper-accent">apartment</span>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Property</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{selected.property}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Message</h4>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selected.message}</p>
                  </div>
                </div>

                {/* Reply Box */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Reply</h4>
                  <textarea
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-copper-accent focus:border-transparent p-4 text-sm outline-none resize-y transition-all"
                    rows={4}
                    placeholder="Type your reply here..."
                  ></textarea>
                  <div className="flex items-center gap-3 mt-4">
                    <button className="bg-copper-accent hover:bg-copper-accent/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md">
                      <span className="material-symbols-outlined text-lg">send</span>
                      Send Reply
                    </button>
                    <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md">
                      <span className="material-symbols-outlined text-lg">chat</span>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-600 mb-4">mark_email_read</span>
              <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-1">Select an inquiry</h3>
              <p className="text-sm text-slate-400">Click on any inquiry from the list to view its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
