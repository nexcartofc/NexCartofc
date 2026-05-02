import { motion } from "motion/react";
import { CATEGORIES, MOCK_PRODUCTS } from "../constants";
import { ProductCard } from "../components/ui/ProductCard";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Flame, Award } from "lucide-react";
import { Product } from "../types";
import { Button } from "../components/ui/Button";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  return (
    <div className="space-y-16">
      {/* Main Hero Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Banner Hero (8 Columns) */}
        <div className="md:col-span-8 bg-pink-600 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-end text-white shadow-2xl min-h-[280px] md:min-h-[380px]">
          {/* Texture Overlays */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
          
          {/* Repeating Nexcart Typography Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-col font-black text-white italic overflow-hidden rotate-[-12deg] scale-150">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="whitespace-nowrap text-6xl md:text-8xl leading-none tracking-tighter">
                NEXCART NEXCART NEXCART NEXCART NEXCART NEXCART
              </div>
            ))}
          </div>

          <div className="absolute top-10 right-10 opacity-10 pointer-events-none select-none overflow-hidden text-white/20">
            <div className="text-[100px] md:text-[160px] font-black leading-none -mr-8 -mt-8">NXC</div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.1em] text-pink-100/80 block mb-3">WELCOME TO NEXCART</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight max-w-xl">
              Fresh Styles, <br /> Free Delivery — <br /> Shop Now!
            </h2>
            <p className="mt-4 text-white text-sm md:text-lg font-medium max-w-[340px] md:max-w-lg">
              Handpicked fashion & lifestyle products delivered to your door.
            </p>
            <button className="mt-8 bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-tight hover:scale-105 transition-all shadow-xl active:scale-95">
              SHOP COLLECTION
            </button>
          </motion.div>
        </div>

        {/* Side Feature Tiles (4 Columns) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-emerald-500 rounded-[2rem] p-6 flex-1 flex flex-col justify-between text-white shadow-xl group border-4 border-transparent hover:border-emerald-300 transition-all">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black leading-tight uppercase font-display">New<br />Arrivals<br />Every Week</h3>
              <p className="text-[10px] md:text-xs font-bold text-emerald-100 opacity-90">Fresh trendy styles added weekly!</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-light opacity-30 font-display">01</span>
              <button className="border-2 border-white/40 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all">EXPLORE</button>
            </div>
          </div>
          <div className="bg-rose-500 rounded-[2rem] p-6 flex-1 flex flex-col justify-between text-white shadow-xl group border-4 border-transparent hover:border-rose-300 transition-all">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black leading-tight uppercase font-display">Order Via<br />WhatsApp<br />Easily</h3>
              <p className="text-[10px] md:text-xs font-bold text-rose-100 opacity-90">Fast replies & quick delivery guaranteed!</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl font-light opacity-30 font-display">02</span>
              <button className="border-2 border-white/40 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-rose-600 transition-all">ORDER NOW</button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-3xl font-black tracking-tight italic uppercase text-slate-900">New Arrivals</h4>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest mt-1">
              <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
              Fresh products added every week!
            </div>
          </div>
          <Link to="/deals" className="text-[11px] font-black border-b-2 border-slate-900 pb-0.5 tracking-widest uppercase hover:text-pink-600 hover:border-pink-600 transition-all">VIEW ALL</Link>
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
          <Link to="/trending" className="text-[11px] font-black border-b-2 border-slate-900 pb-0.5 tracking-widest uppercase hover:text-pink-600 hover:border-pink-600 transition-all">VIEW ALL</Link>
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
      <section className="relative overflow-hidden rounded-[2.5rem] bg-purple-600 p-8 md:p-16">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none">
          <div className="text-[320px] font-black leading-none text-white -mr-32 -mt-10">PREM</div>
        </div>
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-purple-200">
              <Award size={20} />
              <span className="text-[11px] font-black uppercase tracking-widest text-purple-100">Premium Selection</span>
            </div>
            <h2 className="text-5xl font-black leading-[0.9] text-white md:text-7xl tracking-tighter uppercase">
              CURATED FOR <br /> EXCELLENCE.
            </h2>
            <p className="max-w-md text-lg font-medium text-purple-100">
              Discover unique collections from top Indian artisans and independent brands. Excellence in every stitch and circuit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/collection">
                <Button className="h-16 px-10 text-lg bg-white text-purple-600 hover:scale-105 transition-transform shadow-xl shadow-purple-900/20">
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

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
