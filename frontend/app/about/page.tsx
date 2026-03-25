export default function AboutUs() {
  return (
    <main className="flex-1 w-full bg-white dark:bg-background-dark">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABAACiC5o7ZVfgeZvp3yKvX864IKd9vFpF3SfKumFGJHo8O_2mC1GEfHRV-DFzGEjqnKNgW8iiRI-MblUMwuc0XvAMNVG7FVJZxMKivIFgdCpLkh6-yBI2E5PnG6FRHE9N5tjM__7fdG5w3PP9f-MWYjgbMH-51vZOOI_B-GBL8DYgC1hmDywt2JPtodYQqNd7e5XH2bv9XhG7djVDYdXlawiBVM9QjGjaiS4AgTqGdkopNvhlIwzcG5cu51liI2mT-cEOxs1tBJM')" }}
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl translate-y-4 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
          <span className="text-copper-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Crafting Legacies in Qatar</span>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
            Elevating Qatari <br />Real Estate
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
            Experience unparalleled luxury and local expertise with Dania Real Estate. Our heritage is built on the sands of Doha.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9FAwhLZivIwjYt5-GBQfN9v2PCpEzMUUkq7YqTpBjfuGdRlb-4EEe6kK3NkhTJwg-lgxXzjbvD3F15z5yFxfqSUJqdPzODbqf-BIu2byId3ufSsMvN1sRjMuJq9TlY9MM0NtQcjqxjeqJSPuPCRZxLxdY5qCsQ4SfoSUE9BikC6WLqx8vEaDfhOAPl6J7OX0VZfSEmWMolp6yT7MqGa4poVs6E8F05nHcgQMQ8IfZPcYSEFEzPXD6s7DbRMoztRzgtgpJzYd7R78')" }}
              ></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-copper-accent p-8 rounded-xl hidden lg:block shadow-lg animate-bounce-slow">
              <p className="text-white text-4xl font-black italic">12+</p>
              <p className="text-white/80 text-sm font-bold uppercase tracking-widest mt-1">Years of Excellence</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-primary dark:text-white text-4xl font-bold leading-tight">Our Story</h2>
            <div className="w-20 h-1.5 bg-copper-accent rounded-full"></div>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              Founded on the principles of integrity and excellence, Dania Real Estate has been a cornerstone of the Qatari market for over a decade. We specialize in connecting discerning clients with the most prestigious properties in Doha.
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              From the iconic towers of West Bay to the serene villas of The Pearl, our deep-rooted knowledge of the local landscape allows us to provide insights that go beyond simple transactions. We don&apos;t just sell property; we curate lifestyles.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-copper-accent text-3xl font-bold">500+</p>
                <p className="text-slate-500 text-sm font-semibold uppercase mt-1">Properties Managed</p>
              </div>
              <div>
                <p className="text-copper-accent text-3xl font-bold">QAR 2B+</p>
                <p className="text-slate-500 text-sm font-semibold uppercase mt-1">Total Sales Volume</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 dark:bg-primary/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-primary dark:text-white text-3xl font-extrabold mb-4">Our Core Values</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">The pillars that define our commitment to our clients and the community.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Value Card 1 */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300">
            <div className="size-14 bg-primary/5 dark:bg-copper-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-copper-accent group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <h3 className="text-primary dark:text-white text-xl font-bold mb-4">Unwavering Trust</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Transparency is the foundation of every relationship we build. We provide honest, data-driven advice to ensure your peace of mind.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300 delay-100">
            <div className="size-14 bg-primary/5 dark:bg-copper-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-copper-accent group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">star</span>
            </div>
            <h3 className="text-primary dark:text-white text-xl font-bold mb-4">Excellence</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We strive for perfection in every detail, from property selection to the final handover, exceeding expectations at every turn.
            </p>
          </div>

          {/* Value Card 3 */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group duration-300 delay-200">
            <div className="size-14 bg-primary/5 dark:bg-copper-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-copper-accent group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">handshake</span>
            </div>
            <h3 className="text-primary dark:text-white text-xl font-bold mb-4">Integrity</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our ethical approach governs all our business dealings, ensuring that we act in the best interests of our clients and partners.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-primary dark:text-white text-4xl font-bold mb-8">Why Choose Dania?</h2>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 text-copper-accent transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">local_library</span>
                </div>
                <div>
                  <h4 className="text-primary dark:text-white text-lg font-bold mb-2 group-hover:text-copper-accent transition-colors">Deep Local Expertise</h4>
                  <p className="text-slate-600 dark:text-slate-400">A decade-long mastery of the Qatari market trends, regulations, and upcoming developments.</p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 text-copper-accent transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">support_agent</span>
                </div>
                <div>
                  <h4 className="text-primary dark:text-white text-lg font-bold mb-2 group-hover:text-copper-accent transition-colors">Personalized Concierge</h4>
                  <p className="text-slate-600 dark:text-slate-400">Every client is unique. We tailor our search and advisory services to match your specific legacy goals.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 text-copper-accent transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">inventory_2</span>
                </div>
                <div>
                  <h4 className="text-primary dark:text-white text-lg font-bold mb-2 group-hover:text-copper-accent transition-colors">Exclusive Portfolio</h4>
                  <p className="text-slate-600 dark:text-slate-400">Access to off-market listings and the most coveted addresses across Qatar&apos;s premium zones.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full flex justify-center mt-12 lg:mt-0">
            <div className="bg-primary aspect-square w-full max-w-md rounded-full flex items-center justify-center p-8 md:p-12 shadow-2xl relative">
              <div 
                className="rounded-full w-full h-full object-cover border-8 border-white dark:border-slate-800 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAj4FXYOuFXSUkR-sfGPxjwuMPpE6Rx1BwsUrAcmNFROkOYaNMpvVwPSH0FMM5PQhZpvOAaPtcTF44lWzQ-2w-LwarOl0hnndYhs3xesoAdQw0xKYcfszgT5Md-cPxn2Bi4P_IyV3XeGf8wnRXNQK8cz7NfsOVWdkkDooeibX10zkzytkA4wSRc968KotlWCakIoRGIYMjvy52_bQarb05mCqpMiQpu0VOPuVmWHYcviArggyXew9ycwYhM6XyBUkD_Vc7yptssQWM')" }}
              ></div>
              <div className="absolute -top-4 -right-4 md:top-0 md:right-0 bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 border border-slate-100 dark:border-slate-700 animate-bounce-slow">
                <p className="text-copper-accent text-sm font-bold uppercase tracking-tighter mb-1">Award Winning Agency</p>
                <p className="text-primary dark:text-white text-xs font-semibold">2023 Best Luxury Brokerage Doha</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto bg-primary dark:bg-slate-800 border dark:border-slate-700 rounded-3xl p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-10 h-full w-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="border-r border-white"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">Ready to find your next masterpiece?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Our advisors are ready to guide you through Qatar&apos;s most exclusive real estate opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-lg">
                Contact Our Team
              </a>
              <a href="/properties" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
