import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import { formatCurrency, cn } from "../lib/utils";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function OrderTracking() {
  const orders = [
    {
      id: "NEX-889922",
      date: "Oct 24, 2026",
      status: "SHIPPED",
      total: 153282,
      items: [
        { name: "iPhone 15 Pro", image: "https://picsum.photos/seed/iphone/100/100" }
      ]
    },
    {
      id: "NEX-445511",
      date: "Oct 20, 2026",
      status: "DELIVERED",
      total: 8995,
      items: [
        { name: "Nike Air Max 270", image: "https://picsum.photos/seed/nike/100/100" }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-neutral-900 uppercase">Track Orders</h1>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Your recent activity</p>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="rounded-[40px] border bg-white p-6 shadow-sm shadow-neutral-100 md:p-10">
            <div className="mb-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Order ID</p>
                <p className="text-lg font-black text-blue-600">#{order.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Date Placed</p>
                <p className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <Calendar size={16} className="text-neutral-400" /> {order.date}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</p>
                <Badge variant={order.status === "DELIVERED" ? "success" : "primary"}>
                  {order.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Amount</p>
                <p className="text-lg font-black text-neutral-900">{formatCurrency(order.total)}</p>
              </div>
            </div>

            {/* Tracking Visualizer */}
            <div className="relative mb-12">
              <div className="absolute top-5 left-8 right-8 h-1 bg-neutral-100" />
              <div className="absolute top-5 left-8 w-[66%] h-1 bg-blue-600" /> {/* Progressive based on status */}
              
              <div className="relative flex justify-between">
                {[
                  { label: "Placed", icon: PackageCheck, status: "completed" },
                  { label: "Confirmed", icon: CheckCircle2, status: "completed" },
                  { label: "Shipped", icon: Truck, status: "active" },
                  { label: "Delivered", icon: Package, status: "pending" },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 bg-white px-2">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl border-4 transition-all",
                      step.status === "completed" ? "bg-blue-600 border-blue-50 text-white" : 
                      step.status === "active" ? "bg-white border-blue-600 text-blue-600" : "bg-white border-neutral-100 text-neutral-300"
                    )}>
                      <step.icon size={24} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      step.status === "pending" ? "text-neutral-400" : "text-neutral-900"
                    )}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items & Summary Action */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t pt-10">
              <div className="flex items-center gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="h-16 w-16 overflow-hidden rounded-xl border bg-neutral-50 shadow-sm">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                ))}
                <div>
                  <p className="font-bold text-neutral-900">{order.items[0].name}</p>
                  <p className="text-xs font-medium text-neutral-400">Expected Delivery by Thursday</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="font-bold">Need Help?</Button>
                <Button className="font-bold">View Order Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[40px] bg-neutral-900 p-8 md:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-black md:text-5xl uppercase">HAVE QUESTIONS <br /> ABOUT YOUR ORDER?</h2>
          <p className="max-w-md text-neutral-400 font-medium font-lg">
            Our 24/7 support team is here to help you with anything from tracking your items to handling returns.
          </p>
          <Button size="lg" className="h-14 px-12 text-lg bg-blue-600 hover:bg-blue-700">
            Contact Support
          </Button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 p-24 opacity-10 hidden lg:block">
          <PackageCheck size={300} />
        </div>
      </section>
    </div>
  );
}
