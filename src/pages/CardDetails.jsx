import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCardDetails } from "../services/api.js"; 
import { ArrowLeft, CheckCircle2, CreditCard, Zap, Calendar, Wallet, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await getCardDetails(id);
        // Check if data is nested inside res.data.data
        const cardData = res.data?.data || res.data;
        setCard(cardData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCard();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-medium mb-8">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Card Visual & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[1.6/1] rounded-[2.5rem] bg-gradient-to-br from-purple-700 to-slate-900 p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                    {card?.bank || "Bank Partner"}
                  </p>
                  <h2 className="text-2xl font-bold">
                    {card?.name || "Credit Card"}
                  </h2>
                </div>
                <div className="flex justify-between items-end">
                   <p className="text-lg font-medium tracking-widest opacity-80">•••• •••• •••• 2026</p>
                   <CreditCard size={32} className="opacity-40" />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] bg-purple-50 border border-purple-100">
                <Calendar className="text-purple-600 mb-2" size={20} />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Annual Fee</p>
                <p className="text-xl font-black text-slate-900">₹{card?.annualFee ?? "0"}</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                <Wallet className="text-purple-600 mb-2" size={20} />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Min. Income</p>
                <p className="text-xl font-black text-slate-900">₹{card?.minIncome ?? "0"}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Info */}
          <div className="lg:col-span-7 space-y-8">
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Percent size={20} className="text-purple-600"/> Cashback Rates
               </h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {card?.cashback ? Object.entries(card.cashback).map(([key, value]) => (
                    <div key={key} className="p-4 bg-white border border-slate-100 rounded-2xl text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{key}</p>
                      <p className="text-lg font-bold text-purple-600">{value}%</p>
                    </div>
                  )) : <p className="text-slate-400 italic">No cashback data available</p>}
               </div>
            </div>

            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500 fill-yellow-500"/> Benefits
               </h3>
               <div className="space-y-3">
                  {card?.benefits?.length > 0 ? card.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <CheckCircle2 size={18} className="text-green-500" />
                      <p className="text-slate-700 text-sm font-medium">{benefit}</p>
                    </div>
                  )) : <p className="text-slate-400 italic">No benefits listed</p>}
               </div>
            </div>

            <Button className="w-full h-16 rounded-3xl bg-slate-900 hover:bg-purple-600 text-white font-bold text-lg transition-all">
              Apply Now
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}