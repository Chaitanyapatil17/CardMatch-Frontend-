import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, History, Heart, LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const hideNavbarPaths = ["/", "/login", "/signup"];
  if (hideNavbarPaths.includes(location.pathname) || !token) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    // Wrapper to handle centering and fixed positioning
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-4xl px-4 py-2 bg-purple-50/60 backdrop-blur-xl border border-purple-100/50 rounded-full shadow-lg shadow-purple-500/10">
        
        {/* Brand / Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 pl-2 group">
          <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
             <span className="text-white font-bold text-xs">CM</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-purple-900 hidden sm:block">
            CardMatch
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-1">
          
          <Link to="/dashboard">
            <Button 
              variant="ghost" 
              size="sm"
              className={`rounded-full gap-2 transition-all ${
                isActive("/dashboard") 
                ? "bg-purple-500 text-white hover:bg-purple-600 shadow-md shadow-purple-200" 
                : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link to="/history">
            <Button 
              variant="ghost" 
              size="sm"
              className={`rounded-full gap-2 transition-all ${
                isActive("/history") 
                ? "bg-purple-500 text-white hover:bg-purple-600 shadow-md shadow-purple-200" 
                : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              <History size={18} />
              <span className="hidden md:inline">History</span>
            </Button>
          </Link>

          <Link to="/favorites">
            <Button 
              variant="ghost" 
              size="sm"
              className={`rounded-full gap-2 transition-all ${
                isActive("/favorites") 
                ? "bg-purple-500 text-white hover:bg-purple-600 shadow-md shadow-purple-200" 
                : "text-purple-700 hover:bg-purple-100"
              }`}
            >
              <Heart size={18} />
              <span className="hidden md:inline">Favorites</span>
            </Button>
          </Link>

          {/* Separator */}
          <div className="w-[1px] h-6 bg-purple-200 mx-1 hidden sm:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
          </Button>

        </div>
      </nav>
    </div>
  );
}