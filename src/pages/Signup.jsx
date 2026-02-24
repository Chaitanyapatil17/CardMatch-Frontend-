import { useState } from "react";
import { signupUser } from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-purple-100 p-8 rounded-[2.5rem] shadow-2xl shadow-purple-500/5"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200">
            <UserPlus className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-2">Join CardMatch to find your best rewards</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white text-lg font-bold transition-all shadow-lg hover:shadow-purple-200 mt-6"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-bold hover:underline inline-flex items-center gap-1">
              Log in <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}