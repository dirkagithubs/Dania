export default function ServicesPage() {
  return (
    <main className="flex-1 w-full bg-slate-50 dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-primary/40 transition-opacity"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-[20s]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCndc_IlhfzFujNOmAoNpwNCHyTTwdS-tL1ljTly_OHkc-Fc7B3PewPX1U-LwNYPtvn_XCLjKLkeZI86mpj1mSwu_HMn073l4A10SzwiBwani4a7-smRWlrFnZEy-xF6oR4b5-pOHIsR6XTvx1VXWLWpoqS_9rV7u-gFyA2SbQTFJsxDKseYpyZPwEt5L8vt-4s1obSdnShoCx4jXFGIFZhwX9gpMtLz7XN9vebdPoRcaI7q9iJ8MglvaqnONm2FkaZXNke6HubIzQ')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 md:from-primary/80 via-primary/20 md:via-transparent to-transparent"></div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-10 transform translate-y-4 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md uppercase tracking-wider shadow-sm">Luxury Real Estate Experts</span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl drop-shadow-md">
            Our Premium <span className="text-copper-accent">Real Estate</span> Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl font-light drop-shadow-sm">
            Experience unparalleled expertise in Qatar&apos;s luxury market. Dania Real Estate provides bespoke solutions for discerning clients seeking excellence in Doha&apos;s evolving skyline.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 w-full md:w-auto">
            <button className="rounded-lg bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-slate-100 hover:-translate-y-1 shadow-lg w-full md:w-auto">
              Explore Services
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 hover:-translate-y-1 w-full md:w-auto">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">Core Real Estate Services</h2>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-copper-accent"></div>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Service 1 */}
            <div className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-copper-accent/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">house</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary dark:text-white">Residential Sales</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Expert guidance for buying and selling luxury homes in the most prestigious neighborhoods including The Pearl and West Bay.</p>
            </div>

            {/* Service 2 */}
            <div className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 delay-100">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-copper-accent/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">business_center</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary dark:text-white">Commercial Leasing</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Strategic solutions for premium office and retail spaces in Doha&apos;s prime business districts and commercial hubs.</p>
            </div>

            {/* Service 3 */}
            <div className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 delay-200">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-copper-accent/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">vpn_key</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary dark:text-white">Property Management</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Full-service management ensuring complete peace of mind and optimized returns for your high-value property assets.</p>
            </div>

            {/* Service 4 */}
            <div className="group flex flex-col rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:-translate-y-2 delay-300">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-copper-accent/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-primary dark:text-white">Investment Consulting</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Data-driven insights and strategic advisory for real estate investment opportunities across the state of Qatar.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-primary dark:bg-slate-900 py-24 text-white lg:py-32 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-copper-accent/5 rounded-full blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-copper-accent/5 blur-3xl rounded-full"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxiwSvqx50EpF_O3hYa_bta7_IQlMGK2dfh-PeEpU-jkU5dWAjBZZ0zITM32I7YLZO_neaCHYZbWhDXnGYz-sjEECL0vAbta_LX6IzYyPI3Bn-jxDjlwl28jfDvtkAyMV66EA1TPii9JsMwbXXLaOwtl1obzVcsNtk8YpgnbiCcmaM6r9xflpz_2ffigJVOD8sLYs6-M4vmMTff3iwOjf--Iy9g7wWb84zw9cmQ0TOy4OziANbHg0Y6Jqu3HIUd9SC7FIYjMznL4M')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              {/* Overlay Badge */}
              <div className="absolute bottom-8 left-8 bg-copper-accent text-white px-6 py-4 rounded-xl shadow-xl backdrop-blur-md">
                <div className="text-3xl font-black mb-1">15+</div>
                <div className="text-sm font-bold uppercase tracking-wider">Years Experience</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-6">Why Choose Our Services</h2>
              <p className="text-lg text-slate-300 font-light mb-12">We combine global standards with local expertise to deliver a seamless real estate experience tailored to your vision.</p>
              
              <ul className="space-y-10">
                <li className="flex gap-6 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-all shadow-inner">
                    <span className="material-symbols-outlined text-3xl">map</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Local Market Expertise</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">Deep-rooted knowledge of Doha&apos;s micro-markets and regulatory landscape ensuring your investments are secure.</p>
                  </div>
                </li>
                <li className="flex gap-6 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-all shadow-inner">
                    <span className="material-symbols-outlined text-3xl">person_pin_circle</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Personalized Approach</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">We don&apos;t believe in one-size-fits-all. Every strategy is tailored to your unique financial goals and lifestyle preferences.</p>
                  </div>
                </li>
                <li className="flex gap-6 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-copper-accent group-hover:bg-copper-accent group-hover:text-white transition-all shadow-inner">
                    <span className="material-symbols-outlined text-3xl">verified_user</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Trust &amp; Transparency</h4>
                    <p className="text-slate-400 font-medium leading-relaxed">Ethical practices and clear communication at every stage of the transaction. Your trust is our most valuable asset.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10 relative z-10">
          <div className="rounded-[2.5rem] bg-white dark:bg-slate-800 px-8 py-16 md:py-24 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-copper-accent to-transparent"></div>
            
            <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-5xl mb-6">Ready to find your next masterpiece?</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 font-medium mb-10">
              Our team of experts is ready to assist you with any real estate requirement in Qatar. Let&apos;s start the conversation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="rounded-xl bg-copper-accent px-10 py-4 text-base font-bold text-white transition-all hover:bg-copper-accent/90 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Contact Our Experts
              </button>
              <button className="rounded-xl bg-slate-50 dark:bg-slate-900 px-10 py-4 text-base font-bold text-primary dark:text-white shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-1">
                Request a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
