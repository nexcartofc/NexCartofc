import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";
import { formatCurrency } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

export function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, clearCart } = useCart();

  // In a real app, we'd fetch actual product details for these IDs
  const cartProducts = items.map(item => {
    const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
    return {
      ...item,
      details: product || {
        name: "Unknown Product",
        price: 0,
        images: ["https://picsum.photos/seed/unknown/400/400"]
      }
    };
  });

  const subtotal = cartProducts.reduce((sum, item) => sum + (item.details.price * item.quantity), 0);
  const shippingCharge = subtotal > 10000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shippingCharge + tax;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center bg-white rounded-[40px] border">
        <div className="mb-6 rounded-full bg-blue-50 p-8 text-blue-600">
          <ShoppingBag size={64} />
        </div>
        <h2 className="mb-2 text-3xl font-black text-neutral-900">Your cart is empty</h2>
        <p className="mb-8 max-w-sm text-neutral-500 font-medium">
          Looks like you haven't added anything to your cart yet. Explore our latest electronics and fashion deals!
        </p>
        <Link to="/">
          <Button size="lg" className="h-14 px-10 text-lg">
            Start Shopping
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-neutral-900">Shopping Cart ({totalItems})</h1>
        <Button 
          variant="ghost" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-6 lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {cartProducts.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-6 rounded-[32px] border bg-white p-4 transition-all hover:shadow-md md:p-6"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border bg-neutral-50 md:h-32 md:w-32">
                  <img src={item.details.images[0]} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-neutral-900 md:text-lg line-clamp-1">{item.details.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Sold by NexCart Official</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-xl border bg-neutral-50 overflow-hidden">
                      <button 
                        className="p-2 text-neutral-600 hover:bg-neutral-200"
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-neutral-900">{item.quantity}</span>
                      <button 
                        className="p-2 text-neutral-600 hover:bg-neutral-200"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-neutral-900">{formatCurrency(item.details.price * item.quantity)}</p>
                      <p className="text-[10px] font-bold text-neutral-400">{formatCurrency(item.details.price)} / unit</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="h-fit space-y-6 rounded-[40px] border bg-white p-8 md:p-10 shadow-sm shadow-neutral-100 lg:sticky lg:top-24">
          <h2 className="text-xl font-black text-neutral-900">Order Summary</h2>
          
          <div className="space-y-4 text-sm font-bold">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping Charge</span>
              <span className={shippingCharge === 0 ? "text-green-600" : ""}>
                {shippingCharge === 0 ? "FREE" : formatCurrency(shippingCharge)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Estimated GST (18%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-black text-neutral-900">
              <span>Total Pay</span>
              <span className="text-blue-600">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <Link to="/checkout" className="block">
              <Button size="lg" className="w-full h-14 text-lg">PROCEED TO BUY</Button>
            </Link>
            <p className="text-center text-[10px] uppercase tracking-widest text-neutral-400 font-black">
              SECURE CHECKOUT BY NEXCART
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 font-bold">
                %
              </div>
              <div>
                <p className="text-xs font-black text-neutral-900 uppercase tracking-widest">Apply Coupon</p>
                <p className="text-[10px] text-neutral-400 font-bold">Save more on your order</p>
              </div>
              <ChevronRight size={18} className="ml-auto text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
