import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Ensure addFavorite and removeFavorite are exported from your api service
import { recommendCards, addFavorite } from "../services/api"; 
import { 
  Wallet, 
  CreditCard, 
  ShoppingBag, 
  Fuel, 
  Utensils, 
  Plane, 
  Sparkles, 
  TrendingUp,
  ArrowRight,
  Heart // Added Heart icon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Recommend() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    income: "",
    creditScore: "",
    shopping: "",
    fuel: "",
    dining: "",
    travel: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      income: Number(formData.income),
      creditScore: Number(formData.creditScore),
      goal: "cashback",
      spending: {
        shopping: Number(formData.shopping),
        fuel: Number(formData.fuel),
        dining: Number(formData.dining),
        travel: Number(formData.travel)
      }
    };

    try {
      setLoading(true);
      const res = await recommendCards(userData);
      // Initialize results with isFavorite: false
      const recommendedData = (res.data.data || []).map(card => ({
        ...card,
        isFavorite: false
      }));
      setResults(recommendedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Toggle Favorite Logic ---
  const handleToggleFavorite = async (cardId) => {
    try {
      await addFavorite(cardId);
      setResults((prev) =>
        prev.map((card) =>
          card.cardId === cardId ? { ...card, isFavorite: true } : card
        )
      );
    } catch (error) {
      console.error("Error adding to favorites:", error);
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const getIcon = (name) => {
    const icons = {
      income: <Wallet size={18} />,
      creditScore: <TrendingUp size={18} />,
      shopping: <ShoppingBag size={18} />,
      fuel: <Fuel size={18} />,
      dining: <Utensils size={18} />,
      travel: <Plane size={18} />
    };
    return icons[name] || <CreditCard size={18} />;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} /> AI Powered
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Find Your <span className="text-purple-600">Financial Match</span>
          </h1>
        </motion.div>

        {/* Form Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-purple-100 p-8 rounded-[2.5rem] shadow-xl shadow-purple-500/5 mb-16"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(formData).map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                    {getIcon(field)}
                  </div>
                  <input
                    type="number"
                    name={field}
                    placeholder={`Enter ${field}...`}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}

            <div className="md:col-span-2 pt-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white text-lg font-bold transition-all shadow-lg"
              >
                {loading ? "Analyzing Data..." : "Get Best Recommendations"}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {results.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/cards/${card.cardId}`)}
              >
                <div className="h-64 rounded-[2rem] bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-1">Bank Issuer</p>
                        <h3 className="text-xl font-bold leading-tight">{card.name}</h3>
                        <p className="text-xs opacity-80">{card.bank}</p>
                      </div>

                      {/* --- FAVORITE HEART BUTTON --- */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full transition-all hover:scale-110 ${
                          card.isFavorite ? "text-red-500 fill-red-500" : "text-white/40 hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents navigating to card details
                          handleToggleFavorite(card.cardId);
                        }}
                      >
                        <Heart size={24} className={card.isFavorite ? "fill-current" : ""} />
                      </Button>
                    </div>

                    <div className="mt-auto">
                      <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Est. Monthly Earnings</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black">₹{card.estimatedMonthlyCashback}</span>
                        <span className="text-xs font-bold opacity-70 mb-1">/ mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}