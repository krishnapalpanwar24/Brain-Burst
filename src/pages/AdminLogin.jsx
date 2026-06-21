import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      nav("/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">

      
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3 shadow-lg">
        <div className="flex items-center justify-between">

          
          <NavLink to="/" className="text-xl font-bold text-indigo-400">
            ⚡ BrainBurst
          </NavLink>

          
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/"
              className="text-slate-300 hover:text-white text-sm transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              User Login
            </NavLink>
            <NavLink
              to="/register"
              className="border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              Register
            </NavLink>
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
          <div className="md:hidden flex flex-col gap-2 pt-4 pb-2 border-t border-slate-700 mt-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-white text-sm px-2 py-1.5 rounded-lg hover:bg-slate-700 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              User Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="border border-indigo-500 text-indigo-400 text-sm px-4 py-2 rounded-lg transition"
            >
              Register
            </NavLink>
          </div>
        )}
      </nav>

      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            🛡️ Admin Login
          </h2>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <input
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition">
              Login
            </button>
          </form>

          
          <div className="border-t border-slate-700 mt-6 pt-4 text-center">
            <p className="text-slate-400 text-sm mb-3">Go to user side?</p>
            <div className="flex gap-3 justify-center">
              <NavLink
                to="/login"
                className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                🔐 User Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                📝 Register
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}