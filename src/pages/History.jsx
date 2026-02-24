import { useEffect, useState } from "react";
import { getHistory } from "../services/historyApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History as HistoryIcon, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  ArrowRight,
  Clock
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      
      // Safety check for data structure: handles res.data.data or just res.data
      const historyData = res.data?.data || res.data || [];
      setHistory(Array.isArray(historyData) ? historyData : []);
      
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
              <HistoryIcon size={24} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Recommendation <span className="text-purple-600">History</span>
            </h1>
          </div>
          <p className="text-slate-500">
            Keep track of your previous financial scans and recommendations.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-purple-600 font-medium animate-pulse">Retrieving your archives...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <Clock className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 text-lg mb-6">No previous recommendations found.</p>
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-8 py-6 h-auto text-lg shadow-xl shadow-purple-100">
              Run First Scan
            </Button>
          </div>
        )}

        {/* History List */}
        {!loading && (
          <div className="space-y-10">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-purple-100/50 shadow-xl shadow-purple-500/5 rounded-[2.5rem] overflow-hidden group">
                    
                    {/* Header: User Profile Context */}
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <Calendar size={12} />
                            {new Date(item.createdAt).toLocaleDateString(undefined, { 
                              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                            })}
                          </div>
                          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                            <Wallet className="text-purple-500" size={24} />
                            Income: ₹{item.userProfile?.income?.toLocaleString()}
                          </CardTitle>
                        </div>
                        
                        <div className="flex gap-3">
                          <Badge variant="secondary" className="bg-white border-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold flex gap-2">
                            <TrendingUp size={14} />
                            Score: {item.userProfile?.creditScore}
                          </Badge>
                          <Badge className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider">
                            {item.userProfile?.goal}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Content: Recommended Cards */}
                    <CardContent className="p-8">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 ml-1">
                        Top Recommendations
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.recommendedCards?.map((card, i) => (
                          <div
                            key={i}
                            className="p-5 border border-slate-100 rounded-[1.5rem] bg-white hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all flex justify-between items-center group/card"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover/card:bg-purple-600 group-hover/card:text-white transition-colors">
                                <CreditCard size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 leading-tight">
                                  {card.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {card.bank}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-baseline justify-end gap-1">
                                <span className="text-lg font-black text-purple-600">
                                  ₹{card.estimatedMonthlyCashback}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">/MO</span>
                              </div>
                              <div className="flex items-center justify-end gap-1 mt-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Match:</span>
                                <span className="text-xs font-bold text-slate-900">{card.score}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                         <Button variant="ghost" className="text-purple-600 font-bold hover:bg-purple-50 rounded-xl gap-2">
                            View Detailed Analysis <ArrowRight size={16} />
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}