import { useAuth } from "../context/AuthContext";
import { User, Mail, MapPin, Package, Heart, LogOut, ChevronRight, Settings, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui/Badge";

export function Profile() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Profile Header */}
      <section className="relative overflow-hidden rounded-[40px] bg-neutral-900 p-8 md:p-12 text-white shadow-xl shadow-neutral-200">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-white/20 overflow-hidden bg-neutral-100">
              <img src="https://picsum.photos/seed/user/200/200" alt="" className="h-full w-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center border-4 border-neutral-900 text-white hover:bg-pink-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-black md:text-4xl">{profile?.fullName || user?.displayName || "Shopper Name"}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <p className="flex items-center gap-2 text-sm font-bold text-neutral-400">
                <Mail size={16} /> {user?.email}
              </p>
              <p className="flex items-center gap-2 text-sm font-bold text-neutral-400">
                <MapPin size={16} /> Bangalore, India
              </p>
            </div>
            <div className="pt-4 flex gap-3 justify-center md:justify-start">
              <div className="rounded-lg bg-pink-600/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-pink-400 border border-pink-600/30">
                Gold Member
              </div>
              <div className="rounded-lg bg-green-600/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-green-400 border border-green-600/30">
                12 Orders Placed
              </div>
            </div>
          </div>
          <Button variant="outline" className="md:ml-auto border-white/20 text-white hover:bg-white/10" onClick={handleLogout}>
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Menu Cards */}
        {[
          { label: "My Orders", icon: Package, link: "/orders", color: "bg-pink-50 text-pink-600" },
          { label: "My Wishlist", icon: Heart, link: "/wishlist", color: "bg-red-50 text-red-600" },
          { label: "Settings", icon: Settings, link: "#", color: "bg-neutral-100 text-neutral-600" },
        ].map((item, idx) => (
          <button 
            key={idx}
            className="flex flex-col items-center gap-4 rounded-[32px] border bg-white p-8 transition-all hover:shadow-lg hover:shadow-neutral-100"
            onClick={() => item.link !== "#" && navigate(item.link)}
          >
            <div className={cn("flex h-16 w-16 items-center justify-center rounded-3xl", item.color)}>
              <item.icon size={32} />
            </div>
            <span className="font-black text-neutral-900 uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Account Details */}
      <section className="rounded-[40px] border bg-white p-8 md:p-12 shadow-sm">
        <h2 className="mb-10 text-2xl font-black text-neutral-900 uppercase">Account Settings</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Full Name</p>
                <p className="font-bold text-neutral-900">{profile?.fullName}</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Email Address</p>
                <p className="font-bold text-neutral-900">{user?.email}</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Phone Number</p>
                <p className="font-bold text-neutral-900">+91 91234 56789</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Manage Addresses</p>
                <p className="font-bold text-neutral-900">2 Saved Addresses</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Stored Cards</p>
                <p className="font-bold text-neutral-900">Visa ending in 4242</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
            <div className="group flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Notification Preferences</p>
                <p className="font-bold text-neutral-900">Email & Push Active</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-pink-600 transition-colors" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
