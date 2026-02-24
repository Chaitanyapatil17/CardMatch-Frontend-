import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added for smooth animations
import { getFavorites, removeFavorite } from "../services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Heart, CreditCard, Wallet, Trash2 } from "lucide-react";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cardId) => {
    try {
      await removeFavorite(cardId);
      setFavorites(favorites.filter(f => f.cardId._id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Your <span className="text-purple-600">Favorite</span> Cards
          </h1>
          <p className="text-slate-500">
            Comparing {favorites.length} saved rewards cards.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-purple-600 font-medium animate-pulse">Gathering your top picks...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && favorites.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Heart className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 text-lg mb-6">You haven't saved any cards yet.</p>
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-purple-600 hover:bg-purple-700 rounded-xl"
            >
              Explore Cards
            </Button>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {!loading && favorites.map((fav, index) => {
              const card = fav.cardId;
              return (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="group relative overflow-hidden border-purple-100/50 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer rounded-3xl"
                    onClick={() => navigate(`/cards/${card._id}`)}
                  >
                    {/* Visual Decor */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />

                    <CardHeader className="relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-1">
                            {card.bank}
                          </p>
                          <CardTitle className="text-xl font-bold text-slate-800">
                            {card.name}
                          </CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(card._id);
                          }}
                        >
                          <Heart className="fill-current" size={22} />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4 pb-6">
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-[11px] text-slate-400 uppercase font-semibold">Annual Fee</p>
                          <p className="text-sm font-bold text-slate-700">₹{card.annualFee}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] text-slate-400 uppercase font-semibold">Min Income</p>
                          <p className="text-sm font-bold text-slate-700">₹{card.minIncome}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-2xl border border-purple-100/50">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                           <Wallet size={14} className="text-purple-600" />
                        </div>
                        <p className="text-xs font-medium text-purple-700">
                          {card.rewardType} Rewards
                        </p>
                      </div>
                      
                      <Button className="w-full bg-slate-900 hover:bg-purple-600 text-white rounded-2xl py-5 transition-colors duration-300">
                        View Full Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}