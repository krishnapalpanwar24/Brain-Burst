import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("userloggedIn"));
  const nav = useNavigate();
  const location = useLocation();

 
  useEffect(() => {
    setUser(localStorage.getItem("userloggedIn"));
  }, [location]);

  const logout = () => {
    localStorage.removeItem("userloggedIn");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    nav("/login");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between shadow-lg">
      <NavLink to="/" className="text-xl font-bold text-indigo-400">
        ⚡ BrainBurst
      </NavLink>

      <div className="flex items-center gap-4">
        <NavLink to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`
          }
        >
          Home
        </NavLink>

        <NavLink to="/leaderboard"
          className={({ isActive }) =>
            `text-sm font-medium transition ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`
          }
        >
           Leaderboard
        </NavLink>

        {user ? (
          <>
            <NavLink to="/quiz"
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-indigo-400" : "text-slate-300 hover:text-white"}`
              }
            >
              Quiz
            </NavLink>

            
            <span className="text-slate-400 text-sm">
              👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
            </span>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}