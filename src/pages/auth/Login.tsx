import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight, Github } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";
import { motion } from "motion/react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to login with Google.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[40px] border bg-white shadow-2xl md:grid-cols-2">
        {/* Left Side - Visual */}
        <div className="hidden bg-blue-600 p-12 text-white md:flex md:flex-col md:justify-between">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 font-black">N</div>
              <span className="text-2xl font-black">NexCart</span>
            </Link>
            <h2 className="text-4xl font-black leading-tight mt-12">
              JOIN THE <br /> REVOLUTION OF <br /> SHOPPING.
            </h2>
            <p className="max-w-xs text-blue-100 font-medium opacity-80">
              Unlock exclusive deals, track your orders in real-time, and get personalized recommendations just for you.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4 py-6 border-t border-blue-500/50">
              <div className="h-12 w-12 rounded-full border-2 border-white/20 overflow-hidden bg-neutral-100">
                <img src="https://picsum.photos/seed/user1/100/100" alt="" referrerPolicy="no-referrer" />
              </div>
              <p className="text-sm font-bold italic">"Best shopping experience I've had in years! Fast delivery and premium quality."</p>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-black text-blue-200">© 2026 NEXCART INDIA PVT LTD</p>
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
              <h1 className="text-3xl font-black text-neutral-900">Welcome Back</h1>
              <p className="mt-2 text-sm font-bold text-neutral-400 uppercase tracking-widest">Login to your account</p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
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
              <div className="flex justify-end">
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</a>
              </div>
              <Button type="submit" isLoading={isLoading} className="w-full h-12 text-lg">
                Login <LogIn size={20} className="ml-2" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-white px-4 text-neutral-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleGoogleLogin} variant="outline" className="h-12 font-bold">
                <img src="https://www.google.com/favicon.ico" alt="" className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="h-12 font-bold">
                <Github size={18} className="mr-2" />
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm font-bold text-neutral-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">Create Account</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
