import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Store,
  ChevronRight,
  Plus,
  Minus,
  CreditCard,
  ArrowRight,
  Check
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { formatCurrency, cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { MOCK_PRODUCTS, APP_NAME } from "../constants";

export function ProductDetails() {
  const [isAdded, setIsAdded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // In a real app, we'd fetch product by id here
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    if (!product) return;
    
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on ${APP_NAME}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product) return;
    addToCart(product.id, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product) return;
    // Directly add to cart once and navigate
    addToCart(product.id, quantity);
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
        <h2 className="text-2xl font-black italic uppercase text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-sm">The product you are looking for does not exist or has been removed.</p>
        <Button variant="primary" className="mt-8 px-10 h-14 rounded-2xl" onClick={() => navigate("/")}>Back to Shopping</Button>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square overflow-hidden rounded-[32px] bg-white border"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "aspect-square overflow-hidden rounded-2xl border-2 transition-all",
                  selectedImage === idx ? "border-pink-600 ring-2 ring-pink-500/10" : "border-neutral-200 hover:border-pink-300"
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="primary" className="bg-pink-600 text-white">Latest Edition</Badge>
            <div className="flex gap-2">
              <button 
                onClick={() => product && toggleWishlist(product.id)}
                className={cn(
                  "rounded-full p-2 transition-colors",
                  isWishlisted ? "bg-red-500 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleShare}
                className={cn(
                  "rounded-full p-2 transition-colors relative",
                  isShared ? "bg-green-100 text-green-600" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {isShared ? <Check size={20} /> : <Share2 size={20} />}
                <AnimatePresence>
                  {isShared && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-1 text-[10px] text-white whitespace-nowrap"
                    >
                      Link Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-black text-neutral-900 md:text-4xl">{product.name}</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-sm font-bold text-white">
              <span>{product.ratings}</span>
              <Star size={14} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-neutral-400">{product.numReviews} Ratings & Reviews</span>
          </div>

          <div className="mb-8 p-6 rounded-3xl bg-pink-50 border border-pink-100">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-pink-600">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              <span className="text-lg font-bold text-green-600 px-2 py-0.5 rounded-lg bg-green-100">
                {discount}% OFF
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">Inclusive of all taxes</p>
          </div>

          {/* Seller Info */}
          <div className="mb-8 flex items-center justify-between rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                <Store size={24} className="text-neutral-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sold by</p>
                <p className="font-black text-neutral-900">{product.sellerName || "Nexcart Trusted Seller"}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Visit Store</Button>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8 flex items-center gap-6">
            <span className="font-bold text-neutral-900">Quantity</span>
            <div className="flex items-center rounded-xl border bg-white overflow-hidden">
              <button 
                className="p-3 text-neutral-600 hover:bg-neutral-100"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-neutral-900">{quantity}</span>
              <button 
                className="p-3 text-neutral-600 hover:bg-neutral-100"
                onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-4 grid-cols-2">
            <Button 
              type="button"
              size="lg" 
              variant="outline" 
              className={cn(
                "h-14 text-lg border-2 transition-all active:scale-95",
                isAdded 
                  ? "border-green-600 bg-green-50 text-green-600" 
                  : "border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
              )}
              onClick={(e) => handleAddToCart(e)}
            >
              {isAdded ? (
                <>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-2">✓</motion.span>
                  ADDED TO CART
                </>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  ADD TO CART
                </>
              )}
            </Button>
            <Button 
              type="button"
              size="lg" 
              className="h-14 text-lg bg-pink-600 hover:bg-pink-700 shadow-xl shadow-pink-200 transition-all active:scale-95 group"
              onClick={(e) => handleBuyNow(e)}
            >
              <CreditCard size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              BUY NOW
              <ArrowRight size={18} className="ml-2 opacity-60 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 rounded-full bg-pink-50 p-3 text-pink-600">
                <Truck size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 rounded-full bg-green-50 p-3 text-green-600">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">100% Genuine</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 rounded-full bg-pink-50 p-3 text-pink-600">
                <RotateCcw size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">7 Days Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <section className="rounded-[40px] bg-white border p-8 md:p-12 shadow-sm shadow-neutral-100">
        <h3 className="mb-8 text-2xl font-black text-neutral-900">Product Highlights</h3>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg leading-relaxed text-neutral-600">
              {product.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(product.features || ["Premium Quality", "Authentic Product", "Reliable Support"]).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4">
                <div className="h-2 w-2 rounded-full bg-pink-600" />
                <span className="font-bold text-neutral-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
