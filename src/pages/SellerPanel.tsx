import { useState } from "react";
import { 
  Store, 
  Plus, 
  Package, 
  BarChart2, 
  Settings, 
  DollarSign, 
  ChevronRight,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { formatCurrency } from "../lib/utils";
import { Badge } from "../components/ui/Badge";

export function SellerPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col gap-8 lg:flex-row min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-2 rounded-[32px] border bg-white p-4 h-fit sticky top-24">
        <div className="mb-6 flex items-center gap-3 px-4 py-2 border-b">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-100">
            <Store size={20} />
          </div>
          <p className="font-black text-neutral-900 uppercase text-xs">Seller Hub</p>
        </div>
        <button 
          onClick={() => setActiveTab("dashboard")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "dashboard" ? "bg-pink-600 text-white shadow-lg shadow-pink-100" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <BarChart2 size={18} /> Dashboard
        </button>
        <button 
          onClick={() => setActiveTab("inventory")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "inventory" ? "bg-pink-600 text-white shadow-lg shadow-pink-100" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <Package size={18} /> Inventory
        </button>
        <button 
          onClick={() => setActiveTab("earnings")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "earnings" ? "bg-pink-600 text-white shadow-lg shadow-pink-100" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <DollarSign size={18} /> Earnings
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "settings" ? "bg-pink-600 text-white shadow-lg shadow-pink-100" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <Settings size={18} /> Store Setup
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 uppercase">Seller Center</h1>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Grow your business with Nexcart</p>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700 shadow-pink-100">
            <Plus size={18} className="mr-2" /> List New Product
          </Button>
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-8">
             <section className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Monthly Revenue</p>
                <h3 className="mt-1 text-2xl font-black text-neutral-900">{formatCurrency(458000)}</h3>
                <p className="mt-2 text-xs font-bold text-green-600">↑ 18% from last month</p>
              </div>
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Orders</p>
                <h3 className="mt-1 text-2xl font-black text-neutral-900">142</h3>
                <p className="mt-2 text-xs font-bold text-pink-600">Pending: 12</p>
              </div>
              <div className="rounded-3xl border bg-white p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Product Views</p>
                <h3 className="mt-1 text-2xl font-black text-neutral-900">12.5K</h3>
                <p className="mt-2 text-xs font-bold text-pink-600">High engagement</p>
              </div>
            </section>

            {/* Quick Upload Form Preview */}
            <section className="rounded-[40px] border bg-white p-8 md:p-12 shadow-sm shadow-neutral-100">
              <h2 className="mb-8 text-xl font-black text-neutral-900 uppercase tracking-tight">Quick Product Upload</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Product Name</label>
                    <input type="text" className="h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none" placeholder="e.g. Premium Cotton T-Shirt" />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Price (₹)</label>
                      <input type="number" className="h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none" placeholder="999" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Stock</label>
                      <input type="number" className="h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none" placeholder="50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Category</label>
                    <select className="h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none appearance-none">
                      <option>Fashion</option>
                      <option>Electronics</option>
                      <option>Home</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-2">Product Images</label>
                  <div className="aspect-video w-full rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center p-8 text-neutral-400 hover:border-pink-300 hover:bg-pink-50 transition-all cursor-pointer">
                    <Upload size={32} className="mb-4" />
                    <p className="text-sm font-bold">Drop images here or click to upload</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-2">PNG, JPG up to 10MB</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-xl border bg-neutral-100 flex items-center justify-center">
                      <ImageIcon size={20} />
                    </div>
                    <div className="h-16 w-16 rounded-xl border bg-neutral-100 flex items-center justify-center">
                      <ImageIcon size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-end">
                <Button className="h-14 px-12 text-lg bg-neutral-900 hover:bg-neutral-800">
                  Save as Draft
                </Button>
                <Button className="h-14 px-12 text-lg bg-pink-600 hover:bg-pink-700 ml-4">
                  Publish Product
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
