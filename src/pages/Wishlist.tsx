import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/ui/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { MOCK_PRODUCTS } from "../constants";

export function Wishlist() {
  const { wishlist } = useWishlist();

  // Find product details for each wishlist ID
  const wishlistedProducts = wishlist
    .map(id => MOCK_PRODUCTS.find(p => p.id === id))
    .filter((p): p is typeof MOCK_PRODUCTS[0] => !!p);

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center bg-white rounded-[40px] border">
        <div className="mb-6 rounded-full bg-red-50 p-8 text-red-500">
          <Heart size={64} fill="currentColor" />
        </div>
        <h2 className="mb-2 text-3xl font-black text-neutral-900">Wishlist is empty</h2>
        <p className="mb-8 max-w-sm text-neutral-500 font-medium">
          Save items you love to your wishlist and they will appear here. Build your dream collection now!
        </p>
        <Link to="/">
          <Button size="lg" className="h-14 px-10 text-lg">
            Explore Trending
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-neutral-900">Your Wishlist</h1>
        <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{wishlistedProducts.length} Items saved</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
