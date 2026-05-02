import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, ShoppingCart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200">
      <div className="mx-auto px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white">
                <ShoppingCart size={22} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                Nex<span className="text-pink-600">cart</span>
              </h1>
            </Link>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-slate-500">
              Your trusted online store for fashion, lifestyle & more. Quality products delivered straight to your doorstep.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="rounded-xl bg-slate-100 p-3 text-slate-600 transition-all hover:bg-pink-600 hover:text-white hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Discover",
              links: [
                { name: "All Products", to: "/products" },
                { name: "Trending Now", to: "/trending" },
                { name: "New Arrivals", to: "/deals" },
              ]
            },
            {
              title: "Support",
              links: [
                { name: "Track Order", to: "/orders" },
                { name: "Shipping Policy", to: "#" },
                { name: "Help Center", to: "#" },
              ]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">{section.title}</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.to} className="hover:text-pink-600 transition-colors uppercase tracking-tight">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="mb-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Contact Us</h4>
            <ul className="space-y-6 text-sm font-bold text-slate-500">
              <li className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Mail size={18} />
                </div>
                <a href="mailto:nexcart.ofc@gmail.com" className="tracking-tight hover:text-pink-600 transition-colors lowercase">nexcart.ofc@gmail.com</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Phone size={18} />
                </div>
                <span className="tracking-tight">+91 1800-NEX-CART</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Delivery Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center gap-4 text-center">
          <div className="bg-pink-50/50 border-2 border-dashed border-pink-200 rounded-2xl px-6 py-4 max-w-2xl">
            <p className="text-xs md:text-sm font-bold text-slate-600 flex items-center justify-center gap-2">
              <span>🚚</span>
              Orders are delivered by trusted third-party logistics partners. Package branding may vary.
            </p>
          </div>
          
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            © 2026 Nexcart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
