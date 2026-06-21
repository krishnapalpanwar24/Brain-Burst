import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(localStorage.getItem("userloggedIn"));
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(localStorage.getItem("userloggedIn"));
    setMenuOpen(false); 
  }, [location]);

  const logout = () => {
    localStorage.removeItem("userloggedIn");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setMenuOpen(false);
    nav("/login");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3 shadow-lg">

      
      <div className="flex items-center justify-between">

        
        <NavLink to="/" className="text-xl font-bold text-indigo-400">
          ⚡ BrainBurst
        </NavLink>

        
        <div className="hidden md:flex items-center gap-4">
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

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

      </div>

     
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 pt-4 pb-2 border-t border-slate-700 mt-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1.5 rounded-lg transition ${isActive ? "text-indigo-400 bg-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`
            }
          >
             Home
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1.5 rounded-lg transition ${isActive ? "text-indigo-400 bg-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`
            }
          >
             Leaderboard
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  `text-sm font-medium px-2 py-1.5 rounded-lg transition ${isActive ? "text-indigo-400 bg-slate-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`
                }
              >
                 Quiz
              </NavLink>

              <div className="text-slate-400 text-sm px-2">
                👤 {JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.name || "User"}
              </div>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition text-left"
              >
                 Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
               Login
            </NavLink>
          )}
        </div>
      )}

    </nav>
  );
}