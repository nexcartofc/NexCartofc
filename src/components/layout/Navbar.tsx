import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  Package,
  Store
} from "lucide-react";
import { APP_NAME } from "../../constants";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatCurrency } from "../../lib/utils";
import { MOCK_PRODUCTS } from "../../constants";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { items, totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const subtotal = items.reduce((sum, item) => {
    const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      {/* Global Header */}
      <div className="mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <ShoppingCart size={22} className="relative z-10" />
              <div className="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">
              Nex<span className="text-blue-600">cart</span>
            </h1>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden max-w-xl flex-1 md:flex"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for electronics, fashion and more..."
                className="h-11 w-full rounded-xl border-none bg-slate-100 px-6 py-2.5 text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold italic select-none">/</div>
            </div>
          </form>

          {/* Actions - Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/wishlist" className="text-sm font-bold tracking-tight text-slate-600 transition-colors hover:text-blue-600 uppercase">
              Wishlist ({totalWishlistItems})
            </Link>
            <Link to="/cart" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-tight hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
              <span>MY CART: {formatCurrency(subtotal)} ({totalItems})</span>
            </Link>
            <Link to="/login" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border-2 border-white shadow-sm text-slate-600 hover:bg-slate-200 transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Category Bar */}
      <div className="hidden border-t border-slate-100 bg-white px-4 md:block md:px-8">
        <nav className="flex items-center gap-8 py-3 text-[11px] font-black uppercase tracking-widest">
          {[
            { name: "All Products", path: "/products" },
            { name: "Trending", path: "/trending" },
            { name: "New Arrivals", path: "/deals" },
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`transition-all pb-1 border-b-2 ${
                isActive(item.path) 
                  ? "text-blue-600 border-blue-600" 
                  : "text-slate-500 border-transparent hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <span className="ml-auto flex items-center gap-2 text-red-500">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            FLASH DEALS
          </span>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t bg-white md:hidden"
          >
            <div className="container mx-auto space-y-4 px-4 py-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              </form>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/cart" className="flex flex-col items-center rounded-xl border p-4 text-neutral-600 relative">
                  <ShoppingCart size={24} />
                  <span className="mt-2 text-sm font-semibold">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center rounded-xl border p-4 text-neutral-600 relative">
                  <Heart size={24} />
                  <span className="mt-2 text-sm font-semibold">Wishlist</span>
                  {totalWishlistItems > 0 && (
                    <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="flex flex-col items-center rounded-xl border p-4 text-neutral-600">
                  <Package size={24} />
                  <span className="mt-2 text-sm font-semibold">Orders</span>
                </Link>
                <Link to="/seller" className="flex flex-col items-center rounded-xl border p-4 text-neutral-600">
                  <Store size={24} />
                  <span className="mt-2 text-sm font-semibold">Seller</span>
                </Link>
              </div>
              <Link to="/login" className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white">
                <User size={20} />
                <span>Login / Signup</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
