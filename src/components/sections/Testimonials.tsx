import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, User, Quote } from "lucide-react";
import { Button } from "../ui/Button";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Aman Gupta",
    rating: 5,
    comment: "The delivery was super fast and the quality of the product exceeded my expectations. Nexcart is now my go-to for all tech stuff!",
    date: "2 days ago"
  },
  {
    id: "2",
    name: "Priya Sharma",
    rating: 4,
    comment: "Great customer service! I had an issue with my order and they resolved it within hours. Highly recommend their service.",
    date: "1 week ago"
  },
  {
    id: "3",
    name: "Vikram Singh",
    rating: 5,
    comment: "Nexcart has the best curated collection of premium brands at reasonable prices. The user interface of the app is also very clean.",
    date: "3 days ago"
  }
];

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Math.random().toString(36).substring(7),
        name: newReview.name || "Anonymous User",
        rating: newReview.rating,
        comment: newReview.comment,
        date: "Just now"
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ name: "", rating: 5, comment: "" });
      setIsSubmitting(false);
      setShowForm(false);
    }, 1000);
  };

  return (
    <section className="space-y-12 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-pink-600">
            <Quote size={24} className="fill-pink-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Customer Voice</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase leading-[0.9]">
            LOVED BY <br /> THOUSANDS.
          </h2>
        </div>
        
        {!showForm ? (
          <Button 
            onClick={() => setShowForm(true)}
            className="h-14 px-10 bg-slate-900 hover:bg-pink-600 transition-all rounded-2xl font-black uppercase tracking-widest text-[11px]"
          >
            Post Your Review
          </Button>
        ) : (
          <Button 
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="text-slate-400 hover:text-slate-900 font-bold"
          >
            Cancel
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 space-y-8"
            >
              <h3 className="text-2xl font-black text-slate-900 uppercase">Share Your Experience</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Name</label>
                    <input 
                      type="text"
                      required
                      value={newReview.name}
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                      placeholder="e.g. Rahul Verma"
                      className="w-full h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-pink-500 focus:bg-white outline-none px-6 font-bold transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="transition-transform active:scale-90"
                        >
                          <Star 
                            size={32} 
                            className={star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Review</label>
                  <textarea 
                    required
                    value={newReview.comment}
                    onChange={e => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Tell us what you liked (or didn't like)..."
                    rows={4}
                    className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:border-pink-500 focus:bg-white outline-none p-6 font-bold transition-all resize-none"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                isLoading={isSubmitting}
                className="w-full md:w-auto h-16 px-12 bg-pink-600 hover:bg-pink-700 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl shadow-pink-200"
              >
                Submit Review <Send size={18} className="ml-2" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <User size={24} />
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-100"} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-slate-600 font-medium leading-[1.6] mb-6 italic">
                "{review.comment}"
              </p>
              
              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <span className="font-black text-slate-900 text-xs uppercase tracking-widest">{review.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center text-white space-y-6">
        <h3 className="text-3xl md:text-5xl font-black uppercase">Loved Nexcart?</h3>
        <p className="text-slate-400 font-medium max-w-xl mx-auto">
          We're constantly working to improve our service. Your feedback helps us build a better shopping experience for everyone.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 pt-4">
          <div className="space-y-1">
            <p className="text-4xl font-black text-pink-500">4.8</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Avg Rating</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-800" />
          <div className="space-y-1">
            <p className="text-4xl font-black text-emerald-500">12K+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Users</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-800" />
          <div className="space-y-1">
            <p className="text-4xl font-black text-rose-500">99%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Reliability</p>
          </div>
        </div>
      </div>
    </section>
  );
}
