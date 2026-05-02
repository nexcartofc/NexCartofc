import { useState, useMemo } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Wallet, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  Truck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { formatCurrency, cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { MOCK_PRODUCTS } from "../constants";
import { Link } from "react-router-dom";

export function Checkout() {
  const { items, totalItems, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For phone, only allow digits and limit to 10
    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: onlyNums }));
      }
      return;
    }

    // For pincode, only allow digits and limit to 6
    if (name === "pincode") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: onlyNums }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleContinueToPayment = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    
    // Phone validation: must be exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Must be exactly 10 digits";
    }

    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    
    // Pincode validation: must be exactly 6 digits
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Must be exactly 6 digits";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format (e.g. name@gmail.com)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const { subtotal, shippingCharge, tax, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => {
      const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    const ship = 0;
    const t = 0;
    return {
      subtotal: sub,
      shippingCharge: ship,
      tax: t,
      total: sub,
    };
  }, [items]);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const newOrderId = `NEX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);

    const productDetails = items.map(item => {
      const p = MOCK_PRODUCTS.find(prod => prod.id === item.productId);
      return `${p?.name || "Product"} (x${item.quantity})`;
    }).join(", ");

    const payload = {
      orderId: newOrderId,
      ...formData,
      products: productDetails,
      productName: productDetails, // Added as a redundant field for sheet compatibility
      totalAmount: total,
      paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center bg-white rounded-[40px] border">
        <h2 className="mb-2 text-3xl font-black text-neutral-900">Your Checkout is Empty</h2>
        <p className="mb-8 max-w-sm text-neutral-500 font-medium">Add some items to your cart before checking out.</p>
        <Link to="/">
          <Button size="lg" className="h-14 px-10 text-lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-8 rounded-full bg-green-100 p-8 text-green-600">
          <CheckCircle2 size={80} />
        </div>
        <h1 className="mb-4 text-4xl font-black text-neutral-900">ORDER PLACED!</h1>
        <p className="mb-8 max-w-sm text-neutral-500 font-medium text-lg">
          Thank you for shopping with Nexcart. Your order has been placed successfully and is being processed.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button size="lg" className="h-14 text-lg">Track Order</Button>
          <Button variant="outline" size="lg" className="h-14 text-lg border-2" onClick={() => window.location.href = "/"}>Back to Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Checkout Sidebar Stats */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center gap-4 mb-2 overflow-x-auto pb-4 scrollbar-hide">
          <div className={cn("flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold", step >= 1 ? "bg-pink-600 text-white" : "bg-neutral-100 text-neutral-400")}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">1</div> Shipping
          </div>
          <ChevronRight className="flex-shrink-0 text-neutral-300" size={18} />
          <div className={cn("flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold", step >= 2 ? "bg-pink-600 text-white" : "bg-neutral-100 text-neutral-400")}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">2</div> Payment
          </div>
          <ChevronRight className="flex-shrink-0 text-neutral-300" size={18} />
          <div className={cn("flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold", step >= 3 ? "bg-pink-600 text-white" : "bg-neutral-100 text-neutral-400")}>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">3</div> Review
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="rounded-[40px] border bg-white p-8 md:p-12">
                <h2 className="mb-8 text-2xl font-black text-neutral-900 flex items-center gap-3">
                  <MapPin className="text-pink-600" /> Shipping Address
                </h2>
                <form className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.firstName && "border-red-500 bg-red-50"
                      )} 
                      placeholder="John" 
                      required
                    />
                    {errors.firstName && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.lastName && "border-red-500 bg-red-50"
                      )} 
                      placeholder="Doe" 
                      required
                    />
                    {errors.lastName && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.email && "border-red-500 bg-red-50"
                      )} 
                      placeholder="john.doe@example.com" 
                      required
                    />
                    {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.phone && "border-red-500 bg-red-50"
                      )} 
                      placeholder="+91 9876543210" 
                      required
                    />
                    {errors.phone && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Detailed Address (House No, Street, Landmark)</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full rounded-xl border-2 bg-neutral-50 p-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.address && "border-red-500 bg-red-50"
                      )} 
                      rows={3} 
                      placeholder="House No. 123, Green Valley, Silicon City..." 
                      required
                    />
                    {errors.address && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.city && "border-red-500 bg-red-50"
                      )} 
                      placeholder="Bangalore" 
                      required
                    />
                    {errors.city && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={cn(
                        "h-12 w-full rounded-xl border-2 bg-neutral-50 px-4 font-bold outline-none focus:border-pink-600 focus:bg-white",
                        errors.pincode && "border-red-500 bg-red-50"
                      )} 
                      placeholder="560001" 
                      required
                    />
                    {errors.pincode && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.pincode}</p>}
                  </div>
                </form>
                <Button size="lg" className="mt-12 h-14 w-full md:w-fit px-12 text-lg" onClick={handleContinueToPayment}>
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="rounded-[40px] border bg-white p-8 md:p-12">
                <h2 className="mb-8 text-2xl font-black text-neutral-900 flex items-center gap-3">
                  <CreditCard className="text-pink-600" /> Payment Method
                </h2>
                <div className="grid gap-4">
                  {[
                    { id: "COD", label: "Cash on Delivery", icon: Banknote },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-3xl border-2 p-6 transition-all text-left",
                        paymentMethod === method.id ? "border-pink-600 bg-pink-50/50" : "border-neutral-100 hover:border-pink-200 bg-neutral-50/50"
                      )}
                    >
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", paymentMethod === method.id ? "bg-pink-600 text-white" : "bg-white text-neutral-600")}>
                        <method.icon size={24} />
                      </div>
                      <span className="font-bold text-neutral-900">{method.label}</span>
                    </button>
                  ))}
                  
                  <div className="mt-4 p-4 rounded-2xl bg-pink-50/50 border border-pink-100 text-pink-700">
                    <p className="text-xs font-bold leading-relaxed">
                      💡 Our team will contact you on WhatsApp to confirm your order and payment details.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <Button variant="ghost" className="h-14 px-8 text-lg font-bold" onClick={() => setStep(1)}>Back</Button>
                  <Button size="lg" className="h-14 flex-1 md:flex-none md:px-12 text-lg" onClick={() => setStep(3)}>
                    Review Order
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="rounded-[40px] border bg-white p-8 md:p-12">
                <h2 className="mb-8 text-2xl font-black text-neutral-900">Review & Confirm</h2>
                <div className="space-y-6">
                  <div className="rounded-3xl bg-neutral-50 p-6 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 text-pink-600" size={20} />
                      <div>
                        <p className="text-xs font-black uppercase text-neutral-400">Shipping to</p>
                        <p className="font-bold text-neutral-900">{formData.firstName} {formData.lastName}, {formData.phone}</p>
                        <p className="truncate max-w-xs text-sm text-neutral-500 font-medium">{formData.address}, {formData.city}, {formData.pincode}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-pink-600" onClick={() => setStep(1)}>Change</Button>
                  </div>
                  <div className="rounded-3xl bg-neutral-50 p-6 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <CreditCard className="mt-1 text-pink-600" size={20} />
                      <div>
                        <p className="text-xs font-black uppercase text-neutral-400">Payment via</p>
                        <p className="font-bold text-neutral-900">
                          Cash on Delivery
                        </p>
                        <p className="text-[10px] font-bold text-pink-600 mt-1">Our team will contact you on WhatsApp to confirm.</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-pink-600" onClick={() => setStep(2)}>Change</Button>
                  </div>
                </div>
                <div className="mt-12 flex gap-4">
                  <Button variant="ghost" className="h-14 px-8 text-lg font-bold" onClick={() => setStep(2)}>Back</Button>
                  <Button 
                    size="lg" 
                    className="h-14 flex-1 md:flex-none md:px-12 text-lg bg-green-600 hover:bg-green-700 shadow-green-200" 
                    onClick={handlePlaceOrder}
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "PROCESSING..." : "CONFIRM & PLACE ORDER"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Box */}
      <div className="space-y-8">
        <div className="rounded-[40px] border bg-white p-8 md:p-10 shadow-sm shadow-neutral-100 sticky top-24">
          <h3 className="mb-6 text-xl font-black text-neutral-900">Price Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold text-neutral-500">
              <span>Price ({totalItems} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-500">
              <span>Delivery Charges</span>
              <span className="font-black tracking-tighter text-green-600">FREE!</span>
            </div>
            <div className="flex justify-between border-t border-dashed pt-4 text-xl font-black text-neutral-900">
              <span>Total Amount</span>
              <span className="text-pink-600">{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-green-700">
            <ShieldCheck size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">Safe & Secure Transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
