import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  ShoppingBag, 
  Search, 
  Filter, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { formatCurrency } from "../lib/utils";
import { motion } from "motion/react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Revenue", value: 1250000, change: "+12.5%", trendingUp: true, icon: BarChart3 },
    { label: "Orders", value: 450, change: "+8.2%", trendingUp: true, icon: ShoppingCart },
    { label: "Customers", value: 1200, change: "-2.4%", trendingUp: false, icon: Users },
    { label: "Products", value: 85, change: "+4.1%", trendingUp: true, icon: Package },
  ];

  return (
    <div className="flex flex-col gap-8 lg:flex-row min-h-[80vh]">
      {/* Sidebar - Desktop */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-2 rounded-[32px] border bg-white p-4 h-fit sticky top-24">
        <h3 className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">Admin Menu</h3>
        <button 
          onClick={() => setActiveTab("overview")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "overview" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <BarChart3 size={18} /> Overview
        </button>
        <button 
          onClick={() => setActiveTab("products")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "products" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <Package size={18} /> Products
        </button>
        <button 
          onClick={() => setActiveTab("orders")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "orders" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <ShoppingCart size={18} /> Orders
        </button>
        <button 
          onClick={() => setActiveTab("users")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === "users" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-neutral-600 hover:bg-neutral-50"}`}
        >
          <Users size={18} /> Customers
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 uppercase">Dashboard</h1>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Management & Insights</p>
          </div>
          <Button>
            <Plus size={18} className="mr-2" /> Add New Product
          </Button>
        </div>

        {/* Stats Grid */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border bg-white p-6 shadow-sm shadow-neutral-100"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-neutral-50 p-3 text-neutral-600">
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-black ${stat.trendingUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {stat.trendingUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-black text-neutral-900">
                  {typeof stat.value === "number" && stat.label.includes("Revenue") ? formatCurrency(stat.value) : stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Recent Orders Table */}
        <section className="rounded-[40px] border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b p-6 md:p-8">
            <h2 className="text-xl font-black text-neutral-900">Recent Transactions</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Search size={16} className="mr-2" /> Search
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Order ID</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Customer</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Amount</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-6">
                      <span className="font-bold text-pink-600">#ORD-2026-00{item}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-black">JD</div>
                        <span className="font-bold text-neutral-700 text-sm">John Doe</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-1 text-[10px] font-black text-green-700 w-fit">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        COMPLETED
                      </div>
                    </td>
                    <td className="p-6 font-bold text-neutral-900 text-sm">{formatCurrency(2499)}</td>
                    <td className="p-6">
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t bg-neutral-50/50 flex justify-center">
            <Button variant="ghost" className="text-xs font-bold text-pink-600 uppercase tracking-widest">View All Transactions</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
