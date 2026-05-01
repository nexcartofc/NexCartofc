import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";
import { ProductCard } from "../components/ui/ProductCard";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "../components/ui/Button";

export function ProductListingPage() {
  const location = useLocation();
  const path = location.pathname;
  const query = new URLSearchParams(location.search).get("q");

  const { title, products, type } = useMemo(() => {
    let filtered = MOCK_PRODUCTS;
    let pageTitle = "All Products";
    let pageType = "all";

    if (path.includes("trending")) {
      filtered = MOCK_PRODUCTS.filter(p => p.isTrending);
      pageTitle = "Trending Now";
      pageType = "trending";
    } else if (path.includes("deals")) {
      filtered = MOCK_PRODUCTS.filter(p => p.isFlashDeal);
      pageTitle = "Flash Deals";
      pageType = "deals";
    }

    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      pageTitle = `Search: ${query}`;
      pageType = "search";
    }

    return { title: pageTitle, products: filtered, type: pageType };
  }, [path, query]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative h-48 overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:h-64 md:p-12 flex items-center">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none overflow-hidden">
          <div className="text-[180px] md:text-[280px] font-black leading-none text-white -mr-20 -mt-10 uppercase tracking-tighter">
            {type}
          </div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white md:text-6xl uppercase italic tracking-tighter">{title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-white transition-colors">Home</Link>
            <span className="text-[10px] font-black text-slate-600">/</span>
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em]">{title}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filters - Sidebar Desktop */}
        <aside className="hidden h-fit w-72 flex-shrink-0 space-y-8 rounded-[2.5rem] border border-slate-200 bg-white p-8 md:block sticky top-28">
          <div>
            <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 border-b border-slate-100 pb-3">Refine Selection</h3>
            <div className="space-y-8">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</p>
                <div className="relative">
                  <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-pink-500 outline-none">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price Range</p>
                <div className="space-y-3">
                  {["Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹20,000", "Over ₹20,000"].map((range) => (
                    <label key={range} className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none h-5 w-5 bg-slate-100 border-none rounded-md checked:bg-pink-600 transition-all cursor-pointer" />
                        <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">✓</div>
                      </div>
                      <span className="group-hover:text-slate-900 transition-colors uppercase tracking-tight text-xs">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Availability</p>
                <label className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none h-5 w-5 bg-slate-100 border-none rounded-md checked:bg-pink-600 transition-all cursor-pointer" />
                    <div className="absolute opacity-0 peer-checked:opacity-100 text-white pointer-events-none">✓</div>
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors uppercase tracking-tight text-xs">Exlude Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
          <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] hover:bg-pink-600 shadow-xl shadow-slate-200 transition-all">Apply Filters</Button>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-pink-600" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Found <span className="text-slate-900 italic">{products.length} Products</span> in this collection
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">
                Grid View
              </Button>
              <Button variant="outline" size="sm" className="h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 md:hidden">
                <Filter size={14} className="mr-2" /> Filters
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                <Filter size={40} />
              </div>
              <h3 className="text-2xl font-black italic uppercase text-slate-900">No matches found</h3>
              <p className="text-slate-500 font-medium mt-2 max-w-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
              <Button variant="primary" className="mt-8 px-10 h-14 rounded-2xl" onClick={() => window.location.reload()}>Reset All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
