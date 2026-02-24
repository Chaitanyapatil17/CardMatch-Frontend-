import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Recommend from "./pages/Recommend";   
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CardDetails from "./pages/CardDetails";

// 1. Create a simple Layout wrapper for protected pages
const PageLayout = ({ children }) => (
  <div className="pt-28 min-h-screen bg-white">
    {children}
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Remove the pt-28 from this main div */}
      <div className="min-h-screen"> 
        <Routes>
          {/* Public Routes - No extra space at the top */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes - Space added ONLY here via PageLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageLayout><Dashboard /></PageLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommend"
            element={
              <ProtectedRoute>
                <PageLayout><Recommend /></PageLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <PageLayout><History /></PageLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <PageLayout><Favorites /></PageLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cards/:id"
            element={
              <ProtectedRoute>
                <PageLayout><CardDetails /></PageLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;