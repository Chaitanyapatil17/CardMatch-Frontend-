import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-purple-100 p-8 rounded-[2.5rem] shadow-2xl shadow-purple-500/5"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200">
            <LogIn className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Login to manage your CardMatch profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
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
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <Link to="#" className="text-xs font-bold text-purple-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-purple-200 focus:ring-0 transition-all outline-none text-slate-700 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white text-lg font-bold transition-all shadow-lg hover:shadow-purple-200 mt-4"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-bold hover:underline inline-flex items-center gap-1">
              Sign up <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}