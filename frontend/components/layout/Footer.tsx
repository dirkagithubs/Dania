import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300 py-16 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-white mb-2">
            <img src="/images/logo.png" alt="Dania Real Estate Logo" className="h-12 w-auto object-contain brightness-0 invert" />
          </div>
          <p className="text-sm leading-relaxed">
            Dedicated to providing premier real estate solutions in the State of Qatar. Our legacy is built on trust, transparency, and unparalleled market expertise.
          </p>
          <div className="flex gap-4">
            <a className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-copper-accent transition-all" href="https://linkedin.com">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-copper-accent transition-all" href="mailto:info@dania-realestate.com">
              <span className="material-symbols-outlined text-sm">alternate_email</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link className="hover:text-copper-accent transition-colors" href="/services">Residential Sales</Link>
            </li>
            <li>
              <Link className="hover:text-copper-accent transition-colors" href="/services">Commercial Leasing</Link>
            </li>
            <li>
              <Link className="hover:text-copper-accent transition-colors" href="/services">Property Management</Link>
            </li>
            <li>
              <Link className="hover:text-copper-accent transition-colors" href="/about">Investment Advisory</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Locations</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <span className="hover:text-copper-accent transition-colors cursor-pointer">The Pearl-Qatar</span>
            </li>
            <li>
              <span className="hover:text-copper-accent transition-colors cursor-pointer">West Bay</span>
            </li>
            <li>
              <span className="hover:text-copper-accent transition-colors cursor-pointer">Lusail City</span>
            </li>
            <li>
              <span className="hover:text-copper-accent transition-colors cursor-pointer">Al Waab</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-copper-accent text-lg mt-0.5">location_on</span>
              <span>3rd Flr, Al Muftah Plaza Building,<br />Al Rayyan Rd, Doha, Qatar<br /><span className="text-white/60">Fereej Bin Mahmoud 22</span></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-copper-accent text-lg">call</span>
              <span>3326 0393</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-copper-accent text-lg">mail</span>
              <span>info@dania-realestate.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-xs flex flex-col md:flex-row justify-between gap-4 opacity-60">
        <p>© {new Date().getFullYear()} Dania Real Estate. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
