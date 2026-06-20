import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");

    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      const users = snap.docs.map((d) => d.data());
      const found = users.find((u) => u.email === email && u.password === password);

      if (found) {
        localStorage.setItem("userloggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify({ name: found.name, email: found.email }));
        nav("/quiz");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          🔐 User Login
        </h2>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            placeholder="Email"
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
          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-slate-400 text-sm mt-4">
          New user?{" "}
          <NavLink to="/register" className="text-indigo-400 hover:underline">Register</NavLink>
        </p>
      </div>
    </div>
  );
}