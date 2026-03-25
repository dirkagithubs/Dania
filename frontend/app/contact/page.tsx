"use client";

export default function ContactUs() {
  return (
    <main className="flex-1 w-full bg-white dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_K3szRc3pyupr6zf8y831jrhjOw3v2OGwU6HrOsC9nsZ9opWFUt8NG1u65JD7WqA2q1ngI5MPyn2gLQuDpXvt1GJL5p_I_HSHQgPR5c_NDaNaapdUhQvcRtZ0mWsRrTYutemlVvuh5r2RrVzr2roqfC-MXenHQsJMvoge6ZjvBlJuygHu0dyMUfVZTjwHU3R-LNu9YMuTo58uIqGoqnblw6SbhVPZ69r1JoyI0KiG6laaLbL1TWXRYzDdKBNXK6Df0yM7DQ0FQd0')" }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center transform translate-y-4 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]">
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">Get in Touch</h1>
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Expert real estate guidance in Doha. Our team is here to help you find your perfect property in Qatar&apos;s most prestigious locations.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-copper-accent/10 p-3 rounded-lg text-copper-accent">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Visit Us</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">3rd Flr, Al Muftah Plaza Building,<br />Al Rayyan Rd, Doha, Qatar<br />Fereej Bin Mahmoud 22</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-copper-accent/10 p-3 rounded-lg text-copper-accent">
                <span className="material-symbols-outlined">call</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Call Support</h3>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600 dark:text-slate-400 font-medium">3326 0393</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-copper-accent/10 p-3 rounded-lg text-copper-accent">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Email Us</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">info@dania-realestate.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl border border-slate-100 dark:border-slate-700 shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submission simulated (UI-First Phase)"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input 
                    required 
                    className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent transition-all outline-none" 
                    placeholder="John Doe" 
                    type="text" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input 
                    required 
                    className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent transition-all outline-none" 
                    placeholder="john@example.com" 
                    type="email" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Phone Number</label>
                  <input 
                    className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent transition-all outline-none" 
                    placeholder="+974 XXXX XXXX" 
                    type="tel" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Subject</label>
                  <input 
                    required
                    className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 h-12 px-4 focus:ring-2 focus:ring-copper-accent focus:border-transparent transition-all outline-none" 
                    placeholder="Inquiry about Property" 
                    type="text" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Message</label>
                <textarea 
                  required
                  className="w-full rounded-lg border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-copper-accent focus:border-transparent transition-all outline-none p-4 resize-y" 
                  placeholder="Tell us how we can help you..." 
                  rows={5}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-copper-accent hover:bg-copper-accent/90 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Submit Request</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] relative bg-slate-100 dark:bg-slate-800 mt-12 overflow-hidden">
        <div 
          className="absolute inset-0 grayscale contrast-125 brightness-75 bg-cover bg-center transition-transform hover:scale-105 duration-1000" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxwpSQlJHja7w6wMUezlxeal6J_itSz9NHCL7oSy3UmnMl3i6t8WPWBApxKRFljiMRruhUsoc20VJ34jo_DZ-GjM09yoWhrdmzTFsDYPuuXrAtBHHa-Wj7p-JspM5JPolTAnyuPhUF1UVu5BFPxH0xkjt9T_idu-X5dPCBK0FEFUiZyVuWloZamQX5x9OmpO7BUPTBScK8-ahj9eHEl3eM5Gl4k1LxwOb2Chx2zAXFf8EM9vzvMjIknPPaNNdbb3FHiw4jA8UlmFw')" }}
        ></div>
        <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
        
        {/* Map Pin Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-primary text-white p-4 rounded-xl shadow-2xl mb-2 flex items-center gap-3 whitespace-nowrap border-2 border-copper-accent animate-bounce-slow">
            <div className="bg-copper-accent p-1 rounded-full text-white">
              <span className="material-symbols-outlined text-sm">location_city</span>
            </div>
            <span className="font-bold">Dania Real Estate HQ - Al Muftah Plaza</span>
          </div>
          <span className="material-symbols-outlined text-copper-accent text-5xl drop-shadow-lg">location_on</span>
        </div>
        
        {/* Map Legend */}
        <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg max-w-[200px] border border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Location</p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Al Rayyan Rd, Fereej Bin Mahmoud 22</p>
        </div>
      </section>
    </main>
  );
}
