import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { UserRole } from "../../types";

export function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      // Create user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        fullName,
        role: UserRole.CUSTOMER,
        createdAt: Date.now()
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[40px] border bg-white shadow-2xl md:grid-cols-2">
        {/* Left Side - Visual */}
        <div className="hidden bg-neutral-900 p-12 text-white md:flex md:flex-col md:justify-between">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-black">N</div>
              <span className="text-2xl font-black">NexCart</span>
            </Link>
            <h2 className="text-4xl font-black leading-tight mt-12">
              START YOUR <br /> PREMIER SHOPPING <br /> JOURNEY TODAY.
            </h2>
          </div>

          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Buyer Protection</p>
                  <p className="text-xs text-neutral-400 mt-1">Every transaction is secured and guaranteed by NexCart.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Personalized Experience</p>
                  <p className="text-xs text-neutral-400 mt-1">AI-driven recommendations based on your preferences.</p>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] uppercase tracking-widest font-black text-neutral-500 pt-8 border-t border-neutral-800">
              Join +2 Million users shopping across India
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl font-black text-neutral-900">Create Account</h1>
              <p className="mt-2 text-sm font-bold text-neutral-400 uppercase tracking-widest">Join the NexCart family</p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="h-12 w-full rounded-xl border-2 bg-neutral-50 pl-12 pr-4 text-sm font-bold transition-all focus:border-blue-600 focus:bg-white focus:outline-none"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="h-12 w-full rounded-xl border-2 bg-neutral-50 pl-12 pr-4 text-sm font-bold transition-all focus:border-blue-600 focus:bg-white focus:outline-none"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    className="h-12 w-full rounded-xl border-2 bg-neutral-50 pl-12 pr-4 text-sm font-bold transition-all focus:border-blue-600 focus:bg-white focus:outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" isLoading={isLoading} className="w-full h-12 text-lg">
                  Create Account <UserPlus size={20} className="ml-2" />
                </Button>
              </div>
            </form>

            <p className="text-center text-sm font-bold text-neutral-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
