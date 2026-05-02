import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "../../types";
import { formatCurrency, cn } from "../../lib/utils";
import { Button } from "./Button";
import { motion } from "motion/react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [isAdded, setIsAdded] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col rounded-[2rem] border border-slate-200 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <div className="absolute left-3 bottom-3 rounded-lg bg-pink-600 px-3 py-1 text-[10px] font-black text-white uppercase tracking-tighter shadow-sm z-10 animate-in fade-in zoom-in duration-500">
            NEW
          </div>
        )}
        <button 
          onClick={handleToggleWishlist}
          className={cn(
            "absolute right-3 top-3 h-10 w-10 rounded-full backdrop-blur-sm transition-all hover:scale-110 shadow-sm flex items-center justify-center z-10",
            isWishlisted ? "bg-red-500 text-white" : "bg-white/90 text-slate-400 hover:text-red-500"
          )}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
          {product.category}
        </span>
        <Link 
          to={`/product/${product.id}`}
          className="text-sm font-bold text-slate-900 transition-colors hover:text-pink-600 line-clamp-2 leading-tight"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-3 mb-4 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-700">
            <Star size={10} fill="currentColor" className="text-yellow-500" />
            <span>{product.ratings}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400">({product.numReviews} Reviews)</span>
        </div>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tighter">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          <Button 
            type="button"
            size="sm" 
            className={cn(
              "h-10 rounded-xl px-3 transition-all active:scale-90",
              isAdded ? "bg-green-600 w-auto" : "bg-slate-900 w-10 p-0 hover:bg-pink-600 shadow-lg shadow-slate-200"
            )}
            variant="primary"
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
                Added
              </span>
            ) : (
              <ShoppingCart size={18} />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
