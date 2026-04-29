import { motion } from "motion/react";
import { CATEGORIES, MOCK_PRODUCTS } from "../constants";
import { ProductCard } from "../components/ui/ProductCard";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Flame, Award } from "lucide-react";
import { Product } from "../types";
import { Button } from "../components/ui/Button";

export function Home() {
  return (
    <div className="space-y-16">
      {/* Main Hero Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Banner Hero (8 Columns) */}
        <div className="md:col-span-8 bg-blue-600 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden flex flex-col justify-end text-white shadow-2xl min-h-[450px] md:min-h-[550px]">
          <div className="absolute top-10 right-10 opacity-10 pointer-events-none select-none overflow-hidden">
            <div className="text-[180px] md:text-[280px] font-black leading-none -mr-20 -mt-10">NXC</div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <span className="bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight">Special Offer</span>
            <h2 className="text-5xl md:text-8xl font-black mt-6 leading-[0.85] tracking-tight">
              UP TO 45% OFF <br className="hidden md:block" /> SMART DEVICES.
            </h2>
            <p className="mt-8 text-blue-100 text-lg font-medium max-w-md">
              Next generation tech for your modern lifestyle. Free delivery & secure checkout enabled for all orders today.
            </p>
            <button className="mt-10 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-tight hover:scale-105 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
              Shop Collection
            </button>
          </motion.div>
        </div>

        {/* Side Feature Tiles (4 Columns) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-emerald-500 rounded-[2rem] p-8 flex-1 flex flex-col justify-between text-white shadow-xl group border-4 border-transparent hover:border-emerald-300 transition-all">
            <h3 className="text-3xl font-black leading-tight">FASHION WEEK<br />LIVE NOW</h3>
            <div className="flex justify-between items-end">
              <span className="text-5xl font-light opacity-30 font-display">01</span>
              <button className="border-2 border-white/40 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all">EXPLORE</button>
            </div>
          </div>
          <div className="bg-orange-500 rounded-[2rem] p-8 flex-1 flex flex-col justify-between text-white shadow-xl group border-4 border-transparent hover:border-orange-300 transition-all">
            <h3 className="text-3xl font-black leading-tight">UP TO ₹5000<br />EXCHANGE</h3>
            <div className="flex justify-between items-end">
              <span className="text-4xl font-light opacity-30 font-display">02</span>
              <button className="border-2 border-white/40 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-orange-600 transition-all">CHECK VALUE</button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-3xl font-black tracking-tight italic uppercase text-slate-900">Flash Deals</h4>
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mt-1">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              Limited Quantity Available
            </div>
          </div>
          <Link to="/deals" className="text-[11px] font-black border-b-2 border-slate-900 pb-0.5 tracking-widest uppercase hover:text-blue-600 hover:border-blue-600 transition-all">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {MOCK_PRODUCTS.filter(p => p.isFlashDeal).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h4 className="text-3xl font-black tracking-tight italic uppercase text-slate-900">Trending Now</h4>
          <Link to="/trending" className="text-[11px] font-black border-b-2 border-slate-900 pb-0.5 tracking-widest uppercase hover:text-blue-600 hover:border-blue-600 transition-all">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {MOCK_PRODUCTS.filter(p => p.isTrending).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div className="bg-slate-100 p-6 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-4 group hover:bg-slate-50 transition-all cursor-pointer">
            <div className="w-12 h-12 border-2 border-slate-300 rounded-full flex items-center justify-center text-2xl group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">+</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">More Items</span>
          </div>
        </div>
      </section>
      
      {/* Featured Collection Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 md:p-16">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none">
          <div className="text-[320px] font-black leading-none text-white -mr-32 -mt-10">PREM</div>
        </div>
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-indigo-200">
              <Award size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest text-indigo-100">Premium Selection</span>
            </div>
            <h2 className="text-5xl font-black leading-[0.9] text-white md:text-7xl tracking-tighter uppercase">
              CURATED FOR <br /> EXCELLENCE.
            </h2>
            <p className="max-w-md text-lg font-medium text-indigo-100">
              Discover unique collections from top Indian artisans and independent brands. Excellence in every stitch and circuit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/collection">
                <Button className="h-16 px-10 text-lg bg-white text-indigo-600 hover:scale-105 transition-transform shadow-xl shadow-indigo-900/20">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img 
              src="https://picsum.photos/seed/curated/800/600" 
              alt="Curated"
              className="rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
