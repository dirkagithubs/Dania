"use client";

import { useState } from "react";

export default function AdminLeadsPage() {
  const [activeFilter, setActiveFilter] = useState("All Leads");

  const stats = [
    { title: "Total Leads", value: "2,845", trend: "+8% this month", trendColor: "text-emerald-600", icon: "trending_up" },
    { title: "New Today", value: "12", trend: "4 pending contact", trendColor: "text-slate-400", icon: null },
    { title: "Conversion Rate", value: "18.4%", trend: "+2.1%", trendColor: "text-emerald-600", icon: "trending_up" },
    { title: "Active Follow-ups", value: "48", trend: "8 overdue", trendColor: "text-rose-500", icon: null }
  ];

  const allLeads = [
    { initials: "SH", name: "Sarah Henderson", property: "The Grand Estate", source: "WhatsApp", sourceIcon: "chat", sourceColor: "text-[#25D366]", status: "New", statusBg: "bg-blue-100", statusText: "text-blue-700", statusDot: "bg-blue-500", date: "Oct 27, 2023" },
    { initials: "MJ", name: "Michael Johnson", property: "Skyline Penthouse", source: "Web Form", sourceIcon: "language", sourceColor: "text-blue-500", status: "Contacted", statusBg: "bg-amber-100", statusText: "text-amber-700", statusDot: "bg-amber-500", date: "Oct 26, 2023" },
    { initials: "ED", name: "Emily Davis", property: "Forest Retreat Cabin", source: "Phone", sourceIcon: "phone", sourceColor: "text-indigo-500", status: "Viewing", statusBg: "bg-purple-100", statusText: "text-purple-700", statusDot: "bg-purple-500", date: "Oct 25, 2023" },
    { initials: "RW", name: "Robert Wilson", property: "Maple Ridge Home", source: "Web Form", sourceIcon: "language", sourceColor: "text-blue-500", status: "Closed", statusBg: "bg-emerald-100", statusText: "text-emerald-700", statusDot: "bg-emerald-500", date: "Oct 24, 2023" },
    { initials: "AT", name: "Ahmed Al-Thani", property: "Waterfront Villa", source: "WhatsApp", sourceIcon: "chat", sourceColor: "text-[#25D366]", status: "New", statusBg: "bg-blue-100", statusText: "text-blue-700", statusDot: "bg-blue-500", date: "Oct 23, 2023" },
    { initials: "FK", name: "Fatma Khalid", property: "Lusail Apartment", source: "Phone", sourceIcon: "phone", sourceColor: "text-indigo-500", status: "Contacted", statusBg: "bg-amber-100", statusText: "text-amber-700", statusDot: "bg-amber-500", date: "Oct 22, 2023" },
  ];

  const filterMap: Record<string, string | null> = {
    "All Leads": null,
    "New": "New",
    "In Progress": "Contacted",
    "Closed": "Closed",
  };

  const leads = filterMap[activeFilter]
    ? allLeads.filter(l => l.status === filterMap[activeFilter])
    : allLeads;

  return (
    <div className="animate-[fade-in-up_0.5s_ease-out_forwards]">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white">Lead Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your potential clients and property inquiries.</p>
        </div>
        <button className="bg-copper-accent hover:bg-copper-accent/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Lead
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</p>
            <h3 className="text-3xl font-black text-primary dark:text-white mb-2">{stat.value}</h3>
            <p className={`${stat.trendColor} text-xs font-bold flex items-center gap-1`}>
              {stat.icon && <span className="material-symbols-outlined text-sm">{stat.icon}</span>}
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Table Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
          <span className="text-sm font-bold text-slate-500 shrink-0">Filter by:</span>
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
            {["All Leads", "New", "In Progress", "Closed"].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                  activeFilter === f ? "bg-slate-900 dark:bg-slate-700 text-white" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >{f}</button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <button className="flex items-center justify-center flex-1 xl:flex-none gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">filter_list</span> Filters
          </button>
          <button className="flex items-center justify-center flex-1 xl:flex-none gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">download</span> Export
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="font-bold text-lg text-primary dark:text-white">Recent Lead Activity</h3>
          <span className="text-xs font-bold text-slate-400">{leads.length} results</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Property Interest</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Lead Source</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date Received</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 bg-white dark:bg-slate-800">
              {leads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs ring-2 ring-white dark:ring-slate-800 shadow-sm group-hover:bg-copper-accent group-hover:text-white transition-colors">
                        {lead.initials}
                      </div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{lead.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {lead.property}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <span className={`material-symbols-outlined text-[18px] ${lead.sourceColor}`}>{lead.sourceIcon}</span> 
                      {lead.source}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${lead.statusBg} ${lead.statusText} shadow-sm border border-black/5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${lead.statusDot}`}></span> 
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {lead.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Message"><span className="material-symbols-outlined text-lg">mail</span></button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Call"><span className="material-symbols-outlined text-lg">call</span></button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Schedule Viewing"><span className="material-symbols-outlined text-lg">calendar_today</span></button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors" title="Options"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to {leads.length} of 2,845 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Previous</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
