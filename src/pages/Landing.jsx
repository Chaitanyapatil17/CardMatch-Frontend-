import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, CreditCard, ArrowRight } from "lucide-react";
import { ShinyButton } from "@/components/ShinyButton";
import GradientButton from "@/components/GradientButton";

export default function Landing() {
    // Animation variants for staggered appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center max-w-4xl px-6"
            >
                {/* Small Badge */}
                <motion.div variants={itemVariants} className="flex justify-center mb-6">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-sm font-medium shadow-sm">
                        <Sparkles size={14} />
                        <span>The smarter way to spend</span>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight text-slate-900"
                >
                    Find the Perfect <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        Credit Card
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="text-slate-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    CardMatch analyzes your unique spending profile to unlock 
                    maximum rewards and benefits — <span className="text-slate-900 font-medium">tailored for you instantly.</span>
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20"
                >
                    <Link to="/signup" className="w-full sm:w-auto">
                        <GradientButton className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl shadow-xl shadow-purple-200">
                            Get Started Free
                        </GradientButton>
                    </Link>

                    <Link to="/login" className="w-full sm:w-auto">
                        <ShinyButton className="w-full sm:w-auto h-14 px-10 text-lg rounded-2xl border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                            Sign In 
                        </ShinyButton>
                    </Link>
                </motion.div>

                {/* Floating Preview Element */}
                <motion.div 
                    variants={itemVariants}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto w-full max-w-[500px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 blur-2xl opacity-20 transform scale-90" />
                    <div className="relative bg-white/80 backdrop-blur-xl border border-white p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Top Recommendation</p>
                            <p className="text-lg font-bold text-slate-900">Premium Rewards Card</p>
                        </div>
                        <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                            98% Match
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}