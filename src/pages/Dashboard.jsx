import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-purple-100">
      
      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Animated Background Blob */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <motion.div {...fadeInUp}>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-purple-700 uppercase bg-purple-50 rounded-full border border-purple-100">
            Powered by Smart Algorithms
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            Your Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Credit Card</span> Advisor
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Stop guessing. Analyze your spending habits and discover high-reward cards 
            tailored specifically for your lifestyle. Optimized for the modern spender.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/recommend")}
              className="h-14 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-200 transition-all hover:scale-105 gap-2 text-lg"
            >
              Start Recommendation <ArrowRight size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 rounded-2xl border-purple-100 hover:bg-purple-50 text-purple-700 text-lg"
            >
              Learn How It Works
            </Button>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE BENTO GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1: Recommend */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden relative"
          >
            <div className="relative z-10">
              <Zap className="mb-4 text-purple-200" size={40} />
              <h3 className="text-2xl font-bold mb-2">Instant Recommendation</h3>
              <p className="text-purple-100 max-w-md">Our engine scans thousands of card perks to find your 100% match in seconds.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10">
                <Sparkles size={200} />
            </div>
          </motion.div>

          {/* Feature 2: Favorites */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <Heart className="mb-4 text-red-500" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Save Favorites</h3>
            <p className="text-slate-500">Keep track of the cards you love most for later comparison.</p>
          </motion.div>

          {/* Feature 3: History */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <ShieldCheck className="mb-4 text-green-500" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure History</h3>
            <p className="text-slate-500">Access your past analysis and see how your spending trends have evolved.</p>
          </motion.div>

          {/* Feature 4: Detail View */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-8 rounded-3xl bg-slate-50 border border-slate-200"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Deep Insights</h3>
                <p className="text-slate-600">Every card includes a full breakdown of Annual Fees, Minimum Income, and Reward Types.</p>
              </div>
              <div className="flex gap-2">
                 <div className="w-24 h-16 bg-white rounded-xl shadow-sm border border-purple-100" />
                 <div className="w-24 h-16 bg-purple-100 rounded-xl shadow-sm border border-purple-200" />
                 <div className="w-24 h-16 bg-white rounded-xl shadow-sm border border-purple-100" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}