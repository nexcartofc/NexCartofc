import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";
import { APP_NAME } from "../../constants";

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
              India's fastest growing multi-vendor eCommerce platform. 
              Bringing quality products from top sellers directly to your doorstep.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
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
                { name: "Flash Deals", to: "/deals" },
                { name: "Premium Collection", to: "/collection" },
              ]
            },
            {
              title: "Support",
              links: [
                { name: "Track Order", to: "/orders" },
                { name: "Shipping Policy", to: "#" },
                { name: "Return & Refunds", to: "#" },
                { name: "Help Center", to: "#" },
                { name: "Become a Seller", to: "/seller" },
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
                <a href="mailto:nexcart.ofc@gmail.com" className="tracking-tight hover:text-pink-600 transition-colors">nexcart.ofc@gmail.com</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Phone size={18} />
                </div>
                <span className="tracking-tight">+91 1800-NEX-CART</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="tracking-tight leading-tight pt-2">123 eCommerce Lane, Tech Hub, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-slate-900 text-white px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
        <div className="flex gap-8 mb-4 md:mb-0">
          <Link to="/seller" className="hover:text-pink-400 transition-colors">Become a Seller</Link>
          <Link to="/admin" className="hover:text-pink-400 transition-colors">Admin Dashboard</Link>
          <Link to="/track" className="hover:text-pink-400 transition-colors">Order Tracking</Link>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-slate-500 italic uppercase tracking-normal">Secure Payments: UPI / COD / WALLET</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-slate-300">System Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
